// app/data.jsx — content + per-property profiles. Exports window.DougieData.

const SOCIALS = ['linkedin','mastodon','x','github','instagram','microblog','email','rss'];

// Per-property identity. Same theme, three sites.
const PROFILES = {
  doughatcher: {
    name: 'Doug Hatcher',
    tagline: 'Enterprise architecture & tech junkie',
    intro: 'I write about the gap between what commerce platforms promise and what they actually deliver in production. Fifteen years of migrations, no vendor allegiances.',
    domain: 'doughatcher.com',
  },
  leaning: {
    name: 'Leaning Blue',
    tagline: 'Notes from the American center-left',
    intro: 'Politics, policy, and the slow work of governing. Dispatches from South Carolina, where blue is a long game.',
    domain: 'leaning.blue',
  },
  superterran: {
    name: 'superterran',
    tagline: 'Personal feed · tabletop, infra & culture',
    intro: 'The off-hours channel. Self-hosting, Linux desktops, D&D campaigns, and whatever else is holding my attention this week.',
    domain: 'superterran.net',
  },
};

const PILLARS = ['Optimism Cascade','Constellation','Merchant-Side Gap','Post-Launch Reality','Wild Card'];

// Blog posts (full body for the single-post view).
const POSTS = [
  {
    id: 'microblog-hugo', type: 'blog', tag: 'Wild Card',
    title: 'Micro.blog Will Deploy Your Custom Hugo Theme from GitHub — Here\u2019s What Their Docs Skip',
    excerpt: 'Most people on Micro.blog use the in-platform editor and never touch git. But if you want a real git-and-CI workflow on top of it, the docs leave gaps.',
    date: 'May 23, 2026', iso: '2026-05-23', read: '7 min',
    body: [
      'Most people on Micro.blog use the in-platform theme editor and never touch git. That works fine and I would not push them off it. But if you want a real git-and-CI workflow on top of Micro.blog \u2014 pull requests, code review, a theme you can ship to other people \u2014 the official docs leave a few gaps.',
      'The short version: point a plugin at a public GitHub repo, and Micro.blog will build it with Hugo on every push. The part the docs skip is what counts as a valid plugin, and how the build environment differs from your laptop.',
      'Here is the layout that actually deploys, the three config keys that are not optional, and the one Hugo version pin that will save you an afternoon.',
    ],
  },
  {
    id: 'single-point-failure', type: 'blog', tag: 'The Merchant-Side Gap',
    title: 'The Strongest Performer on Your Team Is Your Biggest Single Point of Failure',
    excerpt: 'Every team I have assessed in fifteen years of commerce engineering has had one. The person who moves fastest, who holds the most context.',
    date: 'May 18, 2026', iso: '2026-05-18', read: '4 min',
    body: [
      'Every team I have managed or assessed in fifteen years of commerce engineering has had one. The person who moves fastest. The person who holds the most context. The person everyone routes questions to because they always have the answer.',
      'That person is also the thing most likely to take your roadmap down for a quarter, and almost nobody is managing the risk.',
      'The fix is not to slow them down. The fix is to make the context they hold legible to the rest of the organization before you need it to be.',
    ],
  },
  {
    id: 'copilot-post-launch', type: 'blog', tag: 'Post-Launch Reality',
    title: 'Your AI Copilot Doesn\u2019t Know What Goes Wrong After Launch',
    excerpt: 'Every conference talk tells the same story. Developers are faster, code generation is accelerating. The bottleneck just moved somewhere quieter.',
    date: 'May 11, 2026', iso: '2026-05-11', read: '6 min',
    body: [
      'Every conference talk about AI in software development tells the same story. Developers are faster. Code generation is accelerating. Cycle times are down.',
      'The bottleneck moved. It used to be code generation. Now it is deployment reliability \u2014 and your copilot has never seen your incident channel.',
      'Input metrics tell you the engine runs. Deployment metrics tell you the brakes work. Most teams are still only measuring the engine.',
    ],
  },
];

// Publications (external bylines / talks).
const PUBS = [
  { id:'magento-ny', type:'pub', outlet:'Commerce Hero', name:'Magento Meet NY 2025', date:'Nov 29, 2025', iso:'2025-11-29', ext:false,
    excerpt:'Meet Magento NY 2025 highlighted the open-sourcing of the Hyv\u00e4 theme and the renaming of Platform.sh to Upsun.' },
  { id:'acs-storefront', type:'pub', outlet:'Blue Acorn iCi', name:'Getting Started with Adobe Commerce Storefront', date:'Apr 11, 2025', iso:'2025-04-11', ext:true,
    excerpt:'An in-depth guide to getting started with Adobe Commerce Storefront development.' },
  { id:'funnel-podcast', type:'pub', outlet:'The Funnel', name:'The Funnel Podcast: How You Can Become Enterprise Ready', date:'Dec 14, 2024', iso:'2024-12-14', ext:true,
    excerpt:'A conversation on what it takes to become enterprise-ready in e-commerce and digital transformation.' },
];

// Short notes / micro-posts (the bulk of the feed). Many carry embeds.
const NOTES = [
  { id:'n-claude-max', type:'note', date:'May 30, 2026', iso:'2026-05-30',
    body:'A personal Claude Max subscription lets you run the best frontier model for hours a day. With Copilot you get pushed toward smaller mid-tier models. My D&D character gets Opus. My work projects get Sonnet. Either way \u2014 stop and use it.',
    xposts:['Mastodon','Bluesky','Threads','LinkedIn'] },
  { id:'n-thca', type:'note', date:'Dec 13, 2025', iso:'2025-12-13',
    body:'Meanwhile head shops are getting raided in Charleston this week despite THCA/H being legal and regulated now.',
    embed:{ kind:'link', domain:'cnbc.com',
      title:'Trump expected to sign executive order to reclassify marijuana as soon as Monday; pot stocks surge',
      excerpt:'Sources tell CNBC an order could come as early as Monday.' },
    xposts:['Mastodon','Bluesky','Threads'] },
  { id:'n-copilot-studio', type:'note', date:'Apr 29, 2026', iso:'2026-04-29',
    body:'Copilot Studio is pretty much just Microsoft Open Claw.',
    embed:{ kind:'yt', title:'NEW Copilot Workflows Agent Will Automate Your Job', channel:'Microsoft Engineer' },
    xposts:['Mastodon','Bluesky'] },
  { id:'n-bottleneck', type:'note', date:'May 28, 2026', iso:'2026-05-28',
    body:'The bottleneck moved. It used to be code generation. Now it is deployment reliability. Input metrics tell you the engine runs; deployment metrics tell you the brakes work.',
    embed:{ kind:'link', domain:'doughatcher.com',
      title:'Your AI Copilot Doesn\u2019t Know What Goes Wrong After Launch',
      excerpt:'Every conference talk tells the same story. The bottleneck just moved somewhere quieter.', ref:'copilot-post-launch' },
    xposts:['LinkedIn'] },
];

// Chronological homepage feed: mix of notes, posts, pubs (by id).
const FEED = [
  { type:'note', id:'n-claude-max' },
  { type:'note', id:'n-thca' },
  { type:'blog', id:'microblog-hugo' },
  { type:'note', id:'n-copilot-studio' },
  { type:'note', id:'n-bottleneck' },
  { type:'blog', id:'single-point-failure' },
  { type:'pub',  id:'acs-storefront' },
];

const byId = (arr) => Object.fromEntries(arr.map(x => [x.id, x]));

window.DougieData = {
  SOCIALS, PROFILES, PILLARS, PILLAR_DESC: {},
  POSTS, PUBS, NOTES, FEED,
  postsById: byId(POSTS), pubsById: byId(PUBS), notesById: byId(NOTES),
};
