interface filterEttiquetes {
  id: string;
  content: string;
}

export function EttiquetesList({
  ettiquetes,
  selectedFilters,
  type,
}: {
  ettiquetes: filterEttiquetes[];
  selectedFilters?: string[];
  type: string;
}) {
  let val = "";

  if (type === "time") val = "timesnap[]";
  else if (type === "topic") val = "filter[]";

  const timeList = ettiquetes.map((et) => {
    return (
      <div key={et.id}>
        <input
          type="checkbox"
          id={et.id}
          name={val}
          value={et.id}
          className="mr-2"
          defaultChecked={selectedFilters?.includes(et.id) ?? false} //TODO
        />
        <label htmlFor={et.id}>{et.content}</label>
      </div>
    );
  });

  return <>{timeList}</>;
}
