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
  const val = type === "time" ? "timesnap[]" : "filter[]";

  const timeList = ettiquetes.map((et) => (
    <div key={et.id}>
      <input
        type="checkbox"
        id={et.id}
        name={val}
        value={et.id}
        className="peer sr-only"
        defaultChecked={selectedFilters?.includes(et.id) ?? false}
      />
      <label
        htmlFor={et.id}
        className="block cursor-pointer select-none border border-black px-4 py-2.5 text-center font-mono text-xs uppercase tracking-wide text-black transition-colors duration-150 hover:border-red-600 peer-checked:border-red-600 peer-checked:bg-red-600 peer-checked:text-white"
      >
        {et.content}
      </label>
    </div>
  ));

  return <>{timeList}</>;
}
