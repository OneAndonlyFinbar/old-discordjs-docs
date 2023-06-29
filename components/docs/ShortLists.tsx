export default function ShortLists({ data, hiddenParamsVisible }: { data: any, hiddenParamsVisible: boolean }) {
  return (
    <div className="docs-contents-shortlist-container">
      {data.props && (
        <div className="docs-contents-shortlist">
          <h2>Properties</h2>
          <div>
            {data.props.filter((property: {
              access: string
            }) => !hiddenParamsVisible || property.access !== 'private').sort((a: { name: string }, b: {
              name: string
            }) => a.name.localeCompare(b.name)).map((prop: { name: string }) => (
              <a href={`#property-${prop.name}`} key={prop.name} className="docs-contents-shortlist-item text-black">{prop.name}</a>
            ))}
          </div>
        </div>
      )}
      {data.methods && (
        <div className="docs-contents-shortlist">
          <h2>Methods</h2>
          <div>
            {data.methods.filter((method: {
              access: string
            }) => !hiddenParamsVisible || method.access !== 'private').sort((a: { name: string }, b: {
              name: string
            }) => a.name.localeCompare(b.name)).map((method: { name: string }) => (
              <a href={`#method-${method.name}`} key={method.name} className="docs-contents-shortlist-item text-black">{method.name}</a>
            ))}
          </div>
        </div>
      )}
      {data.events && (
        <div className="docs-contents-shortlist">
          <h2>Events</h2>
          <div>
            {data.events.sort((a: { name: string }, b: {
              name: string
            }) => a.name.localeCompare(b.name)).map((event: { name: string }) => (
              <a href={`#event-${event.name}`} key={event.name} className="docs-contents-shortlist-item text-black">{event.name}</a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}