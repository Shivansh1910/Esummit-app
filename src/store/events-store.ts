import create, { StateCreator } from 'zustand';
import { IEventData } from '../types/api/events.types';

interface IEventStates {
  highlights: IEventData[];
  onGoing: IEventData[];
  upcoming: IEventData[];
  completed: IEventData[];
}

interface IEventMethods {
  setHighlights: (highlights: IEventData[]) => void;
  setOnGoing: (data: IEventData[]) => void;
  setUpcoming: (data: IEventData[]) => void;
  setCompleted: (data: IEventData[]) => void;
  reset: () => void;
}

interface IEventStore extends IEventStates, IEventMethods {}

const store: StateCreator<IEventStore> = set => ({
  highlights: [],
  onGoing: [],
  upcoming: [],
  completed: [],
  setHighlights: (highlights: IEventData[]) => {
    set(state => ({
      highlights: [...new Map(highlights.map(item => [item.id, item])).values()],
    }));
  },
  setOnGoing: (data: IEventData[]) => {
    set(state => ({
      onGoing: [...new Map(data.map(item => [item.id, item])).values()],
    }));
  },
  setUpcoming: (data: IEventData[]) => {
    set(state => ({
      upcoming: [...new Map(data.map(item => [item.id, item])).values()],
    }));
  },
  setCompleted: (data: IEventData[]) => {
    set(state => ({
      completed: [...new Map(data.map(item => [item.id, item])).values()],
    }));
  },
  reset: () =>
    set({
      highlights: [],
      onGoing: [],
      upcoming: [],
      completed: [],
    }),
});

export const useEventStore = create<IEventStore>(store);
