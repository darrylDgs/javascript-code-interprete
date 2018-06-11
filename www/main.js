var log = console.log;
var scope = { vars: {}, functions: {} };

const rules = {
    closeLine: ";",
    keyWords: {
        varDeclare: {
            name: "svar",
            action: declareVars,
            conditions: {
                isInitial: true,
                isUnique: true
            }
        },
        print: {
            name: "print",
            action: print,
            conditions: {
                isInitial: true,
                isUnique: true
            }
        },
        assignation: {
            name: "=",
            action: initializeVars,
            conditions: {
                isInitial: false,
                isUnique: true
            }
        }
    },
    consoleContainer: null,
    console: consoleController
}

function compile() {
    if(document){
        var code = document.getElementById("codeInput").value;
        var consola = document.getElementById("consola");
        //initialize console Container
        rules.consoleContainer = consola;
        interprete(code, consola);
    }
}

function interprete(code, consola) {
    rules.console("dygffdyf","error");

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
                cathErrors("Error at line ", lineNum, line);
            }
        }
        lineNum++;
    });
}

//control all
function consoleController(msg, msgType){
    let color = (msgType === "normal")? "black":
                (msgType === "alert")? "yellow":
                (msgType === "error")? "red":
                consoleController("Error msg type:" + msgType + "not defined", error);
    
    let element = document.createElement("P");
    element.style.color = color;
    let text = msg;
    let textNode = document.createTextNode(text);
    element.appendChild(textNode);
    rules.consoleContainer.appendChild(element);
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


function declareVars(lineNum, line, property) {
    //fragmenting the line
    let lineSplit = line.split(" ");

    scope.vars[lineSplit[1]] = undefined;

}

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

function print(lineNum, line, property) {
    
    //fragmenting the line
    let lineSplit = line.split(" ");
    //expression to print
    let printResult = "";
    //location index of print property
    const printIndex = line.indexOf(property.name);

    if(lineSplit.length - 1 === printIndex + 1){
        
        if(scope.vars.hasOwnProperty(lineSplit[printIndex+1])) {
            lineSplit[printIndex+1] = scope.vars[lineSplit[printIndex+1]];
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
    log(eval(printResult));
}

function cathErrors(mesage, lineNum, line) {
    console.error(mesage + lineNum + " " + line);
}