"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LiquidMetal } from "@paper-design/shaders-react";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

type Quote = {
  id: string;
  text: string;
  author: string;
  source: string;
  portrait?: string;
  evil?: boolean;
};

const quotes: Quote[] = [
  {
    id: "jiraiya-rejection",
    text: "Rejection makes a man stronger.",
    author: "Jiraiya",
    source: "Naruto",
    portrait: "/quotes/jiraiya.webp",
  },
  {
    id: "naruto-ninja-way",
    text: "I never go back on my word. That's my ninja way.",
    author: "Naruto Uzumaki",
    source: "Naruto",
    portrait: "/quotes/naruto-uzumaki.webp",
  },
  {
    id: "naruto-hard-work",
    text: "Hard work is worthless for those who don't believe in themselves.",
    author: "Naruto Uzumaki",
    source: "Naruto",
    portrait: "/quotes/naruto-uzumaki.webp",
  },
  {
    id: "rengoku-heart-ablaze",
    text: "Set your heart ablaze.",
    author: "Kyojuro Rengoku",
    source: "Demon Slayer",
    portrait: "/quotes/kyojuro-rengoku.webp",
  },
  {
    id: "gojo-honored-one",
    text: "Throughout heaven and earth, I alone am the honored one.",
    author: "Satoru Gojo",
    source: "Jujutsu Kaisen",
    portrait: "/quotes/satoru-gojo.webp",
  },
  {
    id: "eren-fight-win",
    text: "If you don't fight, you can't win.",
    author: "Eren Yeager",
    source: "Attack on Titan",
    portrait: "/quotes/eren-yeager.webp",
  },
  {
    id: "madara-reality",
    text: "Wake up to reality! Nothing ever goes as planned in this accursed world.",
    author: "Madara Uchiha",
    source: "Naruto",
    portrait: "/quotes/madara-uchiha.webp",
  },
  {
    id: "pain-true-peace",
    text: "Those who do not understand true pain can never understand true peace.",
    author: "Pain",
    source: "Naruto",
    portrait: "/quotes/pain.webp",
  },
  {
    id: "itachi-true-nature",
    text: "Those who forgive themselves and accept their true nature are the strong ones.",
    author: "Itachi Uchiha",
    source: "Naruto",
    portrait: "/quotes/itachi-uchiha.webp",
  },
  {
    id: "erwin-charge",
    text: "My soldiers, rage! My soldiers, scream! My soldiers, push forward!",
    author: "Erwin Smith",
    source: "Attack on Titan",
    portrait: "/quotes/erwin-smith.webp",
  },
  {
    id: "gojo-win",
    text: "Nah, I'd win.",
    author: "Satoru Gojo",
    source: "Jujutsu Kaisen",
    portrait: "/quotes/satoru-gojo.webp",
  },
  {
    id: "itachi-hatred",
    text: "You're weak. Why are you weak? Because you lack hatred.",
    author: "Itachi Uchiha",
    source: "Naruto",
    portrait: "/quotes/itachi-uchiha.webp",
  },
  {
    id: "naruto-believe-it",
    text: "Believe it! Dattebayo!",
    author: "Naruto Uzumaki",
    source: "Naruto",
    portrait: "/quotes/naruto-uzumaki.webp",
  },
  {
    id: "obito-light-shadows",
    text: "Wherever there is light, there are also shadows.",
    author: "Obito Uchiha",
    source: "Naruto",
    portrait: "/quotes/obito-uchiha.webp",
  },
  {
    id: "jinwoo-arise",
    text: "Arise.",
    author: "Sung Jinwoo",
    source: "Solo Leveling",
    portrait: "/quotes/sung-jinwoo.webp",
  },
  {
    id: "light-laugh",
    text: "This is my perfect victory!   Ahahahaha!",
    author: "Light Yagami",
    source: "Death Note",
    portrait: "/quotes/light-yagami.webp",
    evil: true,
  },
  {
    id: "itachi-jutsu-weakness",
    text: "Every jutsu has its weakness. This one's weakness... is the existence of me!",
    author: "Itachi Uchiha",
    source: "Naruto",
    portrait: "/quotes/itachi-uchiha.webp",
  },
  {
    id: "dhoni-journey",
    text: "It's the journey that teaches you a lot about your destination.",
    author: "MS Dhoni",
    source: "Cricket",
    portrait: "/quotes/ms-dhoni.webp",
  },
  {
    id: "kohli-never-give-up",
    text: "Never give up. Today is hard, tomorrow will be worse, but the day after tomorrow will be sunshine.",
    author: "Virat Kohli",
    source: "Cricket",
    portrait: "/quotes/virat-kohli.webp",
  },
  {
    id: "linus-code",
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    source: "Linux",
    portrait: "/quotes/linus-torvalds.webp",
  },
  {
    id: "john-johnson-solve",
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    source: "Software",
    portrait: "/quotes/john-johnson.webp",
  },
  {
    id: "jobs-great-work",
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    source: "Stanford, 2005",
    portrait: "/quotes/steve-jobs.webp",
  },
  {
    id: "lao-tzu-journey",
    text: "A journey of a thousand miles begins with a single step.",
    author: "Lao Tzu",
    source: "Tao Te Ching",
    portrait: "/quotes/lao-tzu.webp",
  },
  {
    id: "jobs-design",
    text: "Design is not just what it looks like. Design is how it works.",
    author: "Steve Jobs",
    source: "The New York Times, 2003",
    portrait: "/quotes/steve-jobs.webp",
  },
  {
    id: "jordan-failure",
    text: "I've failed over and over again in my life. That is why I succeed.",
    author: "Michael Jordan",
    source: "Basketball",
    portrait: "/quotes/michael-jordan.webp",
  },
  {
    id: "notke-hard-work",
    text: "Hard work beats talent when talent doesn't work hard.",
    author: "Tim Notke",
    source: "Basketball Coach",
    portrait: "/quotes/tim-notke.webp",
  },
  {
    id: "uncle-ben-power",
    text: "With great power comes great responsibility.",
    author: "Uncle Ben",
    source: "Spider-Man",
    portrait: "/quotes/uncle-ben.webp",
  },
  {
    id: "tony-stark-iron-man",
    text: "I am Iron Man.",
    author: "Tony Stark",
    source: "Avengers: Endgame",
    portrait: "/quotes/tony-stark-armored.webp",
  },
  {
    id: "steve-rogers-all-day",
    text: "I can do this all day.",
    author: "Steve Rogers",
    source: "Captain America",
    portrait: "/quotes/steve-rogers.webp",
  },
  {
    id: "bruce-banner-secret",
    text: "That's my secret, Captain. I'm always angry.",
    author: "Bruce Banner",
    source: "The Avengers",
    portrait: "/quotes/bruce-banner.webp",
  },
  {
    id: "thanos-inevitable",
    text: "I am inevitable.",
    author: "Thanos",
    source: "Avengers: Endgame",
    portrait: "/quotes/thanos.webp",
  },
  {
    id: "doctor-strange-bargain",
    text: "Dormammu, I've come to bargain.",
    author: "Doctor Strange",
    source: "Doctor Strange",
    portrait: "/quotes/doctor-strange.webp",
  },
  {
    id: "tchalla-wakanda",
    text: "Wakanda forever!",
    author: "T'Challa",
    source: "Black Panther",
    portrait: "/quotes/tchalla.webp",
  },
  {
    id: "thor-worthy",
    text: "I'm still worthy.",
    author: "Thor",
    source: "Avengers: Endgame",
    portrait: "/quotes/thor.webp",
  },
  {
    id: "loki-purpose",
    text: "I am burdened with glorious purpose.",
    author: "Loki",
    source: "The Avengers",
    portrait: "/quotes/loki.webp",
    evil: true,
  },
  {
    id: "thanos-hardest-choices",
    text: "The hardest choices require the strongest wills.",
    author: "Thanos",
    source: "Avengers: Infinity War",
    portrait: "/quotes/thanos.webp",
    evil: true,
  },
  {
    id: "groot-i-am-groot",
    text: "I am Groot.",
    author: "Groot",
    source: "Guardians of the Galaxy",
    portrait: "/quotes/groot-disney.webp",
  },
  {
    id: "peter-parker-feel-good",
    text: "Mr. Stark, I don't feel so good.",
    author: "Peter Parker",
    source: "Avengers: Infinity War",
    portrait: "/quotes/peter-parker-masked.webp",
  },
  {
    id: "peter-quill-star-lord",
    text: "Star-Lord, man.",
    author: "Peter Quill",
    source: "Guardians of the Galaxy",
    portrait: "/quotes/peter-quill.webp",
  },
  {
    id: "wanda-you-took-everything",
    text: "You took everything from me.",
    author: "Wanda Maximoff",
    source: "Avengers: Endgame",
    portrait: "/quotes/wanda-maximoff-web.webp",
  },
];

export function FooterQuoteRotator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(false);
  const quote = quotes[activeIndex];
  const maxVisibleDots = 7;
  const firstVisibleDot = Math.max(
    0,
    Math.min(activeIndex - Math.floor(maxVisibleDots / 2), quotes.length - maxVisibleDots),
  );
  const visibleQuotes = quotes
    .slice(firstVisibleDot, firstVisibleDot + maxVisibleDots)
    .map((item, offset) => ({ item, index: firstVisibleDot + offset }));
  const initials = quote.author
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  const moveQuote = (direction: number) => {
    setActiveIndex((index) => (index + direction + quotes.length) % quotes.length);
    setPaused(true);
  };

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setWebglAvailable(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  useEffect(() => {
    if (paused || quotes.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % quotes.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="footer-quote"
      aria-label="Favorite quote"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="footer-quote-content" key={quote.id}>
        <span className="footer-quote-mark" aria-hidden="true">“</span>
        <blockquote className="footer-quote-text">{quote.text}</blockquote>
        <div className="footer-quote-attribution">
          <div className={`footer-quote-avatar-frame${quote.evil ? " is-evil" : ""}`} aria-hidden="true">
            <div className="footer-quote-avatar-metal">
              {webglAvailable && (
                <LiquidMetal
                  width="100%"
                  height="100%"
                  colorBack="#6b5828"
                  colorTint="#ffd700"
                  speed={0.3}
                  repetition={4}
                  distortion={0.2}
                  softness={0}
                  shiftRed={0.3}
                  shiftBlue={-0.3}
                  angle={45}
                  shape="none"
                  scale={1}
                  fit="cover"
                />
              )}
            </div>
            {quote.portrait ? (
              <Image
                src={quote.portrait}
                alt=""
                width={58}
                height={58}
                sizes="58px"
                className="footer-quote-avatar"
              />
            ) : (
              <span className="footer-quote-avatar-fallback">{initials}</span>
            )}
          </div>
          <div className="footer-quote-author">
            <span className="footer-quote-name">{quote.author}</span>
            <span className="footer-quote-source">{quote.source}</span>
          </div>
        </div>
        <nav className="footer-quote-controls" aria-label="Quote navigation">
          <button
            type="button"
            className="footer-quote-arrow"
            aria-label="Previous quote"
            onClick={() => moveQuote(-1)}
          >
            <ArrowLeftIcon size={15} />
          </button>
          <div className="footer-quote-dots">
            {visibleQuotes.map(({ item, index }) => (
              <button
                key={item.id}
                type="button"
                className={`footer-quote-dot ${activeIndex === index ? "is-active" : ""}`}
                aria-label={`Show quote ${index + 1} by ${item.author}`}
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => {
                  setActiveIndex(index);
                  setPaused(true);
                }}
              />
            ))}
          </div>
          <button
            type="button"
            className="footer-quote-arrow"
            aria-label="Next quote"
            onClick={() => moveQuote(1)}
          >
            <ArrowRightIcon size={15} />
          </button>
          <span className="footer-quote-count" aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} / {String(quotes.length).padStart(2, "0")}
          </span>
        </nav>
      </div>
    </section>
  );
}
