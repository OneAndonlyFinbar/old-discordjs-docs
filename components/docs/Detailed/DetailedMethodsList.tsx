import Link from 'next/link';
import { BsCodeSlash } from 'react-icons/bs';
import { populateLinks } from '@/lib/utils/PopulateLinks';
import { flattenArray } from '@/lib/utils/FlattenArray';

export default function DetailedMethodsList({ data, hiddenParamsVisible, classes, typedefs, pkg, branch }: {
  data: any,
  hiddenParamsVisible: boolean,
  classes: any,
  typedefs: any,
  pkg: string,
  branch: string
}) {
  return (
    data.methods && (
      <div className="docs-contents-detailed-list my-2">
        <h1>Methods</h1>
        <div>
          {data.methods.filter((method: any) => !hiddenParamsVisible || method.access !== 'private').sort((a: any, b: any) => a.name.localeCompare(b.name)).map((method: any) => (
            <div key={method.name} className="docs-contents-detailed-list-item" id={`method-${method.name}`}>
              <div className="docs-contents-detailed-list-header">
                <p>.{method.name}</p>
                <Link href={method.meta?.url || `https://github.com/discordjs/${pkg}/tree/${branch}/${method.meta.path}/${method.meta.file}#L${method.meta.line}`} target="_blank"><BsCodeSlash className="text-blue-400 cursor-pointer text-2xl mr-2"/></Link>
              </div>
              <p className="docs-contents-detailed-list-description" dangerouslySetInnerHTML={{ __html: populateLinks(method.description || 'No description', classes, typedefs, pkg, branch) }}></p>
              {method.params && (
                <table className="docs-contents-table">
                  <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Type</th>
                    <th>Optional</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                  </thead>
                  <tbody>
                  {method.params.map((param: any) => (
                    <tr key={param.name}>
                      <td>{param.name}</td>
                      <td dangerouslySetInnerHTML={{ __html: populateLinks(param.type.map((t1: Array<string>) => flattenArray(t1).join('')).join(' or '), classes, typedefs, pkg, branch) }}></td>
                      <td>{param?.optional ? 'Yes' : 'No'}</td>
                      <td>{param?.default?.toString() || <i>none</i>}</td>
                      <td dangerouslySetInnerHTML={{ __html: populateLinks(param.description || 'No description', classes, typedefs, pkg, branch) }}></td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              )}
              {method.returns && (
                <p>
                  <strong>Returns: </strong><span dangerouslySetInnerHTML={{ __html: populateLinks((method.returns[0]?.types ? method.returns[0].types : method.returns[0][0]).join('').replaceAll(',', ''), classes, typedefs, pkg, branch) }}></span>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );
}