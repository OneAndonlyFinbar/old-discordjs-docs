import Link from 'next/link';

export default function Navbar(){
  return (
    <div className="navbar-container">
      <div className="navbar">
        <Link className="navbar-item-primary" href="/">discord.js</Link>
        <Link className="navbar-item" href="/docs/discord.js/main/general/welcome">Documentation</Link>
        <Link className="navbar-item" href="https://github.com/discordjs/discord.js" target="_blank">Github</Link>
      </div>
    </div>
  )
}