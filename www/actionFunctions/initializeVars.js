function initializeVars(lineNum, line, property) {
    //fragmenting the line
    let lineSplit = line.split(" ");
    //position of = beginning at 0
    const asignPos = lineSplit.indexOf(rules.keyWords.assignation.name);
    //value of the variable after fixing
    var varResult = "";
    //name of variable
    var varName = lineSplit[asignPos - 1];

    if (!scope.vars.hasOwnProperty(varName)) {
        cathErrors("Sintaxis error at line: ", lineNum, line);
    }

    /*obtain the result of variable */
    //case1 default asignation Example: a = 30;
    if (lineSplit.length - 1 === asignPos + 1) {
        varResult = lineSplit[asignPos + 1];
        //case2 logic asignation Example: a = 30 + 30; || a = "hola" + "mundo";
    } else if (lineSplit.length - 1 > asignPos + 1) {
        lineSplit.map(function (part) {
            if (lineSplit.indexOf(part) > asignPos) {
                if (part != "+" && scope.vars.hasOwnProperty(part)) {
                    part = scope.vars[part];
                }
                varResult += part;
            }
        });
    } else {
        cathErrors("Fatal error asignation at", lineNum, line);
    }
    scope.vars[varName] = eval(varResult);
}