import type { DetectedBox, Feature, Evaluation, EvaluationRow } from '../types/vastu';

// Room label aliases for better detection
const ROOM_ALIASES: Record<string, string[]> = {
  'bedroom': ['bed', 'bedroom', 'master', 'guest', 'kids'],
  'kitchen': ['kitchen', 'cooking', 'pantry'],
  'bathroom': ['bath', 'bathroom', 'toilet', 'wc', 'washroom'],
  'living': ['living', 'lounge', 'sitting', 'family'],
  'dining': ['dining', 'dining room', 'eating'],
  'study': ['study', 'office', 'work', 'computer'],
  'puja': ['puja', 'temple', 'worship', 'altar'],
  'staircase': ['stair', 'stairs', 'staircase', 'steps'],
  'entrance': ['entrance', 'main door', 'gate', 'entry'],
  'store': ['store', 'storage', 'godown', 'warehouse']
};

// Vastu direction rules
const VASTU_RULES: Record<string, string[]> = {
  'bedroom': ['southwest', 'south', 'west'],
  'kitchen': ['southeast', 'northwest'],
  'bathroom': ['northwest', 'southeast'],
  'living': ['northeast', 'north', 'east'],
  'dining': ['west', 'northwest'],
  'study': ['northeast', 'north', 'east'],
  'puja': ['northeast', 'north', 'east'],
  'staircase': ['southwest', 'south', 'west'],
  'entrance': ['north', 'east', 'northeast'],
  'store': ['southwest', 'south', 'west']
};

export function normalizeLabels(labels: string[]): string[] {
  return labels.map(label => {
    const lowerLabel = label.toLowerCase().trim();
    
    // Find matching room type
    for (const [roomType, aliases] of Object.entries(ROOM_ALIASES)) {
      if (aliases.some(alias => lowerLabel.includes(alias))) {
        return roomType;
      }
    }
    
    return lowerLabel;
  }).filter((label, index, arr) => arr.indexOf(label) === index); // Remove duplicates
}

export function detectFeaturesFromAliases(
  labels: string[], 
  boxes: DetectedBox[], 
  canvasWidth: number, 
  canvasHeight: number
): Feature[] {
  const features: Feature[] = [];
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  
  labels.forEach((label, index) => {
    if (index < boxes.length) {
      const box = boxes[index];
      const x = box.center.x;
      const y = box.center.y;
      
      // Determine direction based on position relative to center
      let direction = '';
      if (y < centerY - 50) direction = 'north';
      else if (y > centerY + 50) direction = 'south';
      else if (x < centerX - 50) direction = 'west';
      else if (x > centerX + 50) direction = 'east';
      else direction = 'center';
      
      // Add northeast, northwest, southeast, southwest
      if (x < centerX - 25 && y < centerY - 25) direction = 'northwest';
      else if (x > centerX + 25 && y < centerY - 25) direction = 'northeast';
      else if (x < centerX - 25 && y > centerY + 25) direction = 'southwest';
      else if (x > centerX + 25 && y > centerY + 25) direction = 'southeast';
      
      features.push({
        name: label,
        direction,
        x: box.center.x,
        y: box.center.y,
        width: box.bbox.x1 - box.bbox.x0,
        height: box.bbox.y1 - box.bbox.y0
      });
    }
  });
  
  return features;
}

export function evaluateVastu(features: Feature[], canvasWidth: number, canvasHeight: number): Evaluation {
  let correct = 0;
  const rows: EvaluationRow[] = [];
  
  features.forEach(feature => {
    const allowedDirections = VASTU_RULES[feature.name] || [];
    const isCorrect = allowedDirections.includes(feature.direction);
    
    if (isCorrect) correct++;
    
    rows.push({
      feature: feature.name,
      direction: feature.direction,
      ok: isCorrect,
      allowed: allowedDirections.join(', ') || 'Any direction'
    });
  });
  
  const total = features.length;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  
  return { score, correct, total, rows };
}

export function humanizeKey(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
}
