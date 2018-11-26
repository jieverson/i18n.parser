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
                let result = ''
                // TODO: end
                if(text[0] === ' ')
                    return '" " + ' +  marker + 
                        "[[[" + text.substr(1, text.length - 1) 
                        + "]]]" + marker
                else
                    return marker + 
                        "[[[" + text + "]]]" + marker
            }
        })
}