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
    en: { from: 'From:', to: 'To:', p: 'Type here...', langs: ['EN English', 'AR Arabic', 'FR French', 'DE German', 'ES Spanish', 'IT Italian', 'RU Russian'], titles: ['Swap Languages', 'Copy Text', 'Reset Fields'] },
    ar: { from: 'من:', to: 'إلى:', p: 'اكتب هنا...', langs: ['EN الإنجليزية', 'AR العربية', 'FR الفرنسية', 'DE الألمانية', 'ES الإسبانية', 'IT الإيطالية', 'RU الروسية'], titles: ['تبديل اللغات', 'نسخ النص', 'تفريغ الحقول'] },
    fr: { from: 'De:', to: 'Vers:', p: 'Tapez ici...', langs: ['EN Anglais', 'AR Arabe', 'FR Français', 'DE Allemand', 'ES Espagnol', 'IT Italien', 'RU Russe'], titles: ['Échanger les langues', 'Copier le texte', 'Réinitialiser'] },
    de: { from: 'Von:', to: 'Nach:', p: 'Hier tippen...', langs: ['EN Englisch', 'AR Arabisch', 'FR Französisch', 'DE Deutsch', 'ES Spanisch', 'IT Italienisch', 'RU Russisch'], titles: ['Sprachen tauschen', 'Text kopieren', 'Zurücksetzen'] },
    es: { from: 'De:', to: 'A:', p: 'Escribe aquí...', langs: ['EN Inglés', 'AR Árabe', 'FR Francés', 'DE Alemán', 'ES Español', 'IT Italiano', 'RU Ruso'], titles: ['Intercambiar idiomas', 'Copiar texto', 'Restablecer'] },
    it: { from: 'Da:', to: 'A:', p: 'Scrivi qui...', langs: ['EN Inglese', 'AR Arabo', 'FR Francese', 'DE Tedesco', 'ES Spagnolo', 'IT Italiano', 'RU Russo'], titles: ['Scambia lingue', 'Copia testo', 'Ripristina'] },
    ru: { from: 'Из:', to: 'В:', p: 'Введите текст...', langs: ['EN Английский', 'AR Арабский', 'FR Французский', 'DE Немецкий', 'ES Испанский', 'IT Итальянский', 'RU Русский'], titles: ['Поменять языки', 'Копировать текст', 'Очистить'] }
  };

  const tr = t[lang] || t.en;
  fromLabel.innerText = tr.from;
  toLabel.innerText = tr.to;
  inputText.placeholder = tr.p;

  Array.from(fromLangSelect.options).forEach((opt, i) => opt.text = tr.langs[i]);
  Array.from(toLangSelect.options).forEach((opt, i) => opt.text = tr.langs[i]);

  swapBtn.title = tr.titles[0];
  copyBtn.title = tr.titles[1];
  if(typeof resetBtn !== "undefined" && resetBtn) {
     resetBtn.title = tr.titles[2];
  }
}

// ---------- Init ----------
updateLanguageUI(siteLangSelect.value);
updateOutput();