// literal.js
// (c) 2025 - Use JavaScript template literals directly inside HTML with minimal reactivity

(function () {
  /**
   * Checks if a string contains unescaped template literals (${...})
   */
  const hasLiteral = (s) => /(?<!\\)\$\{/.test(s);

  /**
   * Renders a node based on its current data
   * Evaluates each stored template (innerHTML and dynamic attributes)
   */
  const render = (el) => {
    const data = el._data;
    const keys = Object.keys(data);
    const vals = Object.values(data);

    try {
      for (const [key, tpl] of Object.entries(el._templates)) {
        const value = Function(...keys, `return \`${tpl}\``)(...vals);
        if (key === 'innerHTML') {
          el.innerHTML = value;
        } else {
          el.setAttribute(key, value);
        }
      }
    } catch (err) {
      console.warn('Literal render error:', err.message);
    }
  };

  /**
   * Activates Literal on a node
   * Stores innerHTML and dynamic attribute templates
   * Sets up reactivity using a Proxy
   */
  const literalize = (el) => {
    el._templates = {};

    // Extract dynamic attributes
    for (const attr of el.attributes) {
      if (hasLiteral(attr.value)) {
        el._templates[attr.name] = attr.value;
      }
    }

    // Extract dynamic innerHTML
    if (hasLiteral(el.innerHTML)) {
      el._templates.innerHTML = el.innerHTML;
      el.innerHTML = '';
    }

    // Setup reactivity via Proxy
    const handler = {
      set(obj, prop, val) {
        if (obj[prop] !== val) {
          obj[prop] = val;
          render(el);
        }
        return true;
      }
    };

    const raw = el._data ?? {};
    const proxy = new Proxy(raw, handler);

    Object.defineProperty(el, '_data', {
      configurable: false,
      writable: false,
      value: proxy
    });

    render(el);
  };

  /**
   * Deactivates Literal on a node
   * Removes stored templates
   */
  const teardown = (el) => {
    delete el._templates;
  };

  /**
   * Initializes Literal by scanning the initial document
   * Observes new nodes and attribute changes dynamically
   */
  const initLiteral = () => {
    document.querySelectorAll('[literal]').forEach(literalize);
    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['literal']
    });
  };

  // MutationObserver to handle dynamic changes
  const observer = new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'attributes' && m.attributeName === 'literal') {
        m.target.hasAttribute('literal') ? literalize(m.target) : teardown(m.target);
      }
      if (m.type === 'childList') {
        m.addedNodes.forEach((n) => {
          if (n.nodeType === 1 && n.hasAttribute('literal')) {
            literalize(n);
          }
        });
      }
    }
  });

  // Start immediately or after DOMContentLoaded
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', initLiteral)
    : initLiteral();
})();
