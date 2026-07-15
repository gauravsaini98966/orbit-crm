import { useEffect, useState, useCallback } from "react";
import { fetchInquiries, deleteInquiry, updateInquiryStatus } from "../utils/api.js";
import ThemeToggle from "../components/ThemeToggle.jsx";

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Retail & E-commerce",
  "Manufacturing",
  "Education",
  "Real Estate",
  "Hospitality",
  "Logistics & Supply Chain",
  "Other",
];
const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];
const STATUSES = ["new", "contacted", "qualified", "closed"];

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem("orbit-admin-key") || "");
  const [keyInput, setKeyInput] = useState("");

  const [inquiries, setInquiries] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetchInquiries(
        { search, industry, companySize, status, page, limit: 8 },
        adminKey
      );
      setInquiries(res.data);
      setPagination(res.pagination);
    } catch (err) {
      setError(err.message || "Failed to load inquiries");
      if (err.status === 401) {
        sessionStorage.removeItem("orbit-admin-key");
        setAdminKey("");
      }
    } finally {
      setLoading(false);
    }
  }, [adminKey, search, industry, companySize, status, page]);

  useEffect(() => {
    load();
  }, [load]);

  function handleKeySubmit(e) {
    e.preventDefault();
    sessionStorage.setItem("orbit-admin-key", keyInput);
    setAdminKey(keyInput);
  }

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      await deleteInquiry(id, adminKey);
      setInquiries((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete inquiry");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleStatusChange(id, newStatus) {
    const prev = inquiries;
    setInquiries((cur) => cur.map((i) => (i._id === id ? { ...i, status: newStatus } : i)));
    try {
      await updateInquiryStatus(id, newStatus, adminKey);
    } catch (err) {
      setInquiries(prev);
      setError(err.message || "Failed to update status");
    }
  }

  if (!adminKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-deep px-6">
        <form onSubmit={handleKeySubmit} className="card w-full max-w-sm p-8">
          <h1 className="font-display text-xl font-semibold">Orbit CRM Admin</h1>
          <p className="mt-2 text-sm text-inkLight-mid dark:text-ink-mid">
            Enter your admin key to view submitted inquiries.
          </p>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Admin key"
            className="input-field mt-5"
            autoFocus
          />
          <button type="submit" className="btn-primary w-full mt-4">
            Enter dashboard
          </button>
          <p className="mt-4 text-xs text-inkLight-low dark:text-ink-low">
            If no ADMIN_KEY is configured on the server, any value (or leaving it blank) will work.
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-deep">
      <header className="border-b border-paper-line dark:border-deep-line px-6 sm:px-10 py-5 flex items-center justify-between">
        <div>
          <a href="/" className="font-display text-lg font-semibold">
            Orbit<span className="text-signal">CRM</span> <span className="text-inkLight-low dark:text-ink-low font-body text-sm">/ Admin</span>
          </a>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => {
              sessionStorage.removeItem("orbit-admin-key");
              setAdminKey("");
            }}
            className="btn-ghost text-xs px-4 py-2"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="px-6 sm:px-10 py-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Inquiries</h1>
            <p className="text-sm text-inkLight-mid dark:text-ink-mid mt-1">
              {pagination.total} total submissions
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search name, company, email..."
            className="input-field"
          />
          <select
            value={industry}
            onChange={(e) => {
              setPage(1);
              setIndustry(e.target.value);
            }}
            className="input-field"
          >
            <option value="">All industries</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <select
            value={companySize}
            onChange={(e) => {
              setPage(1);
              setCompanySize(e.target.value);
            }}
            className="input-field"
          >
            <option value="">All sizes</option>
            {COMPANY_SIZES.map((s) => (
              <option key={s} value={s}>
                {s} employees
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
            className="input-field"
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div role="alert" className="mt-6 rounded-xl border border-signal/40 bg-signal/10 px-4 py-3 text-sm text-signal">
            {error}
          </div>
        )}

        <div className="mt-6 card overflow-x-auto">
          {loading ? (
            <div className="p-10 flex flex-col items-center gap-3 text-sm text-inkLight-mid dark:text-ink-mid">
              <span className="h-6 w-6 rounded-full border-2 border-orbit/30 border-t-orbit animate-spin" />
              Loading inquiries...
            </div>
          ) : inquiries.length === 0 ? (
            <div className="p-10 text-center text-sm text-inkLight-mid dark:text-ink-mid">
              No inquiries match these filters yet.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-paper-line dark:border-deep-line text-left text-xs uppercase tracking-wide text-inkLight-low dark:text-ink-low">
                  <th className="px-5 py-3 font-medium">Contact</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Industry</th>
                  <th className="px-5 py-3 font-medium">Size</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Received</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq._id} className="border-b border-paper-line dark:border-deep-line last:border-0">
                    <td className="px-5 py-4">
                      <p className="font-medium">{inq.fullName}</p>
                      <p className="text-xs text-inkLight-low dark:text-ink-low">{inq.email}</p>
                    </td>
                    <td className="px-5 py-4">{inq.companyName}</td>
                    <td className="px-5 py-4">{inq.industry}</td>
                    <td className="px-5 py-4">{inq.companySize}</td>
                    <td className="px-5 py-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                        className="rounded-full bg-paper-raised dark:bg-deep-raised border border-paper-line dark:border-deep-line px-2.5 py-1 text-xs"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-inkLight-low dark:text-ink-low">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDelete(inq._id)}
                        disabled={deletingId === inq._id}
                        className="text-xs font-medium text-signal hover:underline disabled:opacity-50"
                      >
                        {deletingId === inq._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {pagination.pages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="btn-ghost px-4 py-2 text-xs disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-xs text-inkLight-mid dark:text-ink-mid font-mono">
              {page} / {pagination.pages}
            </span>
            <button
              disabled={page >= pagination.pages}
              onClick={() => setPage((p) => p + 1)}
              className="btn-ghost px-4 py-2 text-xs disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
