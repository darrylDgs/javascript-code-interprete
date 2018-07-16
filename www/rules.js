const rules = {
    version: "1.0.0",
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