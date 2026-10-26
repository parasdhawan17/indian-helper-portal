import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { sgd, STATES, MAIN_JOBS } from '../data/helpers'
import { SectionTitle } from '../components/ui'

const STAGES = [
  { t: 'Stage 0 — Can you hire? Eligibility & the EOP', d: 'You must be 21 or older, not an undischarged bankrupt, living in Singapore, and able to support a helper in acceptable accommodation. First-time employers must complete the Employers\u2019 Orientation Programme (EOP) — a 2–3 hour online course (about S$29–36) — at least 2 working days before you apply for a Work Permit. Do the EOP first; applications made before it are wasted effort.', kit: null },
  { t: 'Stage 1 — Which type of hire?', d: 'Transfer (already in Singapore, current employer\u2019s written consent, about 1–3 weeks, highest salary, you can meet her), Finished contract (the most wanted transfer type), Ex-Singapore (worked here before, now in India, about 3–6 weeks), or Fresh from India (never worked here, about 4–8 weeks, Settling-In Programme and arrival medical apply). Your deadline and whether you must meet her first usually decide this.', kit: null },
  { t: 'Stage 2 — The true cost, in S$', d: 'Singapore has no official minimum helper salary — it is agreed between you and her. On top of salary: levy S$300/month (S$60 if you qualify for the concession — young child, elderly parent, or a person with disability in the household; S$450 for a second helper). One-time: MOM fees S$70, insurance and security bond package, medical checks, and the SIP for a first-time helper. Use the calculator below — it is all in Singapore dollars, because this is MOM money, not portal money.', kit: null },
  { t: 'Stage 3 — Interview well', d: 'Interview in person for a transfer helper, by video for a helper in India. Ask about the main job first: for a baby — night feeds and sterilising; for elderly parents — mobility help, medicines, dementia experience; for cooking — ask her to describe, or cook, three of your family\u2019s dishes, including veg separation if you need it. Agree the phone rule now, not later — it is the most common dispute in employer groups.', kit: ['Baby: “Walk me through a night with a 3-month-old.”', 'Elderly: “How do you help my father from bed to chair?”', 'Cooking: “What would you cook for a pure-veg family on a festival day?”', 'Always: “Which rest days do you expect, and how do you use your phone during work?”'] },
  { t: 'Stage 4 — Agree it in writing', d: 'Before any paperwork, write down together: salary and pay day (paid to her bank account, within 7 days after the period ends), rest days — at least 1 rest day a month cannot be bought out, that is the law since 2023 — main duties, sleeping space, food, the phone rule, start or transfer date, and notice terms. The In-Principle Approval (IPA) will state her salary and rest days, so what you agree must match what you apply for.', kit: null },
  { t: 'Stage 5 — The MOM steps (transfer)', d: 'Get her current employer\u2019s written consent and agree the transfer date. Apply for the Work Permit through MOM\u2019s FDW eService with that consent — both employers receive the IPA showing the date. Arrange the security bond and insurance, confirm her medical is current, apply for issuance, and do not let her start work until the permit is issued in your name. The card arrives in about 5 working days after registration. Tick the steps off in the tracker below.', kit: null },
  { t: 'Stage 6 — Her first 90 days, and every month after', d: 'Sign the employment contract and safety agreement, give her a written schedule and your family\u2019s recipes in the first weeks, and set up salary by bank transfer. Every month: salary on time, levy by GIRO, rest days actually taken. Every 6 months: her medical examination, which you pay for. Never hold her passport, never deduct food or medical costs from her salary. If it ends: cancel the permit within a week of her last day and pay her return airfare — that is the employer\u2019s duty.', kit: null },
]

export function Journey() {
  const [open, setOpen] = useState(0)
  const [salary, setSalary] = useState(800)
  const [concession, setConcession] = useState(false)
  const [sip, setSip] = useState(true)
  const [eop, setEop] = useState(true)
  const levy = concession ? 60 : 300
  const oneTime = 70 + 600 + 60 + (sip ? 77 : 0) + (eop ? 36 : 0)
  const monthly = salary + levy
  const firstYear = monthly * 12 + oneTime
  const TRACKER = [
    ['Written consent from her current employer + transfer date agreed', 'Without consent there is no transfer — get it in writing first.'],
    ['Work Permit applied for via MOM FDW eService (with the consent)', 'Both employers receive the IPA stating the transfer date.'],
    ['Security bond (S$5,000 guarantee) and insurance arranged', 'Medical cover at least S$60,000/yr and personal accident S$60,000 — via an insurance package, not cash to MOM.'],
    ['Her 6-monthly medical confirmed current', 'Done under her current employer before the transfer.'],
    ['Work Permit issuance applied for', 'She must NOT start work for you until the permit is issued in your name.'],
    ['Card registration done (photo/fingerprints if required)', 'Card normally arrives in about 5 working days.'],
    ['Levy GIRO and her bank salary payment set up', 'Levy is S$300/month, or S$60 with the concession. Salary within 7 days after each period ends.'],
    ['Contract + safety agreement signed, schedule and house rules given', 'Include rest days, duties, sleeping, food and the phone rule.'],
  ]
  const [ticks, setTicks] = useState(() => { try { return JSON.parse(localStorage.getItem('ihsg_tracker') || '[]') } catch { return [] } })
  useEffect(() => { localStorage.setItem('ihsg_tracker', JSON.stringify(ticks)) }, [ticks])
  const pct = Math.round(ticks.filter(Boolean).length / TRACKER.length * 100)
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <SectionTitle sub="The portal explains and tracks — you do the steps, in MOM\u2019s FDW eService. General information from MOM sources; confirm your own case with MOM.">The Hiring Journey</SectionTitle>
      <div className="space-y-2">{STAGES.map((s, i) => (
        <div key={s.t} className="bg-white border border-stone-200 rounded-xl overflow-hidden">
          <button className="w-full text-left px-4 py-3.5 font-bold text-deep-950 flex justify-between gap-3" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><span>{s.t}</span><span>{open === i ? '−' : '+'}</span></button>
          {open === i && <div className="px-4 pb-4 text-sm text-stone-700 leading-relaxed"><p>{s.d}</p>{s.kit && <ul className="mt-3 bg-cream-100 border border-amber-200 rounded-xl p-3 space-y-1.5">{s.kit.map(k => <li key={k}>💬 {k}</li>)}</ul>}</div>}
        </div>))}</div>

      <section className="bg-white border-2 border-deep-700 rounded-2xl p-5 mt-10">
        <h2 className="text-xl font-extrabold text-deep-950">Cost calculator — all in S$</h2>
        <p className="text-sm text-stone-600">This is the Singapore hiring cost (MOM money). The portal\u2019s own reveal packs are separate, and priced in ₹.</p>
        <div className="grid md:grid-cols-2 gap-5 mt-4">
          <div className="space-y-4">
            <div><label className="text-sm font-semibold flex justify-between"><span>Her monthly salary</span><span>{sgd(salary)}</span></label><input type="range" min="500" max="1200" step="10" value={salary} onChange={e => setSalary(+e.target.value)} className="w-full accent-green-800" /><p className="text-xs text-stone-500">Indian helpers in recent placement data averaged about S$822/month; transfer helpers more, fresh helpers less.</p></div>
            <label className="flex items-center justify-between gap-3 text-sm font-medium bg-cream-50 border border-amber-100 rounded-xl px-3 py-2.5">Levy concession? (child under 16 / elderly 67+ / disability in household)<input type="checkbox" checked={concession} onChange={e => setConcession(e.target.checked)} className="w-5 h-5 accent-green-800" /></label>
            <label className="flex items-center justify-between gap-3 text-sm font-medium bg-cream-50 border border-amber-100 rounded-xl px-3 py-2.5">First-time helper — Settling-In Programme (~S$77)<input type="checkbox" checked={sip} onChange={e => setSip(e.target.checked)} className="w-5 h-5 accent-green-800" /></label>
            <label className="flex items-center justify-between gap-3 text-sm font-medium bg-cream-50 border border-amber-100 rounded-xl px-3 py-2.5">First-time employer — EOP course (~S$36)<input type="checkbox" checked={eop} onChange={e => setEop(e.target.checked)} className="w-5 h-5 accent-green-800" /></label>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 space-y-2 text-sm">
            <p className="flex justify-between"><span>Monthly salary</span><b>{sgd(salary)}</b></p>
            <p className="flex justify-between"><span>Monthly levy</span><b>{sgd(levy)}</b></p>
            <p className="flex justify-between border-t border-green-200 pt-2"><span className="font-semibold">Monthly total</span><b className="text-deep-900">{sgd(monthly)}</b></p>
            <p className="flex justify-between"><span>One-time (MOM S$70 + insurance package ~S$600 + medical ~S$60{sip ? ' + SIP S$77' : ''}{eop ? ' + EOP S$36' : ''})</span><b>{sgd(oneTime)}</b></p>
            <p className="flex justify-between border-t border-green-200 pt-2"><span className="font-semibold">First-year total</span><b className="text-deep-900 text-base">{sgd(firstYear)}</b></p>
            <p className="text-xs text-stone-500 pt-1">Estimates, excluding food and upkeep. Through an agency, add Singapore agency fees of about S$1,000–S$3,000 one-time. Food/upkeep is commonly a further S$120–350/month.</p>
          </div>
        </div>
      </section>

      <section className="bg-white border border-stone-200 rounded-2xl p-5 mt-6">
        <div className="flex items-center justify-between gap-3 flex-wrap"><h2 className="text-xl font-extrabold text-deep-950">Transfer process tracker</h2><span className="text-sm font-bold text-deep-800">{pct}% done</span></div>
        <div className="h-3 bg-stone-100 rounded-full mt-3 overflow-hidden"><div className="h-full bg-deep-700 rounded-full transition-all" style={{ width: pct + '%' }} /></div>
        <div className="mt-4 space-y-2">{TRACKER.map(([t, d], i) => (
          <label key={t} className={`flex gap-3 border rounded-xl px-3 py-3 cursor-pointer ${ticks[i] ? 'bg-green-50 border-green-200' : 'border-stone-200'}`}>
            <input type="checkbox" checked={!!ticks[i]} onChange={e => { const n = [...ticks]; n[i] = e.target.checked; setTicks(n) }} className="w-5 h-5 mt-0.5 accent-green-800 shrink-0" />
            <span><span className={`text-sm font-semibold block ${ticks[i] ? 'line-through text-stone-500' : ''}`}>{i + 1}. {t}</span><span className="text-xs text-stone-500">{d}</span></span>
          </label>))}
        </div>
        {pct === 100 && <p className="mt-4 bg-green-50 border border-green-200 text-green-900 text-sm rounded-xl p-3 font-medium">✅ All transfer steps ticked off. Keep her contract, salary records and medical dates safe — and welcome her well.</p>}
        <p className="text-xs text-stone-500 mt-3">Your ticks are saved on this device only. A tick is your record — it is not a status from MOM.</p>
      </section>
    </main>
  )
}

const inputCls = 'w-full border border-stone-300 rounded-xl px-3 py-2.5 mt-1 bg-white'
export function Join() {
  const [f, setF] = useState({ name: '', age: '', mobile: '', state: '', location: 'Singapore', status: 'Transfer', available: '', mainJob: 'Childcare', salary: '', restDays: '2', colour: '#166534', languages: [], cuisines: [], skills: '', about: '', veg: false, pork: false, beef: false })
  const [errs, setErrs] = useState({})
  const [done, setDone] = useState(false)
  const set = (k, v) => setF(s => ({ ...s, [k]: v }))
  const toggleArr = (k, v) => setF(s => ({ ...s, [k]: s[k].includes(v) ? s[k].filter(x => x !== v) : [...s[k], v] }))
  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (!f.name.trim()) er.name = 'Please enter your first name'
    if (!f.age || +f.age < 18 || +f.age > 65) er.age = 'Enter your age (helpers must be 23 to below 50 for a first Singapore Work Permit)'
    if (!/^[+\d][\d\s]{7,}$/.test(f.mobile)) er.mobile = 'Enter a valid mobile / WhatsApp number'
    if (!f.state) er.state = 'Choose your state'
    if (!f.available.trim()) er.available = 'When can you start?'
    if (!f.salary || +f.salary < 300) er.salary = 'Enter the monthly salary you expect, in S$'
    if (+f.restDays === 0) er.restDays = 'Rest days cannot be 0. By law in Singapore, every helper must get at least 1 rest day in a month that cannot be replaced by payment. Please choose at least 1.'
    if (f.languages.length === 0) er.languages = 'Choose at least one language'
    if (!f.about.trim() || f.about.trim().length < 30) er.about = 'Tell employers a little about yourself (at least a few lines)'
    setErrs(er)
    if (Object.keys(er).length === 0) setDone(true)
  }
  const E = ({ k }) => errs[k] ? <p className="text-xs text-red-700 mt-1 font-medium">{errs[k]}</p> : null
  if (done) return (
    <main className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="text-5xl" aria-hidden="true">🎉</div>
      <h1 className="text-2xl font-extrabold text-deep-950 mt-4">Profile submitted for review</h1>
      <p className="text-stone-600 mt-3">Thank you, {f.name.split(' ')[0]}. Our moderation team will check your profile — usually the same day — and it will go live for employers in Singapore to read. <b>Listing is always free.</b> If anyone asks you for money for this portal, do not pay — report it.</p>
      <p className="text-sm text-stone-500 mt-3">We will message your number ({f.mobile}) when your profile is live. Keep confirming “I am still available” every 14 days so employers trust your profile.</p>
      <Link to="/browse" className="inline-block mt-6 bg-deep-800 text-white font-semibold rounded-xl px-5 py-3">See how employer search looks</Link>
    </main>
  )
  const Group = ({ title, sub, children }) => <section className="bg-white border border-stone-200 rounded-2xl p-5"><h2 className="font-bold text-deep-950">{title}</h2>{sub && <p className="text-sm text-stone-500 mb-3">{sub}</p>}<div className="grid sm:grid-cols-2 gap-4 mt-2">{children}</div></section>
  const Field = ({ label, children, full }) => <label className={`block text-sm font-medium ${full ? 'sm:col-span-2' : ''}`}>{label}{children}</label>
  const LANGS = ['Hindi', 'Punjabi', 'Tamil', 'Telugu', 'Malayalam', 'Bengali', 'English']
  const CUIS = ['North Indian', 'South Indian', 'Pure-veg daily cooking', 'Jain / no onion-garlic', 'Bengali', 'Indo-Chinese', 'Western']
  const COLOURS = ['#166534', '#b45309', '#0f766e', '#9d174d', '#1d4ed8', '#7c2d12', '#be185d', '#374151']
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <SectionTitle sub="Free — today, when you are contacted, and when you are hired. Your number stays hidden until a paid employer reveals it. Takes about 10 minutes.">Create your free helper profile</SectionTitle>
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Group title="1 · About you" sub="Only your first name is shown to employers.">
          <Field label="First name"><input className={inputCls} value={f.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Manjit" /><E k="name" /></Field>
          <Field label="Age"><input type="number" className={inputCls} value={f.age} onChange={e => set('age', e.target.value)} placeholder="e.g. 34" /><E k="age" /></Field>
          <Field label="Mobile / WhatsApp number (hidden until an employer pays to reveal it)"><input className={inputCls} value={f.mobile} onChange={e => set('mobile', e.target.value)} placeholder="+65 … or +91 …" /><E k="mobile" /></Field>
          <Field label="Your avatar colour"><div className="flex gap-2 mt-2">{COLOURS.map(c => <button type="button" key={c} onClick={() => set('colour', c)} aria-label={'Avatar colour ' + c} className={`w-9 h-9 rounded-full text-white font-bold flex items-center justify-center ${f.colour === c ? 'ring-2 ring-offset-2 ring-stone-700' : ''}`} style={{ background: c }}>{(f.name || 'H')[0].toUpperCase()}</button>)}</div><p className="text-xs text-stone-500 mt-1">Your profile uses an initial avatar in this colour — no photo needed for the prototype.</p></Field>
        </Group>
        <Group title="2 · Where are you now?">
          <Field label="State in India"><select className={inputCls} value={f.state} onChange={e => set('state', e.target.value)}><option value="">Choose…</option>{STATES.map(s => <option key={s}>{s}</option>)}<option>Other Indian state</option></select><E k="state" /></Field>
          <Field label="Currently in"><select className={inputCls} value={f.location} onChange={e => set('location', e.target.value)}><option>Singapore</option><option>India</option><option>Another country</option></select></Field>
          <Field label="Your status"><select className={inputCls} value={f.status} onChange={e => set('status', e.target.value)}><option>Transfer</option><option>Finished contract</option><option>Ex-Singapore</option><option>Fresh</option></select></Field>
          <Field label="Available from"><input className={inputCls} value={f.available} onChange={e => set('available', e.target.value)} placeholder="e.g. Available now, or 20 Nov 2026" /><E k="available" /></Field>
        </Group>
        <Group title="3 · Languages & cooking">
          <Field label="Languages you speak" full><div className="flex flex-wrap gap-2 mt-1">{LANGS.map(l => <button type="button" key={l} onClick={() => toggleArr('languages', l)} className={`text-sm rounded-full px-3 py-1.5 border ${f.languages.includes(l) ? 'bg-deep-800 text-white border-deep-800' : 'border-stone-300 bg-white'}`}>{l}</button>)}</div><E k="languages" /></Field>
          <Field label="Cooking you can do" full><div className="flex flex-wrap gap-2 mt-1">{CUIS.map(l => <button type="button" key={l} onClick={() => toggleArr('cuisines', l)} className={`text-sm rounded-full px-3 py-1.5 border ${f.cuisines.includes(l) ? 'bg-deep-800 text-white border-deep-800' : 'border-stone-300 bg-white'}`}>{l}</button>)}</div></Field>
          <div className="sm:col-span-2 flex flex-wrap gap-4 text-sm font-medium">
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.veg} onChange={e => set('veg', e.target.checked)} className="w-4 h-4 accent-green-800" /> I can cook pure-veg daily</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.pork} onChange={e => set('pork', e.target.checked)} className="w-4 h-4 accent-green-800" /> I can handle &amp; cook pork</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={f.beef} onChange={e => set('beef', e.target.checked)} className="w-4 h-4 accent-green-800" /> I can handle &amp; cook beef</label>
          </div>
        </Group>
        <Group title="4 · Skills & experience">
          <Field label="Main job you want"><select className={inputCls} value={f.mainJob} onChange={e => set('mainJob', e.target.value)}>{MAIN_JOBS.map(j => <option key={j}>{j}</option>)}</select></Field>
          <Field label="Your skills & past work" full><textarea rows={3} className={inputCls} value={f.skills} onChange={e => set('skills', e.target.value)} placeholder="e.g. 4 years childcare in Singapore, newborn care, South Indian cooking, worked for one family 2021–2025…" /></Field>
        </Group>
        <Group title="5 · What you expect">
          <Field label="Expected monthly salary (S$)"><input type="number" className={inputCls} value={f.salary} onChange={e => set('salary', e.target.value)} placeholder="e.g. 750" /><E k="salary" /></Field>
          <Field label="Rest days you expect, per month"><input type="number" min="0" max="8" className={inputCls} value={f.restDays} onChange={e => set('restDays', e.target.value)} /><E k="restDays" /></Field>
          <Field label="About me — tell employers about yourself" full><textarea rows={4} className={inputCls} value={f.about} onChange={e => set('about', e.target.value)} placeholder="Where you are from, your family, what you do well, and the job you are looking for…" /><E k="about" /></Field>
        </Group>
        <button className="w-full bg-deep-800 hover:bg-deep-900 text-white font-bold rounded-xl py-3.5">Submit my free profile for review</button>
        <p className="text-xs text-stone-500 text-center">By submitting you confirm this is your own profile and your own number. This portal never charges helpers. Prototype — nothing is sent anywhere; the form is checked on this device only.</p>
      </form>
    </main>
  )
}
