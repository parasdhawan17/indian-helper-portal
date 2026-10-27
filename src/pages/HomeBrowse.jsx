import React, { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { HELPERS, allHelpers, activeHelpers, MAIN_JOBS, STATES, LANGUAGES, STATUSES, inr, feedbackSummary } from '../data/helpers'
import { HelperCard, SectionTitle } from '../components/ui'

const FAQS = [
  ['Is it really free for helpers?', 'Yes — always. A helper pays nothing to create a profile, to be listed, to be contacted, or when she is hired. Only employers pay, and only to reveal a contact number.'],
  ['What do employers pay for?', 'Employers browse and read full profiles for free. They pay only to reveal a helper\u2019s contact number. Reveal packs are priced in Indian rupees and paid by UPI: a single reveal is ₹499, a pack of 5 is ₹1,499, and a pack of 10 is ₹2,499.'],
  ['Are salaries and hiring costs also in rupees?', 'No. Salaries, the MOM levy, insurance and other Singapore hiring costs are in Singapore dollars (S$), because hiring happens in Singapore under MOM rules. Only this portal\u2019s own reveal packs are in ₹.'],
  ['What if a revealed number is wrong?', 'Report it within 7 days. If the number is wrong, disconnected, or belongs to someone else, your credit is restored.'],
  ['Is this an agency?', 'No. This is an internet listing portal. It does not hold an MOM employment agency licence. Employers and helpers connect and make their own arrangements directly — the free Hiring Journey guides explain every MOM step.'],
]

export function Home() {
  const nav = useNavigate()
  const [q, setQ] = useState(''); const [job, setJob] = useState('')
  const [openFaq, setOpenFaq] = useState(0)
  const featured = activeHelpers().filter(h => ['manjit', 'anju', 'mary', 'pooja'].includes(h.id))
  const go = (e) => { e.preventDefault(); nav(`/browse?q=${encodeURIComponent(q)}&job=${encodeURIComponent(job)}`) }
  return (
    <main>
      <section className="bg-gradient-to-b from-green-50 to-cream-100 border-b border-amber-100">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 items-center">
            <div className="text-center lg:text-left">
              <p className="inline-block bg-white border border-amber-300 text-amber-700 text-xs font-bold rounded-full px-3 py-1">🇮🇳 Indian helpers · 🇸🇬 Singapore homes</p>
              <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-deep-950 leading-tight">Find an Indian helper<br className="hidden md:block" /> your family can talk to.</h1>
              <p className="mt-3 text-stone-600 max-w-2xl mx-auto lg:mx-0">Read every profile in full — languages, cooking, experience, salary and rest days — for free. Pay only when you want to reveal her number and speak with her directly.</p>
              <form onSubmit={go} className="mt-6 bg-white rounded-2xl shadow-card p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto lg:mx-0 text-left">
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="Try “newborn”, “dementia”, “Jain cooking”, “dog”…" className="flex-1 px-3 py-2.5 rounded-xl outline-none" aria-label="Keyword search" />
                <select value={job} onChange={e => setJob(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white" aria-label="Main job">
                  <option value="">All main jobs</option>{MAIN_JOBS.map(j => <option key={j}>{j}</option>)}
                </select>
                <button className="bg-deep-800 hover:bg-deep-900 text-white font-semibold rounded-xl px-6 py-2.5">Search</button>
              </form>
            </div>
            <div className="relative max-w-xl mx-auto w-full lg:max-w-none">
              <img src="/images/hero-helper.jpg" alt="An Indian helper watering a plant in a bright Singapore apartment" className="w-full rounded-3xl shadow-card object-cover aspect-[4/3] lg:aspect-[5/4] bg-stone-100" />
              {(() => { const m = HELPERS.find(x => x.id === 'manjit'); const fs = feedbackSummary(m); return (
                <Link to="/helper/manjit" className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-2xl shadow-card px-3 py-2 flex items-center gap-2.5 hover:shadow-lg transition">
                  <img src={m.image} alt="" className="w-10 h-10 rounded-full object-cover object-top" />
                  <span className="text-left leading-tight">
                    <span className="block text-sm font-bold text-deep-950">{m.name} · {m.mainJob}</span>
                    <span className="block text-xs text-stone-500"><span className="text-amber-500">★</span> {fs ? fs.avg.toFixed(1) : '—'} · Employer feedback ({fs ? fs.count : 0})</span>
                  </span>
                </Link>) })()}
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-center">
            {[['12+', 'Indian helper profiles'], ['100%', 'Free to browse & read'], ['₹499', 'From, per reveal · UPI'], ['S$0', 'Fees charged to helpers']].map(([n, l]) => <div key={l} className="bg-white/70 rounded-xl py-3 px-2"><p className="font-extrabold text-deep-900 text-lg">{n}</p><p className="text-xs text-stone-500">{l}</p></div>)}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <SectionTitle sub="Two sides, one simple rule: discovery is free, contact is what you pay for.">How it works</SectionTitle>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-green-200 p-5">
            <h3 className="font-bold text-deep-900">For helpers — always free</h3>
            <ol className="mt-3 space-y-2 text-sm text-stone-700 list-decimal list-inside">
              <li>Create your profile in about 10 minutes — skills, languages, cooking, the job you want.</li>
              <li>Employers in Singapore read your profile. Your number stays hidden.</li>
              <li>Only an employer who has paid can reveal your number and contact you.</li>
            </ol>
            <Link to="/join" className="inline-block mt-4 bg-deep-800 text-white font-semibold rounded-xl px-4 py-2.5 text-sm">Create my free profile</Link>
          </div>
          <div className="bg-white rounded-2xl border border-amber-200 p-5">
            <h3 className="font-bold text-deep-900">For employers — browse free, pay to reveal</h3>
            <ol className="mt-3 space-y-2 text-sm text-stone-700 list-decimal list-inside">
              <li>Search with filters and read full profiles — no payment to browse.</li>
              <li>Shortlist the helpers who fit your home, salary and rest days.</li>
              <li>Reveal a number for 1 credit, then call or WhatsApp her directly and arrange everything yourselves, guided by the free Hiring Journey.</li>
            </ol>
            <Link to="/browse" className="inline-block mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl px-4 py-2.5 text-sm">Browse helpers</Link>
          </div>
        </div>
        <div className="mt-4 bg-deep-950 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1">
            <h3 className="font-bold text-white">🏢 For suppliers — list your helpers</h3>
            <p className="text-sm text-green-200/80 mt-1">Add profiles of your helpers for free, and keep them active for ₹999/month — no limit on profiles. Employers read them and request callbacks; while your plan is active you unlock employers' numbers at no extra charge. Helpers are never charged.</p>
          </div>
          <Link to="/supplier" className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl px-4 py-2.5 text-sm text-center">Supplier sign-up →</Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-4">
        <SectionTitle sub="Real statuses, real availability dates, expected salary and rest days shown up front.">Featured helpers</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{featured.map(h => <HelperCard key={h.id} h={h} />)}</div>
        <div className="text-center mt-6"><Link to="/browse" className="font-semibold text-deep-800 underline">See all helpers →</Link></div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <SectionTitle sub="Sample stories from the prototype — how the two sides use the portal.">What employers and helpers say</SectionTitle>
        <div className="grid md:grid-cols-3 gap-4">
          {[['“We needed a Punjabi-speaking helper for my father who speaks no English. We read six full profiles for free on a Sunday, revealed two numbers, and interviewed both in person that week.”', 'Employer, hiring for elderly parents · sample story'],
            ['“On the Facebook groups my number was open to everyone. Here, only an employer who has paid sees my number. And listing cost me nothing.”', 'Transfer helper from Punjab · sample story'],
            ['“The cost calculator was the first time the full S$ picture was clear to us — salary, levy, insurance — before we spoke to anyone. No surprises later.”', 'First-time employer, infant care · sample story']].map(([q, a]) => (
            <figure key={a} className="bg-white rounded-2xl border border-stone-200 p-5"><div className="text-amber-500" aria-hidden="true">★★★★★</div><blockquote className="text-sm text-stone-700 mt-2">{q}</blockquote><figcaption className="text-xs text-stone-500 mt-3 font-medium">{a}</figcaption></figure>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <SectionTitle sub="A direct hire means you do the MOM steps yourself. We teach you every one — free, whether or not you ever buy a reveal.">The Hiring Journey, in 6 stages</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[['0 · Eligibility & EOP', 'Can you hire? First-time employers must do the Employers\u2019 Orientation Programme first.'], ['1 · Which type of hire', 'Transfer, finished contract, ex-Singapore or fresh — timelines from about 1 week to 8 weeks.'], ['2 · The true cost', 'Salary + levy + insurance + medicals, in S$. Use the interactive calculator.'], ['3 · Interview well', 'Question kits for infant care, eldercare and cooking — and the questions both sides forget.'], ['4 · Agree in writing', 'Salary, rest days, duties, sleeping, food and the phone rule — agreed before paperwork.'], ['5 · MOM steps & first 90 days', 'Consent, Work Permit, IPA, medical, card — plus your monthly duties after she starts.']].map(([t, d]) => (
            <Link key={t} to="/journey" className="bg-white rounded-2xl border border-stone-200 p-4 hover:border-deep-700"><h3 className="font-bold text-deep-900 text-sm">{t}</h3><p className="text-sm text-stone-600 mt-1">{d}</p></Link>
          ))}
        </div>
      </section>

      <section className="bg-cream-100 border-y border-amber-200">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <SectionTitle sub="Priced in Indian rupees, paid by UPI. One credit reveals one number — yours to keep.">Reveal packs</SectionTitle>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="bg-white rounded-2xl border border-stone-200 px-6 py-4"><p className="font-bold">Single reveal</p><p className="text-2xl font-extrabold text-deep-900">{inr(499)}</p></div>
            <div className="bg-white rounded-2xl border-2 border-deep-700 px-6 py-4 relative"><span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">Most chosen</span><p className="font-bold">Pack of 5</p><p className="text-2xl font-extrabold text-deep-900">{inr(1499)}</p><p className="text-xs text-stone-500">{inr(300)} per reveal</p></div>
            <div className="bg-white rounded-2xl border border-stone-200 px-6 py-4"><p className="font-bold">Pack of 10</p><p className="text-2xl font-extrabold text-deep-900">{inr(2499)}</p><p className="text-xs text-stone-500">{inr(250)} per reveal</p></div>
          </div>
          <Link to="/pricing" className="inline-block mt-5 font-semibold text-deep-800 underline">See pricing &amp; the invalid-number guarantee →</Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <SectionTitle>Common questions</SectionTitle>
        <div className="space-y-2">{FAQS.map(([q, a], i) => (
          <div key={q} className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            <button className="w-full text-left px-4 py-3 font-semibold text-sm flex justify-between" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>{q}<span>{openFaq === i ? '−' : '+'}</span></button>
            {openFaq === i && <p className="px-4 pb-4 text-sm text-stone-600">{a}</p>}
          </div>))}</div>
      </section>
    </main>
  )
}

export function Browse() {
  const [sp, setSp] = useSearchParams()
  const q = sp.get('q') || ''
  const [job, setJob] = useState(sp.get('job') || '')
  const [status, setStatus] = useState(''); const [state, setState] = useState(''); const [lang, setLang] = useState('')
  const [listedBy, setListedBy] = useState('')
  const [maxSalary, setMaxSalary] = useState(1000); const [maxRest, setMaxRest] = useState(4); const [vegOnly, setVegOnly] = useState(false)
  const [sort, setSort] = useState('confirmed')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const list = useMemo(() => {
    let r = activeHelpers().filter(h =>
      (!q || (h.name + h.about + h.mainJob + h.state + h.cuisines.join(' ') + h.skills.map(s => s[0]).join(' ') + ' ' + (h.listedBy ? h.listedBy.name : '')).toLowerCase().includes(q.toLowerCase())) &&
      (!job || h.mainJob === job) && (!status || h.status === status) && (!state || h.state === state) &&
      (!listedBy || (listedBy === 'supplier' ? !!h.listedBy : !h.listedBy)) &&
      (!lang || h.languages.some(([l]) => l === lang)) && h.salary <= maxSalary && h.restDays <= maxRest && (!vegOnly || h.veg))
    if (sort === 'confirmed') r = [...r].sort((a, b) => a.confirmedDays - b.confirmedDays)
    if (sort === 'salary') r = [...r].sort((a, b) => a.salary - b.salary)
    if (sort === 'exp') r = [...r].sort((a, b) => b.yearsSG - a.yearsSG)
    return r
  }, [q, job, status, state, lang, listedBy, maxSalary, maxRest, vegOnly, sort])
  const sel = 'w-full border border-stone-300 rounded-xl px-3 py-2 text-sm bg-white'
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <SectionTitle sub="Every profile is free to read in full. On direct profiles you pay only to reveal a number; supplier-listed profiles take a free callback request instead. Salaries are in S$ — that is what helpers in Singapore are paid.">Browse Indian helpers in Singapore</SectionTitle>
      <button onClick={() => setFiltersOpen(!filtersOpen)} className="lg:hidden mb-3 w-full bg-white border border-stone-300 rounded-xl py-2.5 font-semibold text-sm" aria-expanded={filtersOpen}>🎛️ Filters &amp; sort {filtersOpen ? '▲' : '▼'}</button>
      <div className="grid lg:grid-cols-[260px_1fr] gap-6 items-start">
        <aside className={`${filtersOpen ? 'block' : 'hidden'} lg:block bg-white rounded-2xl border border-stone-200 p-4 space-y-4 lg:sticky lg:top-20`}>
          <div><label className="text-xs font-bold text-stone-500">SEARCH</label><input value={q} onChange={e => setSp(e.target.value ? { q: e.target.value } : {}, { replace: true })} placeholder="Keyword, skill, cuisine…" className={sel + ' mt-1'} /></div>
          <div><label className="text-xs font-bold text-stone-500">MAIN JOB</label><select value={job} onChange={e => setJob(e.target.value)} className={sel + ' mt-1'}><option value="">Any</option>{MAIN_JOBS.map(j => <option key={j}>{j}</option>)}</select></div>
          <div><label className="text-xs font-bold text-stone-500">STATUS</label><select value={status} onChange={e => setStatus(e.target.value)} className={sel + ' mt-1'}><option value="">Any status</option>{STATUSES.map(s => <option key={s}>{s}</option>)}</select></div>
          <div><label className="text-xs font-bold text-stone-500">LISTED BY</label><select value={listedBy} onChange={e => setListedBy(e.target.value)} className={sel + ' mt-1'}><option value="">All</option><option value="direct">Direct helpers</option><option value="supplier">Suppliers</option></select></div>
          <div><label className="text-xs font-bold text-stone-500">STATE (INDIA)</label><select value={state} onChange={e => setState(e.target.value)} className={sel + ' mt-1'}><option value="">Any state</option>{STATES.map(s => <option key={s}>{s}</option>)}</select></div>
          <div><label className="text-xs font-bold text-stone-500">LANGUAGE</label><select value={lang} onChange={e => setLang(e.target.value)} className={sel + ' mt-1'}><option value="">Any language</option>{LANGUAGES.map(s => <option key={s}>{s}</option>)}</select></div>
          <div><label className="text-xs font-bold text-stone-500 flex justify-between"><span>MAX EXPECTED SALARY</span><span>S${maxSalary}</span></label><input type="range" min="550" max="1000" step="10" value={maxSalary} onChange={e => setMaxSalary(+e.target.value)} className="w-full accent-green-800" /></div>
          <div><label className="text-xs font-bold text-stone-500 flex justify-between"><span>MAX REST DAYS SHE EXPECTS</span><span>{maxRest}/mo</span></label><input type="range" min="1" max="4" step="1" value={maxRest} onChange={e => setMaxRest(+e.target.value)} className="w-full accent-green-800" /></div>
          <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={vegOnly} onChange={e => setVegOnly(e.target.checked)} className="w-4 h-4 accent-green-800" /> Pure-veg cooking only</label>
          <div><label className="text-xs font-bold text-stone-500">SORT BY</label><select value={sort} onChange={e => setSort(e.target.value)} className={sel + ' mt-1'}><option value="confirmed">Most recently confirmed</option><option value="salary">Salary: low to high</option><option value="exp">Most Singapore experience</option></select></div>
          <button onClick={() => { setJob(''); setStatus(''); setState(''); setLang(''); setListedBy(''); setMaxSalary(1000); setMaxRest(4); setVegOnly(false); setSp({}) }} className="text-sm text-deep-700 font-semibold underline">Clear all filters</button>
        </aside>
        <div>
          <p className="text-sm text-stone-500 mb-3">{list.length} helper{list.length !== 1 ? 's' : ''} found</p>
          {list.length === 0 ? <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-stone-600">No helpers match those filters yet. Try a higher salary, or clear a filter.</div>
            : <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">{list.map(h => <HelperCard key={h.id} h={h} />)}</div>}
        </div>
      </div>
    </main>
  )
}
