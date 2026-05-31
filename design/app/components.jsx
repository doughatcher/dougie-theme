// app/components.jsx — shared presentational components for the Dougie theme.
const { SocialIcon, Icon } = window;

function Avatar({size=64, fs=23}){
  return <div className="dg-avatar" style={{width:size, height:size, fontSize:fs}}>DH</div>;
}
function SocialRow({size=30, gap=8, wrap=true}){
  return (
    <div style={{display:'flex', gap, flexWrap:wrap?'wrap':'nowrap'}}>
      {window.DougieData.SOCIALS.map(s=>(
        <a key={s} className="dg-soc" style={{width:size, height:size}} aria-label={s}>
          <SocialIcon name={s} size={Math.round(size*0.5)} />
        </a>
      ))}
    </div>
  );
}
function Pill({children}){ return <span className="dg-pill">{children}</span>; }
function Meta({children}){ return <span className="dg-meta">{children}</span>; }
function ReadMore({label='Read'}){
  return <span className="dg-readmore">{label} <Icon name="arrow" size={13} stroke={2} /></span>;
}
function XpostRow({list}){
  if(!list || !list.length) return null;
  return <div className="dg-meta dg-xpost">Also on {list.join('  \u00b7  ')}</div>;
}
function PubThumb({size=54, label}){
  return <div className="dg-thumb" style={{width:size, height:size, flex:'none',
    alignItems:'center', justifyContent:'center', fontFamily:'var(--mono)',
    fontSize:Math.max(10, size*0.2), fontWeight:600}}>{label}</div>;
}
const initials = (o)=> o.split(' ').slice(0,2).map(w=>w[0]).join('');

// ---- embeds ------------------------------------------------------
function EmbedLink({embed, onOpen}){
  const clickable = !!embed.ref;
  return (
    <div className={"dg-embed"+(clickable?" dg-embed-link":"")} style={{marginTop:14}}
      onClick={clickable?()=>onOpen&&onOpen(embed.ref):undefined}
      role={clickable?'button':undefined}>
      <div className="dg-thumb dg-thumb-wide">
        <span className="dg-mono dg-thumb-tag">link preview</span>
      </div>
      <div className="dg-embed-body">
        <div className="dg-embed-title">{embed.title}</div>
        {embed.excerpt && <div className="dg-embed-excerpt">{embed.excerpt}</div>}
        <div className="dg-link-domain"><Icon name="link" size={13} stroke={2} />{embed.domain}</div>
      </div>
    </div>
  );
}
function EmbedYouTube({embed}){
  return (
    <div className="dg-embed" style={{marginTop:14}}>
      <div className="dg-thumb-dark dg-yt">
        <div className="dg-yt-shade" />
        <div className="dg-yt-title">{embed.title}</div>
        <div className="dg-play" />
        <div className="dg-yt-pill"><span className="dg-yt-tri">&#9658;</span> Watch on YouTube</div>
      </div>
    </div>
  );
}
function Embed({embed, onOpen}){
  if(!embed) return null;
  if(embed.kind==='yt') return <EmbedYouTube embed={embed} />;
  return <EmbedLink embed={embed} onOpen={onOpen} />;
}

// ---- feed items (stream rows) -----------------------------------
function NoteRow({note, onOpen}){
  return (
    <article className="dg-row">
      <div className="dg-row-head"><Pill>Note</Pill><Meta>{note.date}</Meta></div>
      <p className="dg-note-body">{note.body}</p>
      <Embed embed={note.embed} onOpen={onOpen} />
      <XpostRow list={note.xposts} />
    </article>
  );
}
function BlogRow({post, onOpen}){
  return (
    <article className="dg-row">
      <div className="dg-row-head"><Pill>{post.tag}</Pill><Meta>{post.date} · {post.read}</Meta></div>
      <h2 className="dg-h dg-row-title" onClick={()=>onOpen&&onOpen(post.id)}>{post.title}</h2>
      <p className="dg-row-excerpt">{post.excerpt}</p>
      <span onClick={()=>onOpen&&onOpen(post.id)} style={{cursor:'pointer'}}><ReadMore /></span>
    </article>
  );
}
function PubRow({pub}){
  return (
    <article className="dg-row dg-row-pub">
      <PubThumb size={56} label={initials(pub.outlet)} />
      <div>
        <div className="dg-row-head"><Pill>Publication</Pill><Meta>{pub.date}</Meta></div>
        <h2 className="dg-h dg-pub-title">{pub.name}</h2>
        <div className="dg-link-domain">{pub.outlet}{pub.ext && <Icon name="arrowUpRight" size={13} stroke={2} />}</div>
      </div>
    </article>
  );
}

// ---- cards (sectioned / magazine layouts) -----------------------
function BlogCard({post, onOpen, big}){
  return (
    <article className={"dg-card"+(big?" dg-card-big":"")} onClick={()=>onOpen&&onOpen(post.id)}>
      <div className="dg-row-head"><Pill>{post.tag}</Pill><Meta>{post.date} · {post.read}</Meta></div>
      <h3 className="dg-h dg-card-title">{post.title}</h3>
      <p className="dg-card-excerpt">{post.excerpt}</p>
      <ReadMore />
    </article>
  );
}
function PubCard({pub}){
  return (
    <article className="dg-card dg-card-pub">
      <PubThumb size={52} label={initials(pub.outlet)} />
      <div>
        <div className="dg-link-domain" style={{marginBottom:6}}>{pub.outlet}{pub.ext && <Icon name="arrowUpRight" size={12} stroke={2} />}</div>
        <h3 className="dg-h dg-card-pub-title">{pub.name}</h3>
        <Meta>{pub.date}</Meta>
      </div>
    </article>
  );
}

Object.assign(window, {
  Avatar, SocialRow, Pill, Meta, ReadMore, XpostRow, PubThumb, initials,
  EmbedLink, EmbedYouTube, Embed, NoteRow, BlogRow, PubRow, BlogCard, PubCard,
});
