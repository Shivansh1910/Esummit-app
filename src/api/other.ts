import {BASE_URL} from './base';

export const getContact = async () =>{
    try{
        const response = await fetch(`${BASE_URL}/contact/`, {
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

export const getFaq = async () =>{
    try{
        const response = await fetch(`${BASE_URL}/faq/`, {
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

export const getSchedule = async () =>{
    try{
        const response = await fetch(`${BASE_URL}/schedule/`, {
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

export const getSponsors = async () =>{
    try{
        const response = await fetch(`${BASE_URL}/sponsors/`, {
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