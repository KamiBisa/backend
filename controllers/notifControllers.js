const Notification = require('../models/notifications.model')
const responseBuilder = require('../utils/responseBuilder')

const errMsg = "failed to get notifications"

const notifControllers = {
    viewAll: (req, res) => {
        Notification.view(null, responseBuilder.json(res, errMsg))
    },

    viewFundraisers: (req, res) => {
        Notification.view("fundraisers", responseBuilder.json(res, errMsg))
    },

    viewPrograms: (req, res) => {
        Notification.view("programs", responseBuilder.json(res, errMsg))
    },

    viewWithdrawals: (req, res) => {
        Notification.view("withdrawals", responseBuilder.json(res, errMsg))
    }
}

module.exports = notifControllers
