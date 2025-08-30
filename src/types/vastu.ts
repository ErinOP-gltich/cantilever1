export interface DetectedBox {
  text: string;
  bbox: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  };
  center: {
    x: number;
    y: number;
  };
}

export interface Feature {
  name: string;
  direction: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EvaluationRow {
  feature: string;
  direction: string;
  ok: boolean;
  allowed: string;
}

export interface Evaluation {
  score: number;
  correct: number;
  total: number;
  rows: EvaluationRow[];
}
