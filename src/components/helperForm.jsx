import React from 'react'

// Shared field lists + field components for the two helper add forms
// (direct "Join as a Helper" and supplier "Add a helper profile").
// They mirror the product document's §8 field spec so both forms collect
// the same data and profiles render it the same way.

export const SKILL_LIST = [
  'Infant care (0–12 months)',
  'Childcare (1–6 yrs)',
  'Childcare (7–12 yrs)',
  'Homework / school run',
  'Eldercare — independent elderly',
  'Eldercare — mobility help',
  'Night care',
  'Dementia care experience',
  'Cooking',
  'General housekeeping',
  'Laundry & ironing',
  'Grocery / marketing',
  'Pet care',
  'Gardening',
  'Car washing',
]
export const SKILL_LEVELS = ['Experienced', 'Some experience', 'Willing to learn']
export const LANG_LEVELS = ['Basic', 'Conversational', 'Fluent']
export const CUISINE_LIST = ['North Indian', 'South Indian', 'Pure-veg daily cooking', 'Bengali', 'Indo-Chinese', 'Western']
export const CUISINE_RATINGS = ['Can cook daily', 'Can cook with recipe', 'Learning']
export const SPECIAL_COOKING = [
  'Jain / no onion-garlic',
  'Satvik',
  'Diabetic-friendly Indian meals',
  'Tiffin / lunchbox',
  'Baby khichdi / porridge',
  'Festival cooking',
]
export const HOUSEHOLD_PREFS = [
  'OK with pets',
  'OK to share a room with a child',
  'I prefer my own room',
  'OK with night care',
  'OK with a second helper in the home',
]
export const RELIGIONS = ['Hindu', 'Sikh', 'Christian', 'Muslim', 'Other', 'Prefer not to say']
export const LEAVE_REASONS = [
  'Finished contract',
  'Employer migrated',
  'Employer no longer needs a helper',
  'Family reasons',
  'Other',
]

const fieldCls = 'w-full border border-stone-300 rounded-xl px-3 py-2.5 mt-1 bg-white text-sm'
const chipOn = 'bg-deep-800 text-white border-deep-800'
const chipOff = 'border-stone-300 bg-white'

// Languages with levels: value is { language: level }. Tap to select,
// then pick the level. Default level on first tap: Conversational.
export function LangLevelPicker({ value, onChange, langs }) {
  const toggle = (l) => {
    const next = { ...value }
    if (next[l]) delete next[l]
    else next[l] = 'Conversational'
    onChange(next)
  }
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {langs.map(l => (
          <button type="button" key={l} onClick={() => toggle(l)} className={`text-sm rounded-full px-3 py-1.5 border ${value[l] ? chipOn : chipOff}`}>{l}</button>
        ))}
      </div>
      {Object.keys(value).length > 0 && (
        <div className="space-y-1.5">
          {Object.keys(value).map(l => (
            <div key={l} className="flex items-center gap-2 text-sm">
              <span className="w-28 shrink-0 font-medium">{l}</span>
              <select className={fieldCls + ' !mt-0 max-w-[200px]'} value={value[l]} onChange={e => onChange({ ...value, [l]: e.target.value })} aria-label={`Level for ${l}`}>
                {LANG_LEVELS.map(lv => <option key={lv}>{lv}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Cuisines with ratings: value is { cuisine: rating }.
export function CuisineRatingPicker({ value, onChange }) {
  const toggle = (c) => {
    const next = { ...value }
    if (next[c]) delete next[c]
    else next[c] = 'Can cook daily'
    onChange(next)
  }
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {CUISINE_LIST.map(c => (
          <button type="button" key={c} onClick={() => toggle(c)} className={`text-sm rounded-full px-3 py-1.5 border ${value[c] ? chipOn : chipOff}`}>{c}</button>
        ))}
      </div>
      {Object.keys(value).length > 0 && (
        <div className="space-y-1.5">
          {Object.keys(value).map(c => (
            <div key={c} className="flex items-center gap-2 text-sm">
              <span className="w-44 shrink-0 font-medium">{c}</span>
              <select className={fieldCls + ' !mt-0 max-w-[220px]'} value={value[c]} onChange={e => onChange({ ...value, [c]: e.target.value })} aria-label={`Rating for ${c}`}>
                {CUISINE_RATINGS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Rated skills: value is { skill: level }. At least 3 required (PRD minimum-to-Live).
export function RatedSkillsPicker({ value, onChange, error }) {
  const count = Object.keys(value).length
  const toggle = (s) => {
    const next = { ...value }
    if (next[s]) delete next[s]
    else next[s] = 'Some experience'
    onChange(next)
  }
  return (
    <div>
      <p className="text-xs text-stone-500 mb-2">Tick a skill, then pick her level. At least 3 skills are needed — <b>{count} selected</b>.</p>
      <div className="space-y-1.5">
        {SKILL_LIST.map(s => (
          <div key={s} className="flex items-center gap-2 text-sm">
            <label className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer">
              <input type="checkbox" checked={!!value[s]} onChange={() => toggle(s)} className="w-4 h-4 accent-green-800 shrink-0" />
              <span className="truncate">{s}</span>
            </label>
            <select disabled={!value[s]} className={fieldCls + ' !mt-0 max-w-[180px] disabled:opacity-40'} value={value[s] || 'Some experience'} onChange={e => onChange({ ...value, [s]: e.target.value })} aria-label={`Level for ${s}`}>
              {SKILL_LEVELS.map(lv => <option key={lv}>{lv}</option>)}
            </select>
          </div>
        ))}
      </div>
      {error && <p className="text-xs text-red-700 mt-1 font-medium">{error}</p>}
    </div>
  )
}

// Repeatable work history. One entry block by default; "Add another job".
// A fresh helper ticks the checkbox instead and the block hides.
export function HistoryEditor({ value, onChange, fresh, onFreshChange }) {
  const setEntry = (i, patch) => onChange(value.map((e, j) => j === i ? { ...e, ...patch } : e))
  if (fresh) {
    return (
      <div>
        <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={fresh} onChange={e => onFreshChange(e.target.checked)} className="w-4 h-4 accent-green-800" /> Fresh helper — no Singapore work history yet</label>
        <p className="text-xs text-stone-500 mt-1.5">Her profile will say she is fresh, so employers know she needs training in the first weeks.</p>
      </div>
    )
  }
  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={fresh} onChange={e => onFreshChange(e.target.checked)} className="w-4 h-4 accent-green-800" /> Fresh helper — no Singapore work history yet</label>
      {value.map((e, i) => (
        <div key={i} className="border border-stone-200 rounded-xl p-3 space-y-3 bg-cream-50/50">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">Job {i + 1}</p>
            {value.length > 1 && <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="text-xs font-semibold text-red-700 underline">Remove this job</button>}
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block text-sm font-medium">Country<input className={fieldCls} value={e.country} onChange={ev => setEntry(i, { country: ev.target.value })} placeholder="e.g. Singapore, India" /></label>
            <label className="block text-sm font-medium">Family type<input className={fieldCls} value={e.family} onChange={ev => setEntry(i, { family: ev.target.value })} placeholder="e.g. 2 adults, 1 child (5)" /></label>
            <label className="block text-sm font-medium">From year<input className={fieldCls} value={e.fromYear} onChange={ev => setEntry(i, { fromYear: ev.target.value })} placeholder="e.g. 2021" /></label>
            <label className="block text-sm font-medium">To year<input className={fieldCls} value={e.toYear} onChange={ev => setEntry(i, { toYear: ev.target.value })} placeholder="e.g. 2025 (or 'now')" /></label>
            <label className="block text-sm font-medium sm:col-span-2">Main duties<textarea rows={2} className={fieldCls} value={e.duties} onChange={ev => setEntry(i, { duties: ev.target.value })} placeholder="e.g. Childcare, cooking, school run" /></label>
            <label className="block text-sm font-medium">Reason for leaving<select className={fieldCls} value={e.reason} onChange={ev => setEntry(i, { reason: ev.target.value })}>{LEAVE_REASONS.map(r => <option key={r}>{r}</option>)}</select></label>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, { country: '', fromYear: '', toYear: '', family: '', duties: '', reason: 'Finished contract' }])} className="text-sm font-semibold text-deep-700 underline">+ Add another job</button>
    </div>
  )
}

// Repeatable certifications / training rows: course name + year.
export function CertEditor({ value, onChange }) {
  const setRow = (i, patch) => onChange(value.map((c, j) => j === i ? { ...c, ...patch } : c))
  return (
    <div className="space-y-2">
      {value.map((c, i) => (
        <div key={i} className="flex gap-2">
          <input className={fieldCls + ' !mt-0 flex-1'} value={c.course} onChange={e => setRow(i, { course: e.target.value })} placeholder="e.g. Infant-care course, first aid" />
          <input className={fieldCls + ' !mt-0 w-24'} value={c.year} onChange={e => setRow(i, { year: e.target.value })} placeholder="Year" />
          <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="px-2 text-stone-400 hover:text-red-600 font-bold" aria-label="Remove certification">×</button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, { course: '', year: '' }])} className="text-sm font-semibold text-deep-700 underline">+ Add a course or certificate</button>
    </div>
  )
}

// Photo upload with live preview. Stored as a data URL in the profile object
// (prototype only — in the real portal photos go to moderated storage).
export function PhotoField({ value, onChange }) {
  const pick = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(String(reader.result))
    reader.readAsDataURL(file)
  }
  return (
    <div>
      <div className="flex items-center gap-3 mt-1">
        {value
          ? <><img src={value} alt="Profile photo preview" className="w-20 h-20 rounded-2xl object-cover object-top bg-stone-100" />
            <button type="button" onClick={() => onChange('')} className="text-xs font-semibold text-red-700 underline">Remove photo</button></>
          : <div className="w-20 h-20 rounded-2xl bg-stone-100 border border-dashed border-stone-300 flex items-center justify-center text-3xl" aria-hidden="true">📷</div>}
        <label className="text-sm font-medium cursor-pointer">
          <span className="inline-block bg-cream-100 border border-amber-300 text-deep-900 font-semibold rounded-xl px-3 py-2">Choose a photo</span>
          <input type="file" accept="image/*" className="hidden" onChange={e => pick(e.target.files && e.target.files[0])} />
          <span className="block text-xs text-stone-500 font-normal mt-1.5">A clear face photo, no sunglasses or group photos. If you skip this, the profile uses your initial avatar in your colour instead. In this prototype the photo is saved on this device only.</span>
        </label>
      </div>
    </div>
  )
}

// Transfer consent — shown ONLY when status is Transfer and location is
// Singapore. The PRD calls this unavoidable: no transfer without it (or a
// finished contract reaching its end date).
export function TransferConsent({ status, location, value, releaseDate, onConsent, onReleaseDate, error }) {
  if (status !== 'Transfer' || location !== 'Singapore') return null
  const opts = [
    'Employer has agreed to my transfer',
    'Not yet agreed',
    'Finishing my contract — no consent needed at end date',
  ]
  const showRelease = value === opts[0] || value === opts[2]
  return (
    <div className="sm:col-span-2 bg-amber-50 border border-amber-300 rounded-xl p-4">
      <p className="text-sm font-bold text-deep-950">Transfer consent <span className="text-red-700">*</span></p>
      <p className="text-xs text-stone-600 mt-1">A transfer in Singapore needs your current employer’s written consent — without it there is no transfer. Please answer honestly; employers will ask for the written consent before applying.</p>
      <div className="mt-2 space-y-1.5">
        {opts.map(o => (
          <label key={o} className="flex items-start gap-2 text-sm font-medium cursor-pointer">
            <input type="radio" name="transfer-consent" checked={value === o} onChange={() => onConsent(o)} className="w-4 h-4 mt-0.5 accent-green-800" /> {o}
          </label>
        ))}
      </div>
      {showRelease && (
        <label className="block text-sm font-medium mt-3">Release / available date<input className={fieldCls} value={releaseDate} onChange={e => onReleaseDate(e.target.value)} placeholder="e.g. 20 Nov 2026" /></label>
      )}
      {error && <p className="text-xs text-red-700 mt-1 font-medium">{error}</p>}
    </div>
  )
}

// Household preferences + Sundays preference.
export function HouseholdPrefs({ value, onChange, sundays, onSundays }) {
  const toggle = (p) => onChange(value.includes(p) ? value.filter(x => x !== p) : [...value, p])
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {HOUSEHOLD_PREFS.map(p => (
          <button type="button" key={p} onClick={() => toggle(p)} className={`text-sm rounded-full px-3 py-1.5 border ${value.includes(p) ? chipOn : chipOff}`}>{p}</button>
        ))}
      </div>
      <label className="block text-sm font-medium max-w-[240px]">Sundays preferred
        <select className={fieldCls} value={sundays} onChange={e => onSundays(e.target.value)}>
          <option>Yes</option>
          <option>No</option>
        </select>
      </label>
    </div>
  )
}
