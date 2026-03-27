// ---------- DOM ----------
const inputText = document.getElementById('inputText');
const outputDiv = document.getElementById('output');
const fromLangSelect = document.getElementById('fromLang');
const toLangSelect = document.getElementById('toLang');
const siteLangSelect = document.getElementById('siteLang');
const fromLabel = document.getElementById('fromLabel');
const toLabel = document.getElementById('toLabel');
const themeToggle = document.getElementById('themeToggle');
const copyBtn = document.getElementById('copyBtn');
const swapBtn = document.getElementById('swapBtn');

// ---------- Reset Button ----------
const resetBtn = document.createElement('button');
resetBtn.id = 'resetBtn';
resetBtn.className = 'btn-icon';
resetBtn.title = 'Reset Fields';
resetBtn.innerText = '🗑️';
swapBtn.parentNode.appendChild(resetBtn);

// ---------- RTL ----------
siteLangSelect.addEventListener('change', () => {
  const lang = siteLangSelect.value;

  document.body.classList.toggle('rtl', lang === 'ar');

  updateLanguageUI(lang);
  updateOutput();
});

// ---------- Dark Mode ----------
themeToggle.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark-mode');
  themeToggle.innerText = dark ? '☀' : '🌙';
});

// ---------- Copy ----------
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(outputDiv.innerText)
    .then(() => alert('Copied!'))
    .catch(() => alert('Error'));
});

// ---------- Swap ----------
swapBtn.addEventListener('click', () => {
  const temp = fromLangSelect.value;
  fromLangSelect.value = toLangSelect.value;
  toLangSelect.value = temp;

  inputText.value = outputDiv.innerText;
  updateOutput();
});

// ---------- Reset ----------
resetBtn.addEventListener('click', () => {
  inputText.value = '';
  outputDiv.innerText = '';
});

// ---------- Live ----------
inputText.addEventListener('input', updateOutput);
fromLangSelect.addEventListener('change', updateOutput);
toLangSelect.addEventListener('change', updateOutput);

// ---------- Output ----------
function updateOutput() {
  outputDiv.innerText = convertBetweenLayouts(
    inputText.value,
    fromLangSelect.value,
    toLangSelect.value
  );
}

// ---------- Translation ----------
function updateLanguageUI(lang) {
  const t = {
    en: { from: 'From:', to: 'To:', p: 'Type here...' },
    ar: { from: 'من:', to: 'إلى:', p: 'اكتب هنا...' },
    fr: { from: 'De:', to: 'Vers:', p: 'Tapez ici...' },
    de: { from: 'Von:', to: 'Nach:', p: 'Hier tippen...' },
    es: { from: 'De:', to: 'A:', p: 'Escribe aquí...' },
    it: { from: 'Da:', to: 'A:', p: 'Scrivi qui...' },
    ru: { from: 'С:', to: 'На:', p: 'Введите текст...' }
  };

  const tr = t[lang] || t.en;
  fromLabel.innerText = tr.from;
  toLabel.innerText = tr.to;
  inputText.placeholder = tr.p;
}

// ---------- Init ----------
updateLanguageUI(siteLangSelect.value);
updateOutput();