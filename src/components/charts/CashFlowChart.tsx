import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { cashFlowTrend } from '@/data/beneficiary'

export function CashFlowChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={cashFlowTrend} margin={{ top: 6, right: 4, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34B889" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#34B889" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0693E" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#F0693E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#eef2f4" />
        <XAxis dataKey="month" tick={{ fontSize: 11.5, fill: '#8996a0' }} axisLine={{ stroke: '#eef2f4' }} tickLine={false} />
        <YAxis tick={{ fontSize: 11.5, fill: '#8996a0' }} axisLine={false} tickLine={false} width={34} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: '1px solid rgba(13,64,102,0.08)', fontSize: 12.5, boxShadow: '0 8px 24px -8px rgba(13,64,102,0.2)' }}
        />
        <Area type="monotone" dataKey="income" stroke="#34B889" fill="url(#income)" strokeWidth={2.2} />
        <Area type="monotone" dataKey="expenses" stroke="#F0693E" fill="url(#expenses)" strokeWidth={2.2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
