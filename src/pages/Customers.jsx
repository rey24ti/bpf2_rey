import { useState, useMemo } from "react";
import PageHeader from "../components/PageHeader";

/* ── Google Fonts ── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f8f9fb; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-in { animation: fadeIn 0.25s ease both; }
  .row-hover:hover { background: #f5f3ff; transition: background 0.15s; }
`;

/* ── Avatar gradient pool ── */
const GRADIENTS = [
  "from-violet-400 to-purple-600",
  "from-indigo-400 to-blue-600",
  "from-rose-400   to-pink-600",
  "from-amber-400  to-orange-500",
  "from-teal-400   to-emerald-600",
  "from-sky-400    to-cyan-600",
  "from-fuchsia-400 to-violet-600",
  "from-lime-400   to-green-600",
];
const grad = (i) => GRADIENTS[i % GRADIENTS.length];

/* ── 30 Data Customers ── */
const CUSTOMERS_DATA = [
  { customerId: "CUS-001", customerName: "Aldi Firmansyah",  email: "aldi.firmansyah@gmail.com",  phone: "0812-3456-7890", loyalty: "Gold"   },
  { customerId: "CUS-002", customerName: "Rina Kusuma",      email: "rina.kusuma@yahoo.com",       phone: "0821-9876-5432", loyalty: "Silver" },
  { customerId: "CUS-003", customerName: "Budi Santoso",     email: "budi.santoso@outlook.com",    phone: "0831-1122-3344", loyalty: "Bronze" },
  { customerId: "CUS-004", customerName: "Mega Pratiwi",     email: "mega.pratiwi@gmail.com",      phone: "0857-2233-4455", loyalty: "Gold"   },
  { customerId: "CUS-005", customerName: "Yusuf Hakim",      email: "yusuf.hakim@gmail.com",       phone: "0813-5566-7788", loyalty: "Bronze" },
  { customerId: "CUS-006", customerName: "Sari Dewi",        email: "sari.dewi@hotmail.com",       phone: "0878-6677-8899", loyalty: "Silver" },
  { customerId: "CUS-007", customerName: "Eko Prasetyo",     email: "eko.prasetyo@gmail.com",      phone: "0852-4455-6677", loyalty: "Gold"   },
  { customerId: "CUS-008", customerName: "Lilis Rahayu",     email: "lilis.rahayu@yahoo.com",      phone: "0819-3344-5566", loyalty: "Bronze" },
  { customerId: "CUS-009", customerName: "Hendra Gunawan",   email: "hendra.gunawan@gmail.com",    phone: "0838-7788-9900", loyalty: "Silver" },
  { customerId: "CUS-010", customerName: "Putri Anggraini",  email: "putri.anggraini@gmail.com",   phone: "0812-0011-2233", loyalty: "Gold"   },
  { customerId: "CUS-011", customerName: "Reza Mahendra",    email: "reza.mahendra@outlook.com",   phone: "0877-1234-5678", loyalty: "Silver" },
  { customerId: "CUS-012", customerName: "Dewi Safitri",     email: "dewi.safitri@gmail.com",      phone: "0856-8765-4321", loyalty: "Bronze" },
  { customerId: "CUS-013", customerName: "Fajar Nugroho",    email: "fajar.nugroho@gmail.com",     phone: "0823-3456-7890", loyalty: "Gold"   },
  { customerId: "CUS-014", customerName: "Anita Wijaya",     email: "anita.wijaya@yahoo.com",      phone: "0814-9988-7766", loyalty: "Silver" },
  { customerId: "CUS-015", customerName: "Doni Kurniawan",   email: "doni.kurniawan@gmail.com",    phone: "0851-6655-4433", loyalty: "Bronze" },
  { customerId: "CUS-016", customerName: "Fitri Handayani",  email: "fitri.handayani@hotmail.com", phone: "0822-2233-4455", loyalty: "Gold"   },
  { customerId: "CUS-017", customerName: "Agus Setiawan",    email: "agus.setiawan@gmail.com",     phone: "0811-5544-3322", loyalty: "Bronze" },
  { customerId: "CUS-018", customerName: "Nadia Puspita",    email: "nadia.puspita@gmail.com",     phone: "0839-7766-5544", loyalty: "Silver" },
  { customerId: "CUS-019", customerName: "Irwan Susanto",    email: "irwan.susanto@yahoo.com",     phone: "0858-1122-9988", loyalty: "Gold"   },
  { customerId: "CUS-020", customerName: "Citra Lestari",    email: "citra.lestari@gmail.com",     phone: "0817-4433-2211", loyalty: "Bronze" },
  { customerId: "CUS-021", customerName: "Bagas Wicaksono",  email: "bagas.wicaksono@outlook.com", phone: "0829-8877-6655", loyalty: "Silver" },
  { customerId: "CUS-022", customerName: "Shinta Permata",   email: "shinta.permata@gmail.com",    phone: "0853-3322-1100", loyalty: "Gold"   },
  { customerId: "CUS-023", customerName: "Wahyu Hidayat",    email: "wahyu.hidayat@gmail.com",     phone: "0816-6677-8899", loyalty: "Bronze" },
  { customerId: "CUS-024", customerName: "Laila Mardiana",   email: "laila.mardiana@yahoo.com",    phone: "0874-5566-7788", loyalty: "Silver" },
  { customerId: "CUS-025", customerName: "Dimas Aditya",     email: "dimas.aditya@gmail.com",      phone: "0832-9900-1122", loyalty: "Gold"   },
  { customerId: "CUS-026", customerName: "Yunita Sari",      email: "yunita.sari@hotmail.com",     phone: "0855-2211-0099", loyalty: "Bronze" },
  { customerId: "CUS-027", customerName: "Taufik Rahman",    email: "taufik.rahman@gmail.com",     phone: "0819-8899-0011", loyalty: "Silver" },
  { customerId: "CUS-028", customerName: "Maya Kusumawati",  email: "maya.kusuma@gmail.com",       phone: "0841-3344-5566", loyalty: "Gold"   },
  { customerId: "CUS-029", customerName: "Rizky Pratama",    email: "rizky.pratama@yahoo.com",     phone: "0862-7788-9900", loyalty: "Bronze" },
  { customerId: "CUS-030", customerName: "Indah Rahmawati",  email: "indah.rahmawati@gmail.com",   phone: "0815-4455-6677", loyalty: "Silver" },
];

/* ── Loyalty config ── */
const LOYALTY_STYLE = {
  Gold:   { pill: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",   dot: "bg-amber-400",   icon: "🥇" },
  Silver: { pill: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",  dot: "bg-slate-400",   icon: "🥈" },
  Bronze: { pill: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",dot: "bg-orange-400",  icon: "🥉" },
};

const PAGE_SIZE = 10;
const TABS      = ["All", "Gold", "Silver", "Bronze"];

/* ── Summary Card ── */
function SummaryCard({ label, value, sub, accent, icon }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-1 relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl ${accent}`} />
      <div className="flex items-center justify-between pl-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</p>
        <span className="text-xl">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-slate-800 pl-3">{value}</p>
      <p className="text-xs text-slate-400 pl-3">{sub}</p>
    </div>
  );
}

/* ── Main Component ── */
export default function Customer() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch]       = useState("");
  const [sortKey, setSortKey]     = useState("customerId");
  const [sortDir, setSortDir]     = useState("asc");
  const [page, setPage]           = useState(1);
  const [selected, setSelected]   = useState(null);

  /* Stats */
  const stats = useMemo(() => ({
    total:  CUSTOMERS_DATA.length,
    gold:   CUSTOMERS_DATA.filter(c => c.loyalty === "Gold").length,
    silver: CUSTOMERS_DATA.filter(c => c.loyalty === "Silver").length,
    bronze: CUSTOMERS_DATA.filter(c => c.loyalty === "Bronze").length,
  }), []);

  /* Filter + Search + Sort */
  const filtered = useMemo(() => {
    let list = CUSTOMERS_DATA;
    if (activeTab !== "All") list = list.filter(c => c.loyalty === activeTab);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.customerId.toLowerCase().includes(q) ||
        c.customerName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
      );
    }
    list = [...list].sort((a, b) => {
      let va = a[sortKey].toLowerCase(), vb = b[sortKey].toLowerCase();
      return sortDir === "asc" ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });
    return list;
  }, [activeTab, search, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const SortIcon = ({ k }) => (
    <span className="ml-1 text-slate-300 text-[10px]">
      {sortKey === k ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  const globalIdx = (i) => CUSTOMERS_DATA.indexOf(paginated[i]);

  return (
    <>
      <style>{globalStyles}</style>
      <div className="min-h-screen bg-[#f8f9fb]">
        <PageHeader />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* ── Page Title ── */}
          <div className="mb-7 flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Pelanggan</h1>
              <p className="text-sm text-slate-400 mt-1">Kelola data dan tingkat loyalitas pelanggan</p>
            </div>
            <span className="font-mono text-xs text-slate-400 hidden sm:block">
              {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
            </span>
          </div>

          {/* ── Summary Cards ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 fade-in">
            <SummaryCard label="Total Pelanggan" value={stats.total}  sub="Semua tingkat"       accent="bg-violet-500"  icon="👥" />
            <SummaryCard label="Gold"             value={stats.gold}   sub="Pelanggan setia"    accent="bg-amber-400"   icon="🥇" />
            <SummaryCard label="Silver"           value={stats.silver} sub="Pelanggan reguler"  accent="bg-slate-400"   icon="🥈" />
            <SummaryCard label="Bronze"           value={stats.bronze} sub="Pelanggan baru"     accent="bg-orange-400"  icon="🥉" />
          </div>

          {/* ── Table Card ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden fade-in">

            {/* Toolbar */}
            <div className="px-6 pt-5 pb-4 flex flex-col sm:flex-row gap-3 border-b border-slate-100">
              {/* Tabs */}
              <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
                {TABS.map(t => (
                  <button
                    key={t}
                    onClick={() => { setActiveTab(t); setPage(1); }}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150
                      ${activeTab === t
                        ? "bg-white text-violet-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"}`}
                  >
                    {t === "All" ? "Semua" : t}
                    <span className={`ml-1.5 text-[11px] font-mono px-1.5 py-0.5 rounded-full
                      ${activeTab === t ? "bg-violet-50 text-violet-500" : "bg-slate-200 text-slate-400"}`}>
                      {t === "All" ? CUSTOMERS_DATA.length
                        : CUSTOMERS_DATA.filter(c => c.loyalty === t).length}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative ml-auto">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Cari nama, email, atau no. HP..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  className="pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 w-72 transition"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 bg-slate-50/60">
                    <th className="py-3 px-6 text-left font-semibold cursor-pointer select-none hover:text-slate-600"
                        onClick={() => toggleSort("customerId")}>
                      Customer ID <SortIcon k="customerId" />
                    </th>
                    <th className="py-3 px-6 text-left font-semibold cursor-pointer select-none hover:text-slate-600"
                        onClick={() => toggleSort("customerName")}>
                      Nama <SortIcon k="customerName" />
                    </th>
                    <th className="py-3 px-6 text-left font-semibold cursor-pointer select-none hover:text-slate-600"
                        onClick={() => toggleSort("email")}>
                      Email <SortIcon k="email" />
                    </th>
                    <th className="py-3 px-6 text-left font-semibold">No. HP</th>
                    <th className="py-3 px-6 text-left font-semibold cursor-pointer select-none hover:text-slate-600"
                        onClick={() => toggleSort("loyalty")}>
                      Loyalty <SortIcon k="loyalty" />
                    </th>
                    <th className="py-3 px-6 text-center font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-16 text-center text-slate-300 text-sm">
                        Tidak ada pelanggan ditemukan.
                      </td>
                    </tr>
                  ) : paginated.map((cust, i) => (
                    <tr
                      key={cust.customerId}
                      className="row-hover border-b border-slate-50 cursor-pointer"
                      onClick={() => setSelected(cust)}
                    >
                      {/* ID */}
                      <td className="py-3.5 px-6">
                        <span className="font-mono text-xs font-semibold text-violet-500 bg-violet-50 px-2 py-1 rounded-lg">
                          {cust.customerId}
                        </span>
                      </td>

                      {/* Nama + Avatar */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${grad(globalIdx(i))} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                            {cust.customerName.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-700 whitespace-nowrap">{cust.customerName}</span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-6 text-slate-500 text-xs">{cust.email}</td>

                      {/* Phone */}
                      <td className="py-3.5 px-6">
                        <span className="font-mono text-xs text-slate-600">{cust.phone}</span>
                      </td>

                      {/* Loyalty Badge */}
                      <td className="py-3.5 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${LOYALTY_STYLE[cust.loyalty].pill}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${LOYALTY_STYLE[cust.loyalty].dot}`} />
                          {cust.loyalty}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="py-3.5 px-6 text-center" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => setSelected(cust)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-violet-50 hover:text-violet-600 font-semibold transition"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100">
              <p className="text-xs text-slate-400">
                Menampilkan{" "}
                <span className="font-semibold text-slate-600">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}</span>
                {" "}dari{" "}
                <span className="font-semibold text-slate-600">{filtered.length}</span> pelanggan
              </p>
              <div className="flex gap-1.5 items-center">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-100 text-slate-500 hover:bg-violet-50 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >← Prev</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-semibold transition
                      ${p === page
                        ? "bg-violet-500 text-white shadow-sm"
                        : "bg-slate-100 text-slate-500 hover:bg-violet-50 hover:text-violet-600"}`}
                  >{p}</button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-100 text-slate-500 hover:bg-violet-50 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >Next →</button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ── Detail Modal ── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 fade-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-800">Detail Pelanggan</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-slate-600 text-xl leading-none"
              >✕</button>
            </div>

            {/* Avatar + Nama + Badge */}
            <div className="flex items-center gap-4 mb-5 p-4 bg-slate-50 rounded-xl">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${grad(CUSTOMERS_DATA.indexOf(selected))} flex items-center justify-center text-white text-2xl font-bold shrink-0`}>
                {selected.customerName.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-800 text-base">{selected.customerName}</p>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold mt-1 ${LOYALTY_STYLE[selected.loyalty].pill}`}>
                  {LOYALTY_STYLE[selected.loyalty].icon} {selected.loyalty} Member
                </span>
              </div>
            </div>

            {/* Info Rows */}
            {[
              { label: "Customer ID", value: selected.customerId,   mono: true  },
              { label: "Email",       value: selected.email,         mono: false },
              { label: "No. HP",      value: selected.phone,         mono: true  },
              { label: "Loyalty",     value: selected.loyalty,       mono: false },
            ].map(({ label, value, mono }) => (
              <div key={label} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-400">{label}</span>
                <span className={`text-sm font-semibold text-slate-700 ${mono ? "font-mono text-violet-500 bg-violet-50 px-2 py-0.5 rounded-lg" : ""}`}>
                  {value}
                </span>
              </div>
            ))}

            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold text-sm transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}