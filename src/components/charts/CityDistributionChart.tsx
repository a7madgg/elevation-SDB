import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'
import { cityDistribution } from '@/data/ecosystem'
import { cityLabel, useT } from '@/i18n'

const colors = ['#0D4066', '#12B1C6', '#0074AE', '#34B889', '#70154C', '#97ACB6']

export function CityDistributionChart() {
  const { t, language } = useT()
  const data = cityDistribution.map((d) => ({ ...d, city: cityLabel(t, d.city) }))
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: language === 'ar' ? 4 : 24, left: language === 'ar' ? 24 : 4, bottom: 0 }}>
        <CartesianGrid horizontal={false} stroke="#eef2f4" />
        <XAxis type="number" tick={{ fontSize: 11, fill: '#8996a0' }} axisLine={false} tickLine={false} unit="%" />
        <YAxis dataKey="city" type="category" tick={{ fontSize: 12, fill: '#3f4d55' }} axisLine={false} tickLine={false} width={70} />
        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid rgba(13,64,102,0.08)', fontSize: 12 }} />
        <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={16}>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
