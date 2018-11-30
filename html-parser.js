const blacklist = require('./blacklist.js')
const whitelist = require('./whitelist.js')

module.exports = function(file){
    const filter = match => {
        let text = match.slice(1, -1)
        if(blacklist.equals.some(
                x => text.trim() === x)
            || blacklist.includes.some(
                x => text.includes(x))
            || blacklist.startsWith.some(
                x => text.trim().startsWith(x))
            || !isNaN(text)
            || !text.match(/\w/g)
        )
            return match
        else {
            let prefix = match[0] + "[[["
            let suffix = "]]]" + match[match.length - 1]
            
            return prefix + text.trim() + suffix
        }
    }

    const innerFilter = match =>
        match.replace(/("[^(^\\")]*")/g, filter)

    //inner tags
    file = file.replace(
        /(>[^<|^}|^@|^>]+(<|@))/g, 
        filter)

    //atributos
    whitelist.attrs.forEach(attr =>
        file = file.replace(
            new RegExp(attr + '="[^"]*"', 'g')    
            , innerFilter))

    //toolTip
    file = file.replace(
        /kendoTooltip:[^'|^"]*'[^'|^"]*'/g,
        x => x.replace(/('[^']*')/g, filter))

    return file
}