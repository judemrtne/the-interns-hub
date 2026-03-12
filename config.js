// ═══════════════════════════════════════════
//  THE INTERNS HUB — SHARED CONFIG
// ═══════════════════════════════════════════
const SUPABASE_URL = 'https://ntbqdkfxcnditgdxdipb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_2ybsFhQ7iCTysVxDri2G-A_afoYgATk';

let sb;
function initSupabase() {
  if (!sb) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  return sb;
}

// ─── Lucide-style inline SVG icons ────────────────────────────────────────────
const ICONS = {
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  dashboard: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  megaphone: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l19-9v18L3 11z"/><path d="M11 13l-2 5"/></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 1 1-14.14 0"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  logIn: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>`,
  logOut: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  building: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h6M9 17h6M9 5v2M15 5v2"/></svg>`,
};

// ─── Shared nav renderer ─────────────────────────────────────────────────────
function renderNav(activePage) {
  const navLinks = [
    { href: 'index.html',         icon: ICONS.clock,      label: 'Clock',      key: 'clock' },
    { href: 'dashboard.html',     icon: ICONS.dashboard,  label: 'Dashboard',  key: 'dashboard' },
    { href: 'interns.html',       icon: ICONS.users,      label: 'Interns',    key: 'interns' },
    { href: 'messages.html',      icon: ICONS.mail,       label: 'Messages',   key: 'messages' },
    { href: 'announcements.html', icon: ICONS.megaphone,  label: 'Board',      key: 'announcements' },
    { href: 'admin.html',         icon: ICONS.settings,   label: 'Admin',      key: 'admin', adminOnly: true },
  ];

  return navLinks.map(n => {
    const active = activePage === n.key ? 'active' : '';
    const adminClass = n.adminOnly ? 'admin-only' : '';
    return `<a href="${n.href}" class="snav-item ${active} ${adminClass}" data-key="${n.key}">
      <span class="snav-icon">${n.icon}</span>
      <span class="snav-label">${n.label}</span>
    </a>`;
  }).join('');
}

// ─── Auth guard ──────────────────────────────────────────────────────────────
async function requireAuth() {
  const client = initSupabase();
  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }
  return session.user;
}

// ─── Get user profile ─────────────────────────────────────────────────────────
async function getUserProfile(uid) {
  const client = initSupabase();
  const { data } = await client.from('users').select('*').eq('id', uid).single();
  return data;
}

// ─── Check admin ─────────────────────────────────────────────────────────────
async function isAdmin(uid) {
  const profile = await getUserProfile(uid);
  return profile?.role === 'admin';
}

// ─── Show admin nav items ─────────────────────────────────────────────────────
function showAdminNav() {
  document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'flex');
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function toast(msg, type = 'inf') {
  let c = document.getElementById('toasts');
  if (!c) { c = document.createElement('div'); c.id = 'toasts'; c.className = 'toasts'; document.body.appendChild(c); }
  const d = document.createElement('div');
  d.className = `toast ${type}`;
  d.textContent = msg;
  c.appendChild(d);
  setTimeout(() => d.remove(), 3100);
}

// ─── Format time ─────────────────────────────────────────────────────────────
function fmtTime(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function fmtDate(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
}

function timeAgo(ts) {
  const now = Date.now();
  const diff = now - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ─── Avatar initials ─────────────────────────────────────────────────────────
function avatarInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

function avatarColor(name) {
  const colors = ['#38bdf8','#58a6ff','#3fb950','#a371f7','#f85149','#7dd3fc','#56d364','#d2a8ff'];
  let hash = 0;
  for (const c of (name || '')) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}
