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
const cases = { valid: 'Player1', empty: '', spaces: '   ', short: 'A', long: 'abcdefghijklmnopq', boundary: 'abcdefghijklmnop' };
document.querySelector('#run-test').addEventListener('click', () => {
  const input = cases[document.querySelector('#test-case').value];
  const fixed = document.querySelector('#test-version').value === 'fixed';
  const length = input.trim().length;
  const expected = length >= 2 && length <= 16;
  const actual = fixed ? expected : input.length >= 2;
  document.querySelector('#test-status').textContent = actual === expected ? 'Working as expected' : 'Bug found';
  document.querySelector('.lab-result').dataset.result = actual === expected ? 'pass' : 'fail';
  document.querySelector('#test-input').textContent = JSON.stringify(input);
  document.querySelector('#test-expected').textContent = expected ? 'Allow this username' : 'Show an error and reject it';
  document.querySelector('#test-actual').textContent = actual ? 'The form allowed it' : 'The form rejected it';
  document.querySelector('#test-note').textContent = fixed ? 'The fixed form ignores spaces at the beginning and end, then checks that the username has 2–16 characters.' : actual !== expected ? 'The broken form accepted something it should reject. A tester would report this input, what should happen, and what actually happened. Switch to “After the fix” and run it again.' : 'This example works. Try “Only spaces” with “Before the fix” to find a bug.';
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
