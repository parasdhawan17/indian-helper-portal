import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { allHelpers, loadCallbacks, updateCallback, loadSavedSupplier, maskPhone, inr, sgd, STATES, MAIN_JOBS, STATUSES, SUPPLIER_PLAN, isProfileActive } from '../data/helpers'
import { useStore, Avatar, StatusBadge } from '../store'
import { SectionTitle } from '../components/ui'
import { SPECIAL_COOKING, RELIGIONS, LangLevelPicker, CuisineRatingPicker, RatedSkillsPicker, HistoryEditor, CertEditor, PhotoField, TransferConsent, HouseholdPrefs } from '../components/helperForm'

const inputCls = 'w-full border border-stone-300 rounded-xl px-3 py-2.5 mt-1 bg-white text-sm'
const myCallbacks = (supplierId) => loadCallbacks().filter(c => c.supplierId === supplierId).sort((a, b) => new Date(b.at) - new Date(a.at))
const myProfiles = (supplierId) => allHelpers().filter(h => h.listedBy && h.listedBy.supplierId === supplierId)

// ---------------------------------------------------------------- sign-up page
export function SupplierLanding() {
  const nav = useNavigate()
  const [sup, setSup] = useState(() => loadSavedSupplier())
  const [f, setF] = useState({ name: '', business: '', mobile: '', base: '', about: '' })
  const [errs, setErrs] = useState({})
  const set = (k, v) => setF(s => ({ ...s, [k]: v }))
  const E = ({ k }) => errs[k] ? <p className="text-xs text-red-700 mt-1 font-medium">{errs[k]}</p> : null
  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (!f.name.trim()) er.name = 'Please enter your name'
    if (!f.business.trim()) er.business = 'Please enter your business name'
    if (!/^[+\d][\d\s]{7,}$/.test(f.mobile.trim())) er.mobile = 'Enter a valid mobile number'
    if (!f.base.trim()) er.base = 'Where are you based? e.g. Ludhiana, Punjab'
    setErrs(er)
    if (Object.keys(er).length) return
    const record = { id: 'sup-' + Date.now().toString(36), name: f.name.trim(), business: f.business.trim(), mobile: f.mobile.trim(), base: f.base.trim(), about: f.about.trim() }
    try { localStorage.setItem('ihp_supplier', JSON.stringify(record)) } catch {}
    setSup(record)
    nav('/supplier/dashboard')
  }
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <SectionTitle sub="List your helpers free. A monthly subscription of ₹999 keeps their profiles active — employers request callbacks, and you unlock their numbers at no extra charge while your plan is active.">For suppliers</SectionTitle>

      <div className="grid md:grid-cols-3 gap-3 mb-8">
        {[['1 · Sign up & add profiles — free', 'Add profiles of your helpers — full skills, languages, cooking, salary and availability. Listing costs nothing, and helpers are never charged.'],
           ['2 · Pay ₹999/month to keep them active', 'One monthly subscription (UPI AutoPay, cancel anytime) keeps your helper profiles active and visible in search — no limit on how many. If the month lapses, profiles pause — hidden, not deleted — until you renew.'],
           ['3 · Unlock callback numbers free', 'An employer who likes a profile sends a free callback request. While your plan is active, unlock their number at no extra charge and call them back. No per-request fees, ever.']].map(([t, d]) => (
          <div key={t} className="bg-white rounded-2xl border border-stone-200 p-4"><h3 className="font-bold text-deep-900 text-sm">{t}</h3><p className="text-sm text-stone-600 mt-1.5 leading-relaxed">{d}</p></div>
        ))}
      </div>

      {sup ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
          <p className="text-3xl" aria-hidden="true">🏢</p>
          <h2 className="font-extrabold text-deep-950 text-lg mt-2">You are signed up as {sup.business}</h2>
          <p className="text-sm text-stone-600 mt-1">{sup.name} · {sup.base}</p>
          <Link to="/supplier/dashboard" className="inline-block mt-4 bg-deep-800 hover:bg-deep-900 text-white font-semibold rounded-xl px-5 py-3">Go to my dashboard →</Link>
          <p className="mt-3"><button onClick={() => { try { localStorage.removeItem('ihp_supplier'); localStorage.removeItem('ihp_supplier_sub') } catch {}; setSup(null) }} className="text-xs text-stone-500 underline">Not you? Reset the demo supplier on this device</button></p>
        </div>
      ) : (
        <form onSubmit={submit} className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4" noValidate>
          <h2 className="font-bold text-deep-950">Supplier sign-up</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block text-sm font-medium">Your name<input className={inputCls} value={f.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Rajesh Kumar" /><E k="name" /></label>
            <label className="block text-sm font-medium">Business name<input className={inputCls} value={f.business} onChange={e => set('business', e.target.value)} placeholder="e.g. Sunrise Helpers" /><E k="business" /></label>
            <label className="block text-sm font-medium">Your mobile number<input className={inputCls} value={f.mobile} onChange={e => set('mobile', e.target.value)} placeholder="+91 …" /><E k="mobile" /></label>
            <label className="block text-sm font-medium">Base city / country<input className={inputCls} value={f.base} onChange={e => set('base', e.target.value)} placeholder="e.g. Ludhiana, Punjab" /><E k="base" /></label>
            <label className="block text-sm font-medium sm:col-span-2">About your business <span className="text-stone-400 font-normal">(shown on your helpers' profiles)</span><textarea rows={3} className={inputCls} value={f.about} onChange={e => set('about', e.target.value)} placeholder="What kind of helpers do you list, where from, and how do you prepare them?" /></label>
          </div>
          <button className="w-full bg-deep-800 hover:bg-deep-900 text-white font-bold rounded-xl py-3.5">Create my supplier account — free</button>
          <p className="text-xs text-stone-500 text-center">No sign-up fee and no listing fee. A Supplier Monthly subscription (₹999/month, paid by UPI) is what keeps your profiles active — you will be guided to it in your dashboard. Prototype — your details stay in this browser.</p>
        </form>
      )}
    </main>
  )
}

// ------------------------------------------------------------------- dashboard
export function SupplierDashboard() {
  const supplier = loadSavedSupplier()
  const { supplierSub, supplierSubIsActive, setSubModal, simulateSupplierLapse } = useStore()
  const [cbs, setCbs] = useState(() => supplier ? myCallbacks(supplier.id) : [])
  if (!supplier) return <Navigate to="/supplier" replace />
  const profiles = myProfiles(supplier.id)
  const activeProfiles = profiles.filter(h => isProfileActive(h))
  const unlockedCount = cbs.filter(c => c.unlocked).length
  const helperName = (id) => { const h = allHelpers().find(x => x.id === id); return h ? h.name : 'A helper' }
  const unlock = (cb) => {
    if (cb.unlocked || !supplierSubIsActive) return
    updateCallback(cb.id, { unlocked: true }); setCbs(myCallbacks(supplier.id))
  }
  const subStatus = supplierSubIsActive ? 'active' : (supplierSub && supplierSub.status === 'lapsed' ? 'lapsed' : (supplierSub ? 'lapsed' : 'none'))
  const daysLeft = supplierSub ? Math.max(0, Math.ceil((new Date(supplierSub.currentPeriodEnd).getTime() - Date.now()) / 86400000)) : 0
  const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-deep-950">{supplier.business}</h1>
          <p className="text-sm text-stone-500 mt-0.5">{supplier.name} · {supplier.base} · Supplier dashboard</p>
        </div>
      </div>

      <section id="supplier-subscription" className="mt-6 bg-white border-2 border-deep-700 rounded-2xl p-5 shadow-card scroll-mt-24">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h2 className="font-extrabold text-deep-950 text-lg flex items-center gap-2.5">Supplier Monthly
              {subStatus === 'active' && <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border bg-green-100 border-green-300 text-green-800">● Active</span>}
              {subStatus === 'lapsed' && <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border bg-red-100 border-red-300 text-red-800">● Lapsed</span>}
              {subStatus === 'none' && <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border bg-stone-100 border-stone-300 text-stone-600">● Not active</span>}
            </h2>
            <p className="text-sm text-stone-600 mt-1"><b className="text-deep-900">{inr(SUPPLIER_PLAN.price)}/month</b> · unlimited active helper profiles · unlimited callback requests &amp; number unlocks while active · renews monthly via UPI AutoPay, cancel anytime</p>
          </div>
          {subStatus === 'active'
            ? <button onClick={() => setSubModal(true)} className="bg-deep-800 hover:bg-deep-900 text-white text-sm font-semibold rounded-xl px-4 py-2.5">Renew early — extend 30 days</button>
            : <button onClick={() => setSubModal(true)} className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl px-4 py-2.5">{subStatus === 'lapsed' ? 'Renew' : 'Pay ' + inr(SUPPLIER_PLAN.price) + ' — activate for 30 days'}</button>}
        </div>
        {subStatus === 'active' && <p className="text-sm text-stone-700 mt-3">Active until <b>{fmtDate(supplierSub.currentPeriodEnd)}</b> · <b>{daysLeft} day{daysLeft === 1 ? '' : 's'} left</b> · {profiles.length} profile{profiles.length === 1 ? '' : 's'} listed, all active — no limit on profiles</p>}
        {subStatus === 'lapsed' && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2 mt-3"><b>Your subscription lapsed on {fmtDate(supplierSub.currentPeriodEnd)}.</b> Your profiles are inactive — hidden from Browse, search and their own pages — and callback numbers can't be unlocked. Renew to switch everything back on; nothing was deleted.</p>}
        {subStatus === 'none' && <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mt-3"><b>Your profiles are not active yet.</b> Adding profiles is free, but employers can't see them until your first month is paid. Pay {inr(SUPPLIER_PLAN.price)} to activate for 30 days.</p>}
        {supplierSub && <p className="mt-3"><button onClick={simulateSupplierLapse} className="text-xs text-stone-400 underline">Demo: simulate lapse (pretend the paid month ended yesterday)</button></p>}
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        {[['Profiles listed', profiles.length], ['Profiles active', activeProfiles.length], ['Callback requests', cbs.length], ['Numbers unlocked', unlockedCount]].map(([l, n]) => (
          <div key={l} className="bg-white rounded-2xl border border-stone-200 py-4 px-3 text-center"><p className="font-extrabold text-deep-900 text-2xl">{n}</p><p className="text-xs text-stone-500 mt-0.5">{l}</p></div>
        ))}
      </div>

      <section className="mt-8">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-xl font-extrabold text-deep-950">My profiles</h2>
          <Link to="/supplier/add" className="bg-deep-800 hover:bg-deep-900 text-white text-sm font-semibold rounded-xl px-4 py-2.5">+ Add a helper profile</Link>
        </div>
        {profiles.length === 0
          ? <div className="bg-white border border-stone-200 rounded-2xl p-6 text-center text-stone-600 mt-3 text-sm">You have not added any helper profiles yet. Listing is free.<br /><Link to="/supplier/add" className="font-semibold text-deep-700 underline">Add your first helper profile →</Link></div>
          : <div className="space-y-3 mt-3">{profiles.map(h => (
            <div key={h.id} className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 items-center flex-wrap">
              <Avatar h={h} size={52} />
              <div className="min-w-[180px] flex-1">
                <p className="font-bold text-deep-950">{h.name}, {h.age} — {h.mainJob}</p>
                <p className="text-xs text-stone-500">{h.state} · In {h.location} · {sgd(h.salary)}/mo · {cbs.filter(c => c.helperId === h.id).length} callback request{cbs.filter(c => c.helperId === h.id).length === 1 ? '' : 's'}</p>
              </div>
              <StatusBadge s={h.status} />
              {isProfileActive(h)
                ? <span className="text-[11px] font-bold px-2 py-0.5 rounded-full border bg-green-100 border-green-300 text-green-800">● Active — live in search</span>
                : <span className="text-[11px] font-bold px-2 py-0.5 rounded-full border bg-stone-100 border-stone-300 text-stone-600">● Inactive — subscription not active</span>}
              <Link to={'/helper/' + h.id} className="text-sm font-semibold text-deep-700 underline">View public profile</Link>
            </div>))}
          </div>}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold text-deep-950">Callback requests</h2>
        <p className="text-sm text-stone-500 mt-1">Employers who asked you to call them back. While your subscription is active, unlock their numbers at no extra charge — included in your plan.</p>
        {cbs.length === 0
          ? <div className="bg-white border border-stone-200 rounded-2xl p-6 text-center text-stone-600 mt-3 text-sm">No callback requests yet. When an employer requests a callback on one of your profiles, it will appear here.</div>
          : <div className="space-y-3 mt-3">{cbs.map(cb => (
            <div key={cb.id} className="bg-white border border-stone-200 rounded-2xl p-4">
              <div className="flex gap-3 flex-wrap items-start justify-between">
                <div className="min-w-[220px]">
                  <p className="font-bold text-deep-950">{cb.employerName} <span className="font-normal text-stone-500 text-sm">wants a callback about</span> <Link to={'/helper/' + cb.helperId} className="text-deep-700 underline">{helperName(cb.helperId)}</Link></p>
                  <p className="text-xs text-stone-500 mt-0.5">Requested {new Date(cb.at).toLocaleString('en-SG', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })} · Best time: {cb.time}</p>
                  {cb.message && <p className="text-sm text-stone-700 mt-2 bg-cream-50 border border-amber-100 rounded-xl px-3 py-2">“{cb.message}”</p>}
                </div>
                <div className="shrink-0 text-right">
                  {cb.unlocked ? <>
                    <p className="font-mono font-bold bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-deep-900">{cb.employerPhone}</p>
                    <div className="flex gap-2 mt-2">
                      <a href={`tel:${cb.employerPhone.replace(/\s/g, '')}`} className="bg-deep-800 text-white text-sm font-semibold rounded-xl px-3 py-2">📞 Call</a>
                      <a href={`https://wa.me/${cb.employerPhone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="bg-green-600 text-white text-sm font-semibold rounded-xl px-3 py-2">💬 WhatsApp</a>
                    </div>
                    <p className="text-[11px] text-green-700 font-medium mt-1.5">Unlocked ✓</p>
                  </> : <>
                    <p className="font-mono tracking-wide bg-stone-100 rounded-xl px-3 py-2 text-stone-600">{maskPhone(cb.employerPhone)}</p>
                    {supplierSubIsActive
                      ? <><button onClick={() => unlock(cb)} className="mt-2 w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl px-3 py-2.5">Unlock number — included in your plan</button>
                        <p className="text-[11px] text-stone-400 mt-1.5">No extra charge while your subscription is active.</p></>
                      : <><a href="#supplier-subscription" className="block mt-2 w-full text-center bg-deep-800 hover:bg-deep-900 text-white text-sm font-semibold rounded-xl px-3 py-2.5">Renew subscription to unlock</a>
                        <p className="text-[11px] text-stone-400 mt-1.5">Unlocking is included while your plan is active.</p></>}
                  </>}
                </div>
              </div>
            </div>))}
          </div>}
      </section>
      <p className="text-xs text-stone-400 mt-8">Prototype: data stays in this browser (localStorage) — profiles, requests and subscription on this device only. Supplier Monthly is {inr(SUPPLIER_PLAN.price)}/month by UPI (mock checkout); salaries stay in S$.</p>
    </main>
  )
}

// --------------------------------------------------------------- add a profile
export function SupplierAdd() {
  const supplier = loadSavedSupplier()
  const { supplierSubIsActive } = useStore()
  const nav = useNavigate()
  const EMPTY_HIST = { country: '', fromYear: '', toYear: '', family: '', duties: '', reason: 'Finished contract' }
  const [f, setF] = useState({
    name: '', age: '', helperMobile: '', whatsapp: 'Yes', email: '', fullName: '', photo: '', colour: '#166534',
    state: '', location: 'India', status: 'Fresh', available: '', transferConsent: '', releaseDate: '',
    mainJob: 'Childcare', yearsSG: '0', totalYears: '',
    languages: {}, cuisines: {}, veg: false, jain: false, pork: false, beef: false,
    specialCooking: [], vegetarianSelf: false, vegSeparate: false,
    skills: {}, skillsOther: '', about: '', expects: '',
    history: [{ ...EMPTY_HIST }], freshNoHistory: false, certs: [],
    householdPrefs: [], sundaysPreferred: 'Yes',
    religion: 'Prefer not to say', ownFood: 'Prefer not to say', videoUrl: '',
    salary: '', restDays: '2',
  })
  const [errs, setErrs] = useState({})
  const [savedId, setSavedId] = useState('')
  const [savedSummary, setSavedSummary] = useState(null)
  if (!supplier) return <Navigate to="/supplier" replace />
  const set = (k, v) => setF(s => ({ ...s, [k]: v }))
  const toggleArr = (k, v) => setF(s => ({ ...s, [k]: s[k].includes(v) ? s[k].filter(x => x !== v) : [...s[k], v] }))
  const E = ({ k }) => errs[k] ? <p className="text-xs text-red-700 mt-1 font-medium">{errs[k]}</p> : null
  const needsConsent = f.status === 'Transfer' && f.location === 'Singapore'
  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (!f.name.trim()) er.name = 'Please enter the helper\u2019s name'
    if (!f.age || +f.age < 18 || +f.age > 65) er.age = 'Enter her age (helpers must be 23 to below 50 for a first Singapore Work Permit)'
    if (f.helperMobile.trim() && !/^[+\d][\d\s]{7,}$/.test(f.helperMobile.trim())) er.helperMobile = 'That number does not look right'
    if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) er.email = 'That email does not look right'
    if (!f.state) er.state = 'Choose her state'
    if (!f.available.trim()) er.available = 'When can she start?'
    if (needsConsent && !f.transferConsent) er.transferConsent = 'Please tell us about her transfer consent — a transfer cannot happen without it (or a contract reaching its end date)'
    if (f.yearsSG === '' || +f.yearsSG < 0) er.yearsSG = 'Enter years worked in Singapore (0 is fine)'
    if (f.totalYears === '' || +f.totalYears < 0) er.totalYears = 'Enter total years as a helper (0 is fine)'
    if (Object.keys(f.languages).length === 0) er.languages = 'Choose at least one language'
    if (Object.keys(f.skills).length < 3) er.skills = 'Pick at least 3 rated skills — that is the minimum for a live profile'
    if (!f.freshNoHistory && !f.history.some(h => h.country.trim() && h.duties.trim())) er.history = 'Add at least one past job (country + duties), or tick “Fresh helper”'
    if (!f.salary || +f.salary < 300) er.salary = 'Enter the monthly salary she expects, in S$'
    if (+f.restDays === 0) er.restDays = 'Rest days cannot be 0. By law in Singapore, every helper must get at least 1 rest day in a month that cannot be replaced by payment. Please choose at least 1.'
    if (!f.about.trim() || f.about.trim().length < 30) er.about = 'Write a few lines about her (at least 30 characters)'
    setErrs(er)
    if (Object.keys(er).length) return
    const id = 'sup-' + Date.now().toString(36)
    const profile = {
      id, name: f.name.trim(), age: +f.age, state: f.state, status: f.status, location: f.location,
      available: f.available.trim(), availableInDays: 0, mainJob: f.mainJob, salary: +f.salary, restDays: +f.restDays,
      yearsSG: +f.yearsSG || 0, totalYears: +f.totalYears || 0, confirmedDays: 0, colour: f.colour,
      languages: Object.entries(f.languages),
      cuisines: Object.entries(f.cuisines),
      veg: f.veg, jain: f.jain || f.specialCooking.includes('Jain / no onion-garlic'), pork: f.pork, beef: f.beef,
      specialCooking: f.specialCooking, vegetarianSelf: f.vegetarianSelf, vegSeparate: f.vegSeparate,
      skills: Object.entries(f.skills), skillsOther: f.skillsOther.trim(),
      about: f.about.trim(),
      history: f.freshNoHistory ? [] : f.history.filter(h => h.country.trim()).map(h => ({
        period: `${h.country.trim()} · ${h.fromYear.trim()}${h.toYear.trim() ? ' — ' + h.toYear.trim() : ''}`,
        family: h.family.trim(), duties: h.duties.trim(), reason: h.reason,
      })),
      freshNoHistory: f.freshNoHistory,
      certs: f.certs.filter(c => c.course.trim()),
      householdPrefs: f.householdPrefs, sundaysPreferred: f.sundaysPreferred,
      religion: f.religion, ownFood: f.ownFood, videoUrl: f.videoUrl.trim(),
      transferConsent: f.transferConsent, releaseDate: f.releaseDate.trim(),
      whatsapp: f.whatsapp, email: f.email.trim(), fullName: f.fullName.trim(), helperMobile: f.helperMobile.trim(),
      expects: f.expects.trim() || 'Open to the right family in Singapore — details can be discussed with the supplier on the callback.',
      listedBy: { supplierId: supplier.id, name: supplier.business },
      feedback: [], image: f.photo || `/images/${id}.jpg`,
    }
    try {
      const cur = JSON.parse(localStorage.getItem('ihp_supplier_profiles') || '[]')
      cur.push(profile)
      localStorage.setItem('ihp_supplier_profiles', JSON.stringify(cur))
    } catch {}
    setSavedSummary({ name: profile.name, skills: profile.skills.length, languages: profile.languages.length, history: profile.history.length, fresh: profile.freshNoHistory, transferConsent: profile.transferConsent })
    setSavedId(id)
    window.scrollTo(0, 0)
  }
  if (savedId) return (
    <main className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="text-5xl" aria-hidden="true">🎉</div>
      <h1 className="text-2xl font-extrabold text-deep-950 mt-4">{supplierSubIsActive ? 'Profile is live' : 'Profile saved'}</h1>
      <p className="text-stone-600 mt-3"><b>{f.name}</b> is now listed under {supplier.business}. {supplierSubIsActive
        ? <>Employers can read the full profile now. When an employer requests a callback, it will appear in your dashboard — while your subscription is active you can unlock their number at no extra charge.</>
        : <>Your subscription is not active right now, so this profile stays <b>hidden from employers</b> until you activate or renew Supplier Monthly from your dashboard.</>} <b>Listing this profile was free.</b></p>
      {savedSummary && <div className="bg-white border border-stone-200 rounded-2xl p-4 mt-6 text-left text-sm text-stone-700 space-y-1.5">
        <p className="font-bold text-deep-950">What was saved</p>
        <p>🗣️ Languages: {savedSummary.languages} · ⭐ Rated skills: {savedSummary.skills} · 💼 Past jobs: {savedSummary.fresh ? 'fresh helper' : savedSummary.history}</p>
        {savedSummary.transferConsent && <p>🤝 Transfer consent: {savedSummary.transferConsent}</p>}
      </div>}
      <div className="flex gap-2 justify-center mt-6 flex-wrap">
        <Link to={'/helper/' + savedId} className="bg-deep-800 text-white font-semibold rounded-xl px-5 py-3">View the live profile</Link>
        <button onClick={() => nav('/supplier/dashboard')} className="bg-cream-100 border border-amber-300 text-deep-900 font-semibold rounded-xl px-5 py-3">Back to dashboard</button>
      </div>
    </main>
  )
  const Group = ({ title, sub, children }) => <section className="bg-white border border-stone-200 rounded-2xl p-5"><h2 className="font-bold text-deep-950">{title}</h2>{sub && <p className="text-sm text-stone-500 mb-3">{sub}</p>}<div className="grid sm:grid-cols-2 gap-4 mt-2">{children}</div></section>
  const Field = ({ label, children, full }) => <label className={`block text-sm font-medium ${full ? 'sm:col-span-2' : ''}`}>{label}{children}</label>
  const LANGS = ['Hindi', 'Punjabi', 'Tamil', 'Telugu', 'Malayalam', 'Bengali', 'English']
  const COLOURS = ['#166534', '#b45309', '#0f766e', '#9d174d', '#1d4ed8', '#7c2d12', '#be185d', '#374151']
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <SectionTitle sub="Listing a profile is free — a monthly subscription (Supplier Monthly, ₹999/month) keeps your profiles active and visible to employers. There is no limit on how many profiles you can list. The helper is never charged.">Add a helper profile</SectionTitle>
      {!supplierSubIsActive && <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-sm text-amber-900 mb-4"><b>Your subscription is not active.</b> You can add this profile now — it will be saved, but hidden from employers until you activate or renew Supplier Monthly from your <Link to="/supplier/dashboard" className="font-semibold underline">dashboard</Link>.</div>}
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Group title="1 · About her" sub="Only her first name is shown publicly. Contact details here are private — employers reach you, the supplier, through a callback.">
          <Field label="Her name (as shown publicly) *"><input className={inputCls} value={f.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Harpreet K." /><E k="name" /></Field>
          <Field label="Age *"><input type="number" className={inputCls} value={f.age} onChange={e => set('age', e.target.value)} placeholder="e.g. 30" /><E k="age" /></Field>
          <Field label="Her mobile number (private — for your records only)"><input className={inputCls} value={f.helperMobile} onChange={e => set('helperMobile', e.target.value)} placeholder="+91 …" /><E k="helperMobile" /></Field>
          <Field label="Is her mobile number on WhatsApp?"><select className={inputCls} value={f.whatsapp} onChange={e => set('whatsapp', e.target.value)}><option>Yes</option><option>No</option></select></Field>
          <Field label="Her email (optional, private)"><input className={inputCls} value={f.email} onChange={e => set('email', e.target.value)} placeholder="her@email.com" /><E k="email" /></Field>
          <Field label="Her full name (private, for verification only)"><input className={inputCls} value={f.fullName} onChange={e => set('fullName', e.target.value)} placeholder="e.g. Harpreet Kaur" /><p className="text-xs text-stone-500 mt-1">Only her first name is shown publicly.</p></Field>
          <Field label="Profile photo" full><PhotoField value={f.photo} onChange={v => set('photo', v)} /></Field>
          <Field label="Avatar colour (used if you skip the photo)"><div className="flex gap-2 mt-2">{COLOURS.map(c => <button type="button" key={c} onClick={() => set('colour', c)} aria-label={'Avatar colour ' + c} className={`w-9 h-9 rounded-full text-white font-bold flex items-center justify-center ${f.colour === c ? 'ring-2 ring-offset-2 ring-stone-700' : ''}`} style={{ background: c }}>{(f.name || 'H')[0].toUpperCase()}</button>)}</div></Field>
        </Group>
        <Group title="2 · Where is she now?">
          <Field label="Currently in"><select className={inputCls} value={f.location} onChange={e => set('location', e.target.value)}><option>India</option><option>Singapore</option><option>Another country</option></select></Field>
          <Field label="Her status"><select className={inputCls} value={f.status} onChange={e => set('status', e.target.value)}>{STATUSES.map(s => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Available from *"><input className={inputCls} value={f.available} onChange={e => set('available', e.target.value)} placeholder="e.g. Available now, or From Jan 2027" /><E k="available" /></Field>
          <Field label="Main job she wants"><select className={inputCls} value={f.mainJob} onChange={e => set('mainJob', e.target.value)}>{MAIN_JOBS.map(j => <option key={j}>{j}</option>)}</select></Field>
          <Field label="Years worked in Singapore *"><input type="number" min="0" className={inputCls} value={f.yearsSG} onChange={e => set('yearsSG', e.target.value)} /><E k="yearsSG" /></Field>
          <Field label="Total years of experience *"><input type="number" min="0" className={inputCls} value={f.totalYears} onChange={e => set('totalYears', e.target.value)} placeholder="e.g. 3" /><E k="totalYears" /></Field>
          <TransferConsent status={f.status} location={f.location} value={f.transferConsent} releaseDate={f.releaseDate} onConsent={v => set('transferConsent', v)} onReleaseDate={v => set('releaseDate', v)} error={errs.transferConsent} />
        </Group>
        <Group title="3 · Languages & cooking">
          <Field label="Languages she speaks * — tap one, then pick its level" full><LangLevelPicker value={f.languages} onChange={v => set('languages', v)} langs={LANGS} /><E k="languages" /></Field>
          <Field label="Cooking she can do — tap one, then rate it" full><CuisineRatingPicker value={f.cuisines} onChange={v => set('cuisines', v)} /></Field>
          <div className="sm:col-span-2 flex flex-wrap gap-4 text-sm font-medium">
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.veg} onChange={e => set('veg', e.target.checked)} className="w-4 h-4 accent-green-800" /> Pure-veg cooking</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.jain} onChange={e => set('jain', e.target.checked)} className="w-4 h-4 accent-green-800" /> Jain / no onion-garlic</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.pork} onChange={e => set('pork', e.target.checked)} className="w-4 h-4 accent-green-800" /> Can handle &amp; cook pork</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.beef} onChange={e => set('beef', e.target.checked)} className="w-4 h-4 accent-green-800" /> Can handle &amp; cook beef</label>
          </div>
          <Field label="Special Indian cooking" full><div className="flex flex-wrap gap-2 mt-1">{SPECIAL_COOKING.map(s => <button type="button" key={s} onClick={() => toggleArr('specialCooking', s)} className={`text-sm rounded-full px-3 py-1.5 border ${f.specialCooking.includes(s) ? 'bg-deep-800 text-white border-deep-800' : 'border-stone-300 bg-white'}`}>{s}</button>)}</div></Field>
          <div className="sm:col-span-2 flex flex-wrap gap-4 text-sm font-medium">
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.vegetarianSelf} onChange={e => set('vegetarianSelf', e.target.checked)} className="w-4 h-4 accent-green-800" /> She is vegetarian herself</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.vegSeparate} onChange={e => set('vegSeparate', e.target.checked)} className="w-4 h-4 accent-green-800" /> She keeps veg and non-veg separate in cooking and storage</label>
          </div>
        </Group>
        <Group title="4 · Rated skills *">
          <div className="sm:col-span-2"><RatedSkillsPicker value={f.skills} onChange={v => set('skills', v)} error={errs.skills} /></div>
          <Field label="Anything else she can do" full><input className={inputCls} value={f.skillsOther} onChange={e => set('skillsOther', e.target.value)} placeholder="e.g. She can sew, she drives a scooter…" /></Field>
        </Group>
        <Group title="5 · Work history">
          <div className="sm:col-span-2"><HistoryEditor value={f.history} onChange={v => set('history', v)} fresh={f.freshNoHistory} onFreshChange={v => set('freshNoHistory', v)} /><E k="history" /></div>
        </Group>
        <Group title="6 · What she expects">
          <Field label="Expected monthly salary (S$) *"><input type="number" className={inputCls} value={f.salary} onChange={e => set('salary', e.target.value)} placeholder="e.g. 650" /><E k="salary" /></Field>
          <Field label="Rest days she expects, per month *"><input type="number" min="0" max="8" className={inputCls} value={f.restDays} onChange={e => set('restDays', e.target.value)} /><E k="restDays" /></Field>
          <Field label="About her — a few honest lines *" full><textarea rows={4} className={inputCls} value={f.about} onChange={e => set('about', e.target.value)} placeholder="Where she is from, what she does well, the work she has done, and the job she is looking for…" /><E k="about" /></Field>
          <Field label="What she is looking for" full><textarea rows={2} className={inputCls} value={f.expects} onChange={e => set('expects', e.target.value)} placeholder="e.g. A family with young children; overseas process is fine" /></Field>
        </Group>
        <Group title="7 · More about her (optional)" sub="Optional. Anything left blank simply does not appear on her profile.">
          <Field label="Video intro link (optional, up to 60 seconds)" full><input className={inputCls} value={f.videoUrl} onChange={e => set('videoUrl', e.target.value)} placeholder="Paste a link to her short video, e.g. YouTube or Google Drive" /><p className="text-xs text-stone-500 mt-1">A short video of her speaking is the strongest shortlisting aid — employers trust a face and a voice far more than words alone. No video uploader here: just paste a link.</p></Field>
          <Field label="Religion (optional — shown only if she chooses to show it)"><select className={inputCls} value={f.religion} onChange={e => set('religion', e.target.value)}>{RELIGIONS.map(r => <option key={r}>{r}</option>)}</select></Field>
          <Field label="Her own food"><select className={inputCls} value={f.ownFood} onChange={e => set('ownFood', e.target.value)}><option>Vegetarian</option><option>Non-vegetarian</option><option>Prefer not to say</option></select></Field>
          <Field label="Certifications & training (optional)" full><CertEditor value={f.certs} onChange={v => set('certs', v)} /></Field>
          <Field label="Household preferences" full><HouseholdPrefs value={f.householdPrefs} onChange={v => set('householdPrefs', v)} sundays={f.sundaysPreferred} onSundays={v => set('sundaysPreferred', v)} /></Field>
        </Group>
        <button className="w-full bg-deep-800 hover:bg-deep-900 text-white font-bold rounded-xl py-3.5">Publish this profile — free</button>
        <p className="text-xs text-stone-500 text-center">By publishing you confirm the helper has agreed to be listed and her details are true to your knowledge. Listing is free; the helper is never charged — the monthly subscription that keeps profiles active is the supplier's business cost. Prototype — the profile is saved in this browser only.</p>
      </form>
    </main>
  )
}
