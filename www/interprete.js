function interprete(code) {
    //separate code in lines
    var lines = code.split(rules.closeLine);
    var lineNum = 1;
    lines.map(function (line) {
        //clean befor an after spaces of line
        line = line.trim();
        for (var property in rules.keyWords) {
            /*objet into property */
            property = rules.keyWords[property];

            //search keywords and execute her action
            if (line.indexOf(property.name) > -1 && checkConditions(line, property)) {
                property.action(lineNum, line, property);
            } else if (line.indexOf(property.name) > -1 && !checkConditions(line, property)) {
                cathErrors("Error at line", lineNum, line);
            }
        }
        lineNum++;
    });
}

//return true if the property meet all conditions for line
function checkConditions(line, property) {

    //isInitial
    if (property.conditions.isInitial && line.indexOf(property.name) != 0) {
        return false;
    }

    //isUnique
    var regExp = new RegExp(property.name, "g");
    if (property.conditions.isUnique && line.match(regExp).length != 1) {
        return false;
    }

    return true;
}