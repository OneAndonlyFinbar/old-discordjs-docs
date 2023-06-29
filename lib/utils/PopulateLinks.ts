const md = require('markdown-it')({
  html: true
});

export function populateLinks(text: string, classes: Array<{ name: string }>, typeDefinitions: Array<{name: string}>, pkg: string, branch: string): string {
  let output: string = text;

  output = md.renderInline(text);

  classes = classes.sort((a, b) => b.name.length - a.name.length);
  typeDefinitions = typeDefinitions.sort((a, b) => b.name.length - a.name.length);
  const jsTypes = ['string', 'number', 'boolean', 'object', 'array', 'function', 'null', 'undefined', 'NaN', 'symbol', 'bigint', 'Date', 'Array', 'Map', 'Error'];
  const words = text.split(' ').sort((a, b) => b.length - a.length);
  for (let word of words) {
    if(jsTypes.includes(word)){
      output = output.replace(word, `<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${word}" className="populated-link" target="_blank">${word}</a>`);
      continue;
    }

    const typeMatch = typeDefinitions.find(type => type.name === word);
    const classMatch = classes.find(cls => cls.name === word);

    if (typeMatch) {
      output = output.replace(word, `<a href="/docs/${pkg}/${branch}/typedef/${word}" className="populated-link">${word}</a>`);
      continue;
    }

    if (classMatch) {
      output = output.replace(word, `<a href="/docs/${pkg}/${branch}/class/${word}" className="populated-link">${word}</a>`);
      continue;
    }
  }

  const linkMatches = text.match(/{@link ([^}]+)}/g);
  if (linkMatches) {
    for (let match of linkMatches) {
      let name = match.replace('{@link ', '').replace('}', '');
      let isClass = classes.find(cls => cls.name === name);
      let property = name.split('.')[1];

      if(name.startsWith('http')){
        const [url, ...text] = name.split(' ');
        output = output.replace(match, `<a href="${url}" className="populated-link" target="_blank">${text.join(' ')}</a>`);
        continue;
      }

      if(property) name = `${name.split('.')[0]}#property-${property}`;

      const link = `<a href="/docs/${pkg}/${branch}/${isClass ? "class" : "typedef"}/${name}" className="populated-link">${name.split('#')[0]}${property ? `.${property}` : ''}</a>`;
      output = output.replace(match, link);
    }

    return output;
  }

  /*const matches = text.match(/{@link ([^}]+)}/g);
  if (matches) {
    for (let match of matches) {
      let name = match.replace('{@link ', '').replace('}', '');
      let isClass = classes.find(cls => cls.name === name);
      let property = name.split('.')[1];

      if(name.startsWith('http')){
        const [url, ...text] = name.split(' ');
        output = output.replace(match, `<a href="${url}" className="populated-link" target="_blank">${text.join(' ')}</a>`);
        continue;
      }

      if(property) name = `${name.split('.')[0]}#property-${property}`;

      const link = `<a href="/docs/${pkg}/${branch}/${isClass ? "class" : "typedef"}/${name}" className="populated-link">${name.split('#')[0]}${property ? `.${property}` : ''}</a>`;
      output = output.replace(match, link);
    }

    return output;
  }

  const classExactMatch = classes.find(cls => cls.name === text);
  if (classExactMatch)
    return `<a href="/docs/${pkg}/${branch}/class/${text}" className="populated-link">${text}</a>`;

  const typeExactMatch = typeDefinitions.find(type => type.name === text);
  if (typeExactMatch)
    return `<a href="/docs/${pkg}/${branch}/typedef/${text}" className="populated-link">${text}</a>`;

  const words = text.split(' ').sort((a, b) => b.length - a.length);
  for (let word of words) {
    const match = classes.find(cls => cls.name === word);
    if (match) {
      output = output.replace(word, `<a href="${word}" className="populated-link">${word}</a>`);
      break;
    }

    const typeMatch = typeDefinitions.find(type => type.name === word);
    if (typeMatch) {
      output = output.replace(word, `<a href="${word}" className="populated-link">${word}</a>`);
      break;
    }
  }

  const genericMatch = text.match(/<(.+)>/g);
  if (genericMatch) {
    for (let match of genericMatch) {
      const text = match.replace('<', '').replace('>', '');

      const matchClass = classes.find(cls => cls.name === text);
      if (matchClass) {
        output = output.replace(match, `<a href="${text}" className="populated-link">${matchClass.name}</a>`);
        continue;
      }

      const matchType = typeDefinitions.find(type => type.name === text);
      if (matchType) {
        output = output.replace(matchType.name, `<a href="${text}" className="populated-link">${matchType.name}</a>`);
      }
    }
  }

  const jsTypes = ['string', 'number', 'boolean', 'object', 'array', 'function', 'null', 'undefined', 'NaN', 'symbol', 'bigint', 'Date', 'Array', 'Map', 'Error'];
  for (let type of jsTypes) {
    const match = text.includes(type);
    if (match)
      output = output.replace(type, `<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${type}" className="populated-link" target="_blank">${type}</a>`);
  }*/

  return output;
}