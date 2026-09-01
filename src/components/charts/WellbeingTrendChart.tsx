import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import { wellbeingTrend } from '@/data/ecosystem'

export function WellbeingTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <LineChart data={wellbeingTrend} margin={{ top: 6, right: 8, left: -22, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#eef2f4" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8996a0' }} axisLine={{ stroke: '#eef2f4' }} tickLine={false} />
        <YAxis domain={[60, 80]} tick={{ fontSize: 11, fill: '#8996a0' }} axisLine={false} tickLine={false} width={28} />
        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid rgba(13,64,102,0.08)', fontSize: 12 }} />
        <Line type="monotone" dataKey="score" stroke="#12B1C6" strokeWidth={2.4} dot={{ r: 3, fill: '#12B1C6' }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
