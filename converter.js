// ---------- Keyboard layouts ----------
const keyboardLayouts = {
  en: { 
    'q':'q','w':'w','e':'e','r':'r','t':'t','y':'y','u':'u','i':'i','o':'o','p':'p',
    'a':'a','s':'s','d':'d','f':'f','g':'g','h':'h','j':'j','k':'k','l':'l',
    'z':'z','x':'x','c':'c','v':'v','b':'b','n':'n','m':'m',
    ';':';', ':':':', ',':',', '.':'.', '/':'/', '[':'[', ']':']', "'":"'" 
  },
  ar: { 
    'q':'ض','w':'ص','e':'ث','r':'ق','t':'ف','y':'غ','u':'ع','i':'ه','o':'خ','p':'ح',
    'a':'ش','s':'س','d':'ي','f':'ب','g':'ل','h':'ا','j':'ت','k':'ن','l':'م',
    'z':'ئ','x':'ء','c':'ؤ','v':'ر','b':'لا','n':'ى','m':'ة',

    ';':'ك', ':':'ط', ',':'و', '.':'ز', '/':'ظ',
    ']':'د',
    '[':'ج',
    '`':'ذ',

    "'":"'"
  },
  fr: { 
    // الحروف العادية
    'q':'a','w':'z','e':'e','r':'r','t':'t','y':'y','u':'u','i':'i','o':'o','p':'p',
    'a':'q','s':'s','d':'d','f':'f','g':'g','h':'h','j':'j','k':'k','l':'l',
    'z':'w','x':'x','c':'c','v':'v','b':'b','n':'n','m':'m',
    // الرموز
    ';':';', ':':':', ',':',', '.':'.', '/':'/', '[':'[', ']':']', "'":"'",
    // الحروف الخاصة الفرنسية
    'é':'e','è':'e','ê':'e','ë':'e',
    'à':'a','â':'a','ä':'a',
    'ç':'c','î':'i','ï':'i','ô':'o','ö':'o','ù':'u','û':'u','ü':'u','ÿ':'y'
    },

    de: {
    // الحروف العادية
    'q':'q','w':'w','e':'e','r':'r','t':'t','y':'z','u':'u','i':'i','o':'o','p':'p',
    'a':'a','s':'s','d':'d','f':'f','g':'g','h':'h','j':'j','k':'k','l':'l',
    'z':'y','x':'x','c':'c','v':'v','b':'b','n':'n','m':'m',
    // الرموز
    ';':'ö', ':':'Ö', ',':'m', '.':'.', '/':'-', '[':'ü', ']':'+', "'":'#',
    // الحروف الخاصة الألمانية
    'ä':'a','Ä':'A','ö':'o','Ö':'O','ü':'u','Ü':'U','ß':'ss'
    },
    es: {
    // نفس QWERTY تقريبًا (إسبانيا)
    'q':'q','w':'w','e':'e','r':'r','t':'t','y':'y','u':'u','i':'i','o':'o','p':'p',
    'a':'a','s':'s','d':'d','f':'f','g':'g','h':'h','j':'j','k':'k','l':'l','ñ':'ñ',
    'z':'z','x':'x','c':'c','v':'v','b':'b','n':'n','m':'m',

    // الرموز
    ';':'ñ', ':':'Ñ', ',':',', '.':'.', '/':'-', '[':'´', ']':'ç',

    // special
    'á':'a','é':'e','í':'i','ó':'o','ú':'u','ü':'u'
  },

  it: {
    // QWERTY مع رموز مختلفة
    'q':'q','w':'w','e':'e','r':'r','t':'t','y':'y','u':'u','i':'i','o':'o','p':'p',
    'a':'a','s':'s','d':'d','f':'f','g':'g','h':'h','j':'j','k':'k','l':'l',
    'z':'z','x':'x','c':'c','v':'v','b':'b','n':'n','m':'m',

    // الرموز
    ';':'ò', ':':'ç', ',':',', '.':'.', '/':'-',

    // special
    'à':'a','è':'e','é':'e','ì':'i','ò':'o','ù':'u'
  },

  ru: {
    // Russian ЙЦУКЕН
    'q':'й','w':'ц','e':'у','r':'к','t':'е','y':'н','u':'г','i':'ш','o':'щ','p':'з',
    'a':'ф','s':'ы','d':'в','f':'а','g':'п','h':'р','j':'о','k':'л','l':'д',
    'z':'я','x':'ч','c':'с','v':'м','b':'и','n':'т','m':'ь',

    // رموز
    ';':'ж', ':':'Ж', ',':'б', '.':'ю', '/':'.',

    // special
    'ё':'е'
  }
};

// ---------- Arabic composite handling ----------

// ---------- Conversion ----------
// ---------- preprocess & postprocess ----------
// ---------- preprocess & postprocess ----------
function preprocessArabic(text){ 
  return text
    .replace(/لا/g, 'b')   
    .replace(/ج/g, '[')    
    .replace(/ذ/g, '`')    
    .replace(/أ/g, 'h');   
}

function postprocessArabic(text){ 
  return text
    .replace(/b/g, 'لا')
    .replace(/\[/g, 'ج')
    .replace(/`/g, 'ذ')
    .replace(/h/g, 'أ');
}

// Special Arabic character mapping
const specialMapArToEn = {
  'ج': '[',  
  'ذ': '`',  
  'أ': 'h',  
  'لا': 'b' 
};
function convertBetweenLayouts(text, fromLang, toLang){
  if(fromLang === 'ar') text = preprocessArabic(text);

  const fromLayout = keyboardLayouts[fromLang];
  const toLayout = keyboardLayouts[toLang];

  let result = '';

  for(let i = 0; i < text.length; i++){
    let char = text[i];

    // 🔹 Special Arabic chars
    if(fromLang === 'ar' && specialMapArToEn[char]){
      let converted = specialMapArToEn[char]; 
      // لو عايزين نحول كمان حسب toLayout
      if(toLayout[converted]) converted = toLayout[converted];
      result += converted;
      continue;
    }

    let key = Object.keys(fromLayout).find(k => fromLayout[k] === char);

    if(!key){
      result += char;
      continue;
    }

    let converted = toLayout[key] || char;
    result += converted;
  }

  if(toLang === 'ar') result = postprocessArabic(result);

  return result;
}

const textarea = document.querySelector('#myTextarea');
  const output = document.querySelector('#outputText');
  const fromSelect = document.querySelector('#fromLang');
  const toSelect = document.querySelector('#toLang');

  function updateOutput(){
    const original = textarea.value;
    const converted = convertBetweenLayouts(original, fromSelect.value, toSelect.value);
    output.textContent = converted;
  }

  textarea.addEventListener('input', updateOutput);
  fromSelect.addEventListener('change', updateOutput);
  toSelect.addEventListener('change', updateOutput);