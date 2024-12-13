/**
 * @typedef {Object} Answer
 * @property {string} text - Текст ответа.
 * @property {'radio'|'checkbox'|'custom'} type - Тип ответа.
 * @property {string} [description] - Описание ответа.
 * @property {order} [order] - Порядок ответа.
 * @property {boolean} [isCorrect] - Флаг правильного ответа.
 */

/**
 * @typedef {Object} Question
 * @property {string} name - Название вопроса.
 * @property {string} type - Тип вопроса.
 * @property {string} text - Текст вопроса.
 * @property {string} [description] - Описание вопроса.
 * @property {order} [order] - Порядок вопроса.
 * @property {boolean} [required] - Флаг обязательного вопроса.
 * @property {Object} [options] - Опции вопроса.
 * @property {order} [options.minSelect] - Минимальное количество ответов.
 * @property {order} [options.maxSelect] - Максимальное количество ответов.
 * @property {Answer[]} answers - Массив возможных ответов.
 */

/**
 * @typedef {Object} Survey
 * @property {string} id - Уникальный идентификатор опроса.
 * @property {string} owner - Владелец опроса.
 * @property {string} title - Заголовок опроса.
 * @property {string} [description] - Описание опроса.
 * @property {Date} [createdAt] - Дата создания опроса.
 * @property {Date} [updatedAt] - Дата последнего обновления опроса.
 * @property {Date} startDate - Дата начала опроса.
 * @property {Date} endDate - Дата окончания опроса.
 * @property {'completed'|'pending'|'waiting'} status - Статус опроса.
 * @property {order} [maxResponses] - Максимальное количество ответов.
 * @property {boolean} [isAnonymous] - Флаг анонимного опроса.
 * @property {string[]} [tags] - Теги для опроса.
 * @property {Question[]} questions - Массив вопросов.
 */
