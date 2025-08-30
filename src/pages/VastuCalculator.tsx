// VastuAnalyzer.tsx
import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Upload, Eye, EyeOff, CheckCircle, XCircle, Home } from 'lucide-react';
import { toast } from 'sonner';
import Tesseract from 'tesseract.js';

// Types
type DetectedBox = {
  text: string;
  bbox: { x0: number; y0: number; x1: number; y1: number };
  center: { x: number; y: number };
};

type Feature = {
  center: { x: number; y: number };
  label: string;
};

type Row = {
  feature: string;
  direction: string;
  allowed: string;
  ok: boolean;
};

type Evaluation = {
  rows: Row[];
  score: number;
  total: number;
  correct: number;
};

// -----------------------------
// Configuration data
// -----------------------------
const VASTU_RULES: Record<string, string[]> = {
  main_door: ['North', 'Northeast', 'East'],
  kitchen: ['Southeast'],
  master_bedroom: ['South', 'Southwest'],
  guest_bedroom: ['Northwest'],
  childrens_bedroom: ['North', 'Northwest', 'West'],
  pooja_room: ['Northeast'],
  living_room: ['North', 'Northeast', 'East'],
  toilet_bathroom: ['Northwest', 'West'],
  staircase: ['South', 'Southwest', 'West'],
  water_body: ['Northeast', 'North', 'East'],
};

// aliases: lowercase tokens used for matching
const ALIASES: Record<string, string[]> = {
  main_door: ['main door', 'main entrance', 'entrance', 'entry', 'front door', 'gate'],
  kitchen: ['kitchen', 'cooking', 'pantry'],
  master_bedroom: ['master bedroom', 'm bedroom', 'm. bedroom', 'main bedroom', 'primary bedroom'],
  guest_bedroom: ['guest bedroom', 'guest room'],
  childrens_bedroom: ["children's bedroom", 'childrens bedroom', 'kids bedroom', 'children bedroom'],
  pooja_room: ['pooja room', 'prayer room', 'mandir', 'puja room', 'temple'],
  living_room: ['living room', 'drawing room', 'hall', 'lounge', 'sitting room', 'family room'],
  toilet_bathroom: ['toilet', 'bathroom', 'washroom', 'restroom', 'wc'],
  staircase: ['staircase', 'stairs'],
  water_body: ['water body', 'pond', 'fountain'],
};

// -----------------------------
// Utility helpers (self-contained)
// -----------------------------
function humanizeKey(key: string) {
  const map: Record<string, string> = {
    main_door: 'Main Door',
    kitchen: 'Kitchen',
    master_bedroom: 'Master Bedroom',
    guest_bedroom: 'Guest Bedroom',
    childrens_bedroom: "Children's Bedroom",
    pooja_room: 'Pooja Room',
    living_room: 'Living Room',
    toilet_bathroom: 'Toilet / Bathroom',
    staircase: 'Staircase',
    water_body: 'Water Body',
  };
  return map[key] || key;
}

// Merge words into lines/phrases using vertical proximity and horizontal adjacency
function groupWordsToPhrases(words: any[], canvasWidth: number) {
  // words: result.data.words from Tesseract (has bbox.x0 etc.)
  // Filter by confidence first
  const good = words.filter((w: any) => (w.confidence ?? 0) >= 70);

  // Sort by y then x
  good.sort((a: any, b: any) => {
    const ya = a.bbox.y0;
    const yb = b.bbox.y0;
    if (Math.abs(ya - yb) > 10) return ya - yb;
    return a.bbox.x0 - b.bbox.x0;
  });

  const lines: { words: any[]; avgY: number }[] = [];
  for (const w of good) {
    const y = w.bbox.y0;
    let added = false;
    for (const line of lines) {
      if (Math.abs(line.avgY - y) < 22) {
        line.words.push(w);
        // update avgY
        line.avgY = line.words.reduce((s, it) => s + it.bbox.y0, 0) / line.words.length;
        added = true;
        break;
      }
    }
    if (!added) {
      lines.push({ words: [w], avgY: y });
    }
  }

  // Now merge words within a line if horizontally close
  const phrases: { text: string; bbox: any; center: any }[] = [];
  for (const line of lines) {
    const ws = line.words;
    ws.sort((a: any, b: any) => a.bbox.x0 - b.bbox.x0);

    // Merge adjacent words if gap between them is small relative to word width
    let current = { text: ws[0].text, bbox: { ...ws[0].bbox } as any };
    for (let i = 1; i < ws.length; i++) {
      const prev = ws[i - 1].bbox;
      const wcur = ws[i].bbox;
      const gap = wcur.x0 - prev.x1;
      const avgw = ((prev.x1 - prev.x0) + (wcur.x1 - wcur.x0)) / 2;
      // if gap is small (less than avgw * 0.9) join
      if (gap < avgw * 0.9) {
        // extend bbox and text
        current.text = `${current.text} ${ws[i].text}`;
        current.bbox.x1 = wcur.x1;
        current.bbox.y1 = Math.max(current.bbox.y1, wcur.y1);
        current.bbox.y0 = Math.min(current.bbox.y0, wcur.y0);
      } else {
        // push previous and start new
        phrases.push({
          text: current.text,
          bbox: { ...current.bbox },
          center: { x: current.bbox.x0 + (current.bbox.x1 - current.bbox.x0) / 2, y: current.bbox.y0 + (current.bbox.y1 - current.bbox.y0) / 2 },
        });
        current = { text: ws[i].text, bbox: { ...ws[i].bbox } as any };
      }
    }
    // push last
    phrases.push({
      text: current.text,
      bbox: { ...current.bbox },
      center: { x: current.bbox.x0 + (current.bbox.x1 - current.bbox.x0) / 2, y: current.bbox.y0 + (current.bbox.y1 - current.bbox.y0) / 2 },
    });
  }

  // Filter phrases: remove ones with digits or very short tokens
  const cleaned = phrases
    .map((p) => ({ text: p.text.trim(), bbox: p.bbox, center: p.center }))
    .filter((p) => p.text.length > 2 && !/\d/.test(p.text));

  return cleaned;
}

// Normalize (lowercase and collapse whitespace) and extract phrase tokens for alias matching
function normalizeForMatching(phrases: string[]) {
  return phrases.map((p) =>
    p.toLowerCase().replace(/[^a-z\s]/g, ' ').replace(/\s+/g, ' ').trim()
  );
}

// Map normalized labels + boxes to canonical features (features keyed by VASTU_RULES)
// returns map: key -> Feature
function detectFeaturesFromAliases(
  normalizedLabels: string[],
  boxes: { text: string; bbox: any; center: { x: number; y: number } }[],
  canvasW: number,
  canvasH: number
) {
  const features: Record<string, Feature> = {};

  // for each feature key, try to find alias in normalizedLabels
  for (const [key, aliasList] of Object.entries(ALIASES)) {
    const hit = normalizedLabels.find((lab) => aliasList.some((a) => lab.includes(a)));
    if (hit) {
      // find matching box (prefer exact text inclusion)
      const lowerHit = hit;
      let best = boxes.find((b) => lowerHit.includes(b.text.toLowerCase()));
      if (!best) {
        // fallback: find box whose text contains any alias token
        best = boxes.find((b) => aliasList.some((a) => b.text.toLowerCase().includes(a)));
      }
      if (best) {
        features[key] = { center: best.center, label: best.text };
      } else {
        // fallback place at center (rare); better than nothing
        features[key] = { center: { x: canvasW / 2, y: canvasH / 2 }, label: hit };
      }
    }
  }

  return features;
}

function drawCenterMarker(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#ef4444';
  ctx.fill();
  ctx.restore();
}

function drawFeatureMarkers(features: Record<string, Feature>, ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.font = '14px Arial';
  ctx.textBaseline = 'middle';
  for (const [key, info] of Object.entries(features)) {
    const x = info.center.x;
    const y = info.center.y;
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#1d4ed8';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    ctx.fillStyle = '#111827';
    ctx.fillText(humanizeKey(key), x + 10, y);
  }
  ctx.restore();
}

function directionFromCenter(point: { x: number; y: number }, canvas: HTMLCanvasElement) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const dx = point.x - cx; // +x -> East
  const dy = cy - point.y; // +y -> North
  const angle = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
  if (angle >= 337.5 || angle < 22.5) return 'East';
  if (angle < 67.5) return 'Northeast';
  if (angle < 112.5) return 'North';
  if (angle < 157.5) return 'Northwest';
  if (angle < 202.5) return 'West';
  if (angle < 247.5) return 'Southwest';
  if (angle < 292.5) return 'South';
  return 'Southeast';
}

function evaluateVastu(features: Record<string, Feature>, canvas: HTMLCanvasElement): Evaluation {
  const rows: Row[] = [];
  let total = 0;
  let correct = 0;
  for (const [key, allowed] of Object.entries(VASTU_RULES)) {
    if (!features[key]) continue;
    total++;
    const dir = directionFromCenter(features[key].center, canvas);
    const ok = allowed.includes(dir);
    if (ok) correct++;
    rows.push({
      feature: humanizeKey(key),
      direction: dir,
      allowed: allowed.join(', '),
      ok,
    });
  }
  const score = total ? Math.round((correct / total) * 100) : 0;
  return { rows, score, total, correct };
}

// -----------------------------
// React component
// -----------------------------
export default function VastuAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showBoxes, setShowBoxes] = useState(true);
  const [detectedLabels, setDetectedLabels] = useState<string[]>([]);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [status, setStatus] = useState('Upload a floor plan to begin analysis');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setStatus('Image loaded. Click "Analyze Floor Plan" to start.');
    setEvaluation(null);
    setDetectedLabels([]);

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const scale = 3.0; // stronger upscale
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      // draw unprocessed preview on canvas (we will preprocess later on analysis)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      drawCenterMarker(ctx, canvas);
    };
    img.src = url;
  }, []);

  const analyzeFloorPlan = async () => {
    if (!selectedFile || !canvasRef.current || !imgRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsAnalyzing(true);
    setProgress(5);
    setStatus('Preprocessing image for OCR...');

    try {
      // Preprocess: draw image, then strong binarize so bold text stands out
      ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const THRESH = 115; // tuneable threshold for bold text
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const v = avg > THRESH ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = v;
      }
      ctx.putImageData(imageData, 0, 0);

      setStatus('Running OCR (Tesseract) — this may take a few seconds...');
      setProgress(20);

      // call recognize with PSM that treats input as a block of text to reduce splitting
      const result = await Tesseract.recognize(canvas.toDataURL(), 'eng', {
        logger: (m) => {
          // progress update
          if (m && m.status === 'recognizing text' && typeof m.progress === 'number') {
            setProgress(20 + Math.min(60, Math.round(m.progress * 60)));
          }
        },
      });

      setProgress(85);
      setStatus('Grouping recognized words into candidate room phrases...');

      // Prefer words but fallback to result.data.words
      const words = (result as any).data?.words ?? [];
      const canvasW = canvas.width;
      const canvasH = canvas.height;

      // Build phrases by grouping words
      const phraseBoxes = groupWordsToPhrases(words, canvasW);

      // Optionally draw boxes and raw phrase text
      ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height); // redraw original
      drawCenterMarker(ctx, canvas);
      if (showBoxes) {
        ctx.save();
        ctx.strokeStyle = 'hsl(0 80% 50%)';
        ctx.lineWidth = 2;
        ctx.font = '16px Arial';
        ctx.fillStyle = 'hsl(0 80% 50%)';
        phraseBoxes.forEach((p) => {
          const bb = p.bbox;
          ctx.strokeRect(bb.x0, bb.y0, bb.x1 - bb.x0, bb.y1 - bb.y0);
          ctx.fillText(p.text, bb.x0, Math.max(16, bb.y0 - 6));
        });
        ctx.restore();
      }

      const phrases = phraseBoxes.map((p) => p.text);
      const normalized = normalizeForMatching(phrases);
      setDetectedLabels(normalized);

      setStatus('Mapping detected labels to Vastu features...');
      const features = detectFeaturesFromAliases(normalized, phraseBoxes.map(p => ({ text: p.text, bbox: p.bbox, center: p.center })), canvasW, canvasH);

      // draw feature markers
      drawFeatureMarkers(features, ctx);

      setStatus('Evaluating Vastu placement...');
      const evalRes = evaluateVastu(features, canvas);
      setEvaluation(evalRes);

      setProgress(100);
      setStatus(`Analysis complete — ${evalRes.correct}/${evalRes.total} correct (${evalRes.score}%)`);
      toast.success(`Vastu analysis complete! Score: ${evalRes.score}%`);
    } catch (err) {
      console.error('OCR/analysis error:', err);
      setStatus('Analysis failed — try a higher-resolution image with bold room labels.');
      toast.error('Analysis failed. Try a clearer image.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Home className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Vastu Floor Plan Analyzer
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Upload your floor plan and get instant Vastu compliance analysis using OCR. Please use clear bold room labels.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload / Controls */}
          <div className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Floor Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium">Click to upload floor plan</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Use JPG/PNG/WebP with bold labels for best results
                    </p>
                  </label>
                </div>

                {previewUrl && (
                  <div className="space-y-4">
                    <img src={previewUrl} alt="preview" className="w-full max-h-64 object-contain rounded-lg border" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked={showBoxes} onChange={(e) => setShowBoxes(e.target.checked)} />
                        <label className="text-sm font-medium flex items-center gap-1">
                          {showBoxes ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          Show OCR boxes
                        </label>
                      </div>
                      <Button onClick={analyzeFloorPlan} disabled={isAnalyzing || !selectedFile}>
                        {isAnalyzing ? 'Analyzing...' : 'Analyze Floor Plan'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {isAnalyzing && (
              <Card className="glass">
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{status}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Canvas */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Analysis Canvas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden bg-muted/10">
                <canvas ref={canvasRef} className="w-full h-auto max-h-96 object-contain" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{status}</p>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        {(evaluation || detectedLabels.length > 0) && (
          <div className="grid lg:grid-cols-2 gap-8">
            {evaluation && (
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Vastu Compliance Report</CardTitle>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${evaluation.score === 100 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                    <span>Score: {evaluation.score}%</span>
                    <span>({evaluation.correct}/{evaluation.total} correct)</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {evaluation.rows.length === 0 ? (
                      <p className="text-muted-foreground">No recognizable room labels detected. Ensure labels are bold and clear.</p>
                    ) : (
                      evaluation.rows.map((row, idx) => (
                        <div key={idx} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{row.feature}</span>
                            <Badge variant="outline">{row.direction}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            {row.ok ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                            <span className={`text-sm ${row.ok ? 'text-green-600' : 'text-red-600'}`}>{row.ok ? 'Correct placement' : `Should be: ${row.allowed}`}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {detectedLabels.length > 0 && (
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Detected Room Labels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground mb-3">OCR detected the following labels:</p>
                    <div className="flex flex-wrap gap-2">
                      {detectedLabels.map((l, i) => <Badge key={i} variant="secondary">{l}</Badge>)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}