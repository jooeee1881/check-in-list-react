import { useReport } from '../api/hooks';
import { Async } from '../components/Async';
export default function Reports() {
  const q = useReport();
  return (<><h1>Attendance report</h1>
    <Async query={q} isEmpty={(d) => !d.length} empty={{ title: 'Nothing to report', hint: 'Reports appear after your first event.' }}>
      {(d) => <ul className="list">{d.map((e) => { const pct = Math.round((e.checkedIn / e.total) * 100);
        return <li key={e.id} className="col"><div className="row"><strong>{e.name}</strong><span>{e.checkedIn}/{e.total} · {pct}%</span></div>
          <div className="bar"><i style={{ width: `${pct}%` }} /></div></li>; })}</ul>}
    </Async></>);
}
