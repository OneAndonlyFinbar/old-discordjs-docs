import Link from 'next/link';
import { BsCodeSlash } from 'react-icons/bs';
import { populateLinks } from '@/lib/utils/PopulateLinks';

export default  function DetailedPropertiesList({ data, hiddenParamsVisible, classes, typedefs, pkg, branch }: {
  data: any,
  hiddenParamsVisible: boolean,
  classes: any,
  typedefs: any,
  pkg: string,
  branch: string
}) {
  return (
    data.props && (
        <div className="docs-contents-detailed-list my-2">
          <h1>Properties</h1>
          <div>
            {data.props.filter((property: any) => !hiddenParamsVisible || property.access !== 'private').sort((a: any, b: any) => a.name.localeCompare(b.name)).map((prop: any) => (
              <div key={prop.name} className="docs-contents-detailed-list-item" id={`property-${prop.name}`}>
                <div className="docs-contents-detailed-list-header">
                  <p>.{prop.name}</p>
                  {prop?.meta && (
                    <Link href={prop.meta?.url || `https://github.com/discordjs/${pkg}/tree/${branch}/${prop.meta.path}/${prop.meta.file}#L${prop.meta.line}`} target="_blank"><BsCodeSlash className="text-blue-400 cursor-pointer text-2xl mr-2"/></Link>
                  )}
                </div>
                <p className="docs-contents-detailed-list-description" dangerouslySetInnerHTML={{ __html: populateLinks(prop.description || 'No description', classes, typedefs, pkg, branch) }}></p>
                <p>
                  <strong>Type: </strong>{prop.nullable && '?'}<span dangerouslySetInnerHTML={{ __html: populateLinks(prop.type[0].join('').replaceAll(',', ''), classes, typedefs, pkg, branch) }}></span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )
  )
}