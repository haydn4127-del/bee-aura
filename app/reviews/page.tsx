"use client";


import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./reviews.module.css";

type ReviewStatus = "Ready" | "Sent" | "Received" | "Needs Reply";
type ReviewTab = "All" | ReviewStatus;
type ReviewSource = "Google" | "Facebook" | "Website" | "WhatsApp" | "SMS";
type SourceFilter = "All Sources" | ReviewSource;
type Priority = "High" | "Medium" | "Low";

type ReviewRecord = {
  id: string;
  initials: string;
  customer: string;
  job: string;
  area: string;
  source: ReviewSource;
  status: ReviewStatus;
  rating: number | "Pending";
  priority: Priority;
  lastAction: string;
  nextAction: string;
  reviewText: string;
  ownerNote: string;
};

const tabs: ReviewTab[] = ["All", "Ready", "Sent", "Received", "Needs Reply"];
const sources: SourceFilter[] = ["All Sources", "Google", "Facebook", "Website", "WhatsApp", "SMS"];

const initialRecords: ReviewRecord[] = [
  {
    id: "sarah-johnson",
    initials: "SJ",
    customer: "Sarah Johnson",
    job: "Emergency boiler repair",
    area: "Salford",
    source: "Google",
    status: "Received",
    rating: 5,
    priority: "Low",
    lastAction: "5-star review received",
    nextAction: "Add to proof pack",
    reviewText:
      "Same-day boiler repair. Professional, clear and reliable. Excellent service and great value.",
    ownerNote: "Strong testimonial for emergency boiler work.",
  },
  {
    id: "tom-wilson",
    initials: "TW",
    customer: "Tom Wilson",
    job: "Boiler service",
    area: "Manchester",
    source: "SMS",
    status: "Ready",
    rating: "Pending",
    priority: "High",
    lastAction: "Job completed today",
    nextAction: "Send owner-approved review request",
    reviewText: "Awaiting review request.",
    ownerNote: "Warm customer. Send review request before the moment goes cold.",
  },
  {
    id: "emma-davis",
    initials: "ED",
    customer: "Emma Davis",
    job: "Bathroom renovation",
    area: "Stockport",
    source: "Website",
    status: "Received",
    rating: 5,
    priority: "Low",
    lastAction: "Review received",
    nextAction: "Use in bathroom renovation proof",
    reviewText:
      "Bathroom looks amazing. Friendly, reliable team and a smooth process from start to finish.",
    ownerNote: "Great proof for higher-value renovation work.",
  },
  {
    id: "olivia-smith",
    initials: "OS",
    customer: "Olivia Smith",
    job: "Thermostat install",
    area: "Oldham",
    source: "WhatsApp",
    status: "Sent",
    rating: "Pending",
    priority: "Medium",
    lastAction: "Request sent yesterday",
    nextAction: "Wait before chasing",
    reviewText: "Review request sent. Customer has not replied yet.",
    ownerNote: "Do not over-chase. Keep owner control on.",
  },
  {
    id: "james-brown",
    initials: "JB",
    customer: "James Brown",
    job: "Drain clearance",
    area: "Rochdale",
    source: "Facebook",
    status: "Needs Reply",
    rating: 4,
    priority: "High",
    lastAction: "Customer left useful feedback",
    nextAction: "Draft polite owner reply",
    reviewText:
      "Good service and quick response. A small delay on arrival but the job was completed well.",
    ownerNote: "Needs a calm owner-approved reply.",
  },
  {
    id: "david-carter",
    initials: "DC",
    customer: "David Carter",
    job: "Roof repair",
    area: "Manchester",
    source: "Google",
    status: "Ready",
    rating: "Pending",
    priority: "Medium",
    lastAction: "Job completed two days ago",
    nextAction: "Send review request",
    reviewText: "Awaiting review request.",
    ownerNote: "Good review candidate after completed roof repair.",
  },
];

const sourceStats = [
  { icon: "G", title: "Google", score: "4.9", detail: "214 reviews", trend: "+18 this month" },
  { icon: "f", title: "Facebook", score: "4.8", detail: "87 recommendations", trend: "+6 this month" },
  { icon: "W", title: "Website", score: "4.9", detail: "132 captured", trend: "best proof source" },
  { icon: "S", title: "SMS / WhatsApp", score: "42", detail: "requests queued", trend: "owner-approved" },
];

const statusClass: Record<ReviewStatus, string> = {
  Ready: styles.statusReady,
  Sent: styles.statusSent,
  Received: styles.statusReceived,
  "Needs Reply": styles.statusReply,
};

const priorityClass: Record<Priority, string> = {
  High: styles.priorityHigh,
  Medium: styles.priorityMed,
  Low: styles.priorityLow,
};

function ratingText(rating: ReviewRecord["rating"]) {
  return rating === "Pending" ? "Pending" : `${rating} ★`;
}

export default function ReviewsPage() {
  const [records, setRecords] = useState(initialRecords);
  const [selectedTab, setSelectedTab] = useState<ReviewTab>("All");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("All Sources");
  const [searchText, setSearchText] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<ReviewRecord>(initialRecords[0]);
  const [requestPanelOpen, setRequestPanelOpen] = useState(false);
  const [selectedActionMessage, setSelectedActionMessage] = useState(
    "Select a review action to see the owner-controlled next step here."
  );
  const [notice, setNotice] = useState("Review command centre ready.");

  const counts = useMemo(() => {
    return tabs.reduce((acc, tab) => {
      acc[tab] = tab === "All" ? records.length : records.filter((record) => record.status === tab).length;
      return acc;
    }, {} as Record<ReviewTab, number>);
  }, [records]);

  const filteredRecords = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return records.filter((record) => {
      const matchesTab = selectedTab === "All" || record.status === selectedTab;
      const matchesSource = sourceFilter === "All Sources" || record.source === sourceFilter;
      const searchable = [
        record.customer,
        record.job,
        record.area,
        record.source,
        record.status,
        record.priority,
        record.lastAction,
        record.nextAction,
        record.reviewText,
        record.ownerNote,
      ].join(" ").toLowerCase();

      return matchesTab && matchesSource && (!query || searchable.includes(query));
    });
  }, [records, selectedTab, sourceFilter, searchText]);

  function scrollToTable() {
    window.setTimeout(() => {
      document.getElementById("review-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function scrollToSelected() {
    window.setTimeout(() => {
      document.getElementById("selected-review-record")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function openTab(tab: ReviewTab) {
    const matching = tab === "All" ? records : records.filter((record) => record.status === tab);

    setSelectedTab(tab);
    setSearchText("");
    setSourceFilter("All Sources");
    setSelectedRecord(matching[0] ?? records[0]);
    setSelectedActionMessage(
      matching[0]
        ? `${matching[0].customer} is now selected from the ${tab.toLowerCase()} review view.`
        : "No matching review record is available in this view."
    );
    setNotice(
      tab === "All"
        ? `All review records opened. Showing ${records.length} demo records.`
        : `${tab} reviews opened. Showing ${matching.length} matching demo record${matching.length === 1 ? "" : "s"}.`
    );
    scrollToTable();
  }

  function openRecord(record: ReviewRecord, action = "Review record opened") {
    setSelectedRecord(record);
    setSelectedActionMessage(
      `${action}: ${record.customer}. Next step: ${record.nextAction}. Owner approval stays required.`
    );
    setNotice(`${action}: ${record.customer}. Selected review panel updated.`);
    scrollToSelected();
  }

  function createDemoRequest() {
    const demoRecord: ReviewRecord = {
      id: `demo-review-${Date.now()}`,
      initials: "NC",
      customer: "New Demo Customer",
      job: "Completed service visit",
      area: "Manchester",
      source: "SMS",
      status: "Ready",
      rating: "Pending",
      priority: "High",
      lastAction: "Demo request created locally",
      nextAction: "Owner approves review request",
      reviewText: "Demo-only review request. Nothing has been sent.",
      ownerNote: "This proves the workflow without using a database, API or real customer data.",
    };

    setRecords((current) => [demoRecord, ...current]);
    setSelectedRecord(demoRecord);
    setSelectedTab("All");
    setSourceFilter("All Sources");
    setSearchText("");
    setRequestPanelOpen(false);
    setSelectedActionMessage(
      "New demo review request created locally. It is now ready for owner approval. Nothing has been sent."
    );
    setNotice("Demo review request created locally. Nothing was sent.");
    scrollToSelected();
  }

  function clearFilters() {
    setSelectedTab("All");
    setSourceFilter("All Sources");
    setSearchText("");
    setNotice("Review filters cleared. Showing all demo review records.");
  }

  return (
    <main className={styles.reviewsPage}>
<section className={styles.pageHero}>
        <div className={styles.heroTop}>
          <div className={styles.titleBlock}>
            <p className={styles.kicker}>REVIEW COMMAND CENTRE</p>
            <h1>Reviews</h1>
            <p>
              Track review requests, received feedback, proof opportunities and owner-approved replies in one place.
            </p>
          </div>

          <div className={styles.commandBar}>
            <button
              className={styles.commandButton}
              type="button"
              onClick={() => {
                setRequestPanelOpen(true);
                setNotice("Review request panel opened. Demo-only local action.");
              }}
            >
              + Request Review
            </button>

            <select
              className={styles.selectControl}
              value={sourceFilter}
              aria-label="Filter reviews by source"
              onChange={(event) => {
                setSourceFilter(event.target.value as SourceFilter);
                setNotice(`Source filter changed to ${event.target.value}.`);
                scrollToTable();
              }}
            >
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>

            <button className={styles.clearButton} type="button" onClick={clearFilters}>
              Clear
            </button>

            <label className={styles.searchBox}>
              <input
                value={searchText}
                onChange={(event) => {
                  setSearchText(event.target.value);
                  setNotice("Search is filtering reviews live.");
                }}
                placeholder="Search reviews..."
              />
              <span>⌕</span>
            </label>

            <button
              className={styles.ownerButton}
              type="button"
              onClick={() => setNotice("Owner review controls opened. Demo-only action.")}
            >
              <span>JD</span>
              <div>
                <strong>John D</strong>
                <small>Owner</small>
              </div>
            </button>
          </div>
        </div>
<section className="baFlowStrip baFlowStrip--reviews" aria-label="Turn good work into proof and trust.">
        <div className="baFlowIntro">
          <p>Review action path</p>
          <h2>Turn good work into proof and trust.</h2>
          <span>Review requests, owner replies and proof-pack items stay visible before anything is sent.</span>
        </div>

        <div className="baFlowCards">

          <Link href="/reviews?status=ready" className="baFlowCard">
            <span>Ready</span>
            <strong>Request review</strong>
            <small>Happy customer ready for owner-approved review request.</small>
            <em>Open ready</em>
          </Link>

          <Link href="/messages?search=review" className="baFlowCard">
            <span>Reply</span>
            <strong>Draft owner reply</strong>
            <small>Reviews needing response should be handled with care.</small>
            <em>Open inbox</em>
          </Link>

          <Link href="/reviews?view=proof-pack" className="baFlowCard">
            <span>Proof</span>
            <strong>Build proof pack</strong>
            <small>Strong reviews can support higher-value work.</small>
            <em>Open proof</em>
          </Link>
        </div>
      </section>


        <div className={styles.kpiGrid}>
          <article className={styles.kpiCard}>
            <span className={styles.kpiIcon}>★</span>
            <div>
              <p>Reviews collected</p>
              <strong>324+</strong>
              <small>+18% this month</small>
            </div>
          </article>
          <article className={styles.kpiCard}>
            <span className={styles.kpiIcon}>RQ</span>
            <div>
              <p>Requests ready</p>
              <strong>18</strong>
              <small>owner approval needed</small>
            </div>
          </article>
          <article className={styles.kpiCard}>
            <span className={styles.kpiIcon}>4.9</span>
            <div>
              <p>Average rating</p>
              <strong>4.9/5</strong>
              <small>from demo proof data</small>
            </div>
          </article>
          <article className={styles.kpiCard}>
            <span className={styles.kpiIcon}>!</span>
            <div>
              <p>Needs reply</p>
              <strong>4</strong>
              <small>protect reputation</small>
            </div>
          </article>
        </div>
      </section>

      {requestPanelOpen && (
        <section className={`${styles.panel} ${styles.demoPanel}`}>
          <div>
            <p className={styles.kicker}>DEMO ACTION</p>
            <h2>Create review request</h2>
            <p>No message is sent. This creates a local demo review task only.</p>
          </div>

          <div className={styles.demoForm}>
            <input placeholder="Customer name" />
            <select
              defaultValue="SMS"
              onChange={(event) => setNotice(`Review request channel set to ${event.target.value}. Demo-only local selection.`)}
            >
              <option>SMS</option>
              <option>WhatsApp</option>
              <option>Google</option>
              <option>Facebook</option>
            </select>
            <input placeholder="Completed job" />
          </div>

          <button className={styles.demoButton} type="button" onClick={createDemoRequest}>
            Save Demo Request
          </button>
        </section>
      )}

      <div className={styles.notice}>{notice}</div>

      <section className={styles.mainGrid}>
        <section id="review-results" className={styles.tablePanel}>
          <div className={styles.tableHeader}>
            <div className={styles.tabs}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  aria-pressed={selectedTab === tab}
                  className={`${styles.tabButton} ${selectedTab === tab ? styles.tabActive : ""}`}
                  onClick={() => openTab(tab)}
                >
                  {tab}
                  <span data-review-tab-count="true">{counts[tab]}</span>
                </button>
              ))}
            </div>

            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() => {
                setSelectedRecord(filteredRecords[0] ?? records[0]);
                setNotice(
                  filteredRecords[0]
                    ? `${filteredRecords[0].customer} opened from the active review view.`
                    : "No matching review records in this view."
                );
                scrollToSelected();
              }}
            >
              Open first record
            </button>
          </div>

          <div className={styles.tableIntro}>
            <div>
              <p className={styles.kicker}>ACTIVE REVIEW VIEW</p>
              <strong>{selectedTab === "All" ? "All review records" : `${selectedTab} reviews`}</strong>
              <span>
                Showing {filteredRecords.length} of {records.length} demo review records.
              </span>
            </div>
            <span className={styles.tableMeta}>Page 1 of 1</span>
          </div>

          <div className={styles.tableScroll}>
            <table className={styles.reviewTable}>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Job</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Rating</th>
                  <th>Priority</th>
                  <th>Next action</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} onClick={() => openRecord(record)}>
                    <td>
                      <button
                        className={styles.customerButton}
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          openRecord(record);
                        }}
                      >
                        <span className={styles.avatar} data-review-customer-avatar="true">{record.initials}</span>
                        <div>
                          <strong>{record.customer}</strong>
                          <small>{record.area}</small>
                        </div>
                      </button>
                    </td>
                    <td>
                      <strong>{record.job}</strong>
                      <small>{record.lastAction}</small>
                    </td>
                    <td><span data-review-source={record.source.toLowerCase().replace(/[\s/]+/g, "-")}> {record.source}</span></td>
                    <td>
                      <span className={`${styles.statusChip} ${statusClass[record.status]}`}>
                        {record.status}
                      </span>
                    </td>
                    <td><span className={styles.reviewRatingText}>{ratingText(record.rating)}</span></td>
                    <td>
                      <span className={`${styles.priorityChip} ${priorityClass[record.priority]}`}>
                        {record.priority}
                      </span>
                    </td>
                    <td>
                      <strong>{record.nextAction}</strong>
                      <small>{record.ownerNote}</small>
                    </td>
                    <td>
                      <div className={styles.actionStack}>
                        <button
                          className={styles.rowButton}
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openRecord(record, "Review action opened");
                          }}
                         data-review-table-action="view">
                          View
                        </button>
                        <button
                          className={styles.rowButton}
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openRecord(record, "Owner-approved review workflow opened");
                          }}
                         data-review-table-action="action">
                          Action
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredRecords.length === 0 && (
              <div className={styles.emptyState}>
                <strong>No review records found.</strong>
                <p>Clear filters or search another customer, job, area, source or status.</p>
              </div>
            )}
          </div>
        </section>

        <aside id="selected-review-record" className={styles.selectedPanel}>
          <p className={styles.kicker}>SELECTED REVIEW RECORD</p>
          <h2>{selectedRecord.customer}</h2>
          <p>{selectedRecord.reviewText}</p>

          <div className={styles.selectedMeta}>
            <div
              className={styles.selectedMetaCard}
              data-tone={`status-${selectedRecord.status.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <strong>{selectedRecord.status}</strong>
              <small>Status</small>
            </div>
            <div
              className={styles.selectedMetaCard}
              data-tone={`source-${selectedRecord.source.toLowerCase().replace(/[\s/]+/g, "-")}`}
            >
              <strong>{selectedRecord.source}</strong>
              <small>Source</small>
            </div>
            <div
              className={styles.selectedMetaCard}
              data-tone={selectedRecord.rating ? "rating-scored" : "rating-pending"}
            >
              <strong>{ratingText(selectedRecord.rating)}</strong>
              <small>Rating</small>
            </div>
            <div
              className={styles.selectedMetaCard}
              data-tone={`priority-${selectedRecord.priority.toLowerCase()}`}
            >
              <strong>{selectedRecord.priority}</strong>
              <small>Priority</small>
            </div>
          </div>

          <div className={styles.actionFeedback}>
            <strong>Selected action</strong>
            <span>{selectedActionMessage}</span>
          </div>

          <div className={styles.selectedActions}>
            <button
              className={styles.demoButton}
              type="button"
              data-review-action-tab="prepare-review-request"
              onClick={() => {
                setSelectedActionMessage(
                  `Review request prepared for ${selectedRecord.customer}. This is demo-only: nothing has been sent.`
                );
                setNotice(`Demo review request prepared for ${selectedRecord.customer}. Nothing sent.`);
              }}
            >
              Prepare Review Request
            </button>
            <button
              className={styles.secondaryButton}
              type="button"
              data-review-action-tab="draft-owner-reply"
              onClick={() => {
                setSelectedActionMessage(
                  `Owner reply draft opened for ${selectedRecord.customer}. The owner would review and approve the wording before anything is posted.`
                );
                setNotice(`Owner reply draft opened for ${selectedRecord.customer}. Demo action only.`);
              }}
            >
              Draft Owner Reply
            </button>
            <button
              className={styles.secondaryButton}
              type="button"
              data-review-action-tab="add-to-proof-pack"
              onClick={() => {
                setSelectedActionMessage(
                  `${selectedRecord.customer} has been marked for the proof pack in this local demo view. No real data was changed.`
                );
                setNotice(`${selectedRecord.customer} marked for proof pack. Demo action only.`);
              }}
            >
              Add to Proof Pack
            </button>
          </div>
        </aside>
      </section>

      <section className={styles.sourcePanel}>
        <div>
          <p className={styles.kicker}>REVIEW SOURCE PERFORMANCE</p>
          <h2>Where strong reviews are coming from.</h2>
          <p className={styles.sourceCopy}>
            Track which channels create proof, where review requests are waiting, and where the owner needs to reply.
          </p>
        </div>

        <div className={styles.sourceGrid}>
          {sourceStats.map((source) => {
            const matchingSource =
              source.title === "SMS / WhatsApp"
                ? "SMS"
                : (source.title as SourceFilter);

            const isActiveSource = sourceFilter === matchingSource;

            return (
              <button
                key={source.title}
                type="button"
                className={`${styles.sourceCard} ${isActiveSource ? styles.sourceCardActive : ""}`}
                onClick={() => {
                  setSourceFilter(matchingSource);
                  setSearchText("");
                  setNotice(`${source.title} source performance opened. Review table filtered to matching demo records.`);
                  scrollToTable();
                }}
              >
                <span>{source.icon}</span>
                <h3>{source.title}</h3>
                <strong>{source.score}</strong>
                <small>{source.detail}</small>
                <small>{source.trend}</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className={styles.auraPanel}>
        <div className={styles.botWrap}>
          <img src="/brand/source/aura-assistant-transparent.png" alt="Aura review assistant" />
        </div>

        <div>
          <p className={styles.kicker}>AURA REVIEW WATCH</p>
          <h2>Aura is watching happy customers, review requests, and replies that need owner approval.</h2>
          <p>
            Nothing is posted or sent automatically. Bee-Aura highlights the next review action so the owner can protect trust and collect better proof.
          </p>
        </div>

        <div className={styles.auraList}>
          <span>18 review requests ready</span>
          <span>4 replies need approval</span>
          <span>3 strong proof-pack reviews found</span>
        </div>
      </section>

      <p className={styles.footerNote}>
        Demo safety: fake data only, local UI actions only, no database, no Supabase, no Stripe, no Twilio, no OpenAI API, no deployment, and no real customer data.
      </p>
    </main>
  );
}
