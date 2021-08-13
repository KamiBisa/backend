const Notification = require('../models/notifications.model')

const notifControllers = {
    viewAll: (req, res) => {
        Notification.view(null, jsonResponse(res))
    },

    viewFundraisers: (req, res) => {
        Notification.view("fundraisers", jsonResponse(res))
    },

    viewPrograms: (req, res) => {
        Notification.view("programs", jsonResponse(res))
    },

    viewWithdrawals: (req, res) => {
        Notification.view("withdrawals", jsonResponse(res))
    }
}

function jsonResponse(res) {
    return async(err, data) => {
        if (err) {
            res.stats(500).json({
                success: false,
                message: "failed to get notifications"
            })
        } else {
            res.json(data)
        }
    }
}

module.exports = notifControllers
