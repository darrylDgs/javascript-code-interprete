//control all console mesages
function consoleController(msg, msgType, lineNum) {
    let color = (!msgType) ? "black" :
        (msgType === "normal") ? "black" :
            (msgType === "alert") ? "yellow" :
                (msgType === "error") ? "red" :
                    consoleController("Error msg type:" + msgType + "not defined", error);

    let logLineDiv = document.createElement("DIV");
    logLineDiv.classList.add("logLine");

    let logBody = document.createElement("P");
    logBody.style.color = color;
    let textNode = document.createTextNode(msg);
    logBody.appendChild(textNode);
    logLineDiv.appendChild(logBody);


    if (lineNum) {
        let logLineNum = document.createElement("P");
        let textNode = document.createTextNode("Line: "+lineNum);
        logLineNum.appendChild(textNode);
        logLineDiv.appendChild(logLineNum);
    }
    rules.consoleContainer.appendChild(logLineDiv);
}