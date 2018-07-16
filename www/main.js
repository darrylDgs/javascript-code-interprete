var log = console.log;
var code, consola,
    scope = { vars: {} };

window.onload = loadFunction;

function loadFunction() {
    consola = document.getElementById("consola"); //get the container for console
    rules.consoleContainer = consola; //initialize console Container
    code = document.getElementById("codeInput"); //initialize code var
    rules.console("Code interprete. Version" + rules.version); //initial log
}

function compile() {
    //updating code var
    code = document.getElementById("codeInput");
    interprete(code.value);
}

function clearEditor() {
    code.value = "";
    consola.innerHTML = "";
    rules.console("Code interprete. Version" + rules.version); //initial log
}

function setExaple() {
    code.value = "svar a;\na = 44;\nsvar b;\nb = 31;\nsvar c = 2 + 2;\nsvar d = 3+3;\nsvar str;\nstr = \"hello\" + a;\nprint a + b;\nprint \"hello\";";
}

function cathErrors(mesage, lineNum, line) {
    rules.console(mesage + lineNum + " " + line, "error");
    console.error(mesage + lineNum + " " + line);
}