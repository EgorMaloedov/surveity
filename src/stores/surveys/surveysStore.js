import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
    apiCreateSurvey,
    apiDeleteSurvey,
    apiFetchUserSurveys,
    apiUpdateSurvey,
} from '../../api/surveys/surveys.js';
import './types.js';

export const useSurveyStore = defineStore('surveys', () => {
    const surveys = ref([]);
    const currentSurvey = ref(null);
    const isLoading = ref(false);

    /**
     * Установить список опросов.
     * @param {Survey[]} newSurveys - Новый список опросов.
     */
    const setSurveys = (newSurveys) => {
        surveys.value = newSurveys;
    };

    /**
     * Установить текущий опрос.
     * @param {Survey|null} survey - Текущий опрос.
     */
    const setCurrentSurvey = (survey) => {
        currentSurvey.value = survey;
    };

    /**
     * Создать новый опрос.
     * @param {Survey} survey - Новый опрос.
     * @param {string} token - Токен авторизации.
     * @returns {Promise<void>}
     */
    const createSurvey = async (survey, token) => {
        surveys.value.push(survey);
        await apiCreateSurvey(survey, token);
    };

    /**
     * Обновить существующий опрос.
     * @param {Survey} updatedSurvey - Обновлённый опрос.
     * @param {string} token - Токен авторизации.
     * @returns {Promise<void>}
     */
    const updateSurvey = async (updatedSurvey, token) => {
        surveys.value = surveys.value.map((survey) => {
            if (updatedSurvey && survey.id === updatedSurvey.id) {
                survey = updatedSurvey;
            }
            return survey;
        });
        try {
            isLoading.value = true;
            await apiUpdateSurvey(updatedSurvey, token);
            isLoading.value = false;
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Удалить опрос.
     * @param {string} id - ID опроса.
     * @param {string} token - Токен авторизации.
     * @returns {Promise<void>}
     */
    const removeSurvey = async (id, token) => {
        surveys.value = surveys.value.filter((survey) => survey.id !== id);
        try {
            isLoading.value = true;
            await apiDeleteSurvey(id, token);
            isLoading.value = false;
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Получить список опросов пользователя.
     * @param {string} token - Токен авторизации.
     * @returns {Promise<void>}
     */
    const fetchUserSurveys = async (token) => {
        isLoading.value = true;
        let response;
        try {
            response = await apiFetchUserSurveys(token);
        } catch (error) {
            console.error(error);
        }
        isLoading.value = false;
        setSurveys(response.surveys || []);
    };

    return {
        surveys,
        updateSurvey,
        createSurvey,
        fetchUserSurveys,
        setCurrentSurvey,
        isLoading,
        currentSurvey,
        removeSurvey,
    };
});
