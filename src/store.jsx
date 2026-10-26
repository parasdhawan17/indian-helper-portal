import React, { createContext, useContext, useEffect, useState } from 'react'
import { PACKS, inr, phoneFor } from './data/helpers'

const Ctx = createContext(null)
export const useStore = () => useContext(Ctx)
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d } catch { return d } }

export function StoreProvider({ children }) {
  const [credits, setCredits] = useState(() => load('ihsg_credits', 0))
  const [reveals, setReveals] = useState(() => load('ihsg_reveals', [])) // [{id, date, restored}]
  const [packModal, setPackModal] = useState(null) // null | {after: helperId|null}
  useEffect(() => { localStorage.setItem('ihsg_credits', JSON.stringify(credits)) }, [credits])
  useEffect(() => { localStorage.setItem('ihsg_reveals', JSON.stringify(reveals)) }, [reveals])
  const isRevealed = (id) => reveals.some(r => r.id === id && !r.restored)
  const buyPack = (pack) => { setCredits(c => c + pack.credits) }
  const reveal = (helper) => {
    if (isRevealed(helper.id)) return true
    if (credits < 1) { setPackModal({ after: helper.id }); return false }
    setCredits(c => c - 1)
    setReveals(r => [{ id: helper.id, date: new Date().toISOString(), restored: false }, ...r])
    return true
  }
  const restoreCredit = (id) => { setReveals(r => r.map(x => x.id === id ? { ...x, restored: true } : x)); setCredits(c => c + 1) }
  return <Ctx.Provider value={{ credits, reveals, isRevealed, reveal, buyPack, restoreCredit, packModal, setPackModal }}>{children}</Ctx.Provider>
}

export function Avatar({ h, size = 64 }) {
  const initials = h.name.replace('.', '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return <div aria-hidden="true" style={{ width: size, height: size, background: h.colour || '#166534' }} className="rounded-full shrink-0 flex items-center justify-center text-white font-bold select-none">{initials}</div>
}
export const StatusBadge = ({ s }) => {
  const map = { 'Transfer': 'bg-amber-100 text-amber-800 border-amber-300', 'Finished contract': 'bg-green-100 text-green-800 border-green-300', 'Ex-Singapore': 'bg-sky-100 text-sky-800 border-sky-300', 'Fresh': 'bg-stone-100 text-stone-700 border-stone-300' }
  return <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full border ${map[s] || map['Fresh']}`}>{s}</span>
}

export function PackModal() {
  const { packModal, setPackModal, buyPack, credits } = useStore()
  const [pack, setPack] = useState(PACKS[1])
  const [step, setStep] = useState('pick') // pick | pay | verifying | done
  const [upiId, setUpiId] = useState('')
  if (!packModal) return null
  const close = () => { setPackModal(null); setStep('pick'); setUpiId('') }
  const pay = () => { setStep('verifying'); setTimeout(() => { buyPack(pack); setStep('done') }, 900) }
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-label="Buy reveal credits with UPI">
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-5 max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg text-deep-900">{step === 'pick' ? 'Buy reveal credits' : step === 'done' ? 'Payment successful' : 'Pay with UPI'}</h3>
          <button onClick={close} className="text-stone-500 text-xl leading-none px-2" aria-label="Close">×</button>
        </div>
        {step === 'pick' && <>
          <p className="text-sm text-stone-600 mt-1">You have {credits} credit{credits === 1 ? '' : 's'}. 1 credit reveals 1 helper's contact number, forever for your account. Prices are in Indian rupees (₹), paid by UPI.</p>
          <div className="space-y-2 mt-4">
            {PACKS.map(p => (
              <button key={p.id} onClick={() => setPack(p)} className={`w-full text-left border rounded-xl p-3 flex justify-between items-center ${pack.id === p.id ? 'border-deep-700 bg-green-50 ring-1 ring-deep-700' : 'border-stone-200'}`}>
                <span><span className="font-semibold block">{p.name} {p.hero && <span className="text-[11px] bg-amber-500 text-white px-2 py-0.5 rounded-full ml-1">Most chosen</span>}</span><span className="text-xs text-stone-500">{inr(p.per)} per reveal</span></span>
                <span className="font-bold text-deep-800">{inr(p.price)}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setStep('pay')} className="mt-4 w-full bg-deep-800 hover:bg-deep-900 text-white font-semibold rounded-xl py-3">Continue to UPI payment · {inr(pack.price)}</button>
          <p className="text-xs text-stone-500 mt-2">Invalid-number guarantee: if a revealed number is wrong or belongs to someone else, report it within 7 days and the credit is restored. Helpers never pay anything on this portal.</p>
        </>}
        {step === 'pay' && <>
          <p className="text-sm text-stone-600 mt-1">{pack.name} — <b>{inr(pack.price)}</b> for {pack.credits} reveal credit{pack.credits > 1 ? 's' : ''}. Pay by any UPI app:</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'].map(a => <span key={a} className="text-xs font-bold border border-stone-300 bg-stone-50 rounded-lg px-3 py-1.5">{a}</span>)}
          </div>
          <div className="mt-4 border-2 border-dashed border-stone-300 rounded-xl p-4 flex items-center gap-4">
            <div className="w-24 h-24 shrink-0 bg-stone-900 rounded-lg grid grid-cols-4 grid-rows-4 gap-0.5 p-1.5" aria-hidden="true">
              {Array.from({ length: 16 }).map((_, i) => <div key={i} className={`${[0,1,4,3,12,15].includes(i) ? 'bg-white' : 'bg-stone-700'} rounded-[2px]`} />)}
            </div>
            <div className="text-sm"><b>Scan to pay {inr(pack.price)}</b><p className="text-stone-500 text-xs mt-1">Prototype QR placeholder — no real payment is taken. Merchant UPI ID:</p><p className="font-mono text-xs mt-1 bg-stone-100 rounded px-2 py-1 inline-block">indianhelpersg@upi</p></div>
          </div>
          <label className="block text-sm font-medium mt-4">Your UPI ID (for the mock verification)
            <input value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@okbank" className="mt-1 w-full border border-stone-300 rounded-xl px-3 py-2.5" />
          </label>
          <button onClick={pay} className="mt-4 w-full bg-deep-800 hover:bg-deep-900 text-white font-semibold rounded-xl py-3">I've paid — verify &amp; continue</button>
          <button onClick={() => setStep('pick')} className="mt-2 w-full text-sm text-stone-500 py-1">← Choose a different pack</button>
        </>}
        {step === 'verifying' && <div className="py-10 text-center"><div className="animate-pulse text-4xl" aria-hidden="true">⏳</div><p className="mt-3 text-sm text-stone-600">Verifying your UPI payment… (mock)</p></div>}
        {step === 'done' && <>
          <div className="text-center py-4"><div className="text-4xl" aria-hidden="true">✅</div><p className="mt-2 text-sm text-stone-700"><b>{pack.credits} credit{pack.credits > 1 ? 's' : ''} added.</b> This was a mock UPI checkout — no money moved.</p></div>
          <button onClick={close} className="w-full bg-deep-800 hover:bg-deep-900 text-white font-semibold rounded-xl py-3">Continue</button>
          {packModal.after && <p className="text-xs text-stone-500 mt-2 text-center">Now tap “Reveal her number” again on the profile to use 1 credit.</p>}
        </>}
      </div>
    </div>
  )
}
