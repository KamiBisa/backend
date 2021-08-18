const responses = {}

responses.json = (res, errMsg) => {
    return async(err, data) => {
        if (err) {
            res.stats(500).json({
                success: false,
                message: errMsg
            })
        } else {
            res.json(data)
        }
    }
}

module.exports = responses