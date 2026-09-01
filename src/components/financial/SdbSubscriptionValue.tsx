import { motion } from 'framer-motion'
import { ArrowLeftRight, Building2, Landmark, Repeat } from 'lucide-react'
import { ecosystemCategories } from '@/data/ecosystem'
import { SDB_CONNECT_FEE } from '@/lib/financialEngine'
import { formatSAR } from '@/lib/utils'
import { useT } from '@/i18n'

const smallBusinessCount = ecosystemCategories.find((c) => c.category === 'Small Business')?.count ?? 24030

export function SdbSubscriptionValue() {
  const { t, language } = useT()
  const business = t('brand.saraBusiness')
  const fee = formatSAR(SDB_CONNECT_FEE, language)
  const monthlyBankRevenue = SDB_CONNECT_FEE * smallBusinessCount

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }}>
      <div className="overflow-hidden rounded-2xl border border-sdb-deep/[0.08] bg-gradient-to-br from-sdb-deep to-[#0a3352] p-6 sm:p-7">
        <div className="flex items-center gap-2 text-sdb-cyan">
          <Repeat size={15} />
          <span className="text-[11.5px] font-bold uppercase tracking-wider">{t('copilot.sdbValue.eyebrow')}</span>
        </div>
        <p className="mt-3 text-[18px] font-bold text-white leading-snug">{t('copilot.sdbValue.title')}</p>
        <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-white/75">
          {t('copilot.sdbValue.body', { business })}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
          <div className="rounded-xl bg-white/[0.08] border border-white/10 p-4">
            <div className="flex items-center gap-1.5 text-white/60">
              <Building2 size={13} />
              <span className="text-[11px] font-bold uppercase tracking-wide">{t('copilot.sdbValue.saraPays')}</span>
            </div>
            <p className="mt-2 text-[22px] font-extrabold text-white">
              {fee}
              <span className="ms-1 text-[13px] font-medium text-white/55">{t('common.perMonth')}</span>
            </p>
            <p className="mt-1 text-[12px] text-sdb-cyan">{t('copilot.sdbValue.active')}</p>
            <p className="mt-0.5 text-[12px] text-white/55">{business}</p>
          </div>

          <div className="hidden sm:flex items-center justify-center text-sdb-cyan">
            <ArrowLeftRight size={18} />
          </div>

          <div className="rounded-xl bg-white/[0.08] border border-white/10 p-4">
            <div className="flex items-center gap-1.5 text-white/60">
              <Landmark size={13} />
              <span className="text-[11px] font-bold uppercase tracking-wide">{t('copilot.sdbValue.sdbReceives')}</span>
            </div>
            <p className="mt-2 text-[22px] font-extrabold text-white">
              {fee}
              <span className="ms-1 text-[13px] font-medium text-white/55">{t('common.perMonth')}</span>
            </p>
            <p className="mt-1 text-[12px] text-sdb-cyan">{t('copilot.sdbValue.continuous')}</p>
            <p className="mt-0.5 text-[12px] text-white/55">{t('brand.org')}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-sdb-cyan/15 border border-sdb-cyan/25 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-sdb-cyan">{t('copilot.sdbValue.scaleLabel')}</p>
          <p className="mt-1.5 text-[14px] font-semibold text-white leading-relaxed">
            {t('copilot.sdbValue.scaleBody', {
              count: smallBusinessCount.toLocaleString('en-US'),
              fee,
              total: formatSAR(monthlyBankRevenue, language),
            })}
          </p>
          <p className="mt-2 text-[11.5px] text-white/55">{t('copilot.sdbValue.notLoan')}</p>
        </div>
      </div>
    </motion.div>
  )
}
