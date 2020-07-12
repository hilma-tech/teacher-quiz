const ExitSkillHandler = require('./ExitSkillHandler');
const AnswerHandlers = Object.values(require('./AnswersHandlers'));

module.exports = [
    ExitSkillHandler,
    ...AnswerHandlers
]
