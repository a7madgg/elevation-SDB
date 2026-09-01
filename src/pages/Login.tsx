import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Briefcase, Store } from 'lucide-react'
import { useApp } from '@/state/AppContext'
import { Avatar } from '@/components/ui/Avatar'
import { currentBeneficiary } from '@/data/beneficiary'

export default function Login() {
  const { setRole } = useApp()
  const navigate = useNavigate()

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
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sdb-deep">
            <span className="text-[17px] font-black text-white">S</span>
          </div>
          <h1 className="mt-4 text-[22px] font-bold text-sdb-deep">Welcome to SDB Connect</h1>
          <p className="mt-1.5 text-[13.5px] text-[#6b7a83]">This is a hackathon prototype — choose an experience to explore with demo data. No sign-in required.</p>
        </div>

        <div className="flex flex-col gap-3.5">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => enter('beneficiary')}
            className="group flex items-center gap-4 rounded-2xl border border-sdb-deep/10 bg-white p-5 text-left shadow-[0_1px_2px_rgba(13,64,102,0.04)] hover:border-sdb-cyan/40 hover:shadow-[0_16px_36px_-18px_rgba(13,64,102,0.3)] transition-all cursor-pointer"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sdb-cyan/[0.12] text-sdb-cyan">
              <Store size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold text-sdb-deep">Continue as Beneficiary</p>
              <p className="text-[12.5px] text-[#6b7a83] mt-0.5">
                Demo profile: {currentBeneficiary.name} · {currentBeneficiary.businessName}
              </p>
            </div>
            <ArrowRight size={16} className="text-[#95a2a9] group-hover:text-sdb-cyan group-hover:translate-x-0.5 transition-all shrink-0" />
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => enter('employee')}
            className="group flex items-center gap-4 rounded-2xl border border-sdb-deep/10 bg-white p-5 text-left shadow-[0_1px_2px_rgba(13,64,102,0.04)] hover:border-sdb-deep/30 hover:shadow-[0_16px_36px_-18px_rgba(13,64,102,0.3)] transition-all cursor-pointer"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sdb-deep/[0.08] text-sdb-deep">
              <Briefcase size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold text-sdb-deep">Continue as SDB Employee</p>
              <p className="text-[12.5px] text-[#6b7a83] mt-0.5">Ecosystem Intelligence dashboard · role-based, aggregated analytics</p>
            </div>
            <ArrowRight size={16} className="text-[#95a2a9] group-hover:text-sdb-deep group-hover:translate-x-0.5 transition-all shrink-0" />
          </motion.button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <Avatar initials="SQ" color="#0D4066" size={22} />
          <p className="text-[11.5px] text-[#95a2a9]">Demo data only · no real beneficiary information is used</p>
        </div>
      </motion.div>
    </div>
  )
}
