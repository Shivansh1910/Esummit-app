import { useQuery } from 'react-query';
import {
  getTagsAndReminders,
  markAttendance,
  tagOfEvent,
} from '../../api/user';
import {
  ESUMMIT_GET_TAGS_AND_REMINDERS,
  ESUMMIT_MARK_ATTENDANCE,
  ESUMMIT_TAG_OF_EVENT,
} from '../../contants/query-keys';
import {
  IGetTagsAndReminder,
  IMarkAttendanceResponse,
  ITagOfEventResponse,
} from '../../types/api/action.types';

export const useGetTagsAndReminder = (email: string, id: string) =>
  useQuery<IGetTagsAndReminder, Error, IGetTagsAndReminder>({
    queryKey: [ESUMMIT_GET_TAGS_AND_REMINDERS],
    queryFn: () => getTagsAndReminders(email, id),
  });

export const useMarkAttendaceQuery = (email: string) => {
  return useQuery<IMarkAttendanceResponse, Error, IMarkAttendanceResponse>({
    queryKey: [ESUMMIT_MARK_ATTENDANCE, email],
    queryFn: async () => markAttendance(email),
  });
};

export const useTagOfEventQuery = (email: string, event: string) => {
  return useQuery<ITagOfEventResponse, Error, ITagOfEventResponse>({
    queryKey: [ESUMMIT_TAG_OF_EVENT, event, email],
    queryFn: async () => tagOfEvent(email, event),
  });
};
