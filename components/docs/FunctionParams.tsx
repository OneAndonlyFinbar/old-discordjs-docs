import { populateLinks } from '@/lib/utils/PopulateLinks';
import { flattenArray } from '@/lib/utils/FlattenArray';

export default function FunctionParams({ data, classes, typedefs, pkg, branch }: {
  data: any,
  classes: any,
  typedefs: any,
  pkg: string,
  branch: string
}) {
  return (
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
      {data.params.map((param: any) => (
        <tr key={param.name}>
          <td>{param.name}</td>
          <td dangerouslySetInnerHTML={{ __html: populateLinks(param.type.map((t1: Array<string>) => flattenArray(t1).join('')).join(' or '), classes, typedefs, pkg, branch) }}></td>
          <td>{param?.optional ? 'Yes' : 'No'}</td>
          <td>{param?.default?.toString() || <i>none</i>}</td>
          <td dangerouslySetInnerHTML={{ __html: populateLinks(param.description || 'No description.', classes, typedefs, pkg, branch) }}></td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}