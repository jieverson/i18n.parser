const fs = require('fs')

let file_name = process.argv[2]

fs.readFile(file_name, 'utf-8', (err, buf) => {
    let ext = file_name.split('.')
    ext = ext[ext.length - 1]
    if(ext !== 'js' 
        && ext !== 'cs' 
        && ext !== 'cshtml')
        return;

    let file = buf.toString()

    if(ext === 'cshtml'){
        // Do other stuff...
    }
    else {
        file = file.replace(
            /('[^']*')|("[^']*")/g, 
            match => {
                let text = match.slice(1, -1)
                if( !text
                    || text[0] === '#'
                    || text[0] === '.'
                    || text.includes('/')
                    || text.includes('[[['))
                    return match
                else{
                    let marker = match[0]
                    return marker + "[[[" + text + "]]]" + marker
                }
            })
    }

    fs.writeFile(file_name, file, (err, data) => {
        console.log('[Done] ' + file_name)
    })
})