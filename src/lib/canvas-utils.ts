import type { Feature } from '../types/vastu';

export function drawCenterMarker(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  ctx.strokeStyle = 'hsl(var(--primary))';
  ctx.lineWidth = 3;
  ctx.setLineDash([5, 5]);
  
  // Draw center cross
  ctx.beginPath();
  ctx.moveTo(centerX - 20, centerY);
  ctx.lineTo(centerX + 20, centerY);
  ctx.moveTo(centerX, centerY - 20);
  ctx.lineTo(centerX, centerY + 20);
  ctx.stroke();
  
  // Draw center circle
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
  ctx.stroke();
  
  // Draw direction labels
  ctx.fillStyle = 'hsl(var(--primary))';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  
  ctx.fillText('N', centerX, centerY - 40);
  ctx.fillText('S', centerX, centerY + 60);
  ctx.fillText('E', centerX + 40, centerY + 5);
  ctx.fillText('W', centerX - 40, centerY + 5);
}

export function drawFeatureMarkers(features: Feature[], ctx: CanvasRenderingContext2D) {
  features.forEach(feature => {
    const x = feature.x;
    const y = feature.y;
    
    // Draw feature marker
    ctx.strokeStyle = 'hsl(var(--secondary))';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw feature label
    ctx.fillStyle = 'hsl(var(--foreground))';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(feature.name, x, y - 15);
    
    // Draw direction indicator
    ctx.fillStyle = 'hsl(var(--muted-foreground))';
    ctx.font = '10px Arial';
    ctx.fillText(feature.direction, x, y + 25);
  });
}
