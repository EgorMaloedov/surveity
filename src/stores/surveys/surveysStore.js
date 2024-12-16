import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
    apiCreateSurvey,
    apiDeleteSurvey,
    apiFetchUserSurvey,
    apiFetchUserSurveys,
    apiUpdateSurvey,
} from '../../api/surveys/surveys.js';
import './types.js';

export const useSurveyStore = defineStore('surveys', () => {
    const surveys = ref(new Map());
    const currentSurvey = ref(null);
    const isLoading = ref(false);

    /**
     * Установить список опросов.
     * @param {Survey[]} newSurveys - Новый список опросов.
     */
    const setSurveys = (newSurveys) => {
        surveys.value = new Map();
        newSurveys.forEach((survey) => {
            surveys.value.set(survey.id, survey);
        })
    };

    /**
     * Установить текущий опрос.
     * @param {Survey|null} survey - Текущий опрос.
     * @param token
     */
    const setCurrentSurvey = async (survey, token = null) => {
        if (survey && token) {
            const response = await apiFetchUserSurvey(token, survey.id);
            response.survey.strat_date = new Date(response.survey.strat_date);
            response.survey.end_date = new Date(response.survey.end_date);
            currentSurvey.value = response.survey;
            return;
        }
        currentSurvey.value = survey;
    };

    /**
     * Создать новый опрос.
     * @param {Survey} survey - Новый опрос.
     * @param {string} token - Токен авторизации.
     * @returns {Promise<void>}
     */
    const createSurvey = async (survey, token) => {
        try {
            const response = await apiCreateSurvey(survey, token);
            const createdSurveyId = response.survey_id;
            surveys.value.set(createdSurveyId, { ...survey, id: createdSurveyId });
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Обновить существующий опрос.
     * @param {Survey} updatedSurvey - Обновлённый опрос.
     * @param {string} token - Токен авторизации.
     * @returns {Promise<void>}
     */
    const updateSurvey = async (updatedSurvey, token) => {
        if (surveys.value.has(updatedSurvey.id)) {
            surveys.value.set(updatedSurvey.id, updatedSurvey);
        }
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
        surveys.value.delete(id);
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
