import Link from 'next/link';
import { BsCodeSlash } from 'react-icons/bs';
import { populateLinks } from '@/lib/utils/PopulateLinks';
import { flattenArray } from '@/lib/utils/FlattenArray';

export default function DetailedEventsList({ data, hiddenParamsVisible, classes, typedefs, pkg, branch }: {
  data: any,
  hiddenParamsVisible: boolean,
  classes: any,
  typedefs: any,
  pkg: string,
  branch: string
}) {
  return (
    data.events && (
      <div className="docs-contents-detailed-list my-2">
        <h1>Events</h1>
        <div>
          {data.events.sort((a: any, b: any) => a.name.localeCompare(b.name)).map((event: any) => (
            <div key={event.name} className="docs-contents-detailed-list-item" id={`event-${event.name}`}>
              <div className="docs-contents-detailed-list-header">
                <p>.{event.name}</p>
                <Link href={event.meta?.url || `https://github.com/discordjs/${pkg}/tree/${branch}/${event.meta.path}/${event.meta.file}#L${event.meta.line}`} target="_blank"><BsCodeSlash className="text-blue-400 cursor-pointer text-2xl mr-2"/></Link>
              </div>
              <p className="docs-contents-detailed-list-description" dangerouslySetInnerHTML={{ __html: populateLinks(event.description || 'No description', classes, typedefs, pkg, branch) }}></p>
              {event.params && (
                <table className="docs-contents-table">
                  <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                  </thead>
                  <tbody>
                  {event.params.map((param: any) => (
                    <tr key={param.name}>
                      <td>{param.name}</td>
                      <td dangerouslySetInnerHTML={{ __html: populateLinks(param.type.map((t1: Array<string>) => flattenArray(t1).join('')).join(' or '), classes, typedefs, pkg, branch) }}></td>
                      <td dangerouslySetInnerHTML={{ __html: populateLinks(param.description || 'No description.', classes, typedefs, pkg, branch) }}></td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  )
}