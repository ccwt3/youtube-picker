interface filterEttiquetes {
  id: string;
  content: string;
}

export function EttiquetesList({
  ettiquetes,
  selectedFilters = {},
}: {
  ettiquetes: filterEttiquetes[];
  selectedFilters?: Record<string, string>;
}) {
  const timeList = ettiquetes.map((et) => {
    return (
      <div key={et.id}>
        <input
          type="checkbox"
          id={et.id}
          name={et.id}
          className="mr-2"
          defaultChecked={selectedFilters[et.id] === "on"}
        />
        <label htmlFor={et.id}>{et.content}</label>
      </div>
    );
  });

  return <>{timeList}</>;
}
