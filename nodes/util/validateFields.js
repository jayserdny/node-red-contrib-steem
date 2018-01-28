const validateParams = function() {

    for (let i = 0; i < arguments.length; i++) {
        if (!arguments[i] || arguments[i] === "" || arguments[i] === null) {
            return false
        }
    }

}

module.exports = validateParams;