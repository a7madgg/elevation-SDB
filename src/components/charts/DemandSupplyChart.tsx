import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { OpportunitySignal } from '@/types'
import { catLabel, useT } from '@/i18n'

export function DemandSupplyChart({ data }: { data: OpportunitySignal[] }) {
  const { t, language } = useT()
  const demand = t('employee.demand')
  const supply = t('employee.supply')
  const chartData = data.map((d) => ({ name: catLabel(t, d.category), [demand]: d.demandScore, [supply]: d.supplyScore }))

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} margin={{ top: 6, right: language === 'ar' ? -18 : 4, left: language === 'ar' ? 4 : -18, bottom: 0 }} barGap={4}>
        <CartesianGrid vertical={false} stroke="#eef2f4" />
        <XAxis dataKey="name" tick={{ fontSize: 11.5, fill: '#8996a0' }} axisLine={{ stroke: '#eef2f4' }} tickLine={false} />
        <YAxis tick={{ fontSize: 11.5, fill: '#8996a0' }} axisLine={false} tickLine={false} width={30} />
        <Tooltip
          cursor={{ fill: '#f6f9fa' }}
          contentStyle={{ borderRadius: 12, border: '1px solid rgba(13,64,102,0.08)', fontSize: 12.5, boxShadow: '0 8px 24px -8px rgba(13,64,102,0.2)' }}
        />
        <Bar dataKey={demand} fill="#0D4066" radius={[6, 6, 0, 0]} maxBarSize={22} />
        <Bar dataKey={supply} fill="#12B1C6" radius={[6, 6, 0, 0]} maxBarSize={22} />
      </BarChart>
    </ResponsiveContainer>
  )
}
