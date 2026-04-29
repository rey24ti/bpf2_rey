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
  .table-row-hover:hover { background: #f0f4ff; transition: background 0.15s; }
`;

/* ── 30 Data Orders ── */
const ORDERS_DATA = [
  { orderId: "ORD-001", customerName: "Aldi Firmansyah",   status: "Completed", totalPrice: 487000,  orderDate: "2026-04-01" },
  { orderId: "ORD-002", customerName: "Rina Kusuma",       status: "Pending",   totalPrice: 129000,  orderDate: "2026-04-02" },
  { orderId: "ORD-003", customerName: "Budi Santoso",      status: "Cancelled", totalPrice: 912000,  orderDate: "2026-04-03" },
  { orderId: "ORD-004", customerName: "Mega Pratiwi",      status: "Completed", totalPrice: 253000,  orderDate: "2026-04-04" },
  { orderId: "ORD-005", customerName: "Yusuf Hakim",       status: "Pending",   totalPrice: 670000,  orderDate: "2026-04-05" },
  { orderId: "ORD-006", customerName: "Sari Dewi",         status: "Completed", totalPrice: 345000,  orderDate: "2026-04-06" },
  { orderId: "ORD-007", customerName: "Eko Prasetyo",      status: "Pending",   totalPrice: 1240000, orderDate: "2026-04-07" },
  { orderId: "ORD-008", customerName: "Lilis Rahayu",      status: "Cancelled", totalPrice:  99000,  orderDate: "2026-04-08" },
  { orderId: "ORD-009", customerName: "Hendra Gunawan",    status: "Completed", totalPrice: 530000,  orderDate: "2026-04-09" },
  { orderId: "ORD-010", customerName: "Putri Anggraini",   status: "Pending",   totalPrice: 215000,  orderDate: "2026-04-10" },
  { orderId: "ORD-011", customerName: "Reza Mahendra",     status: "Completed", totalPrice: 780000,  orderDate: "2026-04-11" },
  { orderId: "ORD-012", customerName: "Dewi Safitri",      status: "Cancelled", totalPrice: 320000,  orderDate: "2026-04-12" },
  { orderId: "ORD-013", customerName: "Fajar Nugroho",     status: "Pending",   totalPrice: 460000,  orderDate: "2026-04-13" },
  { orderId: "ORD-014", customerName: "Anita Wijaya",      status: "Completed", totalPrice: 875000,  orderDate: "2026-04-14" },
  { orderId: "ORD-015", customerName: "Doni Kurniawan",    status: "Pending",   totalPrice: 195000,  orderDate: "2026-04-15" },
  { orderId: "ORD-016", customerName: "Fitri Handayani",   status: "Completed", totalPrice: 640000,  orderDate: "2026-04-16" },
  { orderId: "ORD-017", customerName: "Agus Setiawan",     status: "Cancelled", totalPrice: 112000,  orderDate: "2026-04-17" },
  { orderId: "ORD-018", customerName: "Nadia Puspita",     status: "Completed", totalPrice: 990000,  orderDate: "2026-04-18" },
  { orderId: "ORD-019", customerName: "Irwan Susanto",     status: "Pending",   totalPrice: 375000,  orderDate: "2026-04-19" },
  { orderId: "ORD-020", customerName: "Citra Lestari",     status: "Completed", totalPrice: 560000,  orderDate: "2026-04-20" },
  { orderId: "ORD-021", customerName: "Bagas Wicaksono",   status: "Cancelled", totalPrice: 830000,  orderDate: "2026-04-21" },
  { orderId: "ORD-022", customerName: "Shinta Permata",    status: "Pending",   totalPrice: 145000,  orderDate: "2026-04-22" },
  { orderId: "ORD-023", customerName: "Wahyu Hidayat",     status: "Completed", totalPrice: 1100000, orderDate: "2026-04-23" },
  { orderId: "ORD-024", customerName: "Laila Mardiana",    status: "Pending",   totalPrice: 290000,  orderDate: "2026-04-24" },
  { orderId: "ORD-025", customerName: "Dimas Aditya",      status: "Completed", totalPrice: 720000,  orderDate: "2026-04-25" },
  { orderId: "ORD-026", customerName: "Yunita Sari",       status: "Cancelled", totalPrice: 415000,  orderDate: "2026-04-26" },
  { orderId: "ORD-027", customerName: "Taufik Rahman",     status: "Pending",   totalPrice: 185000,  orderDate: "2026-04-27" },
  { orderId: "ORD-028", customerName: "Maya Kusumawati",   status: "Completed", totalPrice: 655000,  orderDate: "2026-04-28" },
  { orderId: "ORD-029", customerName: "Rizky Pratama",     status: "Pending",   totalPrice: 940000,  orderDate: "2026-04-29" },
  { orderId: "ORD-030", customerName: "Indah Rahmawati",   status: "Completed", totalPrice: 380000,  orderDate: "2026-04-30" },
];

/* ── Helpers ── */
const STATUS_STYLE = {
  Completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Pending:   "bg-amber-50  text-amber-700  ring-1 ring-amber-200",
  Cancelled: "bg-red-50    text-red-600    ring-1 ring-red-200",
};
const STATUS_DOT = {
  Completed: "bg-emerald-500",
  Pending:   "bg-amber-400",
  Cancelled: "bg-red-400",
};

const fmt = (n) =>
  "Rp " + n.toLocaleString("id-ID");

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

const TABS = ["All", "Pending", "Completed", "Cancelled"];
const PAGE_SIZE = 10;

/* ── Summary Cards ── */
function SummaryCard({ label, value, sub, accent }) {
  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-1 relative overflow-hidden`}>
      <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl ${accent}`} />
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 pl-3">{label}</p>
      <p className="text-2xl font-bold text-slate-800 pl-3">{value}</p>
      <p className="text-xs text-slate-400 pl-3">{sub}</p>
    </div>
  );
}

/* ── Main Component ── */
export default function Orders() {
  const [activeTab, setActiveTab]     = useState("All");
  const [search, setSearch]           = useState("");
  const [sortKey, setSortKey]         = useState("orderDate");
  const [sortDir, setSortDir]         = useState("desc");
  const [page, setPage]               = useState(1);
  const [selected, setSelected]       = useState(null); // modal detail

  /* Summary stats */
  const stats = useMemo(() => ({
    total:     ORDERS_DATA.length,
    completed: ORDERS_DATA.filter(o => o.status === "Completed").length,
    pending:   ORDERS_DATA.filter(o => o.status === "Pending").length,
    cancelled: ORDERS_DATA.filter(o => o.status === "Cancelled").length,
    revenue:   ORDERS_DATA.filter(o => o.status === "Completed")
                          .reduce((s, o) => s + o.totalPrice, 0),
  }), []);

  /* Filter + Search + Sort */
  const filtered = useMemo(() => {
    let list = ORDERS_DATA;
    if (activeTab !== "All") list = list.filter(o => o.status === activeTab);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(o =>
        o.orderId.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q)
      );
    }
    list = [...list].sort((a, b) => {
      let va = a[sortKey], vb = b[sortKey];
      if (typeof va === "string") va = va.toLowerCase(), vb = vb.toLowerCase();
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

  return (
    <>
      <style>{globalStyles}</style>
      <div className="min-h-screen bg-[#f8f9fb]">
        <PageHeader />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* ── Page Title ── */}
          <div className="mb-7 flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Pesanan</h1>
              <p className="text-sm text-slate-400 mt-1">Kelola dan pantau semua pesanan pelanggan</p>
            </div>
            <span className="font-mono text-xs text-slate-400">
              {new Date().toLocaleDateString("id-ID", { weekday:"long", day:"2-digit", month:"long", year:"numeric" })}
            </span>
          </div>

          {/* ── Summary Cards ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 fade-in">
            <SummaryCard label="Total Pesanan"  value={stats.total}     sub="Semua status"           accent="bg-indigo-500" />
            <SummaryCard label="Selesai"         value={stats.completed} sub={`${stats.completed} transaksi`} accent="bg-emerald-500" />
            <SummaryCard label="Menunggu"        value={stats.pending}   sub="Perlu diproses"         accent="bg-amber-400" />
            <SummaryCard label="Pendapatan"      value={fmt(stats.revenue)} sub="Dari pesanan selesai" accent="bg-violet-500" />
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
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"}`}
                  >
                    {t === "All" ? "Semua" : t}
                    <span className={`ml-1.5 text-[11px] font-mono px-1.5 py-0.5 rounded-full
                      ${activeTab === t ? "bg-indigo-50 text-indigo-500" : "bg-slate-200 text-slate-400"}`}>
                      {t === "All" ? ORDERS_DATA.length
                        : ORDERS_DATA.filter(o => o.status === t).length}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative ml-auto">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Cari ID atau nama..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  className="pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 w-64 transition"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 bg-slate-50/60">
                    <th className="py-3 px-6 text-left font-semibold cursor-pointer select-none hover:text-slate-600"
                        onClick={() => toggleSort("orderId")}>
                      Order ID <SortIcon k="orderId" />
                    </th>
                    <th className="py-3 px-6 text-left font-semibold cursor-pointer select-none hover:text-slate-600"
                        onClick={() => toggleSort("customerName")}>
                      Nama Pelanggan <SortIcon k="customerName" />
                    </th>
                    <th className="py-3 px-6 text-left font-semibold cursor-pointer select-none hover:text-slate-600"
                        onClick={() => toggleSort("status")}>
                      Status <SortIcon k="status" />
                    </th>
                    <th className="py-3 px-6 text-right font-semibold cursor-pointer select-none hover:text-slate-600"
                        onClick={() => toggleSort("totalPrice")}>
                      Total Harga <SortIcon k="totalPrice" />
                    </th>
                    <th className="py-3 px-6 text-left font-semibold cursor-pointer select-none hover:text-slate-600"
                        onClick={() => toggleSort("orderDate")}>
                      Tanggal <SortIcon k="orderDate" />
                    </th>
                    <th className="py-3 px-6 text-center font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-16 text-center text-slate-300 text-sm">
                        Tidak ada pesanan ditemukan.
                      </td>
                    </tr>
                  ) : paginated.map((order, i) => (
                    <tr
                      key={order.orderId}
                      className="table-row-hover border-b border-slate-50 cursor-pointer"
                      style={{ animationDelay: `${i * 30}ms` }}
                      onClick={() => setSelected(order)}
                    >
                      <td className="py-3.5 px-6">
                        <span className="font-mono text-xs font-semibold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg">
                          {order.orderId}
                        </span>
                      </td>
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {order.customerName.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-700">{order.customerName}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[order.status]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[order.status]}`} />
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-right font-semibold text-slate-700">
                        {fmt(order.totalPrice)}
                      </td>
                      <td className="py-3.5 px-6 text-slate-500 text-xs">
                        {fmtDate(order.orderDate)}
                      </td>
                      <td className="py-3.5 px-6 text-center" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => setSelected(order)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 font-semibold transition"
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
                Menampilkan <span className="font-semibold text-slate-600">{(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE, filtered.length)}</span> dari <span className="font-semibold text-slate-600">{filtered.length}</span> pesanan
              </p>
              <div className="flex gap-1.5 items-center">
                <button
                  onClick={() => setPage(p => Math.max(1, p-1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >← Prev</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-semibold transition
                      ${p === page
                        ? "bg-indigo-500 text-white shadow-sm"
                        : "bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"}`}
                  >{p}</button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p+1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
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
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-800">Detail Pesanan</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-slate-600 text-xl leading-none"
              >✕</button>
            </div>

            {/* Avatar + Name */}
            <div className="flex items-center gap-3 mb-5 p-4 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-lg font-bold">
                {selected.customerName.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-800">{selected.customerName}</p>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold mt-0.5 ${STATUS_STYLE[selected.status]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[selected.status]}`} />
                  {selected.status}
                </span>
              </div>
            </div>

            {/* Info Rows */}
            {[
              { label: "Order ID",      value: selected.orderId,              mono: true },
              { label: "Total Harga",   value: fmt(selected.totalPrice),      mono: false },
              { label: "Tanggal Order", value: fmtDate(selected.orderDate),   mono: false },
            ].map(({ label, value, mono }) => (
              <div key={label} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-400">{label}</span>
                <span className={`text-sm font-semibold text-slate-700 ${mono ? "font-mono text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-lg" : ""}`}>
                  {value}
                </span>
              </div>
            ))}

            {/* Close Button */}
            <button
              onClick={() => setSelected(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}