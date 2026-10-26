import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HELPERS } from '../data/helpers'
import { Avatar } from '../store'

const publicName = (full) => {
  const parts = full.trim().split(/\s+/)
  if (parts.length < 2) return parts[0]
  return `${parts[0]} ${parts[parts.length - 1][0]}.`
}

export function FeedbackForm() {
  const { id } = useParams()
  const h = HELPERS.find(x => x.id === id)
  const [name, setName] = useState('')
  const [area, setArea] = useState('')
  const [period, setPeriod] = useState('')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [recommend, setRecommend] = useState(null)
  const [text, setText] = useState('')
  const [strengths, setStrengths] = useState([])
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
  const toggleStrength = (s) => setStrengths(cur => cur.includes(s) ? cur.filter(x => x !== s) : [...cur, s])

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!name.trim()) errs.name = 'Please tell us your name.'
    if (!area.trim()) errs.area = 'Please add your area or neighbourhood.'
    if (!period.trim()) errs.period = 'Please add the period she worked for you, e.g. 2023 – 2025.'
    if (!rating) errs.rating = 'Please tap a star rating.'
    if (recommend === null) errs.recommend = 'Please choose Yes or No.'
    if (text.trim().length < 30) errs.text = `Please write a little more (at least 30 characters) — what did ${first} do well?`
    setErrors(errs)
    if (Object.keys(errs).length) return
    const body = (strengths.length ? `Strengths: ${strengths.join(', ')}. ` : '') + text.trim()
    const entry = {
      employer: `${publicName(name)} · ${area.trim()}`,
      period: period.trim(),
      rating,
      recommend,
      text: body,
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
        <Link to={`/helper/${h.id}`} className="inline-block mt-5 bg-deep-800 hover:bg-deep-900 text-white font-semibold rounded-xl px-5 py-3">See it on {first}’s profile →</Link>
      </div>
    </main>
  )

  const field = 'w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-deep-700 bg-white'
  const err = (k) => errors[k] && <p className="text-xs text-red-700 mt-1">{errors[k]}</p>

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center gap-4">
        <Avatar h={h} size={60} />
        <div>
          <p className="font-extrabold text-deep-950">Leave feedback for {h.name}</p>
          <p className="text-sm text-stone-500">{h.mainJob} · From {h.state}, India · {h.totalYears} years total experience</p>
        </div>
      </div>
      <p className="text-sm text-stone-600 mt-4">{first} asked you to share your experience of working with her. It takes about 2 minutes, it is <b>free</b>, and it will show on her public profile. Your name is shown only as first name + last initial (for example, “Priya N.”).</p>

      <form onSubmit={submit} noValidate className="bg-white border border-stone-200 rounded-2xl p-5 mt-4 space-y-5">
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
          <p className="text-sm font-semibold text-deep-950">Overall rating *</p>
          <div className="flex gap-1 mt-1" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map(i => (
              <button type="button" key={i} aria-label={`${i} star${i > 1 ? 's' : ''}`}
                onMouseEnter={() => setHover(i)} onClick={() => setRating(i)}
                className={`text-4xl leading-none transition ${(hover || rating) >= i ? 'text-amber-500' : 'text-stone-300'}`}>★</button>
            ))}
            <span className="text-sm text-stone-500 self-center ml-2">{rating ? ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'][rating] : 'Tap to rate'}</span>
          </div>
          {err('rating')}
        </div>
        <div>
          <p className="text-sm font-semibold text-deep-950">Would you recommend her to another family? *</p>
          <div className="flex gap-2 mt-1.5">
            {[[true, '👍 Yes, I recommend her'], [false, 'No']].map(([v, label]) => (
              <button type="button" key={label} onClick={() => setRecommend(v)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border ${recommend === v ? 'bg-deep-800 text-white border-deep-800' : 'bg-white border-stone-300 text-stone-700 hover:border-deep-700'}`}>{label}</button>
            ))}
          </div>
          {err('recommend')}
        </div>
        <div>
          <p className="text-sm font-semibold text-deep-950">{first}’s strengths <span className="font-normal text-stone-500">(optional — tap all that apply)</span></p>
          <div className="flex flex-wrap gap-2 mt-1.5">
            {h.skills.map(([s]) => (
              <button type="button" key={s} onClick={() => toggleStrength(s)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${strengths.includes(s) ? 'bg-amber-500 text-white border-amber-500' : 'bg-cream-100 border-amber-200 text-deep-900'}`}>{strengths.includes(s) ? '✓ ' : ''}{s}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-deep-950" htmlFor="fb-text">Your feedback *</label>
          <textarea id="fb-text" rows={5} className={field} value={text} onChange={e => setText(e.target.value)}
            placeholder={`What did ${first} do well? Think about her cooking or care work, her reliability, and how she was with your family…`} />
          <p className="text-[11px] text-stone-400 mt-1">{text.trim().length}/30 characters minimum</p>
          {err('text')}
        </div>
        <button type="submit" className="w-full bg-deep-800 hover:bg-deep-900 text-white font-semibold rounded-xl py-3">Submit feedback</button>
        <p className="text-[11px] text-stone-400 text-center">By submitting you confirm {first} worked for your family in the period stated. Feedback is shown publicly on her profile.</p>
      </form>
    </main>
  )
}
