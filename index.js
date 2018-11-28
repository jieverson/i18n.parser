const fs = require('fs')

const whitelist = require('./whitelist.js')
const replace = require('./replace.js')

const file_name = process.argv[2]

fs.readFile(file_name, 'utf-8', (err, buf) => {
    let ext = file_name.split('.')
    ext = ext[ext.length - 1]

    if(!whitelist.files.some(x => x === ext))
        return;
    
    replace(buf.toString(), ext).then(file => {
        if(ext === 'cshtml') {
            let parser = require('./html-parser.js')
            file = parser(file)
        }
        else {
            let parser = require('./simple-parser.js')
            file = parser(file)
        }
        
        fs.writeFile(file_name, file, (err, data) => {
            console.log('[Done] ' + file_name)
        })
    })
})