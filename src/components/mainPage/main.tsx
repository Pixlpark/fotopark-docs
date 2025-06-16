import Link from '@docusaurus/Link';
import categories from './categories.json'

export default function Main() {
  const listItems = categories.map((category) =>
    <li className='section col col--4 margin-bottom--lg'>
      <Link to={'category/' + category?.title} className="section-link card padding--md cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module">
        <h2 className="section-title text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module"><span>📄️</span>{category?.title}</h2>
        <div className="section-description cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module">{category?.description}</div>
      </Link>
    </li>
  );
  return (
    <div className='main'>
      <ul className="sections row">{listItems}</ul>
    </div>
  );
}

