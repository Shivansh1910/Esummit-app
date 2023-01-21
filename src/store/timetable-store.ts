import create, { StateCreator } from 'zustand';
import { IEventData } from '../types/api/events.types';

type TTags = 'interested' | 'going' | 'notgoing' | '';

interface ITimetable {
  id: string;
  title: string;
  venue: string;
  startDate: Date;
  endDate: Date;
  category: string;
  tag: string;
}

interface ITimetableStates {
  timetable: ITimetable[];
}

interface ITimetableMethods {
  reset: () => void;
  setTimetable: (data: IEventData, tag: string) => void;
}

interface ITimetableStore extends ITimetableStates, ITimetableMethods {}

const store: StateCreator<ITimetableStore> = set => ({
  timetable: [],
  reset: () => set({ timetable: [] }),
  setTimetable: (data: IEventData, tag: string) => {
    set(state => ({
      timetable: [
        ...state.timetable.filter(item => item.id !== data.id),
        {
          title: data.name,
          venue: data.venue,
          startDate: data.startTime,
          endDate: data.endTime,
          category: data.category,
          id: data.id,
          tag: tag,
        },
      ],
    }));
  },
});

export const useTimetableStore = create<ITimetableStore>(store);
