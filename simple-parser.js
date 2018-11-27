const blacklist = require('./blacklist.js')

module.exports = function(file){
    return file.replace(
        /('[^']*')|("[^"]*")/g, 
        match => {
            let text = match.slice(1, -1)
            if(blacklist.equals.some(
                    x => text === x)
                || blacklist.includes.some(
                    x => text.includes(x))
                || blacklist.startsWith.some(
                    x => text.startsWith(x))
                || !isNaN(text)
                || !text.match(/\w/g)
            )
                return match
            else {
                let marker = match[0]
                
                let prefix = marker + "[[["
                let sulfix = "]]]" + marker
                
                if(text[0] === ' ')
                    prefix = '" " + ' + prefix
                if(text[text.length - 1] === ' ')
                    sulfix = sulfix + ' + " "'

                return prefix + text.trim() + sulfix
            }
        })
}