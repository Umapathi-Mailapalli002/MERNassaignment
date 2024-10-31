import axios from "axios";

const USERS_API_BASE_URL = import.meta.env.VITE_REACT_APP_API_USERS_BASE_URL;
const TICKETS_API_BASE_URL = import.meta.env.VITE_REACT_APP_API_TICKETS_BASE_URL;
const NOTES_API_BASE_URL = import.meta.env.VITE_REACT_APP_API_NOTES_BASE_URL;

// All User URLs
const REGISTER_USER_URL = "/register";
const LOGIN_USER_URL = "/login";
const LOGOUT_USER_URL = "/logout";
const REFRESH_TOKEN_URL = "/refresh-token";
const CHANGE_PASSWORD_URL = "/change-password";
const CURRENT_USER_URL = "/current-user";
const UPDATE_ACCOUNT_URL = "/update-account";
const UPDATE_AVATAR_URL = "/avatar";

// Admin URLs
const GET_ALL_USERS_URL = "/all-users";
const CHANGE_USER_ROLE_URL = "/change-role";
const CREATE_USER_URL = "/create-user";
const UPDATE_USER_URL = "/update-user";
const DELETE_USER_URL = "/delete-user";

// Ticket URLs
const CREATE_TICKET_URL = "/create-ticket";
const GET_ALL_TICKETS_URL = "/all-tickets";
const GET_ALL_CUSTOMER_TICKETS_URL = "/customer-tickets";
const UPDATE_TICKET_STATUS_URL = "/status";
const GET_TICKET_URL = "/get-ticket";

// Note URLs
const CREATE_NOTE_URL = "/create-note";
const GET_ALL_NOTES_URL = "/all-notes";

// Helper function to configure headers with the JWT token
const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// User Methods
export const signup = async (userData) => {
  try {
    const res = await axios.post(`${USERS_API_BASE_URL}${REGISTER_USER_URL}`, userData);
    return res.data;
  } catch (error) {
    console.log("Error on user registration", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(`${USERS_API_BASE_URL}${LOGIN_USER_URL}`, credentials);
    return res.data;
  } catch (error) {
    console.log("Error on user login", error);
    throw error;
  }
};

export const logoutUser = async (token) => {
  try {
    const res = await axios.post(`${USERS_API_BASE_URL}${LOGOUT_USER_URL}`, {}, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on user logout", error);
    throw error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const res = await axios.post(`${USERS_API_BASE_URL}${REFRESH_TOKEN_URL}`);
    return res.data;
  } catch (error) {
    console.log("Error on refreshing access token", error);
    throw error;
  }
};

export const changePassword = async (token, passwordData) => {
  try {
    const res = await axios.patch(`${USERS_API_BASE_URL}${CHANGE_PASSWORD_URL}`, passwordData, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on changing password", error);
    throw error;
  }
};

export const getCurrentUser = async (token) => {
  try {
    const res = await axios.get(`${USERS_API_BASE_URL}${CURRENT_USER_URL}`, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on fetching current user", error);
    throw error;
  }
};

export const updateAccount = async (token, accountData) => {
  try {
    const res = await axios.patch(`${USERS_API_BASE_URL}${UPDATE_ACCOUNT_URL}`, accountData, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on updating account", error);
    throw error;
  }
};

export const updateAvatar = async (token, avatarData) => {
  try {
    const res = await axios.patch(`${USERS_API_BASE_URL}${UPDATE_AVATAR_URL}`, avatarData, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on updating avatar", error);
    throw error;
  }
};

// Admin Methods
export const getAllUsers = async (token) => {
  try {
    const res = await axios.get(`${USERS_API_BASE_URL}${GET_ALL_USERS_URL}`, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on fetching all users", error);
    throw error;
  }
};

export const changeUserRole = async (token, userId, roleData) => {
  try {
    const res = await axios.patch(`${USERS_API_BASE_URL}${CHANGE_USER_ROLE_URL}/${userId}`, roleData, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on changing user role", error);
    throw error;
  }
};

export const createUser = async (token, userData) => {
  try {
    const res = await axios.post(`${USERS_API_BASE_URL}${CREATE_USER_URL}`, userData, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on creating user", error);
    throw error;
  }
};

export const updateUser = async (token, userId, updateData) => {
  try {
    const res = await axios.patch(`${USERS_API_BASE_URL}${UPDATE_USER_URL}/${userId}`, updateData, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on updating user", error);
    throw error;
  }
};

export const deleteUser = async (token, userId) => {
  try {
    const res = await axios.delete(`${USERS_API_BASE_URL}${DELETE_USER_URL}/${userId}`, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on deleting user", error);
    throw error;
  }
};

// Ticket Methods
export const createTicket = async (token, ticketData) => {
  try {
    const res = await axios.post(`${TICKETS_API_BASE_URL}${CREATE_TICKET_URL}`, ticketData, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on creating ticket", error);
    throw error;
  }
};

export const getAllTickets = async (token) => {
  try {
    const res = await axios.get(`${TICKETS_API_BASE_URL}${GET_ALL_TICKETS_URL}`, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on fetching all tickets", error);
    throw error;
  }
};

// Method to fetch all tickets for a customer
export const getMyTickets = async (token) => {
  try {
    const res = await axios.get(`${TICKETS_API_BASE_URL}${GET_ALL_CUSTOMER_TICKETS_URL}`, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on fetching all customer tickets", error);
    throw error;
  }
};

// Method to fetch a specific ticket by ID
export const getTicketById = async (ticketId, token) => {
  try {
    const res = await axios.get(`${TICKETS_API_BASE_URL}${GET_TICKET_URL}/${ticketId}`, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on fetching the ticket", error);
    throw error;
  }
};

export const updateTicketStatus = async (token, ticketId, statusData) => {
  try {
    const res = await axios.patch(`${TICKETS_API_BASE_URL}/${ticketId}${UPDATE_TICKET_STATUS_URL}`, statusData, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on updating ticket status", error);
    throw error;
  }
};

// Note Methods
export const addNote = async (token, ticketId, noteData) => {
  try {
    const res = await axios.post(`${NOTES_API_BASE_URL}/${ticketId}${CREATE_NOTE_URL}`, noteData, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on adding note", error);
    throw error;
  }
};

export const getNotesForTicket = async (token, ticketId) => {
  try {
    const res = await axios.get(`${NOTES_API_BASE_URL}/${ticketId}${GET_ALL_NOTES_URL}`, authHeaders(token));
    return res.data;
  } catch (error) {
    console.log("Error on fetching notes for ticket", error);
    throw error;
  }
};
