import { AxiosError } from 'axios';
import apiClient from '../index.js';
import '../../stores/surveys/types.js';

/**
 * Function to fetch survey by user and id.
 * @param {string} token - Authorization token.
 * @returns {Promise<Survey>} - Promise that resolves to an array of surveys.
 * @throws {AxiosError} - Error if fetching surveys fails.
 */
export const apiFetchSurvey = async (token) => {
    try {
        const response = await apiClient.get(`/surveys`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new AxiosError('Failed to fetch user surveys');
        }
        throw error;
    }
};