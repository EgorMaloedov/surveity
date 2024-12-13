import { AxiosError } from 'axios';
import apiClient from '../index.js';
import '../../stores/surveys/types.js';

/**
 * Function to fetch surveys of a user.
 * @param {string} token - Authorization token.
 * @returns {Promise<Survey[]>} - Promise that resolves to an array of surveys.
 * @throws {AxiosError} - Error if fetching surveys fails.
 */
export const apiFetchUserSurveys = async (token) => {
    try {
        const response = await apiClient.get('/api/v1/surveys', {
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

/**
 * Function to create a new survey.
 * @param {Survey} survey - Survey object to be created.
 * @param {string} token - Authorization token.
 * @returns {Promise<Survey>} - Promise that resolves to the created survey.
 * @throws {AxiosError} - Error if creating the survey fails.
 */
export const apiCreateSurvey = async (survey, token) => {
    try {
        const response = await apiClient.post('/api/v1/surveys', { ...survey }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new AxiosError('Failed to create survey');
        }
        throw error;
    }
};

/**
 * Function to delete a survey.
 * @param {string} surveyId - ID of the survey to delete.
 * @param {string} token - Authorization token.
 * @returns {Promise<void>} - Promise that resolves when the survey is deleted.
 * @throws {AxiosError} - Error if deleting the survey fails.
 */
export const apiDeleteSurvey = async (surveyId, token) => {
    try {
        await apiClient.delete(`/api/v1/surveys/${surveyId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new AxiosError('Failed to delete survey');
        }
        throw error;
    }
};

/**
 * Function to update an existing survey.
 * @param {Survey} survey - Updated survey object.
 * @param {string} token - Authorization token.
 * @returns {Promise<Survey>} - Promise that resolves to the updated survey.
 * @throws {AxiosError} - Error if updating the survey fails.
 */
export const apiUpdateSurvey = async (survey, token) => {
    try {
        const response = await apiClient.put(`/api/v1/surveys/${survey.id}`, { ...survey }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new AxiosError('Failed to update survey');
        }
        throw error;
    }
};
