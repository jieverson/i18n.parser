const replace_js = require('./replace-js.js')
const replace_cs = require('./replace-cs.js')

module.exports = (file, ext) => 
new Promise((resolve, reject) => {
    if(ext === 'js')
        resolve(replace_js(file))
    else if(ext === 'cs' || ext === 'cshtml')
        resolve(replace_cs(file))
    else
        resolve(file)
})