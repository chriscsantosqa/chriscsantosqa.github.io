/* Career progression — enhancement for the 4BIO experience entry. */

const CAREER_DATA = {
  pt: {
    label: 'Progressão de carreira',
    current: 'Atual',
    role: 'QA Especialista e Inovações',
    steps: [
      { period: '2023 - 2024', title: 'QA Trainee' },
      { period: '2024 - 2025', title: 'QA Junior' },
      { period: '2025 - atual', title: 'QA Especialista e Inovações', current: true },
    ],
  },
  en: {
    label: 'Career progression',
    current: 'Current',
    role: 'QA Specialist & Innovation',
    steps: [
      { period: '2023 - 2024', title: 'QA Trainee' },
      { period: '2024 - 2025', title: 'Junior QA Analyst' },
      { period: '2025 - present', title: 'QA Specialist & Innovation', current: true },
    ],
  },
};

function getLanguage() {
  return document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt';
}

function ensureStylesheet() {
  if (document.querySelector('link[data-career-progression]')) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = './css/career-progression.css';
  link.dataset.careerProgression = 'true';
  document.head.appendChild(link);
}

function createProgression(data) {
  const section = document.createElement('section');
  section.className = 'career-progression';
  section.setAttribute('aria-label', data.label);
  section.dataset.language = getLanguage();

  const heading = document.createElement('div');
  heading.className = 'career-progression-head';
  heading.textContent = data.label;
  section.appendChild(heading);

  const steps = document.createElement('div');
  steps.className = 'career-steps';

  data.steps.forEach((step) => {
    const item = document.createElement('article');
    item.className = `career-step${step.current ? ' current' : ''}`;

    const marker = document.createElement('span');
    marker.className = 'career-marker';
    marker.setAttribute('aria-hidden', 'true');

    const period = document.createElement('span');
    period.className = 'career-period';
    period.textContent = step.period;

    const title = document.createElement('strong');
    title.textContent = step.title;

    item.append(marker, period, title);

    if (step.current) {
      const badge = document.createElement('em');
      badge.textContent = data.current;
      item.appendChild(badge);
    }

    steps.appendChild(item);
  });

  section.appendChild(steps);
  return section;
}

function applyCareerProgression() {
  const experienceItems = Array.from(document.querySelectorAll('#exp-list .exp-item'));
  const companyItem = experienceItems.find((item) =>
    item.querySelector('.exp-head h3')?.textContent.trim() === '4BIO Medicamentos Especiais',
  );

  if (!companyItem) return;

  const language = getLanguage();
  const data = CAREER_DATA[language];
  const header = companyItem.querySelector('.exp-head');
  const role = companyItem.querySelector('.exp-role');
  const currentComponent = companyItem.querySelector('.career-progression');

  if (role) role.textContent = data.role;

  if (currentComponent?.dataset.language === language) return;

  currentComponent?.remove();
  header?.insertAdjacentElement('afterend', createProgression(data));
}

function scheduleCareerProgression() {
  window.requestAnimationFrame(applyCareerProgression);
}

ensureStylesheet();

document.addEventListener('DOMContentLoaded', () => {
  applyCareerProgression();

  document.querySelectorAll('.lang-btn').forEach((button) => {
    button.addEventListener('click', () => window.setTimeout(applyCareerProgression, 0));
  });

  const list = document.getElementById('exp-list');
  if (!list) return;

  const observer = new MutationObserver(scheduleCareerProgression);
  observer.observe(list, { childList: true, subtree: true });
});
