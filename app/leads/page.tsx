import Link from "next/link";

const leadRows = [
  ["Tom Wilson", "Boiler repair", "07912 345678", "Google", "New", "19 May 2025", "£450", "2m ago", "Tomorrow, 10:00 AM", "John D."],
  ["Sarah Johnson", "Plumbing leak", "07845 678912", "Website", "Contacted", "18 May 2025", "£320", "15m ago", "Today, 2:00 PM", "John D."],
  ["Emma Davis", "Bathroom renovation", "07955 789123", "Referral", "Quote Sent", "18 May 2025", "£6,200", "1h ago", "Tomorrow, 11:00 AM", "Lucy C."],
  ["Mike Thompson", "Electrical fault", "07798 123456", "Google", "Follow-Up", "17 May 2025", "£180", "2h ago", "Today, 4:00 PM", "Adam H."],
  ["James Brown", "Drain clearance", "07534 567890", "Facebook", "New", "17 May 2025", "£220", "3h ago", "Tomorrow, 9:30 AM", "John D."],
  ["Olivia Smith", "Thermostat install", "07766 445566", "Website", "Contacted", "16 May 2025", "£210", "5h ago", "Tomorrow, 1:00 PM", "Lucy C."],
  ["David Clarke", "Roof repair", "07888 223344", "Referral", "Referral", "16 May 2025", "£1,850", "1d ago", "—", "John D."],
  ["Charlotte Lee", "Boiler service", "07890 112233", "Google", "Referral", "15 May 2025", "£120", "2d ago", "—", "Adam H."],
  ["Ben Morris", "Bathroom leak", "07700 998877", "Website", "Follow-Up", "15 May 2025", "£250", "2d ago", "Today, 11:00 AM", "Lucy C."],
  ["Amelia Ward", "Emergency boiler repair", "07911 220044", "Google", "New", "15 May 2025", "£420", "2d ago", "Today, 3:30 PM", "John D."],
  ["Daniel Khan", "Bathroom leak", "07822 334455", "Website", "Contacted", "14 May 2025", "£650", "3d ago", "Tomorrow, 9:00 AM", "Lucy C."],
  ["Priya Shah", "Annual boiler service", "07733 445566", "Referral", "Follow-Up", "14 May 2025", "£140", "3d ago", "Today, 5:00 PM", "Adam H."],
  ["Lucas Green", "Blocked drain", "07544 556677", "Facebook", "Quote Sent", "13 May 2025", "£280", "4d ago", "Tomorrow, 12:00 PM", "John D."],
];

function slug(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

export default function LeadsPage() {
  return (
    <main className="leads-board">
      <header className="leads-board-header">
        <div>
          <h1>Leads</h1>
          <p>Manage, track and convert every enquiry in one place.</p>
        </div>

        <div className="leads-board-controls">
          <button className="lead-add-button" type="button">
            <span>＋</span> Add Lead
          </button>

          <button className="lead-filter-button" type="button">
            ⌯ All Channels⌄
          </button>

          <label className="lead-search-box">
            <span>Search leads...</span>
            <strong>⌕</strong>
          </label>

          <Link href="/settings" className="lead-owner-card">
            <span className="lead-owner-avatar">JD</span>
            <span>
              <strong>John D.</strong>
              <small>Owner</small>
            </span>
            <em>⌄</em>
          </Link>
        </div>
      </header>

      <section className="leads-board-card">
        <div className="lead-tabs-row">
          <div className="lead-tabs">
            <button className="active" type="button">All</button>
            <button type="button">New <span>48</span></button>
            <button type="button">Contacted <span>72</span></button>
            <button type="button">Quote Sent <span>61</span></button>
          </div>

          <button className="lead-sort-button" type="button">↕ Sort: Newest⌄</button>
        </div>

        <div className="lead-table-frame">
          <table className="lead-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Enquiry</th>
                <th>Contact</th>
                <th>Source</th>
                <th>Status</th>
                <th>Date</th>
                <th>Value</th>
                <th>Last Activity</th>
                <th>Next Follow-Up</th>
                <th>Owner</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {leadRows.map(([name, enquiry, contact, source, status, date, value, lastActivity, nextFollowUp, owner]) => (
                <tr key={`${name}-${contact}`}>
                  <td>{name}</td>
                  <td>{enquiry}</td>
                  <td>☎ {contact}</td>
                  <td><span className={`lead-source lead-source-${slug(source)}`}>{source}</span></td>
                  <td><span className={`lead-status lead-status-${slug(status)}`}>{status}</span></td>
                  <td>{date}</td>
                  <td>{value}</td>
                  <td>{lastActivity}</td>
                  <td>{nextFollowUp}</td>
                  <td>{owner}</td>
                  <td>
                    <div className="lead-actions">
                      <Link href="/messages">☏</Link>
                      <Link href="/customers">✎</Link>
                      <button type="button">⋮</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="lead-table-footer">
          <p>Showing 1 to 13 of 208 leads</p>

          <div className="lead-pagination">
            <button type="button">‹</button>
            <button className="active" type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
            <button type="button">4</button>
            <button type="button">5</button>
            <span>...</span>
            <button type="button">24</button>
            <button type="button">›</button>
          </div>

          <aside className="lead-outcomes-card">
            <div>
              <h3>Lead Outcomes</h3>
              <p><span className="lead-dot blue" /> Won <strong>72 (69%)</strong></p>
              <p><span className="lead-dot gold" /> Lost <strong>32 (31%)</strong></p>
            </div>
            <div className="lead-donut">
              <span>104<small>Total</small></span>
            </div>
          </aside>
        </footer>
      </section>
    </main>
  );
}
