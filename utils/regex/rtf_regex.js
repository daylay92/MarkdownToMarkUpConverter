export default class RtfRegex {
  constructor() {
    //Headers

    //h1 # text
    this.h1_i = /^# (.+)/gi;

    // h1 text
    //   =====
    this.h1_ii = /^===+$\s?/gi;

    //h1 # text #
    this.h1_iii = /^# (.+?) #\s?$/gi;

    //h2 # text
    this.h2_i = /^(##) (.+)/gi;

    // h2 text
    //   ------
    this.h2_ii = /^---+$\s?/gi;

    //h2 # text #
    this.h2_iii = /^(##) (.+?) (##)\s?$/gi;

    //h3 # text
    this.h3_i = /^(###) (.+)/gi;

    //h2 # text #
    this.h3_ii = /^(###) (.+?) (###)\s?$/gi;

    //listItem - text
    this.listItem = /^(- )/;

    //Strong **text**
    this.strong = /\*\*(([^*])+)\*\*(?!(\w|\d|\*))/gi;

    // Emphasis *text*
    this.emphasis = /\*(([^*])+)\*(?!(\w|\d|\*))/gi;

    // Del ~~text~~
    this.del = /~~(([^~])+)~~(?!(\w|\d|~))/gi;

    // Code inline `text`
    this.codeInline = /\`(([^`])+)\`(?!(\w|\d|\`))/gi;

    //link [text](text)
    this.linkOne = /\[(.+?)\]\((.+?)\)(?!(\w|\d))/gi;
    this.linkTwo = /!\[(.+?)\]\((.+?)\)(?!(\w|\d))/gi;

    //blockquote > [text]
    this.singleBlockQuote = /^(> )/;

    //code standalone ``` text ```
    this.code = /^\`\`\`\s?$/gi;
  }

  sortAndReform(str) {
    const strArr = str.split(`\n`);
    strArr.forEach((el, index) => {
      let headerFinder = "";
      let newValue = el.includes("!")
        ? el.replace(this.linkTwo, `!$2!`)
        : el.replace(this.linkOne, `[$1|$2]`);
      newValue = newValue
        .replace(this.h1_iii, `h1. $1`)
        .replace(this.h1_i, `h1. $1`)
        .replace(this.h2_iii, `h2. $2`)
        .replace(this.h2_i, `h2. $2`)
        .replace(this.h3_ii, `h3. $2`)
        .replace(this.h3_i, `h3. $2`)
        .replace(this.listItem, `* `)
        .replace(this.emphasis, `_$1_`)
        .replace(this.strong, `*$1*`)
        .replace(this.del, `-$1-`)
        .replace(this.codeInline, `{{$1}}`)
        .replace(this.singleBlockQuote, `{quote}`);
      strArr[index] = newValue;
      //Special cases for h1 and h2
      if (this.h1_ii.test(el) && index !== 0) {
        headerFinder = strArr[index - 1];
        headerFinder = `h1. ${headerFinder}`;
        strArr[index - 1] = headerFinder;
        strArr[index] = "";
      }
      if (this.h2_ii.test(el) && index !== 0) {
        headerFinder = strArr[index - 1];
        headerFinder = `h2. ${headerFinder}`;
        strArr[index - 1] = headerFinder;
        strArr[index] = "";
      }
    });

    return strArr;
  }

  codeBlockReform(strArr) {
    const codeBlockStartArr = [];
    const codeBlockEndArr = [];
    const codeBegins = /(?:^\`\`\`)(.+)$/gi;
    const codeEnds = /^\`\`\`$/gi;
    strArr.forEach((el, index) => {
      if (codeBegins.test(el)) codeBlockStartArr.push(index);
      if (codeEnds.test(el)) codeBlockEndArr.push(index);
    });
    if (codeBlockStartArr.length !== codeBlockEndArr.length) return strArr;
    if (!codeBlockStartArr.length) return strArr;
    codeBlockStartArr.forEach((el, index) => {
      let newValue = strArr[el].replace(
        codeBegins,
        `{code:language=$1|borderStyle=solid|theme=RDark|linenumbers=true|collapse=false}`
      );
      strArr[codeBlockEndArr[index]] = `{code}`;
      let k = el + 1;
      let z = codeBlockEndArr[index] + 1;
      for (let x = k; x < z; x++) {
        newValue += `\n${strArr[x]}`;
      }
      strArr[el] = newValue;
      for (let x = k; x < z; x++) {
        strArr[x] = "";
      }
    });
    return strArr;
  }

  codeBlocksWithoutLang(strArr) {
    const codeBlockArr = [];
    strArr.forEach((el, index, arr) => {
      if (this.code.test(el)) {
        codeBlockArr.push(index);
      }
    });
    if (codeBlockArr.length % 2 !== 0) return strArr;
    if (!codeBlockArr.length) return strArr;
    codeBlockArr.forEach((el, index) => {
      if (index % 2 === 0 || index === 0) {
        let newValue = `{code:borderStyle=solid|theme=RDark|linenumbers=true|collapse=false}`;
        strArr[codeBlockArr[index + 1]] = `{code}`;
        let k = el + 1;
        let z = codeBlockArr[index + 1] + 1;
        for (let x = k; x < z; x++) {
          newValue += `\n${strArr[x]}`;
        }
        strArr[el] = newValue;
        for (let x = k; x < z; x++) {
          strArr[x] = "";
        }
      }
    });
    return strArr;
  }

  computeResult(str) {
    const rtf = new RtfRegex();
    const arr = rtf.sortAndReform(str);
    const arrReform = rtf.codeBlockReform(arr);
    const arrFinal = rtf.codeBlocksWithoutLang(arrReform);
    const arrValue = arrFinal.filter(value => {
      return value !== "";
    });
    const richTextValue = arrValue.join("\n");
    return richTextValue;
  }
}
