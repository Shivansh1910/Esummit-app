import { useQuery } from 'react-query';
import { getTagsAndReminders } from '../../api/user';
import { ESUMMIT_GET_TAGS_AND_REMINDERS } from '../../contants/query-keys';
import { IGetTagsAndReminder } from '../../types/api/action.types';

export const useGetTagsAndReminder = (email: string, id: string) =>
  useQuery<IGetTagsAndReminder, Error, IGetTagsAndReminder>({
    queryKey: [ESUMMIT_GET_TAGS_AND_REMINDERS],
    queryFn: () => getTagsAndReminders(email, id),
  });
