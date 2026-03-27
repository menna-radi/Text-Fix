// ---------- Exact Keyboard Physical Layout Strings (47 Key Standard) ----------
// Each string array maps exactly to the physical layout rows (13 + 13 + 11 + 10)
const layouts = {
  en: {
    base:  "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./",
    shift: "~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?"
  },
  ar: {
    // Note: b = لا, T = لإ, G = لأ, B = لآ
    base:  "ذ1234567890-=ضصثقفغعهخحجد\\شسيبلاتنمكطئءؤرbىةوزظ",
    shift: "ّ!@#$%^&*)(_+ًٌَُTإ‘÷×؛<>|ٍِ][Gأـ،/:\":~ْ}{Bآ’,.؟"
  },
  fr: {
    // AZERTY
    base:  "²&é\"'(-è_çà)=azertyuiop^$*qsdfghjklmùwxcvbn,;:=!",
    shift: "²1234567890°+AZERTYUIOP¨£µQSDFGHJKLM%WXCVBN?./§"
  },
  de: {
    // QWERTZ
    base:  "^1234567890ß´qwertzuiopü+#asdfghjklöäyxcvbnm,.-",
    shift: "°!\"§$%&/()=?`QWERTZUIOPÜ*'ASDFGHJKLÖÄYXCVBNM;:_"
  },
  it: {
    // QWERTY (Italian)
    base:  "\\1234567890'ìqwertyuiopè+ùasdfghjklòàzxcvbnm,.-",
    shift: "|!\"£$%&/()=?^QWERTYUIOPé*§ASDFGHJKLç°ZXCVBNM;:_"
  },
  es: {
    // QWERTY (Spanish)
    base:  "º1234567890'¡qwertyuiop`+çasdfghjklñ´zxcvbnm,.-",
    shift: "ª!\"·$%&/()=?¿QWERTYUIOP^*ÇASDFGHJKLÑ¨ZXCVBNM;:_"
  },
  ru: {
    // ЙЦУКЕН (Russian)
    base:  "ё1234567890-=йцукенгшщзхъ\\фывапролджэячсмитьбю.",
    shift: "Ё!\"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,"
  }
};

// ---------- Pre/Post Process for Arabic Ligatures ----------
const arLigaturesToSymbols = {
  'لإ': 'T',
  'لأ': 'G',
  'لآ': 'B',
  'لا': 'b'
};

const arSymbolsToLigatures = {
  'T': 'لإ',
  'G': 'لأ',
  'B': 'لآ',
  'b': 'لا'
};

function preprocessArabic(text) {
  let res = text;
  for (let lig in arLigaturesToSymbols) {
    // Global replacement for ligatures to a single map character
    res = res.replace(new RegExp(lig, 'g'), arLigaturesToSymbols[lig]);
  }
  return res;
}

function postprocessArabic(text) {
  let res = text;
  for (let sym in arSymbolsToLigatures) {
    res = res.replace(new RegExp(sym, 'g'), arSymbolsToLigatures[sym]);
  }
  return res;
}


// ---------- Main Conversion Logic ----------
function convertBetweenLayouts(text, fromLang, toLang) {
  if (!text) return "";

  if (fromLang === 'ar') text = preprocessArabic(text);

  const fromLayout = layouts[fromLang] || layouts['en'];
  const toLayout = layouts[toLang] || layouts['en'];

  let result = '';

  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    let isShifted = false;
    let foundIndex = -1;

    // Search inside the base (unshifted) string
    foundIndex = fromLayout.base.indexOf(char);
    
    // If not found, search inside the shift (shifted/uppercase) string
    if (foundIndex === -1) {
      foundIndex = fromLayout.shift.indexOf(char);
      if (foundIndex !== -1) {
        isShifted = true;
      }
    }

    // If character exists in our physical keys map
    if (foundIndex !== -1) {
      let converted = isShifted ? toLayout.shift[foundIndex] : toLayout.base[foundIndex];
      result += converted;
    } else {
      // Unmapped characters (spaces, newlines, emojis) are left untouched
      result += char;
    }
  }

  // Restore the dynamic Arabic ligatures if target is Arabic
  if (toLang === 'ar') {
    result = postprocessArabic(result);
  }

  return result;
}