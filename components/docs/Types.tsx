export default function Types({data}: {data: any}) {
  return (
    data.type && (
      <div className="my-2">
        <h1>Types</h1>
        <ul className="docs-contents-list">
          {data.type.map((type: any) => (
            <li key={type[0][0]}>{type[0][0]}</li>
          ))}
        </ul>
      </div>
    )
  );
}