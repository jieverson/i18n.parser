const resources = require('./resources.js')

let keys = Object.keys(resources)

module.exports = function(file) {
    keys.forEach(key => {
        let value = resources[key]
        let toReplace = "l('" + key + "')"
        file = file.split(toReplace).join("'" + value + "'")
        toReplace = 'l("' + key + '")'
        file = file.split(toReplace).join('"' + value + '"')
    })
    return file
}