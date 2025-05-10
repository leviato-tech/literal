# Literal

**Literal** — Declarative JavaScript templates directly inside HTML with minimal and safe reactivity.

---
## Live Demo

[![Open in CodePen](https://img.shields.io/badge/Open%20in-CodePen-black?logo=codepen&logoColor=white)](https://codepen.io/leviato-tech/pen/WbbaXNJ)

---
## 🚀 Features

- Write pure HTML templates using JavaScript template literals `${}`.
- Automatic reactivity through direct data binding (`_data`).
- Ultra-minimal (less than 1KB minified).
- No virtual DOM, no JSX, no compilation needed.
- Safe proxy-based access: missing variables default to `''` (empty string).
- Native browser behavior. No dependencies.

---

## 🧠 Philosophy

Literal does not manage your state.  
Literal does not reimplement a virtual DOM.  
Literal simply **lets your HTML and JavaScript work together declaratively**.

You control the data (`_data` object).  
Literal updates your view automatically when it changes.

---

## 📦 Installation

```html
<script src="literal.js"></script># Literal
```

**Use JavaScript template literals directly inside your HTML.  
Minimal, reactive, pure.**

Literal lets you write expressions like `${name}` in HTML attributes or content,  
and automatically updates when data changes.

---

## Features

- No build step, no tooling.
- Native JavaScript template literal power.
- Tiny: pure JS, no dependencies.
- Instant reactivity via `Proxy`.
- Works with any HTML element and attribute.
- Elegant and declarative.

---

## Example

```html
<h1 literal>Hello, ${name}!</h1>

<input 
  placeholder="Enter your name..." 
  oninput="this.previousElementSibling._data.name = this.value">

<script>
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('h1[literal]')._data = { name: 'world' };
  });
</script>
```
