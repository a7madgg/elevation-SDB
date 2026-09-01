import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { OpportunitySignal } from '@/types'

export function DemandSupplyChart({ data }: { data: OpportunitySignal[] }) {
  const chartData = data.map((d) => ({ name: d.category, Demand: d.demandScore, Supply: d.supplyScore }))

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} margin={{ top: 6, right: 4, left: -18, bottom: 0 }} barGap={4}>
        <CartesianGrid vertical={false} stroke="#eef2f4" />
        <XAxis dataKey="name" tick={{ fontSize: 11.5, fill: '#8996a0' }} axisLine={{ stroke: '#eef2f4' }} tickLine={false} />
        <YAxis tick={{ fontSize: 11.5, fill: '#8996a0' }} axisLine={false} tickLine={false} width={30} />
        <Tooltip
          cursor={{ fill: '#f6f9fa' }}
          contentStyle={{ borderRadius: 12, border: '1px solid rgba(13,64,102,0.08)', fontSize: 12.5, boxShadow: '0 8px 24px -8px rgba(13,64,102,0.2)' }}
        />
        <Bar dataKey="Demand" fill="#0D4066" radius={[6, 6, 0, 0]} maxBarSize={22} />
        <Bar dataKey="Supply" fill="#12B1C6" radius={[6, 6, 0, 0]} maxBarSize={22} />
      </BarChart>
    </ResponsiveContainer>
  )
}
