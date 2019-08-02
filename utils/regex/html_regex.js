//expression for headers
var h1_i_1 = /\s#\s/g;
var h1_i_2 = /^#[ ]/g;
var h1_i_3 = /\s#$/g;
var h1_ii = /[ ][0-9a-z]{1,}\r?\n\=\=\=/i;
var h1 = /\s#\s|^#[ ]|\s#$/g;
var e= /\r?\n/g;

var h3i = /(^###|\s###) ((\w+?\s*\w*\.? *)+)\r?\n/gi; // regex for ###;
var h2i = /(^##|\s##) ((\w+?\s*\w*\.? *)+)\r?\n/gi; // regex for ##;
var h1i = /(^#|\s#) ((\w+?\s*\w*\.? *)+)\r?\n/gi; // regex for ##;

var quotz = /\"\"(.+)\"\"/gi;
var list = /(^\*|\s\*) (.+)/gi;
var order = /((<li>(.+)<\/li>\s*)+)/gi;
var emp = /\*\*(.+)\*\*/gi;

var str = `### Environment

**Brand:** All 
**Market:** All 
**Page:** Gallery

### Steps to reproduce
* Go to this page: https://www.gqmagazine.fr/style/galerie/voici-donc-les-6-sneakers-les-plus-cools-de-la-semaine
* Open Inspect
* Search for ""article-tag""
* Look at the KVPs being passed


inspect key value pairs being passed searching for ""article-tag"": 
https://www.gqmagazine.fr/style/galerie/voici-donc-les-6-sneakers-les-plus-cools-de-la-semaine

### Current behaviour
The article-tag KVP is not being passed on gallery pages.
* Look at the KVPs being passed
### Expected behaviour

The article-tag KVP should be passed as it is currently being passed on article pages (e.g https://www.gqmagazine.fr/style/article/voici-les-sneakers-rick-et-morty)

### What is affected by this bug
Ad campaigns targeting article tags on gallery pages cannot be targeted by DFP and are unable to deliver. `;

var result = str.replace(h3i,(match,first,header)=>{
    let unit = header.split(" ");
let id ="";
if (unit.length === 1)
    id = unit[0];
else {
    unit.forEach(element => {
        if (unit[0] === element) id+=element;
        else if (unit[unit.length - 1] === element) id+=element;
        else id+=`-${element}`;
    });
}
id = id.trim().replace(/\.|\?|[\(\)]/,"");
header = header.trim();
return `\n<h3 id="${id}">${header}</h3>\n`;
})
.replace(quotz,`&quot;"$1"&quot;`)
.replace(list,`<li>$2</li>\n`)
.replace(emp,`<strong>$1</strong>`)
.replace(order,`\n<ul>$1</ul>\n`)
 const arr = result.split(/r?\n/);
 arr.forEach((el,index,array)=>{
if(el.includes(`<strong>`))
    arr[index] = `<p>${el}</p>`
if(!el.includes(`</`) &&  el !==" " && el!=="" && el!=="\n")
    arr[index] = `<p>${el}</p>`
 });
  
 let finalResult = arr.join("\n");

 const htmlMarkUp = `<!DOCTYPE html>
 <html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    <head>
    <body>
        ${finalResult}
    </body>
 </html>
 `;

console.log(htmlMarkUp);
