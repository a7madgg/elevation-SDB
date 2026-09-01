import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { beneficiaryNav, employeeNav } from '@/components/layout/navConfig'
import { useApp } from '@/state/AppContext'
import { ToastContainer } from '@/components/ui/ToastContainer'
import { currentBeneficiary } from '@/data/beneficiary'

import Landing from '@/pages/Landing'
import Login from '@/pages/Login'

import Dashboard from '@/pages/beneficiary/Dashboard'
import AIAssistant from '@/pages/beneficiary/AIAssistant'
import Discover from '@/pages/beneficiary/Discover'
import MyNetwork from '@/pages/beneficiary/MyNetwork'
import FinancialCopilot from '@/pages/beneficiary/FinancialCopilot'
import Savings from '@/pages/beneficiary/Savings'
import Notifications from '@/pages/beneficiary/Notifications'
import ProviderProfile from '@/pages/beneficiary/ProviderProfile'
import Story from '@/pages/beneficiary/Story'
import EcosystemMatches from '@/pages/beneficiary/EcosystemMatches'
import ConnectionDetail from '@/pages/beneficiary/ConnectionDetail'

import Overview from '@/pages/employee/Overview'
import Ecosystem from '@/pages/employee/Ecosystem'
import Opportunities from '@/pages/employee/Opportunities'
import AIMatches from '@/pages/employee/AIMatches'
import Beneficiaries from '@/pages/employee/Beneficiaries'
import Insights from '@/pages/employee/Insights'
import Resilience from '@/pages/employee/Resilience'
import ResilienceDetail from '@/pages/employee/ResilienceDetail'

function BeneficiaryLayout({ children }: { children: React.ReactNode }) {
  const { role } = useApp()
  if (role !== 'beneficiary') return <Navigate to="/login" replace />
  return (
    <AppLayout
      items={beneficiaryNav}
      name={currentBeneficiary.name}
      subtitle={currentBeneficiary.businessName}
      avatarColor={currentBeneficiary.avatarColor}
      initials={currentBeneficiary.initials}
      notificationsPath="/beneficiary/notifications"
    >
      {children}
    </AppLayout>
  )
}

function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const { role } = useApp()
  if (role !== 'employee') return <Navigate to="/login" replace />
  return (
    <AppLayout
      items={employeeNav}
      name="Faisal Al-Mutairi"
      subtitle="SDB Ecosystem Team"
      avatarColor="#44546A"
      initials="FM"
      notificationsPath="/employee"
      topTitle="Ecosystem Intelligence · Demo environment"
    >
      {children}
    </AppLayout>
  )
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        <Route path="/beneficiary" element={<BeneficiaryLayout><Dashboard /></BeneficiaryLayout>} />
        <Route path="/beneficiary/assistant" element={<BeneficiaryLayout><AIAssistant /></BeneficiaryLayout>} />
        <Route path="/beneficiary/discover" element={<BeneficiaryLayout><Discover /></BeneficiaryLayout>} />
        <Route path="/beneficiary/network" element={<BeneficiaryLayout><MyNetwork /></BeneficiaryLayout>} />
        <Route path="/beneficiary/copilot" element={<BeneficiaryLayout><FinancialCopilot /></BeneficiaryLayout>} />
        <Route path="/beneficiary/savings" element={<BeneficiaryLayout><Savings /></BeneficiaryLayout>} />
        <Route path="/beneficiary/notifications" element={<BeneficiaryLayout><Notifications /></BeneficiaryLayout>} />
        <Route path="/beneficiary/profile/:id" element={<BeneficiaryLayout><ProviderProfile /></BeneficiaryLayout>} />
        <Route path="/beneficiary/story" element={<BeneficiaryLayout><Story /></BeneficiaryLayout>} />
        <Route path="/beneficiary/matches" element={<BeneficiaryLayout><EcosystemMatches /></BeneficiaryLayout>} />
        <Route path="/beneficiary/matches/:connectionId" element={<BeneficiaryLayout><ConnectionDetail /></BeneficiaryLayout>} />

        <Route path="/employee" element={<EmployeeLayout><Overview /></EmployeeLayout>} />
        <Route path="/employee/ecosystem" element={<EmployeeLayout><Ecosystem /></EmployeeLayout>} />
        <Route path="/employee/opportunities" element={<EmployeeLayout><Opportunities /></EmployeeLayout>} />
        <Route path="/employee/matches" element={<EmployeeLayout><AIMatches /></EmployeeLayout>} />
        <Route path="/employee/beneficiaries" element={<EmployeeLayout><Beneficiaries /></EmployeeLayout>} />
        <Route path="/employee/insights" element={<EmployeeLayout><Insights /></EmployeeLayout>} />
        <Route path="/employee/resilience" element={<EmployeeLayout><Resilience /></EmployeeLayout>} />
        <Route path="/employee/resilience/:id" element={<EmployeeLayout><ResilienceDetail /></EmployeeLayout>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </>
  )
}
