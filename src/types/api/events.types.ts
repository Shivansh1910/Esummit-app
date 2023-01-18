export interface IEventResponse {
  success: boolean;
  data: {
    highlights: IEventData[];
    other: IEventData[];
  };
}
export interface IEventNameResponse {
  success: boolean;
  data: { name: string }[];
}

export interface IEventByIdResponse {
  success: boolean;
  data: IEventData;
}

export interface IEventData {
  id: string;
  name: string;
  day: string;
  category: string;
  startTime: Date;
  endTime: Date;
  image: string;
  description: string;
  venue: string;
}
