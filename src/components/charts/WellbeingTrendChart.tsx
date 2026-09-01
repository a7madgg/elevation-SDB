import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import { wellbeingTrend } from '@/data/ecosystem'
import { monthLabel, useT } from '@/i18n'

export function WellbeingTrendChart() {
  const { t, language } = useT()
  const data = wellbeingTrend.map((d) => ({ ...d, month: monthLabel(t, d.month) }))
  return (
    <ResponsiveContainer width="100%" height={160}>
      <LineChart data={data} margin={{ top: 6, right: language === 'ar' ? -22 : 8, left: language === 'ar' ? 8 : -22, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#eef2f4" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8996a0' }} axisLine={{ stroke: '#eef2f4' }} tickLine={false} />
        <YAxis domain={[60, 80]} tick={{ fontSize: 11, fill: '#8996a0' }} axisLine={false} tickLine={false} width={28} />
        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid rgba(13,64,102,0.08)', fontSize: 12 }} />
        <Line type="monotone" dataKey="score" name={t('employee.stat.wellbeing')} stroke="#12B1C6" strokeWidth={2.4} dot={{ r: 3, fill: '#12B1C6' }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
