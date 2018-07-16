function print(lineNum, line, property) {
    //fragmenting the line
    let lineSplit = line.split(" ");
    //expression to print
    let printResult = "";
    //location index of print property
    const printIndex = line.indexOf(property.name);

    if (lineSplit.length - 1 === printIndex + 1) {
        if (scope.vars.hasOwnProperty(lineSplit[printIndex + 1])) {
            lineSplit[printIndex + 1] = scope.vars[lineSplit[printIndex + 1]];
        }
        printResult = lineSplit[printIndex + 1];
    }

    if (lineSplit.length - 1 > printIndex + 1) {

        lineSplit.map(function (part) {
            if (lineSplit.indexOf(part) > printIndex) {
                if (part != "+" && scope.vars.hasOwnProperty(part)) {
                    part = scope.vars[part];
                }
                printResult += part;
            }
        });
    }
    rules.console(eval(printResult), "normal", lineNum);
    log(eval(printResult));
}