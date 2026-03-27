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
const copyLabel = document.getElementById('copyLabel');
const swapBtn = document.getElementById('swapBtn');
const resetBtn = document.getElementById('resetBtn');
const resetLabel = document.getElementById('resetLabel');
const charCount = document.getElementById('charCount');
const panelTitle = document.getElementById('panelTitle');
const videoTitle = document.getElementById('videoTitle');
const inputLabel = document.getElementById('inputLabel');
const outputLabel = document.getElementById('outputLabel');

// ---------- RTL ----------
siteLangSelect.addEventListener('change', () => {
  const lang = siteLangSelect.value;
  document.body.classList.toggle('rtl', lang === 'ar');
  updateLanguageUI(lang);
  updateOutput();
});

// ---------- Dark Mode ----------
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  // SVG icons auto-toggle via CSS
});

// ---------- Copy with Check Animation ----------
copyBtn.addEventListener('click', () => {
  const text = outputDiv.innerText;
  if (!text.trim()) return;

  navigator.clipboard.writeText(text)
    .then(() => {
      copyBtn.classList.add('copied');
      copyLabel.textContent = '✓';
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        updateLanguageUI(siteLangSelect.value);
      }, 2000);
    })
    .catch(() => {
      copyBtn.classList.add('copy-error');
      copyLabel.textContent = '✗';
      setTimeout(() => {
        copyBtn.classList.remove('copy-error');
        updateLanguageUI(siteLangSelect.value);
      }, 2000);
    });
});

// ---------- Swap with Spin Animation ----------
swapBtn.addEventListener('click', () => {
  // Spin animation
  swapBtn.style.transform = 'rotate(180deg) scale(1.1)';
  setTimeout(() => { swapBtn.style.transform = ''; }, 300);

  const temp = fromLangSelect.value;
  fromLangSelect.value = toLangSelect.value;
  toLangSelect.value = temp;

  inputText.value = outputDiv.innerText;
  updateOutput();
  updateCharCount();
});

// ---------- Reset with Animation ----------
resetBtn.addEventListener('click', () => {
  // Spin animation
  resetBtn.querySelector('svg').style.transform = 'rotate(-360deg)';
  setTimeout(() => { resetBtn.querySelector('svg').style.transition = ''; resetBtn.querySelector('svg').style.transform = ''; }, 400);
  resetBtn.querySelector('svg').style.transition = 'transform 0.4s ease';

  inputText.value = '';
  outputDiv.innerText = '';
  updateCharCount();
});

// ---------- Live Conversion ----------
inputText.addEventListener('input', () => {
  updateOutput();
  updateCharCount();
});
fromLangSelect.addEventListener('change', updateOutput);
toLangSelect.addEventListener('change', updateOutput);

// ---------- Character Counter ----------
function updateCharCount() {
  charCount.textContent = inputText.value.length;
}

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
    en: {
      from: 'From', to: 'To', p: 'Start typing your text here...',
      langs: ['EN English', 'AR Arabic', 'FR French', 'DE German', 'ES Spanish', 'IT Italian', 'RU Russian'],
      titles: ['Swap Languages', 'Copy Text', 'Reset Fields'],
      panel: 'Converter', video: 'Tutorial', input: 'Input', output: 'Output',
      copy: 'Copy', reset: 'Reset'
    },
    ar: {
      from: 'من', to: 'إلى', p: 'ابدأ الكتابة هنا...',
      langs: ['EN الإنجليزية', 'AR العربية', 'FR الفرنسية', 'DE الألمانية', 'ES الإسبانية', 'IT الإيطالية', 'RU الروسية'],
      titles: ['تبديل اللغات', 'نسخ النص', 'تفريغ الحقول'],
      panel: 'المحول', video: 'فيديو توضيحي', input: 'المدخلات', output: 'المخرجات',
      copy: 'نسخ', reset: 'تفريغ'
    },
    fr: {
      from: 'De', to: 'Vers', p: 'Commencez à taper ici...',
      langs: ['EN Anglais', 'AR Arabe', 'FR Français', 'DE Allemand', 'ES Espagnol', 'IT Italien', 'RU Russe'],
      titles: ['Échanger les langues', 'Copier le texte', 'Réinitialiser'],
      panel: 'Convertisseur', video: 'Tutoriel', input: 'Entrée', output: 'Sortie',
      copy: 'Copier', reset: 'Réinitialiser'
    },
    de: {
      from: 'Von', to: 'Nach', p: 'Hier tippen...',
      langs: ['EN Englisch', 'AR Arabisch', 'FR Französisch', 'DE Deutsch', 'ES Spanisch', 'IT Italienisch', 'RU Russisch'],
      titles: ['Sprachen tauschen', 'Text kopieren', 'Zurücksetzen'],
      panel: 'Konverter', video: 'Anleitung', input: 'Eingabe', output: 'Ausgabe',
      copy: 'Kopieren', reset: 'Zurücksetzen'
    },
    es: {
      from: 'De', to: 'A', p: 'Empieza a escribir aquí...',
      langs: ['EN Inglés', 'AR Árabe', 'FR Francés', 'DE Alemán', 'ES Español', 'IT Italiano', 'RU Ruso'],
      titles: ['Intercambiar idiomas', 'Copiar texto', 'Restablecer'],
      panel: 'Convertidor', video: 'Tutorial', input: 'Entrada', output: 'Salida',
      copy: 'Copiar', reset: 'Restablecer'
    },
    it: {
      from: 'Da', to: 'A', p: 'Inizia a scrivere qui...',
      langs: ['EN Inglese', 'AR Arabo', 'FR Francese', 'DE Tedesco', 'ES Spagnolo', 'IT Italiano', 'RU Russo'],
      titles: ['Scambia lingue', 'Copia testo', 'Ripristina'],
      panel: 'Convertitore', video: 'Tutorial', input: 'Ingresso', output: 'Uscita',
      copy: 'Copia', reset: 'Ripristina'
    },
    ru: {
      from: 'Из', to: 'В', p: 'Начните вводить текст...',
      langs: ['EN Английский', 'AR Арабский', 'FR Французский', 'DE Немецкий', 'ES Испанский', 'IT Итальянский', 'RU Русский'],
      titles: ['Поменять языки', 'Копировать текст', 'Очистить'],
      panel: 'Конвертер', video: 'Руководство', input: 'Ввод', output: 'Вывод',
      copy: 'Копировать', reset: 'Очистить'
    }
  };

  const tr = t[lang] || t.en;
  fromLabel.innerText = tr.from;
  toLabel.innerText = tr.to;
  inputText.placeholder = tr.p;

  Array.from(fromLangSelect.options).forEach((opt, i) => opt.text = tr.langs[i]);
  Array.from(toLangSelect.options).forEach((opt, i) => opt.text = tr.langs[i]);

  swapBtn.title = tr.titles[0];
  copyBtn.title = tr.titles[1];
  resetBtn.title = tr.titles[2];

  panelTitle.textContent = tr.panel;
  videoTitle.textContent = tr.video;
  inputLabel.textContent = tr.input;
  outputLabel.textContent = tr.output;

  if (!copyBtn.classList.contains('copied')) {
    copyLabel.textContent = tr.copy;
  }
  resetLabel.textContent = tr.reset;
}

// ---------- Init ----------
updateLanguageUI(siteLangSelect.value);
updateOutput();
updateCharCount();

// ---------- Video Auto-Unmute on First Interaction ----------
const tutorialVideo = document.getElementById('tutorialVideo');
if (tutorialVideo) {
  const events = ['click', 'touchstart', 'pointerdown', 'mousedown', 'keydown'];
  const unmuteVideo = () => {
    tutorialVideo.muted = false;
    tutorialVideo.play().catch(() => {});
    events.forEach(e => document.removeEventListener(e, unmuteVideo));
    inputText.removeEventListener('focus', unmuteVideo);
    inputText.removeEventListener('input', unmuteVideo);
  };
  events.forEach(e => document.addEventListener(e, unmuteVideo));
  inputText.addEventListener('focus', unmuteVideo);
  inputText.addEventListener('input', unmuteVideo);
}