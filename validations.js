const MAX_VALIDATIONS = 10;

function validateRowData(data) {
    console.log(data);

    // to put a check on number of validations in a single run
    let validations = 0;

    data.map(qs => {
        var rowNo = qs["Sl. No."];
        Object.keys(qs).map(function(key, index) {

            if(validations <= MAX_VALIDATIONS){

                // validaitng grade
                if(key == "Grade"){
                    if(qs[key].substring(-1, 5) != "Grade"){
                        validations++;
                        var message = "Invalid Value for Grade, at row " + rowNo;
                        createPromptMessage(message, validations);
                    }
                }
                
                // validating subject language
                if(key == "Subject"){
                    var english = /^[A-Za-z0-9]*$/;
                    if(!english.test(qs[key])){
                        validations++;
                        var message = "Subject, MUST be in English at row " + rowNo;
                        createPromptMessage(message, validations);  
                    }
                }

                // validating marks
                if(key == "Marks"){
                    var number = /^-?\d+$/;
                    if(!number.test(qs[key])){
                        validations++;
                        var message = "Marks, MUST be Numeric at row " + rowNo;
                        createPromptMessage(message, validations);
                    }
                }

                // validating year
                var numeric = /^[0-9]+(\.)?[0-9]*$/;
                if(key == "Year"){
                    if(!numeric.test(qs[key])){
                        validations++;
                        var message = "Year, MUST be Numeric at row " + rowNo;
                        createPromptMessage(message, validations);
                    }
                }

                // validating seqNum
                if(key == "ChapterSeqNum"){
                    if(!numeric.test(qs["ChapterSeqNum"])){
                        validations++;
                        var message = "ChapterSeqNum, MUST be Numeric at row " + rowNo;
                        createPromptMessage(message, validations);
                    }
                }

                // validating isMCQ
                if(key == "Is an MCQ?"){
                    if(qs["Is an MCQ?"] != "true" && qs["Is an MCQ?"] != "false"){
                        validations++;
                        var message = "Is an MCQ, MUST be a boolean (true or false) at row " + rowNo;
                        createPromptMessage(message, validations);
                    } else {
                        // checking question type
                        if(qs["Is an MCQ?"] == "true"){
                            if(qs["Model Answer"] == "null" || qs["MCQ Option"] == "null"){
                                validations++;
                                var message = "Model Answer and MCQ Options CANNOT be NULL for row " + rowNo;
                                createPromptMessage(message, validations);
                            }
                        } else {
                            if(qs["Model Answer"] != "null" || qs["MCQ Option"] != "null"){
                                validations++;
                                var message = "Model Answer and MCQ Options MUST be null for row " + rowNo;
                                createPromptMessage(message, validations);
                            }
                        }
                    }
                }
            }
        });
    });

    console.log(validations);

    if(validations == 0){
        var container = document.getElementById("prompt");
        var prompt = document.createElement("h1");
        prompt.innerHTML = "Data Passed all the Validations!";
        container.appendChild(prompt);
    }
}

function createPromptMessage(message, validations){
    var container = document.getElementById("prompt");
    if(container.childNodes.length == 0){
        var prompt = document.createElement("h1");
        prompt.innerHTML = "Validation Errors";
        container.appendChild(prompt);
    }

    if(validations <= MAX_VALIDATIONS){
        var prompt = document.createElement("h3");
        prompt.innerHTML = message;
        container.appendChild(prompt);
    } else {
        var prompt = document.createElement("h2");
        prompt.innerHTML = "..and more<br/><br/>Please provide correct data according to the above validation prompts.<br/>Then Re-Upload your updated excel file."
        container.appendChild(prompt);
    }
}