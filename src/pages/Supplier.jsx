import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { allHelpers, loadCallbacks, updateCallback, loadSavedSupplier, maskPhone, inr, sgd, STATES, MAIN_JOBS, STATUSES } from '../data/helpers'
import { useStore, Avatar, StatusBadge } from '../store'
import { SectionTitle } from '../components/ui'

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
      <SectionTitle sub="List your helpers. Employers request a callback — you pay 1 credit only when you want the employer's number to call them back.">For suppliers</SectionTitle>

      <div className="grid md:grid-cols-3 gap-3 mb-8">
        {[['1 · List helpers free', 'Add profiles of your helpers — full skills, languages, cooking, salary and availability. Listing costs nothing, and helpers are never charged.'],
           ['2 · Employers request a callback', 'An employer who likes a profile sends a free callback request. You see the request with their number hidden.'],
           ['3 · Unlock a number for 1 credit', 'Spend 1 credit (packs in ₹, paid by UPI) to see the employer\u2019s number and call them back. No credit, no charge — you choose which requests are worth it.']].map(([t, d]) => (
          <div key={t} className="bg-white rounded-2xl border border-stone-200 p-4"><h3 className="font-bold text-deep-900 text-sm">{t}</h3><p className="text-sm text-stone-600 mt-1.5 leading-relaxed">{d}</p></div>
        ))}
      </div>

      {sup ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
          <p className="text-3xl" aria-hidden="true">🏢</p>
          <h2 className="font-extrabold text-deep-950 text-lg mt-2">You are signed up as {sup.business}</h2>
          <p className="text-sm text-stone-600 mt-1">{sup.name} · {sup.base}</p>
          <Link to="/supplier/dashboard" className="inline-block mt-4 bg-deep-800 hover:bg-deep-900 text-white font-semibold rounded-xl px-5 py-3">Go to my dashboard →</Link>
          <p className="mt-3"><button onClick={() => { try { localStorage.removeItem('ihp_supplier') } catch {}; setSup(null) }} className="text-xs text-stone-500 underline">Not you? Reset the demo supplier on this device</button></p>
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
          <p className="text-xs text-stone-500 text-center">No sign-up fee and no listing fee. You only ever pay to unlock an employer's number, in ₹ by UPI. Prototype — your details stay in this browser.</p>
        </form>
      )}
    </main>
  )
}

// ------------------------------------------------------------------- dashboard
export function SupplierDashboard() {
  const supplier = loadSavedSupplier()
  const { supplierCredits, setPackModal, spendSupplierCredit } = useStore()
  const [cbs, setCbs] = useState(() => supplier ? myCallbacks(supplier.id) : [])
  if (!supplier) return <Navigate to="/supplier" replace />
  const profiles = myProfiles(supplier.id)
  const unlockedCount = cbs.filter(c => c.unlocked).length
  const helperName = (id) => { const h = allHelpers().find(x => x.id === id); return h ? h.name : 'A helper' }
  const unlock = (cb) => {
    if (cb.unlocked) return
    if (spendSupplierCredit()) { updateCallback(cb.id, { unlocked: true }); setCbs(myCallbacks(supplier.id)) }
  }
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-deep-950">{supplier.business}</h1>
          <p className="text-sm text-stone-500 mt-0.5">{supplier.name} · {supplier.base} · Supplier dashboard</p>
        </div>
        <div className="bg-white border-2 border-deep-700 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-card">
          <div><p className="text-[11px] font-bold text-stone-500">SUPPLIER CREDITS</p><p className="font-extrabold text-deep-900 text-lg leading-none mt-0.5">🎟️ {supplierCredits} credit{supplierCredits === 1 ? '' : 's'}</p></div>
          <button onClick={() => setPackModal({ forSupplier: true, after: null })} className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl px-3.5 py-2.5">Buy credits · UPI</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        {[['Profiles listed', profiles.length], ['Callback requests', cbs.length], ['Numbers unlocked', unlockedCount]].map(([l, n]) => (
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
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full border bg-green-100 border-green-300 text-green-800">● Live</span>
              <Link to={'/helper/' + h.id} className="text-sm font-semibold text-deep-700 underline">View public profile</Link>
            </div>))}
          </div>}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold text-deep-950">Callback requests</h2>
        <p className="text-sm text-stone-500 mt-1">Employers who asked you to call them back. Their numbers stay hidden until you unlock them — 1 credit each, only when you choose.</p>
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
                    <button onClick={() => unlock(cb)} className="mt-2 w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl px-3 py-2.5">Unlock number · 1 credit</button>
                    <p className="text-[11px] text-stone-400 mt-1.5">Your balance: {supplierCredits} credit{supplierCredits === 1 ? '' : 's'}{supplierCredits < 1 ? ' — buying opens first' : ''}</p>
                  </>}
                </div>
              </div>
            </div>))}
          </div>}
      </section>
      <p className="text-xs text-stone-400 mt-8">Prototype: data stays in this browser (localStorage) — profiles, requests and credits on this device only. Callback credits are bought in ₹ by UPI (mock checkout); salaries stay in S$.</p>
    </main>
  )
}

// --------------------------------------------------------------- add a profile
const LANGS = ['Hindi', 'Punjabi', 'Tamil', 'Telugu', 'Malayalam', 'Bengali', 'English']
const CUIS = ['North Indian', 'South Indian', 'Pure-veg daily cooking', 'Jain / no onion-garlic', 'Bengali', 'Indo-Chinese', 'Western']
const COLOURS = ['#166534', '#b45309', '#0f766e', '#9d174d', '#1d4ed8', '#7c2d12', '#be185d', '#374151']
const LEVELS = ['Experienced', 'Some experience', 'Willing to learn']

export function SupplierAdd() {
  const supplier = loadSavedSupplier()
  const nav = useNavigate()
  const [f, setF] = useState({ name: '', age: '', state: '', location: 'India', status: 'Fresh', available: '', mainJob: 'Childcare', salary: '', restDays: '2', yearsSG: '0', totalYears: '', colour: '#166534', languages: [], cuisines: [], veg: false, jain: false, pork: false, beef: false, about: '', expects: '', histPeriod: '', histFamily: '', histDuties: '', histReason: '' })
  const [skills, setSkills] = useState([{ name: 'Childcare (1–6 yrs)', level: 'Experienced' }, { name: 'Cooking', level: 'Some experience' }])
  const [errs, setErrs] = useState({})
  const [savedId, setSavedId] = useState('')
  if (!supplier) return <Navigate to="/supplier" replace />
  const set = (k, v) => setF(s => ({ ...s, [k]: v }))
  const toggleArr = (k, v) => setF(s => ({ ...s, [k]: s[k].includes(v) ? s[k].filter(x => x !== v) : [...s[k], v] }))
  const E = ({ k }) => errs[k] ? <p className="text-xs text-red-700 mt-1 font-medium">{errs[k]}</p> : null
  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (!f.name.trim()) er.name = 'Please enter the helper\u2019s name'
    if (!f.age || +f.age < 18 || +f.age > 65) er.age = 'Enter her age (helpers must be 23 to below 50 for a first Singapore Work Permit)'
    if (!f.state) er.state = 'Choose her state'
    if (!f.available.trim()) er.available = 'When can she start?'
    if (!f.salary || +f.salary < 300) er.salary = 'Enter the monthly salary she expects, in S$'
    if (+f.restDays === 0) er.restDays = 'Rest days cannot be 0. By law in Singapore, every helper must get at least 1 rest day in a month that cannot be replaced by payment. Please choose at least 1.'
    if (f.languages.length === 0) er.languages = 'Choose at least one language'
    if (skills.filter(s => s.name.trim()).length === 0) er.skills = 'Add at least one skill'
    if (!f.about.trim() || f.about.trim().length < 30) er.about = 'Write a few lines about her (at least 30 characters)'
    setErrs(er)
    if (Object.keys(er).length) return
    const id = 'sup-' + Date.now().toString(36)
    const history = (f.histPeriod.trim() || f.histDuties.trim())
      ? [{ period: f.histPeriod.trim() || 'Previous work', family: f.histFamily.trim() || 'Family in India', duties: f.histDuties.trim(), reason: f.histReason.trim() || 'Looking for a Singapore job' }]
      : []
    const profile = {
      id, name: f.name.trim(), age: +f.age, state: f.state, status: f.status, location: f.location,
      available: f.available.trim(), availableInDays: 0, mainJob: f.mainJob, salary: +f.salary, restDays: +f.restDays,
      yearsSG: +f.yearsSG || 0, totalYears: +f.totalYears || 0, confirmedDays: 0, colour: f.colour,
      languages: f.languages.map((l, i) => [l, i === 0 ? 'Fluent' : 'Conversational']),
      cuisines: f.cuisines, veg: f.veg, jain: f.jain, pork: f.pork, beef: f.beef,
      skills: skills.filter(s => s.name.trim()).map(s => [s.name.trim(), s.level]),
      about: f.about.trim(), history,
      expects: f.expects.trim() || 'Open to the right family in Singapore — details can be discussed with the supplier on the callback.',
      listedBy: { supplierId: supplier.id, name: supplier.business },
      feedback: [], image: `/images/${id}.jpg`,
    }
    try {
      const cur = JSON.parse(localStorage.getItem('ihp_supplier_profiles') || '[]')
      cur.push(profile)
      localStorage.setItem('ihp_supplier_profiles', JSON.stringify(cur))
    } catch {}
    setSavedId(id)
    window.scrollTo(0, 0)
  }
  if (savedId) return (
    <main className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="text-5xl" aria-hidden="true">🎉</div>
      <h1 className="text-2xl font-extrabold text-deep-950 mt-4">Profile is live</h1>
      <p className="text-stone-600 mt-3"><b>{f.name}</b> is now listed under {supplier.business} and employers can read the full profile. When an employer requests a callback, it will appear in your dashboard — you pay 1 credit only if you unlock their number. <b>Listing this profile was free.</b></p>
      <div className="flex gap-2 justify-center mt-6 flex-wrap">
        <Link to={'/helper/' + savedId} className="bg-deep-800 text-white font-semibold rounded-xl px-5 py-3">View the live profile</Link>
        <button onClick={() => nav('/supplier/dashboard')} className="bg-cream-100 border border-amber-300 text-deep-900 font-semibold rounded-xl px-5 py-3">Back to dashboard</button>
      </div>
    </main>
  )
  const Group = ({ title, sub, children }) => <section className="bg-white border border-stone-200 rounded-2xl p-5"><h2 className="font-bold text-deep-950">{title}</h2>{sub && <p className="text-sm text-stone-500 mb-3">{sub}</p>}<div className="grid sm:grid-cols-2 gap-4 mt-2">{children}</div></section>
  const Field = ({ label, children, full }) => <label className={`block text-sm font-medium ${full ? 'sm:col-span-2' : ''}`}>{label}{children}</label>
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <SectionTitle sub="Listing a profile is free — you pay only to unlock an employer's number from a callback request. The helper is never charged.">Add a helper profile</SectionTitle>
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Group title="1 · About her">
          <Field label="Her name (as shown publicly)"><input className={inputCls} value={f.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Harpreet K." /><E k="name" /></Field>
          <Field label="Age"><input type="number" className={inputCls} value={f.age} onChange={e => set('age', e.target.value)} placeholder="e.g. 30" /><E k="age" /></Field>
          <Field label="State in India"><select className={inputCls} value={f.state} onChange={e => set('state', e.target.value)}><option value="">Choose…</option>{STATES.map(s => <option key={s}>{s}</option>)}<option>Other Indian state</option></select><E k="state" /></Field>
          <Field label="Avatar colour (no photo upload in the prototype)"><div className="flex gap-2 mt-2">{COLOURS.map(c => <button type="button" key={c} onClick={() => set('colour', c)} aria-label={'Avatar colour ' + c} className={`w-9 h-9 rounded-full text-white font-bold flex items-center justify-center ${f.colour === c ? 'ring-2 ring-offset-2 ring-stone-700' : ''}`} style={{ background: c }}>{(f.name || 'H')[0].toUpperCase()}</button>)}</div></Field>
        </Group>
        <Group title="2 · Where is she now?">
          <Field label="Currently in"><select className={inputCls} value={f.location} onChange={e => set('location', e.target.value)}><option>India</option><option>Singapore</option><option>Another country</option></select></Field>
          <Field label="Her status"><select className={inputCls} value={f.status} onChange={e => set('status', e.target.value)}>{STATUSES.map(s => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Available from"><input className={inputCls} value={f.available} onChange={e => set('available', e.target.value)} placeholder="e.g. Available now, or From Jan 2027" /><E k="available" /></Field>
          <Field label="Main job she wants"><select className={inputCls} value={f.mainJob} onChange={e => set('mainJob', e.target.value)}>{MAIN_JOBS.map(j => <option key={j}>{j}</option>)}</select></Field>
          <Field label="Years worked in Singapore"><input type="number" min="0" className={inputCls} value={f.yearsSG} onChange={e => set('yearsSG', e.target.value)} /></Field>
          <Field label="Total years of experience"><input type="number" min="0" className={inputCls} value={f.totalYears} onChange={e => set('totalYears', e.target.value)} placeholder="e.g. 3" /></Field>
        </Group>
        <Group title="3 · Languages & cooking">
          <Field label="Languages she speaks" full><div className="flex flex-wrap gap-2 mt-1">{LANGS.map(l => <button type="button" key={l} onClick={() => toggleArr('languages', l)} className={`text-sm rounded-full px-3 py-1.5 border ${f.languages.includes(l) ? 'bg-deep-800 text-white border-deep-800' : 'border-stone-300 bg-white'}`}>{l}</button>)}</div><E k="languages" /></Field>
          <Field label="Cooking she can do" full><div className="flex flex-wrap gap-2 mt-1">{CUIS.map(l => <button type="button" key={l} onClick={() => toggleArr('cuisines', l)} className={`text-sm rounded-full px-3 py-1.5 border ${f.cuisines.includes(l) ? 'bg-deep-800 text-white border-deep-800' : 'border-stone-300 bg-white'}`}>{l}</button>)}</div></Field>
          <div className="sm:col-span-2 flex flex-wrap gap-4 text-sm font-medium">
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.veg} onChange={e => set('veg', e.target.checked)} className="w-4 h-4 accent-green-800" /> Pure-veg cooking</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.jain} onChange={e => set('jain', e.target.checked)} className="w-4 h-4 accent-green-800" /> Jain / no onion-garlic</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.pork} onChange={e => set('pork', e.target.checked)} className="w-4 h-4 accent-green-800" /> Can handle &amp; cook pork</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.beef} onChange={e => set('beef', e.target.checked)} className="w-4 h-4 accent-green-800" /> Can handle &amp; cook beef</label>
          </div>
        </Group>
        <Group title="4 · Skills (with her level for each)">
          <div className="sm:col-span-2 space-y-2">
            {skills.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input className={inputCls + ' flex-1'} value={s.name} onChange={e => setSkills(skills.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} placeholder="e.g. Childcare (1–6 yrs)" />
                <select className={inputCls + ' w-44'} value={s.level} onChange={e => setSkills(skills.map((x, j) => j === i ? { ...x, level: e.target.value } : x))}>{LEVELS.map(l => <option key={l}>{l}</option>)}</select>
                <button type="button" onClick={() => setSkills(skills.filter((_, j) => j !== i))} className="px-3 text-stone-400 hover:text-red-600 font-bold" aria-label="Remove skill">×</button>
              </div>
            ))}
            <button type="button" onClick={() => setSkills([...skills, { name: '', level: 'Some experience' }])} className="text-sm font-semibold text-deep-700 underline">+ Add a skill</button>
            <E k="skills" />
          </div>
        </Group>
        <Group title="5 · Her past work (one entry is enough)">
          <Field label="Period"><input className={inputCls} value={f.histPeriod} onChange={e => set('histPeriod', e.target.value)} placeholder="e.g. 2023 — 2026 · India (Amritsar)" /></Field>
          <Field label="Family she worked for"><input className={inputCls} value={f.histFamily} onChange={e => set('histFamily', e.target.value)} placeholder="e.g. Family with 2 children" /></Field>
          <Field label="Duties" full><input className={inputCls} value={f.histDuties} onChange={e => set('histDuties', e.target.value)} placeholder="e.g. Childcare, cooking, school run" /></Field>
          <Field label="Reason for leaving"><input className={inputCls} value={f.histReason} onChange={e => set('histReason', e.target.value)} placeholder="e.g. Looking for first Singapore job" /></Field>
        </Group>
        <Group title="6 · What she expects">
          <Field label="Expected monthly salary (S$)"><input type="number" className={inputCls} value={f.salary} onChange={e => set('salary', e.target.value)} placeholder="e.g. 650" /><E k="salary" /></Field>
          <Field label="Rest days she expects, per month"><input type="number" min="0" max="8" className={inputCls} value={f.restDays} onChange={e => set('restDays', e.target.value)} /><E k="restDays" /></Field>
          <Field label="About her — a few honest lines" full><textarea rows={4} className={inputCls} value={f.about} onChange={e => set('about', e.target.value)} placeholder="Where she is from, what she does well, the work she has done, and the job she is looking for…" /><E k="about" /></Field>
          <Field label="What she is looking for" full><textarea rows={2} className={inputCls} value={f.expects} onChange={e => set('expects', e.target.value)} placeholder="e.g. A family with young children; overseas process is fine" /></Field>
        </Group>
        <button className="w-full bg-deep-800 hover:bg-deep-900 text-white font-bold rounded-xl py-3.5">Publish this profile — free</button>
        <p className="text-xs text-stone-500 text-center">By publishing you confirm the helper has agreed to be listed and her details are true to your knowledge. Listing is free; the helper is never charged. Prototype — the profile is saved in this browser only.</p>
      </form>
    </main>
  )
}
