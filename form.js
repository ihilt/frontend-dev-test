(function() {

    /* Add Event will be the addEventListener replacement. Automatically will handle IE compatibility */
    Object.defineProperty( Object.prototype , "addEvent" , { 
        value: function( obj , handler ) {
            window.attachEvent ? this.attachEvent( "on" + obj , handler ) : this.addEventListener( obj , handler );
        },
        enumerable : false
    } );

    var inputs = document.querySelectorAll( "form#main-submission-form .form-group input" ),
        submitButton = document.querySelector( "form#main-submission-form button[type=\"submit\"]" ),
        form = document.querySelector( "form#main-submission-form" );

    for( let i=0; i<inputs.length; i++ ) {
        inputs[i].addEvent( "keyup" , formValidator );
    }
    form.addEvent( "submit" , submissionHandler );

    function formValidator() {
        switch( this.name ) {
            case "email" : 
                validateEmail( this );
                break;
            case "firstName" : 
                formatName( this );
                validateName( this );
                break;
            case "lastName" : 
                formatName( this );
                validateName( this );
                break;
        }
        submitButton.disabled = !allInputsAreValid();
    }

    function allInputsAreValid() {
        for( let i=0; i<inputs.length; i++ ) {
            if( !inputs[i].parentElement.classList.contains( "valid" ) ) {
                return false;
            }
        }
        return true;
    }

    function validateName( el ) {
        !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test( el.value ) && el.value.length > 0 ? inputIsValid( el ) : inputIsInvalid( el );
    }

    function formatName( el ) {
        el.value = el.value.charAt(0).toUpperCase() + el.value.slice(1)
    }

    function validateEmail( el ) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            validate = re.test( String( el.value ).toLowerCase() );
        validate ? el.parentElement.classList.add( "valid" ) : el.parentElement.className = "form-group";
    }

    function inputIsValid( el ) {
        el.dataset.valid = true;
        el.parentElement.classList.add( "valid" );
    }

    function inputIsInvalid( el ) {
        el.dataset.valid = false;
        el.parentElement.className = "form-group";
    }

    function submissionHandler( e ) {
        if( !allInputsAreValid() ) {
            return;
        }
        
        removeForm();
        e.preventDefault();
    }

    function removeForm() {
        form.classList.add( "remove" );
        createFeedbackMessageFromFormElements();
        window.setTimeout( function() {
            form.parentElement.removeChild( form );
        } , 1000 );
    }

    function createFeedbackMessageFromFormElements() {
        var feedback = document.createElement( "div" );
        feedback.innerHTML = "<p>Thank you, your information has been submitted.</p>";
        feedback.classList.add( "feedback" );
        for( let i=0; i<inputs.length; i++ ) {
            feedback.innerHTML += "<p><b>" + camelCaseToHumanText( inputs[i].name ) + "</b>: " + inputs[i].value + "</p>";
        }
        form.parentElement.appendChild( feedback );
        window.setTimeout( function() {
            feedback.classList.add( "show" );
        } , 1000 );
    }

    function camelCaseToHumanText( str ) {
        return str.replace( /([A-Z])/g , ' $1' ).replace( /^./ , function( str ){ 
            return str.toUpperCase(); 
        } );
    }


})(); // localize the .js so the scope is not in the window object