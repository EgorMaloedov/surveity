import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiAuthenticate, apiLogin, apiRegister } from '../../api/authorization.js';
import {jwtDecode} from 'jwt-decode';
import { AxiosError } from 'axios';

/**
 * @typedef {Object} User
 * @property {string} id - User ID.
 * @property {string} email - User email.
 */

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const accessToken = ref(null);
    const isAuthenticated = ref(false);
    const authError = ref(null);

    /**
     * Function to log in a user.
     * @param {string} email - User's email.
     * @param {string} password - User's password.
     * @returns {Promise<void>}
     */
    const login = async (email, password) => {
        try {
            const response = await apiLogin(email, password);
            console.log(response)
            authenticateUser(response.token || '');
        } catch (error) {
            authError.value = error;
            throw error;
        }
    };

    /**
     * Function to log out a user.
     */
    const logout = () => {
        user.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem('accessToken');
        accessToken.value = '';
    };

    /**
     * Function to clear the authentication error.
     */
    const clearError = () => {
        authError.value = null;
    };

    /**
     * Function to register a user.
     * @param {string} email - User's email.
     * @param {string} password - User's password.
     * @returns {Promise<void>}
     */
    const register = async (email, password) => {
        try {
            const response = await apiRegister(email, password);
            authenticateUser(response.token || '');
        } catch (error) {
            authError.value = error;
            throw error;
        }
    };

    /**
     * Function to authorize a user by token.
     * @returns {Promise<void>}
     */
    const authorizeByToken = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            try {
                const res = await apiAuthenticate(accessToken);
                if (res) {
                    authenticateUser(accessToken);
                }
            } catch (error) {
                authError.value = error;
                isAuthenticated.value = false;
            }
        }
    };

    /**
     * Function to authenticate a user.
     * @param {string} token - Access token.
     */
    const authenticateUser = (token) => {
        if (token) {
            const userPayload = jwtDecode(token);
            isAuthenticated.value = true;
            localStorage.setItem('accessToken', token);
            accessToken.value = token;
            user.value = {
                id: userPayload.id,
                email: userPayload.email
            };
        }
    };

    return {
        user,
        isAuthenticated,
        authError,
        accessToken,
        clearError,
        authorizeByToken,
        login,
        logout,
        register,
    };
});
