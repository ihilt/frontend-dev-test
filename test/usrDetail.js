//Utility Functions 
// ------------------------------
function func_getInputFieldArray() {
    "use strict";
    var inputs = {
        a: "id_emailAddress_input",
        b: "id_firstName_input",
        c: "id_lastName_input"
    };
    return inputs;
}

function isBlank(val) {
    "use strict";
    return (val === null || val === "");
}

function isNotBlank(val) {
    "use strict";
    return !isBlank(val);
}
// User Detail Functions
// ------------------------------
// Do any required initialization on page load
function func_onLoadAction() {
    // Add Input listeners
    func_addListenerEvents();
    // Set initial page layout
    func_UpdateFlow();
    // Set Button initial state
    func_checkComplete();
}
// Add Input Field Listeners
function func_addListenerEvents() {
    "use strict";
    // Loop through input fields
    for (var idx in func_getInputFieldArray()) {
        var inputField = document.getElementById(func_getInputFieldArray()[idx]);
        inputField.addEventListener('change', func_checkComplete);
    }
}
// Valdate Input Values
function func_validateInput() {
    var inputsOK = true;
    // Loop through input fields
    for (var idx in func_getInputFieldArray()) {
        // Validate basic email notation *@*.com
        if (func_getInputFieldArray()[idx] == "id_emailAddress_input") {
            var inputField = document.getElementById(func_getInputFieldArray()[idx]);
            var value = inputField.value;
            var test = (value.match(/.+\@.+\..+/g) !== null);
            inputsOK = (test && inputsOK);
            if (!test && isNotBlank(value)) {
                inputField.style.border = "1px solid red";
            }
            else inputField.style.border = "";
        }
        // Validate other inputs here... TBD
    }
    return inputsOK;
}
// Check that all inputs have been populated
function func_checkComplete() {
    var isFieldsComplete = true;
    var allFieldsEmpty = true;
    // Loop through input fields
    for (var idx in func_getInputFieldArray()) {
        var inputField = document.getElementById(func_getInputFieldArray()[idx]);
        var value = inputField.value;
        isFieldsComplete = (isNotBlank(value) && isFieldsComplete);
        allFieldsEmpty = (allFieldsEmpty && isBlank(value));
    }
    // Hide test comments when data entry begins
    if (allFieldsEmpty) {
        document.getElementById("id_testComments_details").style.display = "block";
    }
    else {
        document.getElementById("id_testComments_details").style.display = "none";
    }
    // Check that fields that are populated have pass validation
    isFieldsComplete = (func_validateInput() && isFieldsComplete);
    // Disable submit button until all inputs are complete and valid
    if (isFieldsComplete) {
        document.getElementById("id_userSubmit_button").removeAttribute("disabled");
    }
    else {
        document.getElementById("id_userSubmit_button").setAttribute("disabled", true);
    }
}
// Impliment form submit manually to display input to user first.
function func_userDetailOnSubmit() {
    var textDtl = {
            id_emailAddress_input: "",
            id_firstName_input: "",
            id_lastName_input: ""
        }
        // Loop through inputs and gather values into an array
    for (var idx in func_getInputFieldArray()) {
        textDtl[func_getInputFieldArray()[idx]] = document.getElementById(func_getInputFieldArray()[idx]).value;
    }
    // Create formatted message to display with simple confirm dialog
    var message = "User: " + textDtl.id_firstName_input + " " + textDtl.id_lastName_input + "\nEmail: " + textDtl.id_emailAddress_input;
    if (window.confirm(message)) document.getElementById('id_userDetailForm_form').submit();
}
// Update page layout - adjusting username fields based on window width.
function func_UpdateFlow() {
    var w = window.innerWidth;
    // When the screen width falls below 578px, cause the first and last name inputs to be full width. 
    // Note: Assuming "screen" here means Browser Window
    if (w <= 578) {
        document.getElementById("id_userDetail_div").style.flexDirection = "column";
    }
    else {
        document.getElementById("id_userDetail_div").style.flexDirection = "row";
    }
}