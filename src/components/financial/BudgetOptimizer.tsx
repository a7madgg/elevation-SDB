import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Info, Sparkles, Utensils, Megaphone, Truck, Settings, Repeat, MoreHorizontal } from 'lucide-react'
import { defaultExpenseCategories, savingsGoal } from '@/data/beneficiary'
import { monthlySavings, monthsToGoal, MONTHLY_AVAILABLE } from '@/lib/financialEngine'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { formatSAR } from '@/lib/utils'
import type { ExpenseCategory } from '@/types'
import { useT, type TranslationKey } from '@/i18n'

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  utensils: Utensils,
  megaphone: Megaphone,
  truck: Truck,
  settings: Settings,
  repeat: Repeat,
  'more-horizontal': MoreHorizontal,
}

export function BudgetOptimizer() {
  const [categories, setCategories] = useState<ExpenseCategory[]>(defaultExpenseCategories)
  const { t, language } = useT()

  const baselineSavings = useMemo(() => monthlySavings(defaultExpenseCategories), [])
  const currentSavings = useMemo(() => monthlySavings(categories), [categories])
  const remaining = savingsGoal.target - savingsGoal.current
  const baselineMonths = monthsToGoal(remaining, baselineSavings)
  const currentMonths = monthsToGoal(remaining, currentSavings)

  function updateCategory(id: string, amount: number) {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, amount } : c)))
  }

  const improved = currentSavings > baselineSavings
  const sar = (n: number) => formatSAR(n, language)

  return (
    <div className="rounded-2xl border border-sdb-deep/[0.08] bg-white p-6 sm:p-7">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-sdb-cyan" />
        <p className="text-[15px] font-bold text-sdb-deep">{t('budget.title')}</p>
      </div>
      <p className="mt-1 text-[13px] text-[#6b7a83]">{t('budget.desc')}</p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col gap-5">
          {categories.map((cat) => {
            const Icon = icons[cat.icon] ?? MoreHorizontal
            return (
              <div key={cat.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-2 text-[13.5px] font-medium text-sdb-deep">
                    <Icon size={14} className="text-[#8996a0]" /> {t(`expense.${cat.id}` as TranslationKey)}
                  </span>
                  <span className="text-[13.5px] font-bold text-sdb-deep">{sar(cat.amount)}</span>
                </div>
                <input
                  type="range"
                  min={cat.min}
                  max={cat.max}
                  step={10}
                  value={cat.amount}
                  onChange={(e) => updateCategory(cat.id, Number(e.target.value))}
                  className="w-full accent-sdb-cyan cursor-pointer"
                  style={{ accentColor: cat.color }}
                />
              </div>
            )
          })}
        </div>

        <div className="flex flex-col gap-4">
          <motion.div layout className="rounded-2xl bg-[#f6fbfc] border border-sdb-cyan/15 p-5">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#8996a0]">{t('budget.potential')}</p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-[15px] font-medium text-[#95a2a9] line-through">{sar(baselineSavings)}</span>
              <span className={improved ? 'text-[26px] font-extrabold text-sdb-green' : 'text-[26px] font-extrabold text-sdb-deep'}>
                <AnimatedNumber value={currentSavings} format={sar} duration={500} />
              </span>
            </div>
          </motion.div>

          <motion.div layout className="rounded-2xl bg-[#f6fbfc] border border-sdb-cyan/15 p-5">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#8996a0]">{t('budget.timeToGoal')}</p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-[15px] font-medium text-[#95a2a9] line-through">{Number.isFinite(baselineMonths) ? t('savings.nMonths', { count: baselineMonths }) : '—'}</span>
              <span className={improved ? 'text-[26px] font-extrabold text-sdb-green' : 'text-[26px] font-extrabold text-sdb-deep'}>
                {Number.isFinite(currentMonths) ? t('savings.nMonths', { count: currentMonths }) : '—'}
              </span>
            </div>
          </motion.div>

          <div className="rounded-xl bg-[#faf7f2] border border-sdb-orange/15 p-3.5 flex gap-2">
            <Info size={14} className="text-sdb-orange mt-0.5 shrink-0" />
            <p className="text-[11.5px] leading-relaxed text-[#8a6b53]">
              {t('budget.disclaimer', { amount: sar(MONTHLY_AVAILABLE) })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
