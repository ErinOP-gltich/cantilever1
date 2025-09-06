// VastuAnalyzer.tsx
import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Upload, Eye, EyeOff, CheckCircle, XCircle, Home } from 'lucide-react';
import { toast } from 'sonner';

// Types
type RoomDetail = {
  room_name: string;
  detected_location: string;
  status: string;
  ideal_locations: string;
  message: string;
};

type ReportSummary = {
  total_rooms_analyzed: number;
  verified_placements: number;
  not_verified_placements: number;
};

type Report = {
  summary: ReportSummary;
  details: RoomDetail[];
};

type FastAPIResponse = {
  report: Report;
  analyzed_image: string;
};

// FastAPI Backend Configuration
const FASTAPI_BASE_URL = 'http://localhost:8000';

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
  const [report, setReport] = useState<Report | null>(null);
  const [analyzedImage, setAnalyzedImage] = useState<string>('');
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
    setReport(null);
    setAnalyzedImage('');
    setDetectedLabels([]);

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const scale = 2.0;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = url;
  }, []);

  const analyzeFloorPlan = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setProgress(10);
    setStatus('Sending image to neural network for analysis...');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      setProgress(30);
      setStatus('Processing with EasyOCR neural network...');

      const response = await fetch(`${FASTAPI_BASE_URL}/analyze/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setProgress(80);
      setStatus('Generating Vastu compliance report...');

      const data: FastAPIResponse = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Update canvas with analyzed image
      if (data.analyzed_image && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const img = new Image();
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
          };
          img.src = data.analyzed_image;
        }
      }

      // Extract room names for detected labels
      const roomNames = data.report.details.map(detail => detail.room_name);
      setDetectedLabels(roomNames);
      setReport(data.report);
      setAnalyzedImage(data.analyzed_image);

      setProgress(100);
      const score = Math.round((data.report.summary.verified_placements / data.report.summary.total_rooms_analyzed) * 100);
      setStatus(`Analysis complete — ${data.report.summary.verified_placements}/${data.report.summary.total_rooms_analyzed} correct (${score}%)`);
      toast.success(`Vastu analysis complete! Score: ${score}%`);
    } catch (err) {
      console.error('Analysis error:', err);
      setStatus('Analysis failed — please ensure the FastAPI backend is running.');
      toast.error('Analysis failed. Please check if the backend server is running.');
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
                  </label>``
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
        {(report || detectedLabels.length > 0) && (
          <div className="grid lg:grid-cols-2 gap-8">
            {report && (
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Vastu Compliance Report</CardTitle>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${
                    report.summary.verified_placements === report.summary.total_rooms_analyzed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    <span>Score: {Math.round((report.summary.verified_placements / report.summary.total_rooms_analyzed) * 100)}%</span>
                    <span>({report.summary.verified_placements}/{report.summary.total_rooms_analyzed} correct)</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {report.details.length === 0 ? (
                      <p className="text-muted-foreground">No recognizable room labels detected. Ensure labels are bold and clear.</p>
                    ) : (
                      report.details.map((detail, idx) => (
                        <div key={idx} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{detail.room_name}</span>
                            <Badge variant="outline">{detail.detected_location}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            {detail.status === 'VERIFIED' ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                            <span className={`text-sm ${
                              detail.status === 'VERIFIED' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {detail.status === 'VERIFIED' ? 'Correct placement' : `Should be: ${detail.ideal_locations}`}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{detail.message}</p>
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
                    <p className="text-sm text-muted-foreground mb-3">Neural network detected the following rooms:</p>
                    <div className="flex flex-wrap gap-2">
                      {detectedLabels.map((label, i) => <Badge key={i} variant="secondary">{label}</Badge>)}
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