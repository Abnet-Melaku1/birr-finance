import type { ReactNode } from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { sum } from '@/lib/money';
import { useTheme } from '@/theme';

import { AppText } from '../AppText';

/** Running start offset (0–1) for each segment. */
function cumulativeFractions(fractions: number[]): number[] {
  const out: number[] = [];
  let acc = 0;
  for (const f of fractions) {
    out.push(acc);
    acc += f;
  }
  return out;
}

export interface DonutSegment {
  key: string;
  value: number;
  color: string;
}

export interface DonutProps {
  data: DonutSegment[];
  size?: number;
  thickness?: number;
  /** Small text above the center value. */
  centerLabel?: string;
  centerValue?: string;
  children?: ReactNode;
}

export function Donut({
  data,
  size = 132,
  thickness = 16,
  centerLabel,
  centerValue,
  children,
}: DonutProps) {
  const t = useTheme();
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const c = 2 * Math.PI * r;
  const total = sum(data.map((d) => d.value));
  const gap = thickness; // leave room for the rounded caps

  const arcs = total > 0 ? data.filter((d) => d.value > 0) : [];
  const starts = cumulativeFractions(arcs.map((d) => d.value / total));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Circle cx={cx} cy={cx} r={r} stroke={t.faint} strokeWidth={thickness} fill="none" />
        {arcs.map((d, i) => {
          const f = d.value / total;
          const arc = Math.max(f * c - gap, 1);
          const rotation = (starts[i] ?? 0) * 360 - 90;
          return (
            <Circle
              key={d.key}
              cx={cx}
              cy={cx}
              r={r}
              stroke={d.color}
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={`${arc} ${c}`}
              fill="none"
              transform={`rotate(${rotation} ${cx} ${cx})`}
            />
          );
        })}
      </Svg>

      <View style={{ position: 'absolute', alignItems: 'center' }}>
        {children ?? (
          <>
            {centerLabel ? (
              <AppText variant="secondary" color={t.sub}>
                {centerLabel}
              </AppText>
            ) : null}
            {centerValue ? (
              <AppText variant="cardTitle" color={t.ink}>
                {centerValue}
              </AppText>
            ) : null}
          </>
        )}
      </View>
    </View>
  );
}
