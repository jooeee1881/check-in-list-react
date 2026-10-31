# Data & state pattern (applies to every page)
1. **Server data → TanStack Query.** All endpoints are wrapped once in `src/api/hooks.js` (key factory + one hook each). Pages never import axios.
2. **UI state → Zustand** (`src/store/ui.js`): navigation, filters, selections. Never store fetched data in Zustand.
3. **Mutations** use optimistic updates with rollback (`useCheckIn`) and invalidate on settle.
4. **Every page renders through `<Async>`**: loading skeleton, error + retry, empty state, data.
5. **Migration order per page:** replace `useEffect+axios` with a hook → move local filters to the store → wrap in `<Async>` → one PR.
