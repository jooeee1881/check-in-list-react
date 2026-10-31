import { useEvents, useAttendees } from '../api/hooks';
import { useUI } from '../store/ui';
import { Async } from '../components/Async';

export default function Dashboard() {
  const events = useEvents(), people = useAttendees();
  const go = useUI((s) => s.go), setEvent = useUI((s) => s.setEvent);
  return (<>
    <h1>Today at the door</h1>
    <Async query={people} isEmpty={(d) => !d.length} empty={{ title: 'No attendees yet', hint: 'Import a guest list to start checking people in.' }}>
      {(d) => { const done = d.filter((a) => a.checkedInAt).length; const pct = Math.round((done / d.length) * 100);
        return <section className="hero"><div className="big">{done}<span> / {d.length}</span></div><p>checked in across all events</p>
          <div className="bar"><i style={{ width: `${pct}%` }} /></div></section>; }}
    </Async>
    <h2>Upcoming events</h2>
    <Async query={events} isEmpty={(d) => !d.length} empty={{ title: 'No events scheduled', hint: 'Create an event to open check-in.' }}>
      {(d) => <ul className="list">{d.map((e) => (
        <li key={e.id}><div><strong>{e.name}</strong><small>{e.venue} · {e.date}</small></div>
          <button className="btn" onClick={() => { setEvent(e.id); go('checkin'); }}>Open check-in</button></li>))}</ul>}
    </Async>
  </>);
}
