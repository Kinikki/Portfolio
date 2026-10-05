const toggle = document.querySelector('.theme-toggle');
let savedTheme;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch {}
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  toggle.textContent = theme === 'light' ? 'Dark theme' : 'Light theme';
  toggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
}
setTheme(savedTheme === 'light' ? 'light' : 'dark');
toggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  setTheme(theme);
  try { localStorage.setItem('portfolio-theme', theme); } catch {}
});
const cases = { valid: 'Quinn', empty: '', spaces: '   ', short: 'Q', long: 'abcdefghijklmnopq', boundary: 'abcdefghijklmnop' };
document.querySelector('#run-test').addEventListener('click', () => {
  const input = cases[document.querySelector('#test-case').value];
  const fixed = document.querySelector('#test-version').value === 'fixed';
  const length = input.trim().length;
  const expected = length >= 2 && length <= 16;
  const actual = fixed ? expected : input.length >= 2;
  document.querySelector('#test-status').textContent = actual === expected ? 'PASS · Behavior matches' : 'FAIL · Bug reproduced';
  document.querySelector('.lab-result').dataset.result = actual === expected ? 'pass' : 'fail';
  document.querySelector('#test-input').textContent = JSON.stringify(input);
  document.querySelector('#test-expected').textContent = expected ? 'Accept username' : 'Reject username';
  document.querySelector('#test-actual').textContent = actual ? 'Accepted username' : 'Rejected username';
  document.querySelector('#test-note').textContent = fixed ? 'The corrected check trims whitespace and enforces both length limits.' : actual !== expected ? 'Reproduction: choose this input and submit. The original check only enforces a minimum raw length, allowing whitespace and overlong names.' : 'This case passes. Try spaces only or an overlong name to probe the missing checks.';
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('nav a').forEach(link => {
          if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-15% 0px -55% 0px' });
  document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
}
