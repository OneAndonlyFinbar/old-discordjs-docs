import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

export default function Infos() {
  const exampleCode = `
  const { Client } = require('discord.js');
  const client = new Client({ intents: [] });
  
  client.on('ready', () => {
    console.log(\`Logged in as $\{client.user.tag\}!\`);
  });
  
  client.login('token');
  `;
  return (
    <div className="infos-container">
      <div className="info">
        <p className="info-title">About</p>
        <p className="info-contents">
          discord.js is a powerful node.js module that allows you to interact with the Discord API very easily. It
          takes a much more object-oriented approach than most other JS Discord libraries, making your bot's code
          significantly tidier and easier to comprehend.
        </p>
        <p className="info-contents">
          Usability, consistency, and performance are key focuses of discord.js, and it also has nearly 100% coverage
          of the Discord API. It receives new Discord features shortly after they arrive in the API.
        </p>
      </div>
      <div className="info">
        <p className="info-title">Example</p>
        <pre>
            <code dangerouslySetInnerHTML={{ __html: hljs.highlight(exampleCode, { language: 'javascript' }).value }}/>
          </pre>
      </div>
      <div className="info">
        <p className="info-title">Why?</p>
        <ul className="info-list">
          <li>Object Oriented</li>
          <li>Speedy and efficient</li>
          <li>Feature rich</li>
          <li>Flexible</li>
          <li>100% Promise Based</li>
        </ul>
      </div>
      <div className="info">
        <p className="info-title">Statistics</p>
        <ul className="info-list">
          <li>4,538,227 downloads</li>
          <li>4,961 stars</li>
          <li>100 contributors</li>
        </ul>
      </div>
    </div>
  );
}