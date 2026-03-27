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
    en: { from: 'From:', to: 'To:', p: 'Type here...', langs: ['English', 'Arabic', 'French', 'German', 'Spanish', 'Italian', 'Russian'], titles: ['Swap Languages', 'Copy Text', 'Reset Fields'] },
    ar: { from: 'من:', to: 'إلى:', p: 'اكتب هنا...', langs: ['الإنجليزية', 'العربية', 'الفرنسية', 'الألمانية', 'الإسبانية', 'الإيطالية', 'الروسية'], titles: ['تبديل اللغات', 'نسخ النص', 'تفريغ الحقول'] },
    fr: { from: 'De:', to: 'Vers:', p: 'Tapez ici...', langs: ['Anglais', 'Arabe', 'Français', 'Allemand', 'Espagnol', 'Italien', 'Russe'], titles: ['Échanger les langues', 'Copier le texte', 'Réinitialiser'] },
    de: { from: 'Von:', to: 'Nach:', p: 'Hier tippen...', langs: ['Englisch', 'Arabisch', 'Französisch', 'Deutsch', 'Spanisch', 'Italienisch', 'Russisch'], titles: ['Sprachen tauschen', 'Text kopieren', 'Zurücksetzen'] },
    es: { from: 'De:', to: 'A:', p: 'Escribe aquí...', langs: ['Inglés', 'Árabe', 'Francés', 'Alemán', 'Español', 'Italiano', 'Ruso'], titles: ['Intercambiar idiomas', 'Copiar texto', 'Restablecer'] },
    it: { from: 'Da:', to: 'A:', p: 'Scrivi qui...', langs: ['Inglese', 'Arabo', 'Francese', 'Tedesco', 'Spagnolo', 'Italiano', 'Russo'], titles: ['Scambia lingue', 'Copia testo', 'Ripristina'] },
    ru: { from: 'Из:', to: 'В:', p: 'Введите текст...', langs: ['Английский', 'Арабский', 'Французский', 'Немецкий', 'Испанский', 'Итальянский', 'Русский'], titles: ['Поменять языки', 'Копировать текст', 'Очистить'] }
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