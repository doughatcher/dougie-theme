// app/app.jsx — theming engine, routing, Tweaks. Mounts the Dougie prototype.
const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakToggle, TweakColor } = window;
const { Sidebar, TopHeader, Home, BlogPage, PublicationsPage, PostPage, AboutPage } = window;
const DD = window.DougieData;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "property": "doughatcher",
  "navMode": "Sidebar",
  "homeLayout": "Feed",
  "accent": "Auto",
  "font": "Editorial",
  "dark": false,
  "showIntro": true,
  "showFeatured": true,
  "showPublications": true,
  "showTopics": true
}/*EDITMODE-END*/;

// ---- palettes ----------------------------------------------------
const NEUTRAL = {
  light: { paper:'#ffffff', card:'#fafafa', card2:'#f4f4f3', ink:'#16161a', ink2:'#3c3c43',
           muted:'#76767e', faint:'#a8a8ae', line:'#e9e8e5', line2:'#ddddd8' },
  dark:  { paper:'#0c0c0e', card:'#141416', card2:'#1b1b1e', ink:'#f3f3f4', ink2:'#c7c7cd',
           muted:'#8c8c95', faint:'#5d5d66', line:'#232327', line2:'#2f2f35' },
};
const PROPERTIES = {
  doughatcher: { label:'doughatcher.com', accent:'#0f9d76', accentDark:'#34d8a6', light:{}, dark:{} },
  leaning: { label:'leaning.blue', accent:'#1d4e9c', accentDark:'#6499e8', flagline:true,
    light:{ paper:'#fbfaf6', card:'#f5f3ec', card2:'#efece2', ink:'#191b22', ink2:'#41434d', line:'#e7e3d7', line2:'#dbd5c6' },
    dark:{ paper:'#0b0e16', card:'#141927', card2:'#1b2233', ink:'#eef1f7', ink2:'#bcc3d4', line:'#222b3f', line2:'#2d3852' } },
  superterran: { label:'superterran.net', accent:'#6d52d8', accentDark:'#a48ff4',
    light:{ paper:'#fcfbfa', card:'#f6f3f1', card2:'#f0ece9', ink:'#181520', ink2:'#403a4a' },
    dark:{ paper:'#0e0b13', card:'#181420', card2:'#1f1a2b', ink:'#f1edf7', ink2:'#c2bace', line:'#262031', line2:'#332b42' } },
};
const ACCENTS = {
  Graphite:{ light:'#16161a', dark:'#f3f3f4' },
  Emerald: { light:'#0f9d76', dark:'#34d8a6' },
  Cobalt:  { light:'#2f6df0', dark:'#6aa1ff' },
  Crimson: { light:'#c2384a', dark:'#ef6f7f' },
  Amber:   { light:'#b9760f', dark:'#e7a93a' },
  Violet:  { light:'#6d52d8', dark:'#a48ff4' },
};
const FONTS = {
  Editorial:{ head:"'Newsreader',Georgia,serif", body:"'IBM Plex Sans',system-ui,sans-serif", mono:"'IBM Plex Mono',monospace", hw:560 },
  Sans:     { head:"'IBM Plex Sans',system-ui,sans-serif", body:"'IBM Plex Sans',system-ui,sans-serif", mono:"'IBM Plex Mono',monospace", hw:600 },
  Literary: { head:"'Newsreader',Georgia,serif", body:"'Newsreader',Georgia,serif", mono:"'IBM Plex Mono',monospace", hw:500 },
};

function lum(hex){
  const h=hex.replace('#',''); const r=parseInt(h.slice(0,2),16), g=parseInt(h.slice(2,4),16), b=parseInt(h.slice(4,6),16);
  return (0.299*r+0.587*g+0.114*b)/255;
}
function computeVars(t){
  const mode = t.dark?'dark':'light';
  const base = {...NEUTRAL[mode], ...(PROPERTIES[t.property][mode]||{})};
  const accent = t.accent==='Auto'
    ? (t.dark?PROPERTIES[t.property].accentDark:PROPERTIES[t.property].accent)
    : ACCENTS[t.accent][mode];
  const f = FONTS[t.font];
  return {
    '--paper':base.paper, '--card':base.card, '--card-2':base.card2,
    '--ink':base.ink, '--ink-2':base.ink2, '--muted':base.muted, '--faint':base.faint,
    '--line':base.line, '--line-2':base.line2,
    '--accent':accent, '--accent-ink': lum(accent)>0.62?'#16161a':'#ffffff',
    '--serif':f.head, '--sans':f.body, '--mono':f.mono, '--head-weight':f.hw,
  };
}

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState({view:'home', postId:null});
  const scrollRef = React.useRef(null);
  const go = (view, postId=null)=>{
    setRoute({view, postId});
    if(scrollRef.current) scrollRef.current.scrollTop = 0;
  };
  const profile = DD.PROFILES[t.property];
  const vars = computeVars(t);
  const sidebar = t.navMode==='Sidebar';

  let page;
  if(route.view==='home') page = <Home profile={profile} go={go} t={t} />;
  else if(route.view==='blog') page = <BlogPage profile={profile} go={go} />;
  else if(route.view==='publications') page = <PublicationsPage go={go} />;
  else if(route.view==='post') page = <PostPage post={DD.postsById[route.postId]} profile={profile} go={go} />;
  else page = <AboutPage profile={profile} />;

  const chromeProps = { profile, view:route.view, go, dark:t.dark,
    onToggleDark:()=>setTweak('dark', !t.dark), showTopics:t.showTopics };

  return (
    <div className="dougie" data-prop={t.property} style={vars}>
      {PROPERTIES[t.property].flagline && <div className="dg-flagline" />}
      <div className={"dg-shell "+(sidebar?'is-sidebar':'is-top')}>
        {sidebar
          ? <Sidebar {...chromeProps} />
          : <TopHeader {...chromeProps} />}
        <div className="dg-main" ref={scrollRef}>
          <div className={"dg-main-inner"+(route.view==='home'&&t.homeLayout==='Magazine'&&!sidebar?' is-wide':'')}>
            {page}
          </div>
        </div>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Property" />
        <TweakRadio label="Site" value={t.property}
          options={[{value:'doughatcher',label:'doughatcher'},{value:'leaning',label:'leaning.blue'},{value:'superterran',label:'superterran'}]}
          onChange={v=>setTweak('property', v)} />
        <TweakSection label="Layout" />
        <TweakRadio label="Identity" value={t.navMode} options={['Sidebar','Top header']}
          onChange={v=>setTweak('navMode', v)} />
        <TweakRadio label="Homepage" value={t.homeLayout} options={['Feed','Magazine','Sectioned']}
          onChange={v=>setTweak('homeLayout', v)} />
        <TweakSection label="Homepage blocks" />
        <TweakToggle label="Intro statement" value={t.showIntro} onChange={v=>setTweak('showIntro', v)} />
        <TweakToggle label="Featured post" value={t.showFeatured} onChange={v=>setTweak('showFeatured', v)} />
        <TweakToggle label="Publications" value={t.showPublications} onChange={v=>setTweak('showPublications', v)} />
        <TweakToggle label="Topics (sidebar)" value={t.showTopics} onChange={v=>setTweak('showTopics', v)} />
        <TweakSection label="Style" />
        <TweakSelect label="Accent" value={t.accent}
          options={['Auto','Graphite','Emerald','Cobalt','Crimson','Amber','Violet']}
          onChange={v=>setTweak('accent', v)} />
        <TweakSelect label="Type" value={t.font} options={['Editorial','Sans','Literary']}
          onChange={v=>setTweak('font', v)} />
        <TweakToggle label="Dark mode" value={t.dark} onChange={v=>setTweak('dark', v)} />
      </TweaksPanel>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
