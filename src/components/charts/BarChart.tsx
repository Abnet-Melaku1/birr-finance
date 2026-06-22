import { View } from 'react-native';

import { useTheme } from '@/theme';

import { AppText } from '../AppText';

export interface BarGroup {
  label: string;
  income: number;
  expense: number;
}

export interface BarChartProps {
  data: BarGroup[];
  /** Height of the bars area (excludes labels). */
  height?: number;
}

export function BarChart({ data, height = 140 }: BarChartProps) {
  const t = useTheme();
  const max = Math.max(1, ...data.map((d) => Math.max(d.income, d.expense)));

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', height, gap: 8 }}>
        {data.map((d) => (
          <View key={d.label} style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4, height }}>
              <Bar height={(d.income / max) * height} color={t.income} />
              <Bar height={(d.expense / max) * height} color={t.expense} />
            </View>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row', marginTop: 6, gap: 8 }}>
        {data.map((d) => (
          <AppText
            key={d.label}
            variant="micro"
            color={t.sub}
            style={{ flex: 1, textAlign: 'center' }}
          >
            {d.label}
          </AppText>
        ))}
      </View>
    </View>
  );
}

function Bar({ height, color }: { height: number; color: string }) {
  return (
    <View
      style={{
        width: 9,
        height: Math.max(height, 3),
        backgroundColor: color,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      }}
    />
  );
}
