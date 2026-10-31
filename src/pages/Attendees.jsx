import { useAttendees } from '../api/hooks';
import { useUI } from '../store/ui';
import { Async } from '../components/Async';
export default function Attendees() {
  const { q, setQ } = useUI();
  const res = useAttendees({ q: q || undefined });
  return (<><h1>Attendees</h1>
    <label className="field">Search by name<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Ada" /></label>
    <Async query={res} isEmpty={(d) => !d.length} empty={{ title: `No match for “${q}”`, hint: 'Check the spelling or clear the search.' }}>
      {(d) => <div className="table"><table><thead><tr><th>Name</th><th>Status</th></tr></thead>
        <tbody>{d.map((a) => <tr key={a.id}><td>{a.name}</td><td><span className={a.checkedInAt ? 'tag ok' : 'tag'}>{a.checkedInAt ? 'Checked in' : 'Waiting'}</span></td></tr>)}</tbody></table></div>}
    </Async></>);
}
