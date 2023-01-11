import { BASE_URL } from './base';

export const setReminder = async (id: string, email: string) => {
  try {
    const response = await fetch(`${BASE_URL}/setReminder/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        email: email,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const setTag = async (id: string, email: string, tag: string) => {
  try {
    const response = await fetch(`${BASE_URL}/setTag/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        email: email,
        tag: tag,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const getTagsAndReminders = async (email: string, id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/getTagAndReminder/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        id: id,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const createOtp = async (email: string) => {
  try {
    const response = await fetch(`${BASE_URL}/createOtp/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await fetch(`${BASE_URL}/verify/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const userDetail = async (email: string) => {
  try {
    const response = await fetch(`${BASE_URL}/userDetail/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const markAttendance = async (email: string) => {
  try {
    const response = await fetch(`${BASE_URL}/markAttendance/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};
