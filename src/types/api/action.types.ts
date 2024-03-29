import { IEventData } from './events.types';

export interface ISetReminderResponse {
  success: boolean;
  data: {
    email: string;
    event: IEventData;
  };
}

export interface ISetTagResponse {
  success: boolean;
  data: {
    email: string;
    event: IEventData;
    tag: string;
  };
}

export interface ITagOfEventResponse {
  success: boolean;
  data: {
    email: string;
    event: IEventData;
    tag: string;
  };
}
export interface ITimetableResponse {
  success: boolean;
  data: {
    email: string;
    event: IEventData;
    tag: string;
  }[];
}

export interface ICheckAccomodationResponse {
  success: boolean;
  data: {
    room: string;
    isHospitalityKitCollected: boolean;
    isAccomodationBooked: boolean;
  };
}

export interface IGetTagsAndReminder {
  success: boolean;
  data: {
    reminders: boolean;
    tag: string;
  };
}

export interface ICreateOtpResponse {
  success: boolean;
  data: {
    otp: string;
  };
}

export interface IVerifyOtpResponse {
  success: boolean;
  data: {
    user: {
      name: string;
      email: string;
      pass_name: string;
    };
    isGuest: boolean;
    error: string;
  };
}

export interface IMarkAttendanceResponse {
  success: boolean;
  data: {
    id: string;
    isKitCollected: boolean;
    email: string;
    isRegistered: boolean;
    pass_name: string;
  };
}

export interface IKitResponse {
  success: boolean;
  data: {
    email: string;
    isKitCollected: boolean;
  };
}

export interface ErrorResponse {
  success: boolean;
  error: any;
}
