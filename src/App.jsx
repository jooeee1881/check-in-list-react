import { useUI } from './store/ui';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import CheckIn from './pages/CheckIn';
import Attendees from './pages/Attendees';
import Reports from './pages/Reports';

const pages = { dashboard: ['Dashboard', Dashboard], events: ['Events', Events], checkin: ['Check-in', CheckIn], attendees: ['Attendees', Attendees], reports: ['Reports', Reports] };
export default function App() {
  const { page, go } = useUI();
  const Page = pages[page][1];
  return (<div className="shell">
    <nav><b className="logo">Doorlist</b>{Object.entries(pages).map(([k, [label]]) => (
      <button key={k} aria-current={page === k ? 'page' : undefined} onClick={() => go(k)}>{label}</button>))}</nav>
    <main><Page /></main></div>);
}
