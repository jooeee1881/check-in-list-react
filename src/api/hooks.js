import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './client';

// One key factory, one hook per endpoint. Pages never call axios directly.
export const keys = {
  events: ['events'],
  attendees: (f = {}) => ['attendees', f],
  reports: ['reports'],
};
export const useEvents = () => useQuery({ queryKey: keys.events, queryFn: () => api.get('/events').then((r) => r.data) });
export const useAttendees = (filters = {}) =>
  useQuery({ queryKey: keys.attendees(filters), queryFn: () => api.get('/attendees', { params: filters }).then((r) => r.data), placeholderData: (prev) => prev });
export const useReport = () =>
  useQuery({ queryKey: keys.reports, queryFn: () => api.get('/reports').then((r) => r.data), retry: false });

// Optimistic toggle: update every cached attendee list instantly, roll back on error.
export const useCheckIn = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.post(`/attendees/${id}/check-in`).then((r) => r.data),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['attendees'] });
      const snap = qc.getQueriesData({ queryKey: ['attendees'] });
      qc.setQueriesData({ queryKey: ['attendees'] }, (old) => old?.map((a) => (a.id === id ? { ...a, checkedInAt: a.checkedInAt ? null : Date.now() } : a)));
      return { snap };
    },
    onError: (_e, _id, ctx) => ctx?.snap.forEach(([k, v]) => qc.setQueryData(k, v)),
    onSettled: () => qc.invalidateQueries({ queryKey: ['attendees'] }),
  });
};
