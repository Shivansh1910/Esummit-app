export interface IContactResponse {
    success: boolean;
    data: IContactData[];
}

export interface IContactData {
    name: string,
    email: string
    image: string,
    phone: string
}

export interface IFaqResponse {
    success: boolean;
    data: IFaqData[];
}

export interface IFaqData {
    question: string,
    answer: string
}

export interface IScheduleResponse {
    success: boolean;
    data: IScheduleData[];
}

export interface IScheduleData {
    name: string,
    file: string,
    description: string,
    id:number
}