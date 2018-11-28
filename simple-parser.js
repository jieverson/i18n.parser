const blacklist = require('./blacklist.js')

module.exports = function(file){
    return file.replace(
        /('[^']*')|("[^(^\\")]*")/g, 
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
                || text.match(/^id[A-Z]/i)
                || text.match(/^Max[A-Z]/i)
                || (!text.includes(' ') && text.length > 12)
                || (!text.includes(' ') && text.includes('-'))
            )
                return match
            else {
                let marker = match[0]
                
                let prefix = marker + "[[["
                let suffix = "]]]" + marker
                
                if(text[0] === ' ')
                    prefix = '" " + ' + prefix
                if(text[text.length - 1] === ' ')
                    suffix = suffix + ' + " "'

                return prefix + text.trim() + suffix
            }
        })
}