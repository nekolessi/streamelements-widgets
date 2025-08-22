const root = document.getElementById('root');
const settings = window.SE_SETTINGS || {};

const ignoredUsers = Array.isArray(settings.ignoredUsers)
  ? settings.ignoredUsers.map((u) => u.toLowerCase())
  : typeof settings.ignoredUsers === 'string' && settings.ignoredUsers.length > 0
    ? settings.ignoredUsers.split(',').map((u) => u.trim().toLowerCase())
    : [];

if (settings.fontSize) {
  const size = typeof settings.fontSize === 'number'
    ? `${settings.fontSize}px`
    : settings.fontSize;
  root.style.setProperty('--bubble-font-size', size);
}

if (settings.theme) {
  root.classList.add(`theme-${settings.theme}`);
}

function add(msg) {
  const d = document.createElement('div');
  d.className = 'bubble';
  d.textContent = msg;
  root.appendChild(d);
  setTimeout(() => d.remove(), 6000);
}

window.addEventListener('message', (e) => {
  if (e.data && e.data.listener === 'message') {
    const m = e.data.event?.data;
    const name = m.displayName?.toLowerCase();
    if (!ignoredUsers.includes(name)) {
      add(`${m.displayName}: ${m.text}`);
    }
  }
});
