import Link from 'next/link';

export default function DocsSidebar({ classes, category, subcategory, pkg, branch, typedefs, functions}: any) {
  return (
    <div className="docs-sidebar">
      <h1 className="docs-sidebar-header">Functions</h1>
      {functions && functions.sort((a: any, b: any) => a.name.localeCompare(b.name)).map((func: any) => (
        <Link className={`docs-sidebar-item${(category === 'function' && subcategory === func.name) ? ' docs-sidebar-item-selected' : ''}`} key={func.name} href={`/docs/${pkg}/${branch}/function/${func.name}`}>
          {func.name}
        </Link>
      ))}
      <h1 className="docs-sidebar-header">Classes</h1>
      {classes && classes.sort((a: any, b: any) => a.name.localeCompare(b.name)).map((cls: any) => (
        <Link className={`docs-sidebar-item${(category === 'class' && subcategory === cls.name) ? ' docs-sidebar-item-selected' : ''}`} key={cls.name} href={`/docs/${pkg}/${branch}/class/${cls.name}`}>
          {cls.name}
        </Link>
      ))}
      <h1 className="docs-sidebar-header">Typedefs</h1>
      {typedefs && typedefs.sort((a: any, b: any) => a.name.localeCompare(b.name)).map((typedef: any) => (
        <Link className={`docs-sidebar-item${(category === 'typedef' && subcategory === typedef.name) ? ' docs-sidebar-item-selected' : ''}`} key={typedef.name} href={`/docs/${pkg}/${branch}/typedef/${typedef.name}`}>
          {typedef.name}
        </Link>
      ))}
    </div>
  );
}