function validateRowData(data) {
    console.log(data);
    data.map(qs => {
        var rowNo = qs["Sl. No."];
        Object.keys(qs).map(function(key, index) {
            // validaitng grade
            if(key == "Grade"){
                if(qs[key].substring(-1, 5) != "Grade"){
                    var message = "Invalid Value for Grade, at row " + rowNo;
                    createPromptMessage(message);
                }
            }
            
            // validating subject language
            // if(key == "Subject"){
            //     var english = /^[A-Za-z0-9]*$/;
            //     if(!english.test(qs[key])){
            //         var message = "Subject, MUST be in English at row " + rowNo;
            //         createPromptMessage(message);  
            //     }
            // }

            // validating marks
            if(key == "Marks"){
                var number = /^-?\d+$/;
                if(!number.test(qs[key])){
                    var message = "Marks, MUST be Numeric at row " + rowNo;
                    createPromptMessage(message);
                }
            }

            // validating year
            var numeric = /^[0-9]+(\.)?[0-9]*$/;
            if(key == "Year"){
                if(!numeric.test(qs[key])){
                    var message = "Year, MUST be Numeric at row " + rowNo;
                    createPromptMessage(message);
                }
            }

            // validating seqNum
            if(key == "ChapterSeqNum"){
                if(!numeric.test(qs["ChapterSeqNum"])){
                    var message = "ChapterSeqNum, MUST be Numeric at row " + rowNo;
                    createPromptMessage(message);
                }
            }

            // validating isMCQ
            // if(key == "Is an MCQ?"){
            //     if(qs["Is an MCQ?"] != "true" && qs["Is an MCQ?"] != "false"){
            //         var message = "Is an MCQ, MUST be a boolean (true or false) at row " + rowNo;
            //         createPromptMessage(message);
            //     } else {
            //         // checking question type
            //         if(qs["Is an MCQ?"] == "true"){
            //             if(qs["Model Answer"] == "null" || qs["MCQ Option"] == "null"){
            //                 var message = "Model Answer and MCQ Options CANNOT be NULL for row " + rowNo;
            //                 createPromptMessage(message);
            //             }
            //         } else {
            //             if(qs["Model Answer"] != "null" || qs["MCQ Option"] != "null"){
            //                 var message = "Model Answer and MCQ Options MUST be null for row " + rowNo;
            //                 createPromptMessage(message);
            //             }
            //         }
            //     }
            // }

        })
    })
}

function createPromptMessage(message){
    var container = document.getElementById("prompt");
    if(container.childNodes.length == 0){
        var prompt = document.createElement("h1");
        prompt.innerHTML = "Validation Errors";
        container.appendChild(prompt);
    }

    var prompt = document.createElement("h3");
    prompt.innerHTML = message;
    container.appendChild(prompt);
}