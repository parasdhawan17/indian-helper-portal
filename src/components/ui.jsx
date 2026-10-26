import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useStore, Avatar, StatusBadge } from '../store'
import { sgd, feedbackSummary } from '../data/helpers'

export function Header() {
  const { credits, setPackModal } = useStore()
  const [open, setOpen] = useState(false)
  const link = ({ isActive }) => `px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-green-100 text-deep-900' : 'text-stone-700 hover:bg-green-50'}`
  const links = <>
    <NavLink to="/browse" className={link}>Browse helpers</NavLink>
    <NavLink to="/journey" className={link}>Hiring journey</NavLink>
    <NavLink to="/pricing" className={link}>Pricing</NavLink>
    <NavLink to="/reveals" className={link}>My Reveals</NavLink>
    <NavLink to="/supplier" className={link}>For Suppliers</NavLink>
    <NavLink to="/join" className="px-3 py-2 rounded-lg text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600">Join as a Helper — free</NavLink>
  </>
  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur border-b border-amber-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-deep-900 text-lg mr-2"><span className="w-8 h-8 rounded-full bg-deep-800 text-white flex items-center justify-center text-sm">IH</span>IndianHelper <span className="text-amber-600">SG</span></Link>
        <nav className="hidden md:flex items-center gap-1 ml-auto">{links}</nav>
        <button onClick={() => setPackModal({ after: null })} className="ml-auto md:ml-2 text-sm font-semibold border border-deep-700 text-deep-800 rounded-full px-3 py-1.5 bg-white" title="Your reveal credits — tap to buy more">🎟️ {credits} credit{credits === 1 ? '' : 's'}</button>
        <button className="md:hidden ml-1 px-2 py-2 text-xl" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      </div>
      {open && <nav className="md:hidden border-t border-amber-200 bg-cream-50 px-4 py-3 flex flex-col gap-1" onClick={() => setOpen(false)}>{links}</nav>}
    </header>
  )
}

export function Footer() {
  const col = 'mt-2 space-y-1.5 text-green-200/80'
  return (
    <footer className="bg-deep-950 text-green-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div><p className="font-bold text-white text-base">IndianHelper SG</p><p className="mt-2 text-green-200/80">Indian helpers in Singapore, listed by themselves. Employers browse free and pay only to reveal a contact number. Helpers always list free.</p><p className="mt-3 text-green-200/80">Stay safe: never pay anyone who asks a helper for money to be listed. Report a wrong number within 7 days and the credit is restored.</p></div>
        <div><p className="font-semibold text-white">Product</p><ul className={col}><li><Link className="hover:text-white" to="/browse">Browse helpers</Link></li><li><Link className="hover:text-white" to="/pricing">Pricing — packs in ₹, UPI</Link></li><li><Link className="hover:text-white" to="/reveals">My Reveals</Link></li><li><Link className="hover:text-white" to="/join">Join as a Helper — free</Link></li><li><Link className="hover:text-white" to="/supplier">For Suppliers — list your helpers</Link></li></ul></div>
        <div><p className="font-semibold text-white">Company</p><ul className={col}><li><Link className="hover:text-white" to="/journey">About the hiring process</Link></li><li><Link className="hover:text-white" to="/terms">Terms of Use</Link></li><li><Link className="hover:text-white" to="/privacy">Privacy Policy</Link></li></ul></div>
        <div><p className="font-semibold text-white">Resources</p><ul className={col}><li><Link className="hover:text-white" to="/journey">Hiring Journey — 6 stages</Link></li><li><Link className="hover:text-white" to="/journey">Cost calculator (S$)</Link></li><li><Link className="hover:text-white" to="/journey">Transfer process tracker</Link></li><li><a className="hover:text-white" href="https://www.mom.gov.sg/passes-and-permits/work-permit-for-foreign-domestic-worker" target="_blank" rel="noreferrer">MOM — Work Permit for FDW ↗</a></li></ul></div>
      </div>
      <div className="border-t border-white/10"><div className="max-w-6xl mx-auto px-4 py-5 text-xs text-green-200/70 space-y-2">
        <p>This portal is an internet listing portal. It is not an employment agency and does not hold an MOM employment agency licence. Employers and helpers connect and make their own arrangements directly.</p>
        <p>Prototype — sample profiles and AI-generated photos. All helpers, numbers and stories on this site are fictional, for demonstration only.</p>
      </div></div>
    </footer>
  )
}

function CardPhoto({ h }) {
  const [err, setErr] = useState(false)
  const initials = h.name.replace('.', '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  if (!h.image || err) return <div aria-hidden="true" style={{ background: h.colour || '#166534' }} className="w-full h-48 flex items-center justify-center text-white font-extrabold text-4xl select-none">{initials}</div>
  return <img src={h.image} alt={`Portrait of ${h.name}`} loading="lazy" onError={() => setErr(true)} className="w-full h-48 object-cover object-top bg-stone-100" />
}

export function HelperCard({ h }) {
  const nav = useNavigate()
  const [saved, setSaved] = useState(() => { try { return JSON.parse(localStorage.getItem('ihsg_saved') || '[]').includes(h.id) } catch { return false } })
  const toggleSave = (e) => {
    e.stopPropagation()
    try { const cur = JSON.parse(localStorage.getItem('ihsg_saved') || '[]'); const next = saved ? cur.filter(x => x !== h.id) : [...cur, h.id]; localStorage.setItem('ihsg_saved', JSON.stringify(next)) } catch {}
    setSaved(!saved)
  }
  return (
    <article className="bg-white rounded-2xl shadow-card border border-stone-100 overflow-hidden flex flex-col hover:shadow-lg transition">
      <div className="relative shrink-0">
        <CardPhoto h={h} />
        <button onClick={toggleSave} aria-label={saved ? 'Remove from saved' : 'Save this helper'} title={saved ? 'Saved' : 'Save'} className={`absolute top-2.5 right-2.5 shrink-0 w-9 h-9 rounded-full border flex items-center justify-center text-base shadow-sm ${saved ? 'bg-amber-100 border-amber-400' : 'bg-white/95 border-stone-200 hover:border-amber-400'}`}>{saved ? '🔖' : '🏷️'}</button>
        <div className="absolute bottom-2.5 left-2.5"><StatusBadge s={h.status} /></div>
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
      <div className="min-w-0">
        <h3 className="font-bold text-deep-950 truncate">{h.name}, {h.age}</h3>
        <p className="text-xs text-stone-500">{h.state} · In {h.location}</p>
      </div>
      <p className="text-sm font-semibold text-deep-900 -mt-1">{h.mainJob}</p>
      {h.listedBy && <p className="-mt-1"><span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full border bg-amber-100 border-amber-300 text-amber-800">🏢 Supplier-listed · free callback</span></p>}
      <div className="flex items-center gap-x-3 gap-y-1 flex-wrap text-xs text-stone-600 -mt-1">
        <span>⭐ {h.yearsSG > 0 ? `${h.yearsSG} yrs in SG` : 'New to SG'}</span><span>·</span><span>{h.totalYears} yrs total exp.</span><span>·</span><span>✓ Confirmed {h.confirmedDays === 0 ? 'today' : `${h.confirmedDays}d ago`}</span>
        {(() => { const fs = feedbackSummary(h); return fs ? <><span>·</span><span><span className="text-amber-500">★</span> <b className="text-deep-900">{fs.avg.toFixed(1)}</b> ({fs.count} review{fs.count === 1 ? '' : 's'})</span></> : null })()}
      </div>
      <p className="text-sm text-stone-600 line-clamp-2">{h.about}</p>
      <div className="flex flex-wrap gap-1.5">
        {h.languages.slice(0, 3).map(([l]) => <span key={l} className="text-[11px] bg-cream-100 border border-amber-200 rounded-full px-2 py-0.5">{l}</span>)}
        {h.veg && <span className="text-[11px] bg-green-50 border border-green-200 text-green-800 rounded-full px-2 py-0.5">Pure-veg cooking</span>}
        {h.cuisines.slice(0, 1).map(c => <span key={c} className="text-[11px] bg-cream-100 border border-amber-200 rounded-full px-2 py-0.5">{c}</span>)}
      </div>
      <div className="mt-auto pt-2 border-t border-stone-100 flex items-end justify-between gap-2">
        <div><p className="font-extrabold text-deep-800 text-lg leading-none">{sgd(h.salary)}<span className="text-xs font-medium text-stone-500">/mo expected</span></p><p className="text-[11px] text-stone-500 mt-1">{h.restDays} rest day{h.restDays > 1 ? 's' : ''}/mo · {h.available}</p></div>
        <button onClick={() => nav('/helper/' + h.id)} className="shrink-0 bg-deep-800 hover:bg-deep-900 text-white text-sm font-semibold rounded-xl px-4 py-2">View profile</button>
      </div>
      </div>
    </article>
  )
}
export const SectionTitle = ({ children, sub }) => <div className="mb-6"><h2 className="text-2xl font-extrabold text-deep-950">{children}</h2>{sub && <p className="text-stone-600 mt-1">{sub}</p>}</div>
