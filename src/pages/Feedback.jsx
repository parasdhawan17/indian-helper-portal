import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { allHelpers } from '../data/helpers'
import { Avatar } from '../store'

const publicName = (full) => {
  const parts = full.trim().split(/\s+/)
  if (parts.length < 2) return parts[0]
  return `${parts[0]} ${parts[parts.length - 1][0]}.`
}

// Category ratings — same keys are used in the seed data and on the profile.
export const FB_CATEGORIES = [
  ['cooking', 'Cooking'],
  ['cleaning', 'Cleaning & housekeeping'],
  ['care', 'Care of children / elderly'],
  ['reliability', 'Reliability & honesty'],
  ['communication', 'Communication'],
]

// Master strengths list (grouped) — shown for every helper.
export const FB_STRENGTH_GROUPS = [
  { title: 'Care', items: ['Patient with elderly', 'Gentle with babies', 'Great with children', 'Follows medicine & care instructions carefully', 'Alert in emergencies'] },
  { title: 'Food', items: ['Excellent Indian cooking', 'North Indian food', 'South Indian food', 'Pure-veg cooking', 'Jain / no onion-garlic cooking', 'Plans weekly menus', 'Good with groceries & marketing'] },
  { title: 'Home', items: ['Deep cleaning', 'Very organised', 'Laundry & ironing expert', 'Manages the home independently'] },
  { title: 'Character & work style', items: ['Honest & trustworthy', 'Always on time', 'Works without supervision', 'Fast learner', 'Calm under pressure', 'Good English', 'Keeps phone away while working', 'Stayed with us long-term'] },
]

// Areas to improve — honest, kindly-worded options.
export const FB_IMPROVEMENTS = ['Cooking variety', 'English communication', 'Speed of work', 'Needs reminders at first', 'Time management', 'Uses phone during work hours', 'Confidence with new tasks', 'Ironing finish', 'Planning groceries', 'Childcare experience', 'Eldercare experience', 'Handling pets']

// Interactive 1–5 star picker (used for the overall rating and each category).
function StarPicker({ value, onPick, size = 'text-3xl' }) {
  const [hover, setHover] = useState(0)
  return (
    <span className="inline-flex gap-0.5" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map(i => (
        <button type="button" key={i} aria-label={`${i} star${i > 1 ? 's' : ''}`}
          onMouseEnter={() => setHover(i)} onClick={() => onPick(i)}
          className={`${size} leading-none transition ${(hover || value) >= i ? 'text-amber-500' : 'text-stone-300'}`}>★</button>
      ))}
    </span>
  )
}

const chipCls = (on, tone) => on
  ? (tone === 'amber' ? 'bg-amber-500 text-white border-amber-500' : 'bg-deep-700 text-white border-deep-700')
  : (tone === 'amber' ? 'bg-white border-amber-300 text-amber-900 hover:border-amber-500' : 'bg-cream-100 border-amber-200 text-deep-900 hover:border-deep-700')

export function FeedbackForm() {
  const { id } = useParams()
  const h = allHelpers().find(x => x.id === id)
  const [name, setName] = useState('')
  const [area, setArea] = useState('')
  const [period, setPeriod] = useState('')
  const [refPhone, setRefPhone] = useState('')
  const [rating, setRating] = useState(0)
  const [cats, setCats] = useState({})
  const [recommend, setRecommend] = useState(null)
  const [rehire, setRehire] = useState(null)
  const [strengths, setStrengths] = useState([])
  const [improvements, setImprovements] = useState([])
  const [improveText, setImproveText] = useState('')
  const [text, setText] = useState('')
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  if (!h) return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-center">
      <p className="text-4xl mb-3">🔍</p>
      <p className="font-bold text-lg">We could not find that helper.</p>
      <p className="text-sm text-stone-600 mt-1">The feedback link may be incomplete or the profile may have been removed. Please check the link with the helper who sent it to you.</p>
      <Link to="/browse" className="inline-block mt-4 font-semibold text-deep-700 underline">Browse helpers instead →</Link>
    </main>
  )

  const first = h.name.split(' ')[0]
  const toggleIn = (list, setList) => (s) => setList(cur => cur.includes(s) ? cur.filter(x => x !== s) : [...cur, s])
  const toggleStrength = toggleIn(strengths, setStrengths)
  const toggleImprovement = toggleIn(improvements, setImprovements)

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!name.trim()) errs.name = 'Please tell us your name.'
    if (!area.trim()) errs.area = 'Please add your area or neighbourhood.'
    if (!period.trim()) errs.period = 'Please add the period she worked for you, e.g. 2023 – 2025.'
    if ((refPhone.replace(/\D/g, '').length) < 8) errs.refPhone = 'Please add your mobile number (at least 8 digits) so employers can call you as a reference.'
    if (!rating) errs.rating = 'Please tap a star rating.'
    const missingCats = FB_CATEGORIES.filter(([k]) => !cats[k])
    if (missingCats.length) errs.cats = `Please rate each area — still to rate: ${missingCats.map(([, l]) => l).join(', ')}.`
    if (recommend === null) errs.recommend = 'Please choose Yes or No.'
    if (rehire === null) errs.rehire = 'Please choose Yes or No.'
    if (text.trim().length < 30) errs.text = `Please write a little more (at least 30 characters) — what did ${first} do well?`
    setErrors(errs)
    if (Object.keys(errs).length) return
    const entry = {
      employer: `${publicName(name)} · ${area.trim()}`,
      period: period.trim(),
      rating,
      recommend,
      rehire,
      text: text.trim(),
      cats: Object.fromEntries(FB_CATEGORIES.map(([k]) => [k, cats[k]])),
      strengths,
      improvements,
      improveText: improveText.trim(),
      refPhone: refPhone.trim(),
      date: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
    }
    try {
      const all = JSON.parse(localStorage.getItem('ihp_feedback') || '{}')
      all[h.id] = [...(all[h.id] || []), entry]
      localStorage.setItem('ihp_feedback', JSON.stringify(all))
    } catch {}
    setDone(true)
    window.scrollTo(0, 0)
  }

  if (done) return (
    <main className="max-w-2xl mx-auto px-4 py-14">
      <div className="bg-white border border-green-200 rounded-2xl p-8 text-center">
        <p className="text-5xl mb-3">🙏</p>
        <h1 className="text-2xl font-extrabold text-deep-950">Thank you — your feedback is now on {first}’s profile</h1>
        <p className="text-stone-600 text-sm mt-3">Feedback like yours helps good helpers find good families. {first} pays nothing for it, and neither did you — feedback is free on this portal.</p>
        <p className="text-stone-500 text-xs mt-2">Your reference number is never shown publicly — it appears only to an employer who reveals {first}’s number through this portal.</p>
        <Link to={`/helper/${h.id}`} className="inline-block mt-5 bg-deep-800 hover:bg-deep-900 text-white font-semibold rounded-xl px-5 py-3">See it on {first}’s profile →</Link>
      </div>
    </main>
  )

  const field = 'w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-deep-700 bg-white'
  const err = (k) => errors[k] && <p className="text-xs text-red-700 mt-1">{errors[k]}</p>
  const yesNo = (value, setValue) => (
    <div className="flex gap-2 mt-1.5">
      {[[true, '👍 Yes'], [false, 'No']].map(([v, label]) => (
        <button type="button" key={label} onClick={() => setValue(v)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border ${value === v ? 'bg-deep-800 text-white border-deep-800' : 'bg-white border-stone-300 text-stone-700 hover:border-deep-700'}`}>{label}</button>
      ))}
    </div>
  )

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center gap-4">
        <Avatar h={h} size={60} />
        <div>
          <p className="font-extrabold text-deep-950">Leave feedback for {h.name}</p>
          <p className="text-sm text-stone-500">{h.mainJob} · From {h.state}, India · {h.totalYears} years total experience</p>
        </div>
      </div>
      <p className="text-sm text-stone-600 mt-4">{first} asked you to share your experience of working with her. It takes about 3 minutes, it is <b>free</b>, and it will show on her public profile. Your name is shown only as first name + last initial (for example, “Priya N.”), and your phone number is <b>never</b> shown publicly — see the note under the number field.</p>

      <form onSubmit={submit} noValidate className="bg-white border border-stone-200 rounded-2xl p-5 mt-4 space-y-6">
        <div>
          <label className="text-sm font-semibold text-deep-950" htmlFor="fb-name">Your name *</label>
          <input id="fb-name" className={field} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Priya Nair" />
          {err('name')}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-deep-950" htmlFor="fb-area">Your area in Singapore *</label>
            <input id="fb-area" className={field} value={area} onChange={e => setArea(e.target.value)} placeholder="e.g. Tampines" />
            {err('area')}
          </div>
          <div>
            <label className="text-sm font-semibold text-deep-950" htmlFor="fb-period">Period she worked for you *</label>
            <input id="fb-period" className={field} value={period} onChange={e => setPeriod(e.target.value)} placeholder="e.g. 2023 – 2025" />
            {err('period')}
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-deep-950" htmlFor="fb-refphone">Your mobile number — for employer references *</label>
          <input id="fb-refphone" className={field} inputMode="tel" value={refPhone} onChange={e => setRefPhone(e.target.value)} placeholder="e.g. +65 9123 4567" />
          <p className="text-xs text-stone-500 mt-1.5 bg-green-50 border border-green-200 rounded-lg px-2.5 py-2">🔒 Your number is never shown publicly. It is shown only to an employer who has paid to reveal {first}’s number through this portal, so they can call you as her reference.</p>
          {err('refPhone')}
        </div>
        <div>
          <p className="text-sm font-semibold text-deep-950">Overall rating *</p>
          <div className="flex items-center gap-2 mt-1">
            <StarPicker value={rating} onPick={setRating} size="text-4xl" />
            <span className="text-sm text-stone-500">{rating ? ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'][rating] : 'Tap to rate'}</span>
          </div>
          {err('rating')}
        </div>
        <div>
          <p className="text-sm font-semibold text-deep-950">Rate her work in each area *</p>
          <div className="mt-2 divide-y divide-stone-100 border border-stone-200 rounded-xl px-3">
            {FB_CATEGORIES.map(([k, label]) => (
              <div key={k} className="flex items-center justify-between gap-3 py-2">
                <span className="text-sm text-stone-700">{label}</span>
                <StarPicker value={cats[k] || 0} onPick={(v) => setCats(c => ({ ...c, [k]: v }))} size="text-2xl" />
              </div>
            ))}
          </div>
          {err('cats')}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-deep-950">Would you recommend her to another family? *</p>
            {yesNo(recommend, setRecommend)}
            {err('recommend')}
          </div>
          <div>
            <p className="text-sm font-semibold text-deep-950">Would you hire her again? *</p>
            {yesNo(rehire, setRehire)}
            {err('rehire')}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-deep-950">Her strengths <span className="font-normal text-stone-500">(optional — tap all that apply)</span></p>
          {FB_STRENGTH_GROUPS.map(g => (
            <div key={g.title} className="mt-3">
              <p className="text-xs font-bold tracking-wide text-stone-400 uppercase">{g.title}</p>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {g.items.map(s => (
                  <button type="button" key={s} onClick={() => toggleStrength(s)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${chipCls(strengths.includes(s), 'green')}`}>{strengths.includes(s) ? '✓ ' : ''}{s}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="text-sm font-semibold text-deep-950">Where can she improve? <span className="font-normal text-stone-500">(honest feedback helps her grow — tap all that apply)</span></p>
          <div className="flex flex-wrap gap-2 mt-1.5">
            {FB_IMPROVEMENTS.map(s => (
              <button type="button" key={s} onClick={() => toggleImprovement(s)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${chipCls(improvements.includes(s), 'amber')}`}>{improvements.includes(s) ? '✓ ' : ''}{s}</button>
            ))}
          </div>
          <label className="block text-sm font-medium text-deep-950 mt-3" htmlFor="fb-improvetext">Anything specific she should work on? <span className="font-normal text-stone-500">(optional)</span></label>
          <textarea id="fb-improvetext" rows={2} className={field} value={improveText} onChange={e => setImproveText(e.target.value)}
            placeholder="e.g. She is shy with new dishes at first — give her the recipe in writing and she picks it up fast." />
        </div>
        <div>
          <label className="text-sm font-semibold text-deep-950" htmlFor="fb-text">Your feedback *</label>
          <textarea id="fb-text" rows={5} className={field} value={text} onChange={e => setText(e.target.value)}
            placeholder={`What did ${first} do well? Think about her cooking or care work, her reliability, and how she was with your family…`} />
          <p className="text-[11px] text-stone-400 mt-1">{text.trim().length}/30 characters minimum</p>
          {err('text')}
        </div>
        <button type="submit" className="w-full bg-deep-800 hover:bg-deep-900 text-white font-semibold rounded-xl py-3">Submit feedback</button>
        <p className="text-[11px] text-stone-400 text-center">By submitting you confirm {first} worked for your family in the period stated. Feedback is shown publicly on her profile; your phone number is not — it is shared only as described above.</p>
      </form>
    </main>
  )
}
