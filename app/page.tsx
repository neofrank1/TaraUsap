"use client";

import { Suspense, use, useState } from "react";
import { io } from "next/cache";
import { Button, Card } from "@heroui/react";

const topics = [
  "Who in our home do you feel most loved by, and what do they do that shows it?",
  "What is one small way we can show love to each other this week?",
  "How do we love someone when we are tired or annoyed with them?",
  "Who outside our family could use our love and care right now?",
  "What does it mean to love God and love our neighbor in everyday home life?",
  "Which words of love do you most like to hear from us?",
];

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 11.5 9-7.5 9 7.5M5.5 10v9.5h13V10M10 19.5v-5h4v5" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v5h-5" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m20.5 13.5-7 7a2 2 0 0 1-2.8 0L3 12.8V3h9.8l7.7 7.7a2 2 0 0 1 0 2.8Z" /><circle cx="7.5" cy="7.5" r="1.2" />
    </svg>
  );
}

function CurrentDateLabel() {
  use(io());

  const dateLabel = new Intl.DateTimeFormat("en-PH", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Manila",
  }).format(new Date());

  return <p className="eyebrow">{dateLabel}</p>;
}

export default function Home() {
  const [current, setCurrent] = useState(0);

  function newTopic() {
    setCurrent((previous) => {
      const offset = 1 + Math.floor(Math.random() * (topics.length - 1));
      return (previous + offset) % topics.length;
    });
  }

  return (
    <div className="page-shell" id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Tara, Usap! home">
          <span className="brand-icon"><HomeIcon /></span>
          <span className="brand-name">Tara, Usap!</span>
        </a>
        <nav className="nav" aria-label="Main navigation">
          <a href="#gospel">Gospel of the day</a>
          <a href="#topic">Household topic</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <Suspense fallback={<p className="eyebrow" aria-hidden="true" />}>
          <CurrentDateLabel />
        </Suspense>
        <h1 id="hero-title">Read the Gospel, then talk about it at home.</h1>
        <p className="lead">Each day we pick one key word from the Gospel and turn it into conversation starters for your household.</p>
      </section>

      <main className="cards">
        <Card className="content-card gospel-card" id="gospel" aria-labelledby="gospel-title">
          <div className="card-label" id="gospel-title">1 · Gospel of the day</div>
          <div>
            <h2 className="gospel-ref">[Gospel reference]</h2>
            <p className="gospel-day">[Liturgical day, e.g. Sunday in Ordinary Time]</p>
          </div>
          <hr className="divider" />
          <p className="gospel-text">[The Gospel reading for today loads here each morning from your chosen source.]</p>
          <div className="keyword-box">
            <TagIcon />
            <span className="keyword-label">Key word</span>
            <span className="keyword">Love</span>
          </div>
        </Card>

        <Card className="content-card topic-card" id="topic" aria-labelledby="topic-title">
          <div className="card-label" id="topic-title">2 · Household topic</div>
          <p className="topic-intro">Conversation starters based on today&apos;s key word: <strong>Love</strong></p>
          <div className="topic-wrap" aria-live="polite">
            <p className="topic">{topics[current]}</p>
          </div>
          <div className="topic-actions">
            <Button className="new-topic-button" onPress={newTopic}>
              <RefreshIcon />
              New topic
            </Button>
            <span className="counter">Topic {current + 1} of {topics.length}</span>
          </div>
        </Card>
      </main>

      <footer className="site-footer">
        <span>Tara, Usap! · A small daily habit for your household</span>
        <span>Gospel text: [source credit]</span>
      </footer>
    </div>
  );
}
