import { useEvents } from '../api/hooks';
import { Async } from '../components/Async';
export default function Events() {
  const q = useEvents();
  return (<><h1>Events</h1>
    <Async query={q} isEmpty={(d) => !d.length} empty={{ title: 'No events', hint: 'Events you create will appear here.' }}>
      {(d) => <div className="table"><table><thead><tr><th>Name</th><th>Venue</th><th>Date</th><th>Capacity</th></tr></thead>
        <tbody>{d.map((e) => <tr key={e.id}><td>{e.name}</td><td>{e.venue}</td><td>{e.date}</td><td>{e.capacity}</td></tr>)}</tbody></table></div>}
    </Async></>);
}
