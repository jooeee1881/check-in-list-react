import { useAttendees, useCheckIn, useEvents } from '../api/hooks';
import { useUI } from '../store/ui';
import { Async } from '../components/Async';

export default function CheckIn() {
  const { eventId, setEvent } = useUI();
  const events = useEvents(), people = useAttendees({ eventId: eventId ?? undefined }), toggle = useCheckIn();
  return (<><h1>Check-in</h1>
    <label className="field">Event
      <select value={eventId ?? ''} onChange={(e) => setEvent(e.target.value ? +e.target.value : null)}>
        <option value="">All events</option>{events.data?.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}</select></label>
    {toggle.isError && <p className="inline-error" role="alert">That check-in didn’t save. It was undone — try again.</p>}
    <Async query={people} isEmpty={(d) => !d.length} empty={{ title: 'No one on this list', hint: 'Pick another event or add guests.' }} skeletonRows={6}>
      {(d) => <ul className="list">{d.map((a) => (
        <li key={a.id}><div><strong>{a.name}</strong><small>{a.checkedInAt ? 'Checked in' : 'Not arrived'}</small></div>
          <button className={a.checkedInAt ? 'btn done' : 'btn primary'} onClick={() => toggle.mutate(a.id)}>{a.checkedInAt ? 'Undo' : 'Check in'}</button></li>))}</ul>}
    </Async></>);
}
