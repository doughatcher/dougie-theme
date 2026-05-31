// app/icons.jsx — monoline icons (social + UI). Exports window.Icon, window.SocialIcon.
const UI_ICONS = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};
function Icon({name, size=18, stroke=1.75, style}){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
      strokeLinejoin="round" style={style}
      dangerouslySetInnerHTML={{__html: UI_ICONS[name] || ''}} />
  );
}

// Social glyphs — filled, recognizable monoline marks.
const SOCIAL = {
  linkedin: '<path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.4 8h4.16v13H.4zM8.34 8h3.98v1.78h.06c.55-1.05 1.9-2.16 3.92-2.16 4.2 0 4.97 2.76 4.97 6.35V21h-4.15v-5.65c0-1.35-.02-3.08-1.88-3.08-1.88 0-2.17 1.47-2.17 2.98V21H8.34z"/>',
  mastodon: '<path d="M21.3 14.8c-.3 1.5-2.7 3.2-5.4 3.5-1.4.2-2.8.3-4.3.2-2.3-.1-4.1-.5-4.1-.5 0 .2 0 .4.1.6.3 1.7 1.8 1.8 3.2 1.9 1.4 0 2.7 0 2.7 0l.1 1.4s-1 .6-2.9.7c-1 .1-2.3 0-3.8-.4C3.4 21.7 2.8 18.3 2.7 15c0-1 0-1.9 0-2.7 0-3.4 2.3-4.4 2.3-4.4C6.2 7.3 8.2 7.1 10.3 7h.1c2.1 0 4.1.3 5.2.9 0 0 2.3 1 2.3 4.4 0 0 0 1.7-.6 2.5z"/><path d="M17.8 11.4v4.2h-1.7v-4.1c0-.9-.4-1.3-1.1-1.3-.8 0-1.2.5-1.2 1.5v2.2h-1.7v-2.2c0-1-.4-1.5-1.2-1.5-.7 0-1.1.4-1.1 1.3v4.1H8.2v-4.2c0-.9.2-1.6.7-2.1.5-.5 1.1-.8 1.9-.8.9 0 1.6.4 2 1l.4.7.4-.7c.4-.6 1.1-1 2-1 .8 0 1.4.3 1.9.8.4.5.7 1.2.7 2.1z" fill="var(--paper)"/>',
  x: '<path d="M18.2 2H21l-6.6 7.5L22 22h-6.8l-4.8-6.3L4.8 22H2l7-8L2 2h6.9l4.3 5.7zM16 20.2h1.5L8 3.7H6.4z"/>',
  github: '<path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="17.3" cy="6.7" r="1.2"/>',
  microblog: '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M7 14.5c1-3 2.3-5 3.2-5 1.1 0 .6 3 1.6 3 .9 0 2-3 3.2-3.5" fill="none" stroke="currentColor" stroke-width="1.9"/>',
  email: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 6.5l8.5 6 8.5-6" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  rss: '<path d="M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M4 4a16 16 0 0 1 16 16h-3A13 13 0 0 0 4 7z" /><path d="M4 10a10 10 0 0 1 10 10h-3A7 7 0 0 0 4 13z"/>',
};
function SocialIcon({name, size=16}){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"
      dangerouslySetInnerHTML={{__html: SOCIAL[name] || ''}} />
  );
}
Object.assign(window, { Icon, SocialIcon });
