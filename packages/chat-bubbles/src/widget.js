(function (global) {
  'use strict';

  const MAX_BUBBLES = 25;
  const DEFAULT_SETTINGS = Object.freeze({
    theme: 'dark',
    fontSize: 24,
    ignoredUsers: ''
  });

  const state = {
    root: null,
    settings: { ...DEFAULT_SETTINGS },
    ignoredUsers: new Set()
  };

  function clampFontSize(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      return DEFAULT_SETTINGS.fontSize;
    }
    return Math.min(64, Math.max(10, parsed));
  }

  function parseIgnoredUsers(value) {
    if (Array.isArray(value)) {
      return new Set(
        value
          .map((name) => String(name).trim().toLowerCase())
          .filter(Boolean)
      );
    }

    if (typeof value !== 'string') {
      return new Set();
    }

    return new Set(
      value
        .split(',')
        .map((name) => name.trim().toLowerCase())
        .filter(Boolean)
    );
  }

  function normalizeSettings(raw) {
    const next = { ...DEFAULT_SETTINGS, ...(raw || {}) };
    next.theme = next.theme === 'light' ? 'light' : 'dark';
    next.fontSize = clampFontSize(next.fontSize);
    return next;
  }

  function resolveRoot(container) {
    if (container && typeof container.appendChild === 'function') {
      return container;
    }

    if (typeof document !== 'undefined') {
      const root = document.getElementById('root');
      if (root) {
        return root;
      }
      return document.body;
    }

    return null;
  }

  function applyStyles() {
    if (!state.root) {
      return;
    }

    if (state.root.classList) {
      state.root.classList.remove('theme-light', 'theme-dark');
      state.root.classList.add(`theme-${state.settings.theme}`);
    }

    if (state.root.style && state.root.style.setProperty) {
      state.root.style.setProperty('--bubble-font-size', `${state.settings.fontSize}px`);
    }
  }

  function ensureRoot(container) {
    if (!state.root) {
      state.root = resolveRoot(container);
      applyStyles();
    }
    return state.root;
  }

  function createBubble(text, author) {
    const node = document.createElement('div');
    node.className = 'bubble';
    node.textContent = author ? `${author}: ${text}` : text;
    return node;
  }

  function pruneBubbles(root) {
    while (root.children && root.children.length > MAX_BUBBLES) {
      root.removeChild(root.children[0]);
    }
  }

  function appendMessage(messageData) {
    const root = ensureRoot();
    if (!root || !messageData) {
      return null;
    }

    const textRaw = messageData.text ?? messageData.message ?? messageData.body;
    const text = typeof textRaw === 'string' ? textRaw.trim() : '';
    if (!text) {
      return null;
    }

    const authorRaw =
      messageData.displayName ?? messageData.nick ?? messageData.username ?? messageData.name ?? '';
    const author = typeof authorRaw === 'string' ? authorRaw.trim() : '';

    if (author && state.ignoredUsers.has(author.toLowerCase())) {
      return null;
    }

    const bubble = createBubble(text, author);
    root.appendChild(bubble);
    pruneBubbles(root);
    return bubble;
  }

  function updateSettings(fieldData) {
    state.settings = normalizeSettings({ ...state.settings, ...(fieldData || {}) });
    state.ignoredUsers = parseIgnoredUsers(state.settings.ignoredUsers);
    applyStyles();
  }

  function parseEnvelope(eventLike) {
    if (eventLike && eventLike.detail && eventLike.detail.listener) {
      return eventLike.detail;
    }

    if (eventLike && eventLike.data && eventLike.data.listener) {
      return eventLike.data;
    }

    if (eventLike && eventLike.listener) {
      return eventLike;
    }

    return null;
  }

  function handleWidgetLoad(eventLike) {
    const detail = eventLike && eventLike.detail ? eventLike.detail : eventLike;
    const fieldData = detail && detail.fieldData ? detail.fieldData : global.SE_SETTINGS;
    updateSettings(fieldData || {});
  }

  function handleMessage(eventLike) {
    const envelope = parseEnvelope(eventLike);
    if (!envelope || envelope.listener !== 'message') {
      return;
    }

    const payload = envelope.event && envelope.event.data ? envelope.event.data : null;
    appendMessage(payload);
  }

  function mount(container, opts) {
    const root = ensureRoot(container);
    if (!root) {
      return { el: null, unmount() {} };
    }

    const text = opts && typeof opts.text === 'string' ? opts.text : 'chat-bubbles widget ready';
    const el = createBubble(text, '');
    root.appendChild(el);

    return {
      el,
      unmount() {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }
    };
  }

  const api = {
    mount,
    appendMessage,
    updateSettings,
    parseIgnoredUsers
  };

  ensureRoot();
  handleWidgetLoad({ detail: { fieldData: global.SE_SETTINGS || {} } });

  if (typeof global.addEventListener === 'function') {
    global.addEventListener('onWidgetLoad', handleWidgetLoad);
    global.addEventListener('onEventReceived', handleMessage);
    global.addEventListener('message', handleMessage);
  }

  global.ChatBubbles = api;
  console.warn('[chat-bubbles] widget ready');
})(typeof window !== 'undefined' ? window : globalThis);

