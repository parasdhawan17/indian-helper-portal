export const PACKS = [
  { id: 'single', name: 'Single Reveal', credits: 1, price: 499, per: 499, blurb: 'For an employer who has found exactly one helper to contact.' },
  { id: 'pack5', name: 'Pack of 5', credits: 5, price: 1499, per: 300, hero: true, blurb: 'The normal hire — interview 3 to 5 helpers and choose well.' },
  { id: 'pack10', name: 'Pack of 10', credits: 10, price: 2499, per: 250, blurb: 'For hiring for your own home and for your parents, or a careful search.' },
]
export const inr = (n) => '₹' + Number(n).toLocaleString('en-IN')
export const sgd = (n) => 'S$' + Number(n).toLocaleString('en-SG')

const H = (o) => o
export const HELPERS = [
  H({ id:'manjit', name:'Manjit K.', age:38, state:'Punjab', status:'Finished contract', location:'Singapore', available:'Available now', availableInDays:0, mainJob:'Eldercare', salary:820, restDays:2, yearsSG:6, totalYears:8, confirmedDays:1, colour:'#166534',
    languages:[['Punjabi','Fluent'],['Hindi','Fluent'],['English','Conversational']],
    cuisines:['North Indian','Punjabi home cooking'], veg:true, jain:false, pork:false, beef:false,
    skills:[['Eldercare — mobility help','Experienced'],['Eldercare — independent elderly','Experienced'],['Cooking','Experienced'],['General housekeeping','Experienced'],['Night care','Some experience'],['Childcare (7–12 yrs)','Some experience']],
    about:'I am from Punjab and I have worked in Singapore for 6 years with two families. My strength is caring for elderly parents — walks, medicines on time, and proper Punjabi food. I am patient, I keep the house calm, and I can manage the home without being reminded.',
    history:[{period:'2022 — 2026 · Singapore', family:'Indian family — elderly couple', duties:'Full care of a 76-year-old mother, cooking, cleaning, marketing', reason:'Finished contract'},{period:'2019 — 2022 · Singapore', family:'Indian family — 2 adults, 1 child (9)', duties:'Cooking, housekeeping, school run', reason:'Family moved overseas'}],
    expects:'A family who needs elderly care and North Indian cooking. Sundays or agreed rest days respected, and my salary paid to my bank account.' }),
  H({ id:'selvi', name:'Selvi R.', age:34, state:'Tamil Nadu', status:'Ex-Singapore', location:'India', available:'From 1 Dec 2026', availableInDays:35, mainJob:'Childcare', salary:700, restDays:4, yearsSG:4, totalYears:6, confirmedDays:2, colour:'#b45309',
    languages:[['Tamil','Fluent'],['English','Conversational'],['Hindi','Basic']],
    cuisines:['South Indian'], veg:true, jain:false, pork:false, beef:false,
    skills:[['Childcare (1–6 yrs)','Experienced'],['Infant care (0–12 months)','Some experience'],['Cooking','Experienced'],['Homework / school run','Experienced'],['General housekeeping','Experienced']],
    about:'I am from Madurai, Tamil Nadu. I worked in Singapore from 2019 to 2023 with one family and cared for their daughter from age 2 to 6. I cook South Indian food daily — idli, dosa, sambar, poriyal — and I am happy in a pure-veg kitchen.',
    history:[{period:'2019 — 2023 · Singapore', family:'Indian family — 2 adults, 1 child', duties:'Childcare, South Indian cooking, housekeeping', reason:'Finished contract, returned home for family work'},{period:'2017 — 2019 · India (Chennai)', family:'Family with 2 children', duties:'Childcare and cooking', reason:'Planned move to Singapore'}],
    expects:'Childcare work with a family who eats South Indian food. Four Sundays off if possible.' }),
  H({ id:'anju', name:'Anju M.', age:29, state:'Kerala', status:'Transfer', location:'Singapore', available:'Transfer from 20 Nov 2026', availableInDays:24, mainJob:'Infant care', salary:900, restDays:2, yearsSG:3, totalYears:5, confirmedDays:0, colour:'#0f766e',
    languages:[['Malayalam','Fluent'],['English','Fluent'],['Hindi','Conversational'],['Tamil','Conversational']],
    cuisines:['South Indian','North Indian'], veg:false, jain:false, pork:true, beef:false,
    skills:[['Infant care (0–12 months)','Experienced'],['Childcare (1–6 yrs)','Experienced'],['Cooking','Some experience'],['General housekeeping','Experienced'],['Night care','Experienced']],
    about:'I am a Malayali helper in Singapore for 3 years. I have cared for two newborns — feeding, bathing, sleep routine and night feeds. I speak good English, I follow instructions carefully, and I keep a written baby log for the parents.',
    history:[{period:'2023 — 2026 · Singapore', family:'Expat family — newborn and toddler', duties:'Newborn care day and night, toddler meals, laundry', reason:'Employer relocating; consent to transfer agreed'},{period:'2021 — 2023 · India (Kochi)', family:'Family with newborn twins', duties:'Infant care support', reason:'Came to Singapore'}],
    expects:'Infant care as my main job. My current employer has agreed to my transfer.' }),
  H({ id:'rinku', name:'Rinku D.', age:31, state:'West Bengal', status:'Transfer', location:'Singapore', available:'Transfer from 5 Nov 2026', availableInDays:9, mainJob:'Cooking', salary:760, restDays:2, yearsSG:5, totalYears:7, confirmedDays:3, colour:'#9d174d',
    languages:[['Bengali','Fluent'],['Hindi','Fluent'],['English','Conversational']],
    cuisines:['North Indian','Bengali','Indo-Chinese'], veg:false, jain:false, pork:true, beef:false,
    skills:[['Cooking','Experienced'],['General housekeeping','Experienced'],['Grocery / marketing','Experienced'],['Childcare (7–12 yrs)','Some experience'],['Pet care','Some experience']],
    about:'Cooking is my main skill. In 5 years in Singapore I have cooked for Bengali and North Indian families — daily sabzi, dal, roti, fish curry, and party cooking for 10 people. I plan the week\u2019s menu and the marketing list myself.',
    history:[{period:'2021 — 2026 · Singapore', family:'Bengali family — 3 adults', duties:'All cooking, marketing, cleaning', reason:'Employer no longer needs a helper'}],
    expects:'A cooking-focused home. I can handle pork but I do not eat it.' }),
  H({ id:'kavitha', name:'Kavitha S.', age:42, state:'Andhra Pradesh', status:'Finished contract', location:'Singapore', available:'Available now', availableInDays:0, mainJob:'Housework', salary:680, restDays:1, yearsSG:9, totalYears:11, confirmedDays:5, colour:'#1d4ed8',
    languages:[['Telugu','Fluent'],['Hindi','Conversational'],['English','Conversational']],
    cuisines:['South Indian','North Indian'], veg:true, jain:false, pork:false, beef:false,
    skills:[['General housekeeping','Experienced'],['Laundry & ironing','Experienced'],['Cooking','Experienced'],['Eldercare — independent elderly','Some experience'],['Gardening','Some experience']],
    about:'I have worked in Singapore for 9 years and finished two full contracts. I am a steady, independent housekeeper for larger homes — deep cleaning, ironing, and daily South Indian cooking. I work quietly and finish my schedule every day.',
    history:[{period:'2022 — 2026 · Singapore', family:'Family of 5 in a landed home', duties:'Full housekeeping, cooking, gardening', reason:'Finished contract'},{period:'2017 — 2022 · Singapore', family:'Family of 4, condo', duties:'Housekeeping and cooking', reason:'Finished contract'}],
    expects:'A housekeeping role with a clear daily schedule. One rest day a month plus agreed Sundays in time.' }),
  H({ id:'jaspreet', name:'Jaspreet K.', age:27, state:'Punjab', status:'Fresh', location:'India', available:'From Jan 2027 (overseas process)', availableInDays:65, mainJob:'Childcare', salary:580, restDays:4, yearsSG:0, totalYears:2, confirmedDays:1, colour:'#7c2d12',
    languages:[['Punjabi','Fluent'],['Hindi','Fluent'],['English','Conversational']],
    cuisines:['North Indian'], veg:true, jain:false, pork:false, beef:false,
    skills:[['Childcare (1–6 yrs)','Some experience'],['Cooking','Some experience'],['General housekeeping','Willing to learn'],['Homework / school run','Some experience']],
    about:'I am from Ludhiana and this will be my first job in Singapore. For 2 years I cared for two young children in my home town and cooked for the family. I am learning fast, I love children, and I understand a fresh helper needs training in the first weeks.',
    history:[{period:'2024 — 2026 · India (Ludhiana)', family:'Family with children aged 3 and 5', duties:'Childcare, cooking, cleaning', reason:'Looking for first Singapore job'}],
    expects:'A patient family who will train me in the first month. Overseas hiring process applies — I have read the guide on this portal.' }),
  H({ id:'mary', name:'Mary T.', age:36, state:'Kerala', status:'Transfer', location:'Singapore', available:'Transfer from 28 Nov 2026', availableInDays:32, mainJob:'Eldercare', salary:950, restDays:4, yearsSG:7, totalYears:10, confirmedDays:2, colour:'#065f46',
    languages:[['Malayalam','Fluent'],['English','Fluent'],['Hindi','Some experience']],
    cuisines:['South Indian','Western'], veg:false, jain:false, pork:true, beef:true,
    skills:[['Eldercare — mobility help','Experienced'],['Dementia care experience','Experienced'],['Night care','Experienced'],['Cooking','Some experience'],['General housekeeping','Experienced']],
    about:'I have 7 years in Singapore, mostly eldercare — including 3 years caring for a father with dementia. I can help with walking and transfers, showering, medicines and night checks. I am calm in emergencies and I keep the family informed every day.',
    history:[{period:'2023 — 2026 · Singapore', family:'Elderly couple, father with dementia', duties:'Full eldercare, night checks, cooking', reason:'Ward passed away; family helping me transfer'},{period:'2019 — 2023 · Singapore', family:'Elderly lady living alone', duties:'Eldercare and housekeeping', reason:'Finished contract'}],
    expects:'Eldercare as the main job, with 4 rest days. Salary reflects dementia and mobility experience.' }),
  H({ id:'pooja', name:'Pooja Y.', age:33, state:'Uttar Pradesh', status:'Ex-Singapore', location:'India', available:'From 15 Dec 2026', availableInDays:49, mainJob:'Cooking', salary:650, restDays:2, yearsSG:2, totalYears:4, confirmedDays:4, colour:'#a16207',
    languages:[['Hindi','Fluent'],['English','Conversational']],
    cuisines:['North Indian','Pure-veg daily cooking'], veg:true, jain:true, pork:false, beef:false,
    skills:[['Cooking','Experienced'],['General housekeeping','Experienced'],['Childcare (7–12 yrs)','Some experience'],['Grocery / marketing','Experienced']],
    about:'I am a vegetarian cook from Lucknow. I worked 2 years in Singapore in a pure-veg home — daily roti, sabzi, dal, and Jain cooking without onion and garlic during Paryushan. I keep veg storage and cooking fully separate.',
    history:[{period:'2022 — 2024 · Singapore', family:'Gujarati vegetarian family', duties:'Pure-veg and Jain cooking, housekeeping', reason:'Finished work and returned home'}],
    expects:'A vegetarian household that needs proper North Indian and Jain cooking.' }),
  H({ id:'anitha', name:'Anitha K.', age:30, state:'Tamil Nadu', status:'Transfer', location:'Singapore', available:'Transfer from 12 Nov 2026', availableInDays:16, mainJob:'Infant care', salary:850, restDays:2, yearsSG:4, totalYears:4, confirmedDays:1, colour:'#be185d',
    languages:[['Tamil','Fluent'],['English','Fluent'],['Hindi','Basic']],
    cuisines:['South Indian'], veg:false, jain:false, pork:true, beef:false,
    skills:[['Infant care (0–12 months)','Experienced'],['Childcare (1–6 yrs)','Experienced'],['General housekeeping','Experienced'],['Cooking','Some experience']],
    about:'Four years in Singapore, two babies cared for from birth. I do feeding, sterilising, tummy time, baby laundry and a daily routine that working parents can follow on a chart. I am gentle, alert at night, and I do not use my phone while the baby is awake.',
    history:[{period:'2022 — 2026 · Singapore', family:'Working couple with baby', duties:'Full infant care, baby meals, housekeeping', reason:'Employer migrating to Australia; consent agreed'}],
    expects:'Infant care with working parents. Phone rule during baby\u2019s waking hours is fine with me.' }),
  H({ id:'sunita', name:'Sunita M.', age:45, state:'West Bengal', status:'Finished contract', location:'Singapore', available:'Available now', availableInDays:0, mainJob:'Eldercare', salary:780, restDays:1, yearsSG:10, totalYears:12, confirmedDays:6, colour:'#374151',
    languages:[['Bengali','Fluent'],['Hindi','Fluent'],['English','Basic']],
    cuisines:['Bengali','North Indian'], veg:false, jain:false, pork:false, beef:false,
    skills:[['Eldercare — independent elderly','Experienced'],['Cooking','Experienced'],['General housekeeping','Experienced'],['Eldercare — mobility help','Some experience']],
    about:'Ten years in Singapore with elderly employers. I cook soft, simple Bengali and North Indian food for old people, remind medicines, accompany walks and clinic visits, and keep company with respect. My English is basic but my Hindi and Bengali are strong.',
    history:[{period:'2020 — 2026 · Singapore', family:'Elderly couple in their 80s', duties:'Cooking, companionship, clinic visits, housekeeping', reason:'Finished contract'}],
    expects:'Elderly care and cooking for Hindi or Bengali speaking parents.' }),
  H({ id:'deepa', name:'Deepa N.', age:26, state:'Andhra Pradesh', status:'Fresh', location:'India', available:'From Jan 2027 (overseas process)', availableInDays:70, mainJob:'Housework', salary:550, restDays:4, yearsSG:0, totalYears:1, confirmedDays:3, colour:'#0369a1',
    languages:[['Telugu','Fluent'],['English','Conversational'],['Hindi','Basic']],
    cuisines:['South Indian'], veg:false, jain:false, pork:true, beef:false,
    skills:[['General housekeeping','Some experience'],['Laundry & ironing','Some experience'],['Cooking','Willing to learn'],['Pet care','Some experience']],
    about:'I am from Vijayawada, looking for my first Singapore job. I have one year of housekeeping work in India, I am not afraid of dogs, and I learn recipes quickly from videos and notes. I am honest that I am fresh — I will need guidance in the first weeks.',
    history:[{period:'2025 — 2026 · India (Vijayawada)', family:'Family of 4', duties:'Cleaning, laundry, kitchen help', reason:'Looking for first Singapore job'}],
    expects:'A family willing to train a fresh helper. Overseas hiring process applies.' }),
  H({ id:'revathi', name:'Revathi P.', age:35, state:'Tamil Nadu', status:'Transfer', location:'Singapore', available:'Transfer from 30 Nov 2026', availableInDays:34, mainJob:'Housework', salary:720, restDays:3, yearsSG:5, totalYears:8, confirmedDays:0, colour:'#581c87',
    languages:[['Tamil','Fluent'],['English','Conversational'],['Malayalam','Conversational']],
    cuisines:['South Indian','North Indian'], veg:true, jain:false, pork:false, beef:false,
    skills:[['General housekeeping','Experienced'],['Cooking','Experienced'],['Pet care','Experienced'],['Childcare (1–6 yrs)','Some experience'],['Car washing','Experienced']],
    about:'Five years in Singapore in larger homes. I manage full housekeeping for a 4-bedroom home, South Indian cooking, dog care and car washing on a weekly system. I work from a checklist and finish without supervision.',
    history:[{period:'2021 — 2026 · Singapore', family:'Family of 4 with a dog, landed home', duties:'Housekeeping, cooking, pet care, car washing', reason:'Employer relocating; consent to transfer agreed'}],
    expects:'A larger home that needs an independent housekeeper. Fine with dogs.' }),
  H({ id:'harpreet', name:'Harpreet K.', age:30, state:'Punjab', status:'Fresh', location:'India', available:'From Jan 2027 (overseas process)', availableInDays:60, mainJob:'Childcare', salary:620, restDays:2, yearsSG:0, totalYears:3, confirmedDays:1, colour:'#9a3412',
    languages:[['Punjabi','Fluent'],['Hindi','Fluent'],['English','Conversational']],
    cuisines:['North Indian','Punjabi home cooking'], veg:true, jain:false, pork:false, beef:false,
    skills:[['Childcare (1–6 yrs)','Experienced'],['Cooking','Experienced'],['General housekeeping','Some experience'],['Homework / school run','Some experience']],
    about:'I am from Amritsar, Punjab. For 3 years I have cared for two children in my home town — a girl of 4 and a boy of 6 — cooking their meals, helping with homework and keeping their routine. I cook proper Punjabi home food and I am patient and cheerful with children. This profile is listed by my supplier, Sunrise Helpers, who will arrange my first Singapore job.',
    history:[{period:'2023 — 2026 · India (Amritsar)', family:'Family with 2 children (4 and 6)', duties:'Childcare, cooking, homework help, school run', reason:'Looking for first Singapore job'}],
    expects:'A family with young children who will guide me in the first weeks. Overseas hiring process applies.',
    listedBy:{ supplierId:'sunrise', name:'Sunrise Helpers' } }),
  H({ id:'latha', name:'Latha S.', age:37, state:'Tamil Nadu', status:'Ex-Singapore', location:'India', available:'From 1 Dec 2026', availableInDays:35, mainJob:'Cooking', salary:690, restDays:2, yearsSG:3, totalYears:6, confirmedDays:4, colour:'#155e75',
    languages:[['Tamil','Fluent'],['English','Conversational'],['Hindi','Basic']],
    cuisines:['South Indian'], veg:true, jain:false, pork:false, beef:false,
    skills:[['Cooking','Experienced'],['General housekeeping','Experienced'],['Grocery / marketing','Experienced'],['Childcare (7–12 yrs)','Some experience']],
    about:'I am from Trichy, Tamil Nadu. I worked in Singapore for 3 years as the cook for a Tamil family — sambar, rasam, poriyal, kootu and festival cooking — and I plan the week\u2019s menu and marketing list myself. I am back in India now and ready to return. This profile is listed by my supplier, Sunrise Helpers.',
    history:[{period:'2019 — 2022 · Singapore', family:'Tamil family — 4 adults', duties:'All South Indian cooking, marketing, kitchen and housekeeping support', reason:'Finished work and returned home'}],
    expects:'A cooking-focused South Indian home. Happy to discuss details with my supplier on a callback.',
    listedBy:{ supplierId:'sunrise', name:'Sunrise Helpers' } }),
]
// ---- Employer feedback (seed data) -------------------------------------
// Feedback left by past employers. Helpers never write their own — a helper
// sends her personal link (…/#/feedback/<id>) to a past employer, who fills
// the form. New submissions are stored in localStorage (key 'ihp_feedback')
// and merged on top of this seed data, newest first. See feedbackFor() below.
const FEEDBACK_SEED = {
  manjit: [
    { employer: 'Ms. Simran G. · Tampines', period: '2022 – 2026', rating: 5, recommend: true, date: 'Oct 2026', text: 'Manjit looked after my 76-year-old mother for four years. Medicines were never missed, she took her for her morning walk daily, and her Punjabi cooking — sarson, rajma, proper rotis — made my mother actually look forward to meals. Trust her completely.' },
    { employer: 'Mrs. Sharma · Tampines', period: '2022 – 2026', rating: 5, recommend: true, date: 'Sep 2026', text: 'We finished her full contract because we could not let her go. She ran the home quietly, kept everything clean without being told, and treated my parents with real respect. Any family hiring her for eldercare is lucky.' },
    { employer: 'Mr. Harpreet S. · Bishan', period: '2019 – 2022', rating: 5, recommend: true, date: 'Jun 2022', text: 'Manjit worked for us when our son was nine — cooking, housekeeping and the school run. Very reliable, never late, and our son still asks about her aloo parathas. We only parted because we moved overseas.' },
  ],
  mary: [
    { employer: 'Mr. Daniel T. · Bedok', period: '2023 – 2026', rating: 5, recommend: true, date: 'Oct 2026', text: 'Mary cared for my father through his dementia for three years — night checks, showering, medicines, everything. She stayed calm on his hardest nights and sent us an update every single day. Near the end she was family to us.' },
    { employer: 'Mrs. Grace T. · Bedok', period: '2023 – 2026', rating: 5, recommend: true, date: 'Sep 2026', text: 'As a nurse myself I notice care standards, and Mary’s are high — safe transfers, skin checks, proper hydration, and she spotted a fever early twice. A true professional for eldercare.' },
    { employer: 'Ms. Anita R. · Jurong East', period: '2019 – 2023', rating: 5, recommend: true, date: 'Feb 2023', text: 'Mary looked after my mother, who lived alone. She cooked, kept the flat spotless and, most importantly, kept my mother company and safe. We finished the full contract and recommended her to two friends.' },
  ],
  anju: [
    { employer: 'Mrs. Emily C. · Bukit Timah', period: '2023 – 2026', rating: 5, recommend: true, date: 'Oct 2026', text: 'Anju cared for our daughter from her first week. Night feeds, bath time, the sleep routine — she handled everything and kept a written baby log for us. Our baby slept through the night by four months. We are relocating, otherwise we would never let her go.' },
    { employer: 'Mr. James C. · Bukit Timah', period: '2024 – 2026', rating: 5, recommend: true, date: 'Sep 2026', text: 'She also cared for our toddler while managing the baby. Her English is excellent, she follows our paediatrician’s instructions exactly, and the house stayed tidy around two small children. Agreeing to her transfer was the least we could do.' },
    { employer: 'Mrs. Deepa N. · Kochi', period: '2021 – 2023', rating: 4, recommend: true, date: 'Jan 2023', text: 'Anju helped us with our newborn twins in Kochi. Two babies at once is no small job and she managed feeds and laundry with a smile. She needed some guidance at the very start, then ran the nursery on her own.' },
  ],
  selvi: [
    { employer: 'Mrs. Radha V. · Toa Payoh', period: '2019 – 2023', rating: 5, recommend: true, date: 'Mar 2023', text: 'Selvi cared for our daughter from age two to six. Her idli and dosa are better than most shops, she taught our girl Tamil songs, and the home was always calm. We still video-call her.' },
    { employer: 'Mrs. Meena K. · Chennai', period: '2017 – 2019', rating: 4, recommend: true, date: 'Dec 2018', text: 'Selvi cared for both our children in Chennai and cooked daily South Indian food for us. Honest, hardworking and very good with small children.' },
  ],
  rinku: [
    { employer: 'Mrs. Moumita B. · Serangoon', period: '2021 – 2026', rating: 5, recommend: true, date: 'Oct 2026', text: 'Rinku’s cooking kept our family together at the table — fish curry on Sundays, proper luchi, and she planned the whole week’s menu and the marketing herself. Five years with us, zero complaints, and our guests always asked who cooked.' },
    { employer: 'Mr. Arjun B. · Serangoon', period: '2021 – 2026', rating: 5, recommend: true, date: 'Aug 2026', text: 'I travel for work and Rinku kept the home — and our cat — without supervision for weeks at a time. Fully trustworthy with the house keys.' },
  ],
  kavitha: [
    { employer: 'Mrs. Farah A. · Siglap', period: '2022 – 2026', rating: 5, recommend: true, date: 'Sep 2026', text: 'Kavitha kept our landed home — five people, a garden, endless ironing — on a daily system that never slipped in four years. Quiet, steady and completely independent. Her South Indian cooking was a bonus.' },
    { employer: 'Mr. Vikram R. · Marine Parade', period: '2017 – 2022', rating: 5, recommend: true, date: 'May 2022', text: 'Kavitha finished her full contract with us and kept a busy condo spotless throughout. We recommended her to her next family ourselves. If you need a housekeeper who just gets on with the work, she is the one.' },
  ],
  pooja: [
    { employer: 'Mrs. Kinjal S. · Serangoon', period: '2022 – 2024', rating: 5, recommend: true, date: 'Nov 2024', text: 'Pure-veg and Jain cooking done properly — separate storage, no onion and garlic during Paryushan, fresh rotis every day. Pooja understood our kitchen rules better than some of our own relatives.' },
  ],
  anitha: [
    { employer: 'Mrs. Sarah L. · Holland Road', period: '2022 – 2026', rating: 5, recommend: true, date: 'Oct 2026', text: 'Anitha cared for our baby from birth while both of us worked full-time. Sterilising, tummy time, the routine chart on the fridge — she ran everything properly and our daughter adores her. We are migrating to Australia; any working couple would be lucky to have her.' },
    { employer: 'Mrs. Divya M. · Queenstown', period: '2025 – 2026', rating: 5, recommend: true, date: 'Jun 2026', text: 'Anitha looked after our newborn on weekends when she had time off — gentle, careful and fully focused on the baby, phone always away. Very impressed.' },
  ],
  sunita: [
    { employer: 'Mr. Subrata M. · Ang Mo Kio', period: '2020 – 2026', rating: 5, recommend: true, date: 'Aug 2026', text: 'For six years Sunita cooked for my parents, who are in their eighties — soft food, on time, with patience. She reminded them about medicines, went with them to the clinic, and spoke to them in Bengali, which made them feel at home. A gem for elderly Bengali or Hindi-speaking parents.' },
  ],
  revathi: [
    { employer: 'Mrs. Karen W. · Kembangan', period: '2021 – 2026', rating: 5, recommend: true, date: 'Sep 2026', text: 'Revathi managed our four-bedroom landed home end to end — cleaning system, South Indian cooking, our dog’s care, even the car. She works from her own checklist and I never had to follow up on anything in five years.' },
  ],
  deepa: [
    { employer: 'Mrs. Swapna R. · Vijayawada', period: '2025 – 2026', rating: 4, recommend: true, date: 'Jul 2026', text: 'Deepa did our cleaning, laundry and kitchen help for a year. She is new to this work and needs a recipe explained once, but she learns fast, she is honest, and she is gentle with our dog.' },
  ],
  latha: [
    { employer: 'Mrs. Anita D. · Little India', period: '2019 – 2022', rating: 5, recommend: true, date: 'Jun 2022', text: 'Latha cooked for our family of four for three years — her sambar and rasam taste like home, and she managed the marketing and the kitchen budget without waste. A dependable, honest cook.' },
  ],
}
HELPERS.forEach(h => { h.feedback = FEEDBACK_SEED[h.id] || [] })
// Profile photo: AI-generated portrait in public/images/<id>.jpg (copied to dist/images/ at build).
// Absolute path is safe with HashRouter and on the Vercel static deploy.
export const imageFor = (h) => `/images/${h.id}.jpg`
HELPERS.forEach(h => { h.image = imageFor(h) })
export const loadLocalFeedback = () => { try { return JSON.parse(localStorage.getItem('ihp_feedback') || '{}') } catch { return {} } }
// Merged feedback for a helper: localStorage submissions (newest first), then seed entries.
export const feedbackFor = (h) => [...(loadLocalFeedback()[h.id] || []).slice().reverse(), ...(h.feedback || [])]
export const feedbackSummary = (h) => {
  const list = feedbackFor(h)
  if (!list.length) return null
  const avg = list.reduce((a, f) => a + (f.rating || 0), 0) / list.length
  return { avg: Math.round(avg * 10) / 10, count: list.length }
}

export const phoneFor = (h) => '+65 8000 ' + String(1 + HELPERS.indexOf(h)).padStart(4, '0')
export const MAIN_JOBS = ['Infant care','Childcare','Eldercare','Cooking','Housework']
export const STATES = ['Punjab','Tamil Nadu','Kerala','Andhra Pradesh','West Bengal','Uttar Pradesh']
export const LANGUAGES = ['Hindi','Punjabi','Tamil','Telugu','Malayalam','Bengali','English']
export const STATUSES = ['Transfer','Finished contract','Ex-Singapore','Fresh']

// ---- Suppliers -----------------------------------------------------------
// A supplier lists helper profiles. On supplier profiles there is NO number
// to reveal: employers request a free callback, and the SUPPLIER pays
// 1 credit to unlock the employer's number from the request.
export const SUPPLIERS = [
  { id: 'sunrise', business: 'Sunrise Helpers', contactPerson: 'Rajesh Kumar', base: 'Ludhiana, Punjab', about: 'We list Punjabi and South Indian helpers for Singapore homes. We prepare each helper\u2019s profile, verify her documents with her, and arrange her interview calls with employers.' },
]
export const loadSupplierProfiles = () => { try { const v = JSON.parse(localStorage.getItem('ihp_supplier_profiles') || '[]'); return Array.isArray(v) ? v : [] } catch { return [] } }
// Every profile the site shows: the seed helpers + supplier-added profiles.
export const allHelpers = () => {
  const extra = loadSupplierProfiles().map(h => ({ feedback: [], ...h, image: h.image || imageFor(h) }))
  return [...HELPERS, ...extra]
}
export const loadSavedSupplier = () => { try { return JSON.parse(localStorage.getItem('ihp_supplier') || 'null') } catch { return null } }
// Resolve a listedBy.supplierId to a supplier record (seed supplier or the signed-up demo supplier).
export const supplierById = (id) => {
  if (!id) return null
  const seed = SUPPLIERS.find(s => s.id === id)
  if (seed) return { business: seed.business, contactPerson: seed.contactPerson, base: seed.base, about: seed.about }
  const mine = loadSavedSupplier()
  if (mine && mine.id === id) return { business: mine.business, contactPerson: mine.name, base: mine.base, about: mine.about }
  return null
}

// ---- Callback requests -----------------------------------------------------
// Employer -> supplier. Stored in localStorage 'ihp_callbacks'; the employer's
// full number is stored but only ever RENDERED masked until the supplier
// pays 1 credit to unlock that request.
export const loadCallbacks = () => { try { const v = JSON.parse(localStorage.getItem('ihp_callbacks') || '[]'); return Array.isArray(v) ? v : [] } catch { return [] } }
export const addCallback = (cb) => { try { const all = loadCallbacks(); all.push(cb); localStorage.setItem('ihp_callbacks', JSON.stringify(all)) } catch {} }
export const updateCallback = (id, patch) => { try { const all = loadCallbacks().map(c => c.id === id ? { ...c, ...patch } : c); localStorage.setItem('ihp_callbacks', JSON.stringify(all)); return all } catch { return loadCallbacks() } }
export const maskPhone = (phone) => {
  const digits = String(phone || '').replace(/\D/g, '')
  const last4 = digits.slice(-4) || '••••'
  const prefix = String(phone || '').trim().startsWith('+65') ? '+65' : '+••'
  return `${prefix} •••• ${last4}`
}
