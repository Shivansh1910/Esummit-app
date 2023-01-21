import { useQuery } from 'react-query';
import {
  checkAccomodation,
  getTagsAndReminders,
  getTimetable,
  markAttendance,
  tagOfEvent,
} from '../../api/user';
import {
  ESUMMIT_ACCOMODATION,
  ESUMMIT_GET_TAGS_AND_REMINDERS,
  ESUMMIT_MARK_ATTENDANCE,
  ESUMMIT_TAG_OF_EVENT,
  ESUMMIT_TIMETABLE,
} from '../../contants/query-keys';
import {
  ICheckAccomodationResponse,
  IGetTagsAndReminder,
  IMarkAttendanceResponse,
  ITagOfEventResponse,
  ITimetableResponse,
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

export const useGetTimetableQuery = (email: string) => {
  return useQuery<ITimetableResponse, Error, ITimetableResponse>({
    queryKey: [ESUMMIT_TIMETABLE, email],
    queryFn: async () => getTimetable(email),
  });
};

export const usecheckAccomodationQuery = (email: string) => {
  return useQuery<
    ICheckAccomodationResponse,
    Error,
    ICheckAccomodationResponse
  >({
    queryKey: [ESUMMIT_ACCOMODATION, email],
    queryFn: async () => checkAccomodation(email),
  });
};
