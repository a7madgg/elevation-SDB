import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Briefcase, Store } from 'lucide-react'
import { SdbLogo } from '@/components/brand/SdbLogo'
import { useApp } from '@/state/AppContext'
import { Avatar } from '@/components/ui/Avatar'
import { LanguageSwitch } from '@/components/layout/LanguageSwitch'
import { useT } from '@/i18n'

export default function Login() {
  const { setRole } = useApp()
  const navigate = useNavigate()
  const { t } = useT()

  function enter(role: 'beneficiary' | 'employee') {
    setRole(role)
    navigate(role === 'beneficiary' ? '/beneficiary' : '/employee')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafcfc] px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4">
            <LanguageSwitch />
          </div>
          <SdbLogo variant="full" className="h-[88px] w-auto" />
          <h1 className="mt-4 text-[22px] font-bold text-sdb-deep">{t('login.title')}</h1>
          <p className="mt-1.5 text-[13.5px] text-[#6b7a83]">{t('login.body')}</p>
        </div>

        <div className="flex flex-col gap-3.5">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => enter('beneficiary')}
            className="group flex items-center gap-4 rounded-2xl border border-sdb-deep/10 bg-white p-5 text-start shadow-[0_1px_2px_rgba(13,64,102,0.04)] hover:border-sdb-cyan/40 hover:shadow-[0_16px_36px_-18px_rgba(13,64,102,0.3)] transition-all cursor-pointer"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sdb-cyan/[0.12] text-sdb-cyan">
              <Store size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold text-sdb-deep">{t('login.beneficiary')}</p>
              <p className="text-[12.5px] text-[#6b7a83] mt-0.5">
                {t('login.beneficiaryDemo', { name: t('brand.saraName'), business: t('brand.saraBusiness') })}
              </p>
            </div>
            <ArrowRight size={16} className="text-[#95a2a9] group-hover:text-sdb-cyan group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-all shrink-0" />
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => enter('employee')}
            className="group flex items-center gap-4 rounded-2xl border border-sdb-deep/10 bg-white p-5 text-start shadow-[0_1px_2px_rgba(13,64,102,0.04)] hover:border-sdb-deep/30 hover:shadow-[0_16px_36px_-18px_rgba(13,64,102,0.3)] transition-all cursor-pointer"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sdb-deep/[0.08] text-sdb-deep">
              <Briefcase size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold text-sdb-deep">{t('login.employee')}</p>
              <p className="text-[12.5px] text-[#6b7a83] mt-0.5">{t('login.employeeDemo')}</p>
            </div>
            <ArrowRight size={16} className="text-[#95a2a9] group-hover:text-sdb-deep group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-all shrink-0" />
          </motion.button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <Avatar initials="SQ" color="#0D4066" size={22} />
          <p className="text-[11.5px] text-[#95a2a9]">{t('login.disclaimer')}</p>
        </div>
      </motion.div>
    </div>
  )
}
