function declareVars(lineNum, line, property) {
    //fragmenting the line
    let lineSplit = line.split(" ");

    scope.vars[lineSplit[1]] = undefined;

}