import { useEffect, useMemo, useState } from "react";
import { letters, littleThings, memories, nicknames, playlistUrl } from "./content";
import "./index.css";

type Place = "letters" | "sunshine" | "together" | "music" | "always" | "memories";

const places: { id: Place; tag: string; name: string; hint: string; icon: string; tone: string }[] = [
  { id: "letters", tag: "01", name: "Words for you", hint: "letters to open whenever", icon: "💌", tone: "rose" },
  { id: "sunshine", tag: "02", name: "My sunshine", hint: "all the little things I adore", icon: "☀", tone: "gold" },
  { id: "together", tag: "03", name: "Our little moments", hint: "calls, movies & games", icon: "☾", tone: "lilac" },
  { id: "music", tag: "04", name: "Your soundtrack", hint: "a playlist just for you", icon: "♫", tone: "mint" },
  { id: "always", tag: "05", name: "One little word", hint: "the moment that stayed", icon: "✦", tone: "blue" },
  { id: "memories", tag: "06", name: "Our photo album", hint: "little moments, forever", icon: "▣", tone: "peach" },
];

function Starfield() {
  const stars = useMemo(() => Array.from({ length: 90 }, (_, i) => ({
    left: `${(i * 67.31 + 7.3) % 100}%`,
    top: `${(i * 41.17 + 13.9) % 100}%`,
    size: i % 8 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
    delay: `${(i % 12) * -0.44}s`,
  })), []);
  return <div className="starfield" aria-hidden="true">{stars.map((s, i) => <span key={i} className="star" style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }} />)}</div>;
}

function Heart({ filled = false }: { filled?: boolean }) {
  return <span aria-hidden="true">{filled ? "♥" : "♡"}</span>;
}

function PlaceBody({ place }: { place: Place }) {
  const [openedLetter, setOpenedLetter] = useState<number | null>(null);
  const [reason, setReason] = useState(0);
  const [wish, setWish] = useState(false);

  switch (place) {
    case "letters":
      return <>
        <p className="section-intro">A little collection of hugs made out of words. Pick the one you need right now, princess.</p>
        <div className="letter-list">
          {letters.map((letter, i) => <div className="letter-group" key={letter.title}>
            <button className={`letter-button ${openedLetter === i ? "selected" : ""}`} onClick={() => setOpenedLetter(openedLetter === i ? null : i)} aria-expanded={openedLetter === i}>
              <span className="letter-emoji">{letter.icon}</span><span>{letter.title}</span><span className="letter-arrow">{openedLetter === i ? "−" : "+"}</span>
            </button>
            {openedLetter === i && <div className="paper"><p>{letter.text}</p><span>With all my love, ♡</span></div>}
          </div>)}
        </div>
      </>;
    case "sunshine":
      return <>
        <p className="section-intro">Rima, I could name a million things I adore about you. These are just a few.</p>
        <div className="reason-highlight"><span className="reason-symbol">{littleThings[reason].emoji}</span><div><p className="eyebrow">REASON {String(reason + 1).padStart(2, "0")} / {String(littleThings.length).padStart(2, "0")}</p><h3>{littleThings[reason].title}</h3><p>{littleThings[reason].text}</p></div></div>
        <button className="soft-button" onClick={() => setReason((reason + 1) % littleThings.length)}>Another little thing <span>→</span></button>
      </>;
    case "together":
      return <>
        <p className="section-intro">I don't think my favorite moments need to be grand. I just like doing life with you.</p>
        <div className="moments-grid">
          <div className="moment-card"><span>☏</span><h3>Hours on the phone</h3><p>We talk for hours and somehow it never feels like enough. I'd listen to your voice all night.</p></div>
          <div className="moment-card"><span>▸</span><h3>One more movie?</h3><p>The movie could be anything. Knowing we're watching it together is what makes it my favorite.</p></div>
          <div className="moment-card"><span>✧</span><h3>Player two</h3><p>Whether we're winning, losing, or just laughing at each other, you're my favorite person to play with.</p></div>
        </div>
        <p className="handwritten centered">It's never really about what we do. It's about who I do it with.</p>
      </>;
    case "music":
      return <>
        <p className="section-intro">A little soundtrack for a girl who makes my world feel brighter.</p>
        <div className="playlist-card"><div className="record" aria-hidden="true"><span>♥</span></div><p className="eyebrow">NOW PLAYING IN MY HEART</p><h3>Rim's soundtrack</h3><p>Some songs just feel like you.</p>
          {playlistUrl ? <a className="primary-button" href={playlistUrl} target="_blank" rel="noopener noreferrer">Open your Spotify playlist ↗</a> : <p className="setup-hint">♡ Playlist coming soon. Add the Spotify link in <code>src/content.ts</code>.</p>}
        </div>
      </>;
    case "always":
      return <>
        <p className="section-intro">Of all the things we could have said, somehow we said the exact same word at the exact same time.</p>
        <div className="always-card"><span className="small-stars">✧ &nbsp; ✦ &nbsp; ✧</span><h3>Always.</h3><p>One word. Two voices. The same moment.</p><p>I still think about that. How something so small felt so much like us. Maybe one day we'll carry that word with us, written on our skin. Until then, it's already part of our story.</p>
          <button className="soft-button" onClick={() => setWish(!wish)}>{wish ? "Wish kept ♡" : "Make a wish ✨"}</button>
          {wish && <p className="wish-reveal">My wish? More sunsets, more calls, more movies, more laughs. More of you and me. Always. ♡</p>}
        </div>
      </>;
    case "memories":
      return <>
        <p className="section-intro">A place to keep our favorite moments, even the little ones.</p>
        {memories.length ? <div className="photos-grid">{memories.map((photo) => <figure className="polaroid" key={photo.src}><img src={photo.src} alt={photo.caption} /><figcaption>{photo.caption}</figcaption></figure>)}</div> : <div className="memory-placeholder"><span>📷</span><h3>Our story, in pictures</h3><p>Our photos are going to live here. Every one of them will be another little piece of our universe.</p><p className="setup-hint">Add images to <code>public/photos</code> and their paths to <code>src/content.ts</code>.</p></div>}
      </>;
  }
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState<Place | null>(null);
  const [nameIndex, setNameIndex] = useState(0);
  useEffect(() => {
    if (!entered) return;
    const timer = window.setInterval(() => setNameIndex(i => (i + 1) % nicknames.length), 2600);
    return () => window.clearInterval(timer);
  }, [entered]);
  useEffect(() => {
    if (!active) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [active]);
  const selected = places.find(p => p.id === active);

  return <div className="site-shell"><Starfield /><div className="cosmic-glow glow-one" /><div className="cosmic-glow glow-two" />
    {!entered ? <main className="welcome-screen"><div className="welcome-inner"><div className="orbit-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit-core">♡</div><span className="orbit-spark spark-a">✧</span><span className="orbit-spark spark-b">✦</span></div><p className="eyebrow">A LITTLE SOMETHING FOR RIM</p><h1>Our little <em>universe.</em></h1><p className="welcome-copy">In a universe full of people,<br />I'm so glad I found you.</p><button className="primary-button enter-button" onClick={() => setEntered(true)}>Enter our universe <span>↗</span></button><p className="handwritten welcome-foot">made for you, with love ♡</p></div></main> : <main className="universe-screen"><header className="topbar"><div className="brand">our little universe <Heart filled /></div><button className="top-link" onClick={() => setEntered(false)}>← Back to the beginning</button></header><section className="hero"><p className="eyebrow">TO MY FAVORITE HUMAN IN EVERY UNIVERSE</p><h1>Hi, <span className="name-rotate" key={nameIndex}>{nicknames[nameIndex]}.</span></h1><p>There are a million little things I want to tell you, so I made a whole universe for them.</p><p className="handwritten hero-note">Go on, explore a little ♡</p></section><section className="places" aria-label="Explore our universe">{places.map((p) => <button key={p.id} className={`place-card tone-${p.tone}`} onClick={() => setActive(p.id)}><span className="place-icon">{p.icon}</span><span className="place-copy"><span className="place-number">CONSTELLATION {p.tag}</span><strong>{p.name}</strong><small>{p.hint}</small></span><span className="place-cta">↗</span></button>)}</section><footer>To Rim, my sunshine. <span>Always. ♡</span></footer></main>}
    {selected && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}><section className="modal" role="dialog" aria-modal="true" aria-label={selected.name}><div className="modal-top"><span className="eyebrow">A PIECE OF OUR UNIVERSE · {selected.tag}</span><button className="close-button" aria-label="Close section" onClick={() => setActive(null)}>✕</button></div><div className="modal-title-icon">{selected.icon}</div><h2>{selected.name}<span className="title-dot">.</span></h2><PlaceBody key={selected.id} place={selected.id} /><div className="modal-bottom">for my princess, always ♡</div></section></div>}
  </div>;
}
