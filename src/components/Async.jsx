// Single place that renders loading / error / empty / data for any query.
export function Async({ query, isEmpty, empty, skeletonRows = 4, children }) {
  if (query.isPending) return <div aria-busy="true">{Array.from({ length: skeletonRows }, (_, i) => <div className="skel" key={i} />)}</div>;
  if (query.isError) return (
    <div className="state" role="alert"><strong>Couldn’t load this data.</strong><p>{query.error.message}. Check your connection and try again.</p>
      <button className="btn" onClick={() => query.refetch()}>Try again</button></div>);
  if (isEmpty?.(query.data)) return <div className="state"><strong>{empty.title}</strong><p>{empty.hint}</p></div>;
  return children(query.data);
}
