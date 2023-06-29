import hljs from 'highlight.js/lib/core';
import { populateLinks } from '@/lib/utils/PopulateLinks';

export default function Constructor({ data, classes, typedefs, pkg, branch }: {
  data: any,
  classes: any,
  typedefs: any,
  pkg: string,
  branch: string
}) {
  return (
    data?.construct && (
      <div className="my-2">
        <h1>Constructor</h1>
        <pre className="docs-contents-code-block">
          <code dangerouslySetInnerHTML={{ __html: hljs.highlight(`new ${data.construct.name}(${data.construct.params.map((p: any) => p.name)})`, { language: 'javascript' }).value }}/>
        </pre>
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
          {data.construct.params.map((param: any) => (
            <tr key={param.name}>
              <td>{param.name}</td>
              <td dangerouslySetInnerHTML={{ __html: populateLinks(param.type[0].join('').replaceAll(',', ''), classes, typedefs, pkg, branch) }}></td>
              <td>{param?.optional ? 'Yes' : 'No'}</td>
              <td>{param?.default?.toString() || <i>none</i>}</td>
              <td dangerouslySetInnerHTML={{ __html: populateLinks(param.description || 'No description.', classes, typedefs, pkg, branch) }}></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )
  );
}