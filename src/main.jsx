import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, ScrollRestoration } from 'react-router-dom'
import { StoreProvider, PackModal } from './store'
import { Header, Footer } from './components/ui'
import { Home, Browse } from './pages/HomeBrowse'
import { Profile, Pricing, MyReveals } from './pages/ProfilePricing'
import { Journey, Join } from './pages/JourneyJoin'
import { FeedbackForm } from './pages/Feedback'
import { SupplierLanding, SupplierDashboard, SupplierAdd } from './pages/Supplier'
import './index.css'

const Legal = ({ title, children }) => (
  <main className="max-w-3xl mx-auto px-4 py-10">
    <h1 className="text-2xl font-extrabold text-deep-950 mb-4">{title}</h1>
    <div className="bg-white border border-stone-200 rounded-2xl p-5 text-sm text-stone-700 space-y-3">{children}</div>
  </main>
)
const Terms = () => <Legal title="Terms of Use (prototype summary)"><p>This portal is an internet listing portal. It is not an employment agency and does not hold an MOM employment agency licence. Employers and helpers connect and make their own arrangements directly.</p><p>Helpers list free, always. Employers pay only to reveal a contact number, in Indian rupees (₹) by UPI. One credit reveals one number, kept in My Reveals. If a revealed number is invalid, report it within 7 days and the credit is restored once checked.</p><p>A revealed number may be used only to discuss the job it was revealed for. Profiles are moderated; false profiles, or accounts that ask helpers for money, are removed.</p></Legal>
const Privacy = () => <Legal title="Privacy Policy (prototype summary)"><p>A helper's contact number is never shown publicly. It is revealed only to a single employer account that has paid for that reveal.</p><p>In this prototype, credits, reveals, saved helpers and tracker ticks are stored only in your own browser (localStorage). Sample profiles are fictional. In a production version, private verification documents would never be displayed or sold.</p></Legal>

function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-cream-50">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/helper/:id" element={<Profile />} />
              <Route path="/feedback/:id" element={<FeedbackForm />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="/join" element={<Join />} />
              <Route path="/reveals" element={<MyReveals />} />
              <Route path="/supplier" element={<SupplierLanding />} />
              <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
              <Route path="/supplier/add" element={<SupplierAdd />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <PackModal />
      </HashRouter>
    </StoreProvider>
  )
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
