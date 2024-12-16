/**
 * @typedef {Object} Answer
 * @property {string} ID - Уникальный идентификатор ответа.
 * @property {string} question_ID - Идентификатор вопроса, к которому относится ответ.
 * @property {string} text - Текст ответа.
 * @property {string} [description] - Описание ответа.
 * @property {number} [order] - Порядок ответа.
 * @property {boolean} [isCorrect] - Флаг правильного ответа.
 */

/**
 * @typedef {Object} Question
 * @property {string} ID - Уникальный идентификатор вопроса.
 * @property {string} survey_ID - Идентификатор опроса, к которому относится вопрос.
 * @property {string} name - Название вопроса.
 * @property {string} type - Тип вопроса.
 * @property {string} text - Текст вопроса.
 * @property {string} [description] - Описание вопроса.
 * @property {number} [order] - Порядок вопроса.
 * @property {boolean} [required] - Флаг обязательного вопроса.
 * @property {number} [minSelect] - Минимальное количество ответов.
 * @property {number} [maxSelect] - Максимальное количество ответов.
 * @property {Answer[]} answers - Массив возможных ответов.
 */

/**
 * @typedef {Object} Survey
 * @property {string} id - Уникальный идентификатор опроса.
 * @property {string} title - Заголовок опроса.
 * @property {string} [description] - Описание опроса.
 * @property {Date} [createdAt] - Дата создания опроса.
 * @property {Date} [updatedAt] - Дата последнего обновления опроса.
 * @property {Date} start_date - Дата начала опроса.
 * @property {Date} end_date - Дата окончания опроса.
 * @property {'completed'|'pending'|'waiting'} status - Статус опроса.
 * @property {number} [maxResponses] - Максимальное количество ответов.
 * @property {boolean} [isAnonymous] - Флаг анонимного опроса.
 * @property {boolean} [allowMultipleResponses] - Флаг разрешения множественных ответов.
 * @property {boolean} [showProgressBar] - Флаг отображения прогресс-бара.
 * @property {boolean} [randomizeQuestions] - Флаг случайного порядка вопросов.
 * @property {string[]} [tags] - Теги для опроса.
 * @property {Question[]} questions - Массив вопросов.
 */
