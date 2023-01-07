import { useQuery } from 'react-query';
import { getEvent, getEventById } from '../../api/events';
import { ESUMMIT_EVENTS } from '../../contants/query-keys';
import {
  IEventByIdResponse,
  IEventResponse,
} from '../../types/api/events.types';

export const useEvent = () =>
  useQuery<IEventResponse, Error, IEventResponse>({
    queryKey: [ESUMMIT_EVENTS],
    queryFn: () => getEvent(),
    refetchInterval: 1000 * 60 * 2,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

export const useEventById = (id: string) =>
  useQuery<IEventByIdResponse, Error, IEventByIdResponse>({
    queryKey: [ESUMMIT_EVENTS, id],
    queryFn: () => getEventById(id),
  });
