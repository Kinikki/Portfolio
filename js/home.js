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
const logPrint = document.querySelector('#log-print');
const deletePrint = document.querySelector('#delete-print');
function showPrint(logged) {
  document.querySelector('#spool-balance').textContent = logged ? '860 g remaining' : '1,000 g remaining';
  document.querySelector('#balance-note').textContent = logged
    ? 'Print logged: 1,000 − 120 − 20 = 860 g. Now delete it to restore the balance.'
    : 'Print deleted: 860 + 140 = 1,000 g. The spool is back to its starting balance.';
  logPrint.disabled = logged;
  deletePrint.disabled = !logged;
}
logPrint.addEventListener('click', () => showPrint(true));
deletePrint.addEventListener('click', () => showPrint(false));
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
