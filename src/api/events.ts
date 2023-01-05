import {BASE_URL} from './base';

export const getEvent = async () =>{
    try{
        const response = await fetch(`${BASE_URL}/getEvents/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }
    catch(err){
        return {
            success: false,
            error: err,
        }
    }
}

export const getEventById = async (id: string) =>{
    try{
        const response = await fetch(`${BASE_URL}/event/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }
    catch(err){
        return {
            success: false,
            error: err,
        }
    }
}