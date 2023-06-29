import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useState } from 'react';

export default function DocsNavbar({ activePkg, activeVersion, packages, versions }: { activePkg: string, activeVersion: string, packages: Array<string>, versions: Array<string> }) {
  const [pkg, setPkg] = useState<string>(activePkg || 'discord.js');

  return (
    <div className="docs-navbar-container">
      <div className="docs-navbar">
        <p>View docs for </p>
        <select className="docs-navbar-select" onChange={(e) => {
          setPkg(e.target.value);
          location.href = `/docs/${e.target.value}/${versions[0]}/general/welcome`;
        }} value={pkg}>
          {packages.map((pkg, i) => (
            <option key={i} value={pkg}>{pkg}</option>
          ))}
        </select>
        <p>on branch</p>
        <select className="docs-navbar-select" onChange={(e) => location.href = `/docs/${pkg}/${e.target.value}/general/welcome`} value={activeVersion}>
          {versions.map((version, i) => (
            <option key={i} value={version}>{version}</option>
          ))}
        </select>
        <FaMagnifyingGlass className="docs-navbar-icon"/>
      </div>
    </div>
  );
}