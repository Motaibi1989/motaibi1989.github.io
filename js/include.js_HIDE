// include.js - shared HTML component loader
async function includeHTML() {
  const elements = [...document.querySelectorAll('[data-include]')];
  await Promise.all(elements.map(async (el) => {
    const file = el.getAttribute('data-include');
    try {
      const response = await fetch(file, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      el.innerHTML = await response.text();
    } catch (error) {
      console.error(`Error loading ${file}:`, error);
      el.innerHTML = `<!-- Failed to load ${file} -->`;
    }
  }));
  document.dispatchEvent(new CustomEvent('includes:loaded'));
}

document.addEventListener('DOMContentLoaded', includeHTML);
