import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HELPERS, phoneFor, sgd, inr, feedbackFor, feedbackSummary } from '../data/helpers'
import { useStore, Avatar, StatusBadge } from '../store'
import { SectionTitle } from '../components/ui'

export const StarRow = ({ n, className = 'text-base' }) => (
  <span className={`tracking-tight ${className}`} aria-label={`${n} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map(i => <span key={i} className={i <= Math.round(n) ? 'text-amber-500' : 'text-stone-300'}>★</span>)}
  </span>
)

function HelperPhoto({ h }) {
  const [err, setErr] = useState(false)
  const initials = h.name.replace('.', '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const cls = 'w-full sm:w-60 shrink-0 aspect-[4/3] sm:aspect-square rounded-2xl'
  if (!h.image || err) return <div aria-hidden="true" style={{ background: h.colour || '#166534' }} className={`${cls} flex items-center justify-center text-white font-extrabold text-5xl select-none`}>{initials}</div>
  return <img src={h.image} alt={`Portrait of ${h.name}`} onError={() => setErr(true)} className={`${cls} object-cover object-top bg-stone-100`} />
}

const skillIcon = (s) => {
  const k = s.toLowerCase()
  if (k.includes('infant')) return '👶'
  if (k.includes('dementia')) return '💜'
  if (k.includes('night')) return '🌙'
  if (k.includes('eldercare') || k.includes('elderly') || k.includes('mobility')) return '🧓'
  if (k.includes('childcare')) return '🧒'
  if (k.includes('homework') || k.includes('school')) return '🎒'
  if (k.includes('pet')) return '🐾'
  if (k.includes('garden')) return '🌱'
  if (k.includes('laundry') || k.includes('ironing')) return '👕'
  if (k.includes('grocery') || k.includes('marketing')) return '🛒'
  if (k.includes('car')) return '🚗'
  if (k.includes('cooking')) return '🍳'
  if (k.includes('housekeeping')) return '🧹'
  return '⭐'
}
const levelDots = (lvl) => lvl === 'Experienced' ? 3 : lvl === 'Some experience' ? 2 : 1

function AskFeedbackModal({ h, onClose }) {
  const first = h.name.split(' ')[0]
  const link = `${window.location.origin}${window.location.pathname}#/feedback/${h.id}`
  const template = `Hello, I am ${h.name} from IndianHelper SG. I am building my profile there. Could you please leave feedback about my work? It takes 2 minutes: ${link}`
  const [copied, setCopied] = useState('')
  const copy = async (text, what) => {
    try { await navigator.clipboard.writeText(text); setCopied(what) }
    catch { setCopied('') }
    setTimeout(() => setCopied(''), 2500)
  }
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-3" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-extrabold text-deep-950 text-lg">Ask a past employer for feedback</h3>
          <button onClick={onClose} aria-label="Close" className="text-stone-400 hover:text-stone-700 text-xl leading-none">✕</button>
        </div>
        <p className="text-sm text-stone-600 mt-2">{first} can send this personal link to any employer she has worked for. Their feedback appears on this profile under “Feedback from employers”. <b>Feedback is free for both sides</b> — nobody pays anything for it.</p>
        <p className="text-xs font-semibold text-stone-500 mt-4 mb-1">{first}’s feedback link</p>
        <div className="flex gap-2">
          <input readOnly value={link} onFocus={e => e.target.select()} className="flex-1 min-w-0 text-xs bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-2 font-mono" />
          <button onClick={() => copy(link, 'link')} className="shrink-0 bg-deep-800 hover:bg-deep-900 text-white text-sm font-semibold rounded-lg px-3 py-2">{copied === 'link' ? 'Copied ✓' : 'Copy link'}</button>
        </div>
        <a href={`https://wa.me/?text=${encodeURIComponent(template)}`} target="_blank" rel="noreferrer" className="mt-3 block text-center bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl py-2.5 text-sm">💬 Send the request on WhatsApp</a>
        <p className="text-xs font-semibold text-stone-500 mt-4 mb-1">Message you can copy and send anywhere</p>
        <div className="bg-cream-50 border border-amber-200 rounded-xl p-3 text-sm text-stone-700">{template}</div>
        <button onClick={() => copy(template, 'msg')} className="mt-2 text-sm font-semibold text-deep-700 underline">{copied === 'msg' ? 'Copied ✓' : 'Copy this message'}</button>
        <p className="text-[11px] text-stone-400 mt-4">Note: in this prototype the feedback appears on the profile right away; in the real portal it is checked once before it shows.</p>
      </div>
    </div>
  )
}

export function Profile() {
  const { id } = useParams()
  const h = HELPERS.find(x => x.id === id)
  const { credits, isRevealed, reveal, setPackModal } = useStore()
  const [msg, setMsg] = useState('')
  const [showAsk, setShowAsk] = useState(false)
  if (!h) return <main className="max-w-3xl mx-auto px-4 py-16 text-center"><p className="font-bold">Profile not found.</p><Link to="/browse" className="text-deep-700 underline">Back to browse</Link></main>
  const revealed = isRevealed(h.id)
  const phone = phoneFor(h)
  const doReveal = () => {
    if (reveal(h)) setMsg('Number revealed — it is saved in My Reveals, and you never pay again for this helper.')
    else setMsg('')
  }
  const fb = feedbackFor(h)
  const fbSum = feedbackSummary(h)
  const first = h.name.split(' ')[0]
  const isMainSkill = (s) => {
    const k = s.toLowerCase()
    return k.includes(h.mainJob.split(' ')[0].toLowerCase()) || (h.mainJob === 'Housework' && k.includes('housekeeping')) || (h.mainJob === 'Infant care' && k.includes('childcare'))
  }
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/browse" className="text-sm text-deep-700 font-semibold">← Back to browse</Link>
      <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start mt-4">
        <div className="space-y-5">
          <section className="bg-white rounded-2xl border border-stone-200 p-5">
            <div className="flex flex-col sm:flex-row gap-5">
              <HelperPhoto h={h} />
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-extrabold text-deep-950">{h.name}, {h.age}</h1>
                {fbSum && <a href="#employer-feedback" className="inline-flex items-center gap-1.5 mt-1 text-sm"><StarRow n={fbSum.avg} /><span className="font-bold text-deep-900">{fbSum.avg.toFixed(1)}</span><span className="text-stone-500">({fbSum.count} employer review{fbSum.count === 1 ? '' : 's'})</span></a>}
                <p className="text-stone-500 text-sm mt-0.5">From {h.state}, India · Currently in {h.location}</p>
                <div className="flex gap-2 mt-2 flex-wrap"><StatusBadge s={h.status} /><span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-cream-100 border-amber-200">{h.available}</span><span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-green-50 border-green-200 text-green-800">✓ Confirmed available {h.confirmedDays === 0 ? 'today' : `${h.confirmedDays} days ago`}</span></div>
                <p className="mt-3 font-semibold text-deep-900">{h.mainJob} · {h.yearsSG} years in Singapore · {h.totalYears} years total experience</p>
                <div className="flex items-center gap-3 flex-wrap mt-4 pt-4 border-t border-stone-100">
                  <p className="text-sm text-stone-500">Expected salary<br /><span className="text-xl font-extrabold text-deep-800">{sgd(h.salary)}<span className="text-xs font-medium text-stone-500">/mo</span></span></p>
                  {!revealed
                    ? <button onClick={doReveal} className="ml-auto bg-deep-800 hover:bg-deep-900 text-white font-semibold rounded-xl px-5 py-3">Reveal her number · 1 credit</button>
                    : <p className="ml-auto font-mono font-bold bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 text-deep-900">{phone}</p>}
                </div>
                <p className="text-xs text-stone-400 mt-2">{revealed ? 'Number revealed — also saved in My Reveals.' : `Your balance: ${credits} credit${credits === 1 ? '' : 's'} · everything else on this profile is free to read.`}</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border-2 border-deep-700 p-5 shadow-card">
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h2 className="text-xl font-extrabold text-deep-950">⭐ Skills</h2>
              <p className="text-xs text-stone-500">● ● ● Experienced · ● ● ○ Some experience · ● ○ ○ Willing to learn</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              {h.skills.map(([s, l]) => (
                <div key={s} className={`rounded-2xl border p-3.5 flex flex-col items-center text-center gap-1.5 ${isMainSkill(s) ? 'border-deep-700 bg-green-50 ring-1 ring-deep-700' : 'border-stone-200 bg-cream-50'}`}>
                  <span className="text-4xl leading-none">{skillIcon(s)}</span>
                  <p className="text-sm font-semibold text-deep-950 leading-snug">{s}</p>
                  <span className="tracking-[0.2em] text-sm leading-none" aria-hidden="true">{[1, 2, 3].map(i => <span key={i} className={i <= levelDots(l) ? 'text-deep-700' : 'text-stone-300'}>●</span>)}</span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${isMainSkill(s) ? 'bg-deep-700 text-white' : 'bg-white border border-amber-300 text-deep-900'}`}>{l}{isMainSkill(s) ? ' · Main skill' : ''}</span>
                </div>
              ))}
            </div>
            <h3 className="font-bold mt-6 mb-2">Languages</h3>
            <div className="flex flex-wrap gap-2">{h.languages.map(([l, lv]) => <span key={l} className="text-sm bg-cream-100 border border-amber-200 rounded-full px-3 py-1">{l} — {lv}</span>)}</div>
            <h3 className="font-bold mt-5 mb-2">Cooking &amp; food handling</h3>
            <ul className="text-sm text-stone-700 space-y-1.5">
              <li>🍛 Cuisines: <b>{h.cuisines.join(', ')}</b></li>
              <li>🥬 Pure-vegetarian cooking: <b>{h.veg ? 'Yes' : 'No'}</b> · Jain / no onion-garlic: <b>{h.jain ? 'Yes' : 'No'}</b></li>
              <li>🥓 Can handle &amp; cook pork: <b>{h.pork ? 'Yes' : 'No'}</b> · Beef: <b>{h.beef ? 'Yes' : 'No'}</b></li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-stone-200 p-5">
            <h2 className="font-bold mb-1">About me</h2><p className="text-stone-700 text-sm leading-relaxed">{h.about}</p>
            <h2 className="font-bold mt-6 mb-1">What I am looking for</h2><p className="text-stone-700 text-sm leading-relaxed">{h.expects}</p>
          </section>

          <section id="employer-feedback" className="bg-white rounded-2xl border border-stone-200 p-5 scroll-mt-24">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h2 className="font-bold text-lg text-deep-950">Feedback from employers</h2>
                {fbSum
                  ? <p className="flex items-center gap-2 mt-1"><StarRow n={fbSum.avg} className="text-xl" /><span className="font-extrabold text-deep-900">{fbSum.avg.toFixed(1)} average</span><span className="text-sm text-stone-500">· {fbSum.count} review{fbSum.count === 1 ? '' : 's'}</span></p>
                  : <p className="text-sm text-stone-500 mt-1">No employer feedback yet.</p>}
              </div>
              <button onClick={() => setShowAsk(true)} className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl px-4 py-2.5">✉️ Ask for feedback</button>
            </div>
            {fb.length > 0 ? <div className="space-y-3 mt-4">{fb.map((f, i) => (
              <article key={i} className="bg-cream-50 border border-amber-100 rounded-2xl p-4">
                <div className="flex items-center gap-2 flex-wrap"><StarRow n={f.rating} />{f.recommend && <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-100 border border-green-300 text-green-800">👍 Would recommend</span>}<span className="text-xs text-stone-400 ml-auto">{f.date}</span></div>
                <p className="text-sm text-stone-700 leading-relaxed mt-2">“{f.text}”</p>
                <p className="text-xs text-stone-500 mt-2"><b className="text-deep-900">{f.employer}</b> · Employed her {f.period}</p>
              </article>))}
            </div> : <p className="text-sm text-stone-600 mt-3 bg-cream-50 border border-amber-100 rounded-xl p-3">No employer feedback yet — {first} is new here. Employers who have worked with her can add feedback free with her personal link.</p>}
            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3.5 text-sm text-stone-700">
              <b className="text-deep-900">Worked with {first} before?</b> You can leave feedback for her free — it helps her next employer choose with confidence. <button onClick={() => setShowAsk(true)} className="font-semibold text-deep-700 underline">Get her feedback link</button>
              <span className="block text-xs text-stone-500 mt-1">For helpers: this is your link to send to past employers — tap “Get her feedback link”.</span>
            </div>
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
      {showAsk && <AskFeedbackModal h={h} onClose={() => setShowAsk(false)} />}
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
