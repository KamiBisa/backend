const Verification = require('../models/verification.model')
const responseBuilder = require('../utils/responseBuilder')

const errMsg = "failed to verify"

const verificationControllers = {
    updateFundraiser: (req, res) => {
        const {user_id, action} = req.params

        newVerification = new Verification({
            user_id: user_id,
            action: action
        })
        Verification.update(newVerification, responseBuilder.json(res, errMsg))
    },

    updateProgram: (req, res) => {
        const {program_id, action} = req.params

        newVerification = new Verification({
            program_id: program_id,
            action: action
        })
        Verification.update(newVerification, responseBuilder.json(res, errMsg))
    },

    updateWithdrawal: (req, res) => {
        const {withdrawal_id, action} = req.params

        newVerification = new Verification({
            withdrawal_id: withdrawal_id,
            action: action
        })
        Verification.update(newVerification, responseBuilder.json(res, errMsg))
    }
}

module.exports = verificationControllers