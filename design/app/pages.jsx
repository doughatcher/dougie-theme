// app/pages.jsx — Shell (sidebar/top-header) + Home/Blog/Publications/Post views.
const D = window.DougieData;
const { Avatar, SocialRow, Pill, Meta, ReadMore, XpostRow, PubThumb, initials,
        NoteRow, BlogRow, PubRow, BlogCard, PubCard, Embed, Icon } = window;

function feedRow(item, onOpen){
  if(item.type==='note') return <NoteRow key={item.id} note={D.notesById[item.id]} onOpen={onOpen} />;
  if(item.type==='blog') return <BlogRow key={item.id} post={D.postsById[item.id]} onOpen={onOpen} />;
  if(item.type==='pub')  return <PubRow  key={item.id} pub={D.pubsById[item.id]} />;
  return null;
}

// ---- chrome: identity block reused by both nav modes -------------
function NavLinks({view, go, vertical}){
  const items = [['home','Home'],['blog','Blog'],['publications','Publications'],['about','About']];
  return (
    <nav className={vertical?'dg-nav-v':'dg-nav-h'}>
      {items.map(([k,label])=>(
        <a key={k} className={'dg-navlink'+(view===k?' is-active':'')}
           onClick={()=>go(k)}>{label}</a>
      ))}
    </nav>
  );
}
function ThemeToggle({dark, onToggle}){
  return (
    <button className="dg-themetoggle" onClick={onToggle} aria-label="Toggle theme">
      <Icon name={dark?'sun':'moon'} size={17} />
    </button>
  );
}

function Sidebar({profile, view, go, dark, onToggleDark, showTopics}){
  return (
    <aside className="dg-rail">
      <div className="dg-rail-top">
        <ThemeToggle dark={dark} onToggle={onToggleDark} />
      </div>
      <Avatar size={66} fs={24} />
      <div>
        <div className="dg-h dg-name">{profile.name}</div>
        <div className="dg-tagline">{profile.tagline}</div>
      </div>
      <SocialRow size={30} gap={8} />
      <hr className="dg-rule" />
      <NavLinks view={view} go={go} vertical />
      {showTopics && <div className="dg-rail-topics">
        <div className="dg-label" style={{marginBottom:10}}>Topics</div>
        <div className="dg-pill-wrap">
          {D.PILLARS.map(t=> <span key={t} className="dg-pill dg-pill-link">{t}</span>)}
        </div>
      </div>}
    </aside>
  );
}
function TopHeader({profile, view, go, dark, onToggleDark}){
  return (
    <header className="dg-topbar">
      <div className="dg-topbar-row">
        <div className="dg-topbar-id">
          <Avatar size={46} fs={17} />
          <div>
            <div className="dg-h dg-name" style={{fontSize:21}}>{profile.name}</div>
            <div className="dg-tagline">{profile.tagline}</div>
          </div>
        </div>
        <div className="dg-topbar-right">
          <SocialRow size={30} gap={8} wrap={false} />
          <ThemeToggle dark={dark} onToggle={onToggleDark} />
        </div>
      </div>
      <div className="dg-topbar-nav"><NavLinks view={view} go={go} /></div>
    </header>
  );
}

// ---- homepage compositions --------------------------------------
function HomeFeed({profile, go, t}){
  return (
    <div className="dg-stream">
      {t.showIntro && <p className="dg-intro">{profile.intro}</p>}
      {t.showFeatured && <FeaturedStrip go={go} />}
      <div className="dg-label dg-stream-label">The feed</div>
      {D.FEED.map(item=> feedRow(item, go ? (id)=>go('post', id) : null))}
    </div>
  );
}
function FeaturedStrip({go}){
  const p = D.postsById['microblog-hugo'];
  return (
    <div className="dg-featured" onClick={()=>go('post', p.id)}>
      <div className="dg-featured-tag"><Pill>Featured · {p.tag}</Pill></div>
      <h2 className="dg-h dg-featured-title">{p.title}</h2>
      <p className="dg-featured-excerpt">{p.excerpt}</p>
      <ReadMore label="Read the post" />
    </div>
  );
}
function HomeMagazine({profile, go, t}){
  const lead = D.postsById['microblog-hugo'];
  return (
    <div className="dg-mag">
      {t.showFeatured && <div className="dg-mag-lead">
        <div className="dg-mag-lead-text">
          <div className="dg-row-head"><Pill>{lead.tag}</Pill><Meta>{lead.date} · {lead.read}</Meta></div>
          <h1 className="dg-h dg-mag-title" onClick={()=>go('post', lead.id)}>{lead.title}</h1>
          <p className="dg-mag-excerpt">{lead.excerpt}</p>
          <span onClick={()=>go('post', lead.id)} style={{cursor:'pointer'}}><ReadMore label="Read the post" /></span>
        </div>
        <div className="dg-thumb dg-mag-hero"><span className="dg-mono dg-thumb-tag">featured image</span></div>
      </div>}
      <div className="dg-label dg-sec-label">Latest writing</div>
      <div className="dg-mag-grid">
        {D.POSTS.map(p=> <BlogCard key={p.id} post={p} onOpen={(id)=>go('post', id)} />)}
      </div>
      {t.showPublications && <div className="dg-pub-band">
        <div className="dg-sec-head"><div className="dg-label">Selected publications</div>
          <span onClick={()=>go('publications')} style={{cursor:'pointer'}}><ReadMore label="All publications" /></span></div>
        <div className="dg-pub-grid">{D.PUBS.map(p=> <PubCard key={p.id} pub={p} />)}</div>
      </div>}
    </div>
  );
}
function HomeSectioned({profile, go, t}){
  return (
    <div className="dg-sectioned">
      {t.showIntro && <p className="dg-intro dg-intro-lg">{profile.intro}</p>}
      <div className="dg-sec-head"><div className="dg-label">Latest writing</div>
        <span onClick={()=>go('blog')} style={{cursor:'pointer'}}><ReadMore label="View all posts" /></span></div>
      <div className="dg-card-stack">
        {D.POSTS.slice(0,2).map(p=> <BlogCard key={p.id} post={p} big onOpen={(id)=>go('post', id)} />)}
      </div>
      <div className="dg-feed-mixin">
        {D.NOTES.slice(1,3).map(n=> <NoteRow key={n.id} note={n} onOpen={(id)=>go('post', id)} />)}
      </div>
      {t.showPublications && <>
        <div className="dg-sec-head" style={{marginTop:8}}><div className="dg-label">Selected publications</div>
          <span onClick={()=>go('publications')} style={{cursor:'pointer'}}><ReadMore label="View all" /></span></div>
        <div className="dg-pub-grid">{D.PUBS.slice(0,2).map(p=> <PubCard key={p.id} pub={p} />)}</div>
      </>}
    </div>
  );
}
function Home(props){
  const layout = props.t.homeLayout;
  if(layout==='Magazine') return <HomeMagazine {...props} />;
  if(layout==='Sectioned') return <HomeSectioned {...props} />;
  return <HomeFeed {...props} />;
}

// ---- list + single views ----------------------------------------
function BlogPage({profile, go}){
  return (
    <div className="dg-page">
      <h1 className="dg-h dg-page-title">Blog</h1>
      <p className="dg-page-lead">{profile.intro}</p>
      <div className="dg-stream">
        {D.POSTS.map(p=> <BlogRow key={p.id} post={p} onOpen={(id)=>go('post', id)} />)}
      </div>
    </div>
  );
}
function PublicationsPage({go}){
  return (
    <div className="dg-page">
      <div className="dg-page-eyebrow">Posts in <strong>Publications</strong> category</div>
      <hr className="dg-rule" style={{margin:'22px 0 8px'}} />
      <div className="dg-pub-list">
        {D.PUBS.map(p=>(
          <article key={p.id} className="dg-pub-listitem">
            <PubThumb size={92} label={initials(p.outlet)} />
            <div>
              <h2 className="dg-h dg-publist-title">{p.name}{p.ext && <Icon name="arrowUpRight" size={16} stroke={2} style={{marginLeft:6, opacity:.5}} />}</h2>
              <p className="dg-publist-excerpt">{p.excerpt}</p>
              <div className="dg-publist-foot"><Meta>{p.date}</Meta>
                <span className="dg-readmore">{p.ext?`Learn more on ${p.outlet}`:'Read full post'} <Icon name="arrow" size={13} stroke={2} /></span></div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
const SHARE = ['LinkedIn','X','Facebook','Bluesky','Reddit','Hacker News','Email','Copy link'];
function PostPage({post, profile, go}){
  if(!post) return <div className="dg-page">Post not found.</div>;
  return (
    <article className="dg-post">
      <div className="dg-post-meta"><span className="dg-post-date">{post.date}</span> <span className="dg-tagline">by {profile.name}</span></div>
      <h1 className="dg-h dg-post-title">{post.title}</h1>
      <div className="dg-post-tag"><Pill>{post.tag}</Pill><Meta>{post.read} read</Meta></div>
      <div className="dg-post-body">
        {post.body.map((para,i)=> <p key={i}>{para}</p>)}
      </div>
      <div className="dg-share">
        <span className="dg-label">Share</span>
        <div className="dg-share-btns">
          {SHARE.map(s=> <span key={s} className="dg-share-btn">{s}</span>)}
        </div>
      </div>
      <div className="dg-alsoposted">
        <span className="dg-label">Also posted on</span>
        <div className="dg-pill-wrap">{['Mastodon','Bluesky','Threads','LinkedIn'].map(s=> <span key={s} className="dg-pill">{s}</span>)}</div>
      </div>
      <button className="dg-reply">Reply on Mastodon</button>
    </article>
  );
}
function AboutPage({profile}){
  return (
    <div className="dg-page">
      <h1 className="dg-h dg-page-title">About</h1>
      <p className="dg-page-lead">{profile.intro}</p>
      <p className="dg-post-body">This is a demo of the <strong>Dougie</strong> theme: one Hugo theme for Micro.blog that re-skins cleanly across {profile.domain} and its sibling sites. Use the Tweaks panel to switch properties, palettes, layout and type.</p>
    </div>
  );
}

Object.assign(window, { Sidebar, TopHeader, Home, BlogPage, PublicationsPage, PostPage, AboutPage });
