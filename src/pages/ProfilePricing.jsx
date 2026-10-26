import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HELPERS, phoneFor, sgd, inr } from '../data/helpers'
import { useStore, Avatar, StatusBadge } from '../store'
import { SectionTitle } from '../components/ui'

export function Profile() {
  const { id } = useParams()
  const h = HELPERS.find(x => x.id === id)
  const { credits, isRevealed, reveal, setPackModal } = useStore()
  const [msg, setMsg] = useState('')
  if (!h) return <main className="max-w-3xl mx-auto px-4 py-16 text-center"><p className="font-bold">Profile not found.</p><Link to="/browse" className="text-deep-700 underline">Back to browse</Link></main>
  const revealed = isRevealed(h.id)
  const phone = phoneFor(h)
  const doReveal = () => {
    if (reveal(h)) setMsg('Number revealed — it is saved in My Reveals, and you never pay again for this helper.')
    else setMsg('')
  }
  const stars = (lvl) => lvl === 'Experienced' ? '●●● Experienced' : lvl === 'Some experience' ? '●●○ Some experience' : '●○○ Willing to learn'
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/browse" className="text-sm text-deep-700 font-semibold">← Back to browse</Link>
      <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start mt-4">
        <div className="space-y-5">
          <section className="bg-white rounded-2xl border border-stone-200 p-5">
            <div className="flex gap-4 flex-wrap">
              <Avatar h={h} size={88} />
              <div>
                <h1 className="text-2xl font-extrabold text-deep-950">{h.name}, {h.age}</h1>
                <p className="text-stone-500 text-sm">From {h.state}, India · Currently in {h.location}</p>
                <div className="flex gap-2 mt-2 flex-wrap"><StatusBadge s={h.status} /><span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-cream-100 border-amber-200">{h.available}</span><span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-green-50 border-green-200 text-green-800">✓ Confirmed available {h.confirmedDays === 0 ? 'today' : `${h.confirmedDays} days ago`}</span></div>
                <p className="mt-3 font-semibold text-deep-900">{h.mainJob} · {h.yearsSG} years in Singapore · {h.totalYears} years total experience</p>
              </div>
            </div>
            <h2 className="font-bold mt-6 mb-1">About me</h2><p className="text-stone-700 text-sm leading-relaxed">{h.about}</p>
            <h2 className="font-bold mt-6 mb-1">What I am looking for</h2><p className="text-stone-700 text-sm leading-relaxed">{h.expects}</p>
          </section>

          <section className="bg-white rounded-2xl border border-stone-200 p-5">
            <h2 className="font-bold mb-3">Skills &amp; experience</h2>
            <ul className="divide-y divide-stone-100 text-sm">{h.skills.map(([s, l]) => <li key={s} className="py-2 flex justify-between gap-3"><span>{s}</span><span className="text-deep-700 font-medium shrink-0">{stars(l)}</span></li>)}</ul>
            <h3 className="font-bold mt-5 mb-2">Languages</h3>
            <div className="flex flex-wrap gap-2">{h.languages.map(([l, lv]) => <span key={l} className="text-sm bg-cream-100 border border-amber-200 rounded-full px-3 py-1">{l} — {lv}</span>)}</div>
            <h3 className="font-bold mt-5 mb-2">Cooking &amp; food handling</h3>
            <ul className="text-sm text-stone-700 space-y-1.5">
              <li>🍛 Cuisines: <b>{h.cuisines.join(', ')}</b></li>
              <li>🥬 Pure-vegetarian cooking: <b>{h.veg ? 'Yes' : 'No'}</b> · Jain / no onion-garlic: <b>{h.jain ? 'Yes' : 'No'}</b></li>
              <li>🥓 Can handle &amp; cook pork: <b>{h.pork ? 'Yes' : 'No'}</b> · Beef: <b>{h.beef ? 'Yes' : 'No'}</b></li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-stone-200 p-5">
            <h2 className="font-bold mb-3">Work history</h2>
            <ol className="relative border-l-2 border-green-100 ml-1 space-y-5">{h.history.map((w, i) => (
              <li key={i} className="pl-4 relative"><span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-deep-700" /><p className="font-semibold text-sm">{w.period}</p><p className="text-sm text-stone-600">{w.family}</p><p className="text-sm text-stone-700 mt-0.5">{w.duties}</p><p className="text-xs text-stone-500 mt-0.5">Reason for leaving: {w.reason}</p></li>))}
            </ol>
            <h3 className="font-bold mt-6 mb-2">My expectations</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-cream-50 border border-amber-100 rounded-xl py-3"><p className="font-extrabold text-deep-900">{sgd(h.salary)}/mo</p><p className="text-[11px] text-stone-500">Expected salary</p></div>
              <div className="bg-cream-50 border border-amber-100 rounded-xl py-3"><p className="font-extrabold text-deep-900">{h.restDays} / month</p><p className="text-[11px] text-stone-500">Rest days expected</p></div>
              <div className="bg-cream-50 border border-amber-100 rounded-xl py-3"><p className="font-extrabold text-deep-900">{h.available.replace(/\(.*\)/, '')}</p><p className="text-[11px] text-stone-500">Can start</p></div>
            </div>
          </section>
          <p className="text-xs text-stone-500">This full profile is free to read. Only the contact number is paid. Sample profile — fictional, for the prototype.</p>
        </div>

        <aside className="bg-white rounded-2xl border-2 border-deep-700 p-5 lg:sticky lg:top-20 shadow-card">
          <h2 className="font-bold text-deep-950">Contact {h.name.split(' ')[0]}</h2>
          {!revealed ? <>
            <p className="mt-3 text-lg font-mono tracking-wider bg-stone-100 rounded-xl px-3 py-3 text-center">+65 •••• ••••</p>
            <p className="text-sm text-stone-600 mt-3">Reveal her mobile / WhatsApp number for <b>1 credit</b>. You keep it forever in My Reveals — you never pay twice for the same helper.</p>
            <p className="text-sm mt-2">Your balance: <b>{credits} credit{credits === 1 ? '' : 's'}</b></p>
            <button onClick={doReveal} className="mt-3 w-full bg-deep-800 hover:bg-deep-900 text-white font-semibold rounded-xl py-3">Reveal her number · 1 credit</button>
            {credits < 1 && <button onClick={() => setPackModal({ after: h.id })} className="mt-2 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl py-3">Buy credits with UPI — from {inr(499)}</button>}
            {msg && <p className="text-sm text-red-700 bg-red-50 rounded-lg p-2 mt-3">{msg}</p>}
            <p className="text-xs text-stone-500 mt-3">Wrong number? Report it within 7 days in My Reveals and the credit is restored. Contact is to discuss this job only.</p>
          </> : <>
            <p className="mt-3 text-lg font-mono font-bold tracking-wide bg-green-50 border border-green-200 rounded-xl px-3 py-3 text-center text-deep-900">{phone}</p>
            <p className="text-xs text-stone-500 text-center mt-1">Sample number for the prototype — not a real person.</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="bg-deep-800 text-white text-center font-semibold rounded-xl py-2.5 text-sm">📞 Call</a>
              <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="bg-green-600 text-white text-center font-semibold rounded-xl py-2.5 text-sm">💬 WhatsApp</a>
            </div>
            <Link to="/reveals" className="block text-center mt-3 text-sm font-semibold text-deep-700 underline">Saved in My Reveals →</Link>
            <div className="mt-4 bg-cream-100 border border-amber-200 rounded-xl p-3 text-sm"><b>Next steps:</b> interview her with the free question kits, agree salary and rest days in writing, then follow the MOM steps in the <Link to="/journey" className="underline font-semibold">Hiring Journey</Link>.</div>
          </>}
        </aside>
      </div>
    </main>
  )
}

export function Pricing() {
  const { setPackModal, credits } = useStore()
  const tiers = [
    { name: 'Single Reveal', price: 499, per: '₹499 per reveal', credits: 1, feats: ['Reveal 1 helper\u2019s number', 'Number kept forever in My Reveals', 'Invalid-number guarantee (7 days)'], popular: false },
    { name: 'Pack of 5', price: 1499, per: '₹300 per reveal', credits: 5, feats: ['Reveal 5 helpers\u2019 numbers', 'Interview 3–5 helpers — the normal hire', 'Credits valid 12 months', 'Invalid-number guarantee (7 days)'], popular: true },
    { name: 'Pack of 10', price: 2499, per: '₹250 per reveal', credits: 10, feats: ['Reveal 10 helpers\u2019 numbers', 'Hire for your home and your parents', 'Credits valid 12 months', 'Invalid-number guarantee (7 days)'], popular: false },
  ]
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center max-w-2xl mx-auto"><SectionTitle sub="One-time packs — not a subscription. Priced in Indian rupees (₹) and paid by UPI: Google Pay, PhonePe, Paytm or any UPI app.">Pay only to reveal a number</SectionTitle></div>
      <p className="text-center text-sm text-stone-500 -mt-3 mb-6">Your balance: <b>{credits} credit{credits === 1 ? '' : 's'}</b> · Browsing and reading full profiles is always free.</p>
      <div className="grid md:grid-cols-3 gap-4 items-stretch max-w-4xl mx-auto">
        {tiers.map(t => (
          <div key={t.name} className={`relative bg-white rounded-2xl p-6 flex flex-col ${t.popular ? 'border-2 border-deep-700 shadow-card md:-my-2 md:py-8' : 'border border-stone-200'}`}>
            {t.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>}
            <h3 className="font-bold text-center">{t.name}</h3>
            <p className="text-center mt-2"><span className="text-3xl font-extrabold text-deep-900">{inr(t.price)}</span></p>
            <p className="text-center text-sm text-stone-500">{t.per} · one-time, by UPI</p>
            <ul className="mt-4 space-y-2 text-sm text-stone-700 flex-1">{t.feats.map(f => <li key={f}>✓ {f}</li>)}</ul>
            <button onClick={() => setPackModal({ after: null })} className={`mt-5 w-full font-semibold rounded-xl py-3 ${t.popular ? 'bg-deep-800 text-white hover:bg-deep-900' : 'bg-cream-100 border border-amber-300 text-deep-900 hover:bg-cream-200'}`}>Buy with UPI</button>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-10">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5"><h3 className="font-bold text-deep-900">🛡️ The invalid-number guarantee</h3><p className="text-sm text-stone-700 mt-2">If a revealed number is wrong, disconnected, belongs to someone else, or the “helper” turns out not to be a helper, report it within <b>7 days</b> from My Reveals. Once checked, your <b>credit is restored</b> — automatically, no email argument. There is no refund for “she didn’t reply” or “we hired someone else” — we say that before you pay, not after.</p></div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5"><h3 className="font-bold text-deep-900">🤲 Helpers never pay</h3><p className="text-sm text-stone-700 mt-2">A helper pays nothing on this portal — not to create a profile, not to be listed, not when she is contacted, not when she is hired. If anyone asks a helper for money for this portal, it is a scam: report it.</p></div>
      </div>
      <div className="max-w-4xl mx-auto mt-6 bg-white border border-stone-200 rounded-2xl p-5 text-sm text-stone-700">
        <h3 className="font-bold text-deep-950">How this compares</h3>
        <p className="mt-2">A full search here costs at most <b>{inr(2499)}</b> in portal charges. By comparison, <b>Singapore agency fees are typically S$1,000–S$3,000</b> (charged in Singapore dollars by licensed agencies in Singapore) — on top of the same MOM fees, levy, insurance and salary either way. Helper salaries and all MOM costs are in S$; only this portal’s own packs are in ₹, paid by UPI.</p>
      </div>
    </main>
  )
}

export function MyReveals() {
  const { reveals, restoreCredit } = useStore()
  const [done, setDone] = useState({})
  const list = reveals.map(r => ({ ...r, h: HELPERS.find(x => x.id === r.id) })).filter(r => r.h)
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <SectionTitle sub="Every number you have revealed, kept forever. You never pay twice for the same helper.">My Reveals</SectionTitle>
      {list.length === 0 ? <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center text-stone-600">You have not revealed any numbers yet.<br /><Link to="/browse" className="font-semibold text-deep-700 underline">Browse helpers →</Link></div>
        : <div className="space-y-3">{list.map(r => (
          <div key={r.id + r.date} className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 flex-wrap items-center">
            <Avatar h={r.h} size={52} />
            <div className="min-w-[160px]"><p className="font-bold">{r.h.name}, {r.h.age} — {r.h.mainJob}</p><p className="text-xs text-stone-500">{r.h.status} · Revealed {new Date(r.date).toLocaleDateString('en-SG')}</p></div>
            {r.restored ? <p className="text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">Credit restored — number reported as invalid</p>
              : <><p className="font-mono font-bold bg-green-50 border border-green-200 rounded-xl px-3 py-2">{phoneFor(r.h)}</p>
                <a href={`https://wa.me/${phoneFor(r.h).replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="bg-green-600 text-white text-sm font-semibold rounded-xl px-3 py-2">WhatsApp</a>
                <Link to={'/helper/' + r.h.id} className="text-sm font-semibold text-deep-700 underline">Profile</Link>
                {done[r.id] ? <span className="text-sm text-green-700 font-medium">Reported — credit restored ✓</span>
                  : <button onClick={() => { restoreCredit(r.id); setDone(d => ({ ...d, [r.id]: true })) }} className="text-sm text-red-700 underline">Report wrong number (within 7 days)</button>}</>}
          </div>))}</div>}
    </main>
  )
}
