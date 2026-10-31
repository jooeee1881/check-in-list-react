import axios from 'axios';
// Mock adapter: delete `adapter` below and set baseURL to point the same hooks at the real API.
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const first = ['Ada','Mert','Lena','Omar','Zeynep','Ravi','Sofia','Kenji','Aylin','Tomas'];
const last = ['Kaya','Okafor','Berg','Sato','Demir','Rossi','Patel','Novak'];
const events = [
  { id: 1, name: 'Freshman orientation', venue: 'Main hall', date: '2026-11-03', capacity: 40 },
  { id: 2, name: 'Council briefing', venue: 'Room 204', date: '2026-11-05', capacity: 20 },
  { id: 3, name: 'Season opener', venue: 'North gate', date: '2026-11-08', capacity: 60 },
  { id: 4, name: 'Career fair', venue: 'Atrium', date: '2026-11-12', capacity: 30 },
];
const attendees = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1, name: `${first[i % 10]} ${last[(i * 3) % 8]}`, eventId: (i % 4) + 1,
  checkedInAt: i % 3 === 0 ? Date.now() - i * 60000 : null,
}));
let reportCalls = 0;
const json = (config, data, status = 200) => ({ data, status, statusText: 'OK', headers: {}, config });
const fail = (config, status) => Promise.reject(Object.assign(new Error(`Request failed (${status})`), { config, response: json(config, {}, status) }));

export const api = axios.create({
  baseURL: '/api',
  adapter: async (config) => {
    await wait(500);
    const url = config.url, m = config.method;
    if (m === 'get' && url === '/events') return json(config, events);
    if (m === 'get' && url === '/attendees') {
      const { eventId, q } = config.params ?? {};
      return json(config, attendees.filter((a) => (!eventId || a.eventId === eventId) && (!q || a.name.toLowerCase().includes(q.toLowerCase()))));
    }
    const ci = url.match(/^\/attendees\/(\d+)\/check-in$/);
    if (m === 'post' && ci) {
      const a = attendees.find((x) => x.id === +ci[1]);
      a.checkedInAt = a.checkedInAt ? null : Date.now();
      return json(config, a);
    }
    if (m === 'get' && url === '/reports') {
      if (reportCalls++ === 0) return fail(config, 500); // first call fails to demo the error state
      return json(config, events.map((e) => ({ ...e, checkedIn: attendees.filter((a) => a.eventId === e.id && a.checkedInAt).length, total: attendees.filter((a) => a.eventId === e.id).length })));
    }
    return fail(config, 404);
  },
});
