import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

import { describe, expect, test } from 'vitest';

function createClassList() {
  const values = new Set();
  return {
    add(...items) {
      for (const item of items) {
        values.add(item);
      }
    },
    remove(...items) {
      for (const item of items) {
        values.delete(item);
      }
    },
    contains(item) {
      return values.has(item);
    }
  };
}

function createNode(tagName) {
  const node = {
    tagName,
    id: '',
    className: '',
    textContent: '',
    children: [],
    parentNode: null,
    classList: createClassList(),
    style: {
      values: {},
      setProperty(name, value) {
        this.values[name] = value;
      }
    },
    appendChild(child) {
      child.parentNode = this;
      this.children.push(child);
      return child;
    },
    removeChild(child) {
      const index = this.children.indexOf(child);
      if (index >= 0) {
        this.children.splice(index, 1);
      }
      child.parentNode = null;
      return child;
    }
  };
  return node;
}

function loadWidget(settings = {}) {
  const listeners = new Map();
  const root = createNode('div');
  root.id = 'root';
  const body = createNode('body');

  const document = {
    body,
    getElementById(id) {
      return id === 'root' ? root : null;
    },
    createElement(tag) {
      return createNode(tag);
    }
  };

  const window = {
    SE_SETTINGS: settings,
    addEventListener(name, handler) {
      if (!listeners.has(name)) {
        listeners.set(name, []);
      }
      listeners.get(name).push(handler);
    }
  };

  const sandbox = {
    window,
    document,
    globalThis: window,
    console: {
      warn() {},
      error() {}
    }
  };

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const widgetPath = path.resolve(__dirname, '../packages/chat-bubbles/src/widget.js');
  const source = fs.readFileSync(widgetPath, 'utf8');

  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);

  function dispatch(name, payload) {
    const handlers = listeners.get(name) || [];
    for (const handler of handlers) {
      handler(payload);
    }
  }

  return { window, root, dispatch };
}

describe('chat-bubbles widget runtime', () => {
  test('attaches API and applies initial theme + font size', () => {
    const harness = loadWidget({ theme: 'light', fontSize: 30 });

    expect(typeof harness.window.ChatBubbles).toBe('object');
    expect(typeof harness.window.ChatBubbles.mount).toBe('function');
    expect(harness.root.classList.contains('theme-light')).toBe(true);
    expect(harness.root.style.values['--bubble-font-size']).toBe('30px');
  });

  test('handles StreamElements message events and ignored users', () => {
    const harness = loadWidget({ ignoredUsers: 'troll' });

    harness.dispatch('onEventReceived', {
      detail: {
        listener: 'message',
        event: { data: { displayName: 'troll', text: 'ignore me' } }
      }
    });

    harness.dispatch('onEventReceived', {
      detail: {
        listener: 'message',
        event: { data: { displayName: 'Alice', text: 'hello chat' } }
      }
    });

    expect(harness.root.children.length).toBe(1);
    expect(harness.root.children[0].textContent).toBe('Alice: hello chat');
  });

  test('caps rendered bubbles to 25 messages', () => {
    const harness = loadWidget();

    for (let index = 0; index < 30; index += 1) {
      harness.dispatch('message', {
        data: {
          listener: 'message',
          event: { data: { displayName: 'User', text: `msg-${index}` } }
        }
      });
    }

    expect(harness.root.children.length).toBe(25);
    expect(harness.root.children[0].textContent).toBe('User: msg-5');
  });
});
