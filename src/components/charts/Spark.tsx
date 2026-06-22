import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { tint } from '@/lib/money';
import { useTheme } from '@/theme';

export interface SparkProps {
  values: number[];
  width?: number;
  height?: number;
  color?: string;
}

interface Pt {
  x: number;
  y: number;
}

/** Catmull-Rom → cubic bézier for a smooth line (RN-SVG has no curve smoothing). */
function smoothLine(pts: Pt[]): string {
  const first = pts[0];
  if (!first) return '';
  let d = `M ${first.x} ${first.y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    if (!p0 || !p1 || !p2 || !p3) continue;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export function Spark({ values, width = 280, height = 64, color }: SparkProps) {
  const t = useTheme();
  const stroke = color ?? t.primary;
  const pad = 4;

  if (values.length < 2) {
    return <View style={{ width, height }} />;
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const stepX = (width - pad * 2) / (values.length - 1);

  const pts: Pt[] = values.map((v, i) => ({
    x: pad + i * stepX,
    y: pad + (1 - (v - min) / span) * (height - pad * 2),
  }));

  const line = smoothLine(pts);
  const area = `${line} L ${pts[pts.length - 1]?.x ?? width} ${height} L ${pts[0]?.x ?? 0} ${height} Z`;

  return (
    <Svg width={width} height={height}>
      <Path d={area} fill={tint(stroke, t.surface, t.mode === 'dark' ? 22 : 12)} />
      <Path
        d={line}
        stroke={stroke}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
