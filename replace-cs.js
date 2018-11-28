const fs = require('fs')
const resx2js = require('resx/resx2js')

module.exports = (file) => 
new Promise((resolve, reject) => {
    fs.readdir('./res', 'utf-8', (err, files) => {
        Promise.all(
            files.filter(x => x.split('.').pop() === 'resx')
            .map(resx => new Promise((resolve, reject) => {
                fs.readFile('./res/' + resx, 'utf-8', (err, buf) => {
                    resx2js(buf.toString(), (err, res) => {
                        let keys = Object.keys(res)
                        keys.forEach(key => {
                            let value = '[[[' + res[key] + ']]]'
                            let name = resx.split('.')
                            name = name[name.length - 2]
                            let toReplace = '@Resources.' + name + '.' + key
                            file = file.split(toReplace).join(value)
                            toReplace = 'Resources.' + name + '.' + key
                            let prefix = value.includes('\n') ? '@' : ''
                            file = file.split(toReplace)
                                .join(prefix + '"' + value + '"')
                        })
                        resolve(file)
                    })
                })
            })))
            .then(x =>
                resolve(x[x.length - 1]))
    })
})