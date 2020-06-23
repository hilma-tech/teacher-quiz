const ExitSkillHandler = require('./ExitSkillHandler');
const AIHandlars = Object.values(require('./ChallengeIntent'));
const AnswerHandlers = Object.values(require('./AnswersHandlers'));

module.exports = [
    ExitSkillHandler,
    ...AnswerHandlers,
    ...AIHandlars
]
