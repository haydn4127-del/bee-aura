"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Review = {
  id: string;
  customer: string;
  initials: string;
  area: string;
  service: string;
  rating: number;
  text: string;
};

const startingReviews: Review[] = [
  {
    id: "REV-1001",
    customer: "Sarah Johnson",
    initials: "SJ",
    area: "Solihull",
    service: "Emergency boiler repair",
    rating: 5,
    text: "Tom came out the same day when our boiler broke down. He was professional, explained everything clearly and had it sorted quickly. Excellent service and great value. Highly recommend!",
  },
  {
    id: "REV-1002",
    customer: "Tom Wilson",
    initials: "TW",
    area: "Birmingham",
    service: "Boiler installation",
    rating: 5,
    text: "Brilliant from start to finish. New boiler fitted perfectly and the team left everything clean and tidy. Honest pricing and great communication throughout the job. Will definitely use again.",
  },
  {
    id: "REV-1003",
    customer: "Emma Davis",
    initials: "ED",
    area: "Dudley",
    service: "Bathroom renovation",
    rating: 5,
    text: "Our new bathroom looks amazing! The team were friendly, reliable and paid attention to every detail. The whole process was smooth and stress-free. Couldn't be happier with the result.",
  },
];

const reviewStats = [
  { icon: "💬", value: "324+", label: "Reviews Collected" },
  { icon: "▣", value: "1,200+", label: "Jobs Completed" },
  { icon: "☆", value: "4.9/5", label: "Average Rating" },
  { icon: "☻", value: "97%", label: "Customer Satisfaction" },
];

const reviewSources = [
  {
    icon: "G",
    title: "Google Reviews",
    score: "4.9",
    reviews: "214 reviews",
    image: "van",
  },
  {
    icon: "f",
    title: "Facebook Recommendations",
    score: "4.8",
    reviews: "87 recommendations",
    image: "family",
  },
  {
    icon: "🔥",
    title: "Boiler Installations",
    score: "4.9",
    reviews: "156 reviews",
    image: "boiler",
  },
  {
    icon: "💧",
    title: "Bathroom Renovations",
    score: "4.9",
    reviews: "132 reviews",
    image: "bathroom",
  },
];

function stars(count: number) {
  return "★".repeat(count);
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(startingReviews);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("Review command centre ready.");

  const filteredReviews = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reviews.filter((review) => {
      return (
        query.length === 0 ||
        review.customer.toLowerCase().includes(query) ||
        review.area.toLowerCase().includes(query) ||
        review.service.toLowerCase().includes(query) ||
        review.text.toLowerCase().includes(query)
      );
    });
  }, [reviews, search]);

  function requestReview() {
    const demoReview: Review = {
      id: `REV-DEMO-${Date.now()}`,
      customer: "New Demo Customer",
      initials: "NC",
      area: "Birmingham",
      service: "Review request sent",
      rating: 5,
      text: "Demo review request created. In the real product, this would help turn a completed job into a public review opportunity.",
    };

    setReviews((current) => [demoReview, ...current]);
    setNotice("New demo review request added.");
  }

  return (
    <main className="reviewsRef-page">
      <header className="reviewsRef-topbar">
        <div>
          <h1>Reviews</h1>
          <p>Collect, track and showcase customer feedback in one place.</p>
        </div>

        <div className="reviewsRef-actions">
          <button type="button" onClick={requestReview} className="reviewsRef-addButton">
            ＋ Request Review
          </button>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setNotice("Review filters cleared.");
            }}
            className="reviewsRef-darkButton"
          >
            ▽ All Channels⌄
          </button>
          <label className="reviewsRef-search">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search reviews..."
            />
            <span>⌕</span>
          </label>
          <Link href="/settings" className="reviewsRef-owner">
            <span>JD</span>
            <strong>John D.</strong>
            <small>Owner</small>
          </Link>
        </div>
      </header>

      <section className="reviewsRef-card reviewsRef-trustHero">
        <div className="reviewsRef-heroCopy">
          <h2>Reviews That <span>Build Trust</span></h2>
          <p>
            Turn happy customers into powerful social proof. Automated review requests and simple
            follow-ups help you get more 5-star reviews and more booked jobs.
          </p>
          <button type="button" onClick={requestReview}>
            ✈ Send Review Request
          </button>
        </div>

        <div className="reviewsRef-ratingPanel">
          <div className="reviewsRef-ratingScore">
            <p>Overall Rating</p>
            <strong>4.9 <span>/ 5</span></strong>
            <em>★★★★★</em>
            <small>Based on 324 reviews</small>
          </div>

          <div className="reviewsRef-ratingBars">
            <p><span>5 Stars</span><i><b style={{ width: "88%" }} /></i><strong>298</strong></p>
            <p><span>4 Stars</span><i><b style={{ width: "18%" }} /></i><strong>20</strong></p>
            <p><span>3 Stars</span><i><b style={{ width: "5%" }} /></i><strong>4</strong></p>
            <p><span>2 Stars</span><i><b style={{ width: "2%" }} /></i><strong>1</strong></p>
            <p><span>1 Star</span><i><b style={{ width: "2%" }} /></i><strong>1</strong></p>
          </div>

          <div className="reviewsRef-recommendCircle">
            <span>☆</span>
            <strong>97%</strong>
            <small>Would Recommend Our Services</small>
          </div>
        </div>
      </section>

      <section id="reviews-list" className="reviewsRef-card reviewsRef-testimonials">
        <div className="reviewsRef-sectionTitle">
          <h2>What Our Customers Say</h2>
          <p>Real feedback from real service customers.</p>
        </div>

        <div className="reviewsRef-testimonialGrid">
          {filteredReviews.slice(0, 3).map((review) => (
            <article key={review.id}>
              <span className="reviewsRef-quote">“</span>
              <p>{review.text}</p>
              <strong className="reviewsRef-stars">{stars(review.rating)}</strong>
              <div>
                <span>{review.initials}</span>
                <div>
                  <strong>{review.customer}</strong>
                  <small>{review.area}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="reviewsRef-statStrip">
        {reviewStats.map((stat) => (
          <article key={stat.label}>
            <span>{stat.icon}</span>
            <strong>{stat.value}</strong>
            <small>{stat.label}</small>
          </article>
        ))}
      </section>

      <section className="reviewsRef-lowerGrid">
        <article className="reviewsRef-card reviewsRef-trustPanel">
          <p>Built on trust</p>
          <h2>Consistent Service. Strong Relationships.</h2>
          <span>
            Every review reflects our commitment to quality workmanship, reliability and putting our
            customers first — every time.
          </span>
          <Link href="#reviews-list">View All Reviews</Link>
        </article>

        <div className="reviewsRef-sourceGrid">
          {reviewSources.map((source) => (
            <article key={source.title} className="reviewsRef-card reviewsRef-sourceCard">
              <span className={`reviewsRef-sourceIcon source-${source.image}`}>{source.icon}</span>
              <div>
                <h3>{source.title}</h3>
                <strong>{source.score} ★★★★★</strong>
                <small>{source.reviews}</small>
              </div>
              <div className={`reviewsRef-sourceImage image-${source.image}`} />
            </article>
          ))}
        </div>
      </section>

      <section className="reviewsRef-cta">
        <div className="reviewsRef-ctaBotWrap">
          <img
            className="reviewsRef-ctaBot"
            src="/brand/source/aura-assistant-transparent.png"
            alt="Bee-Aura AI assistant"
          />
        </div>
        <span>☆</span>
        <div>
          <h2>Ready to Collect More 5-Star Reviews?</h2>
          <p>Automated follow-ups and review requests make it easy to turn happy customers into loyal advocates.</p>
        </div>
        <button type="button" onClick={requestReview}>Get Started →</button>
      </section>

      <div className="reviewsRef-notice">{notice}</div>
    </main>
  );
}
