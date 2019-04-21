# Front end developer test

Create an html5 compliant page that displays an html form, with an input that accepts an email, an input that accepts a first name, an input that accepts a last name, and a submit button.

The form should be easily modified to function as an overlay. It should have zero to very few globally applied styles. It should not have javascript that pollutes the `window` namespace.

Add labels and placeholders to each input field describing what it is.

Make the email input full width, the first and last name on a second row at half-width each, and then the submit button full width on a third row.

The form should be centered and not full-width. Give the same padding to each input.

When the screen width falls below 578px, cause the first and last name inputs to be full width. Style the button so that each of the different states (hover, focus, active, disabled) have different background colors.

Add padding and margin of your choosing to the button.

If not all of the inputs have been filled in, disable the submit button.

**Clarity and organizaton of the code will be a factor in the evaluation of the code.**

## Extra points
- use a CSS preprocessor, e.g. sass, less, stylus
- style the inputs based on whether they are focused or not
- do not use jQuery
- make something happen when the form is submitted that displays the data submitted
- validate the email address and disable the submit button if it's invalid
- using npm/yarn to install npm modules
- using a task runner e.g. webpack to compile the css/sass files into a single file
- using a task runner e.g. webpack to compile javascript files into a single file
- using semantic html
- style the placeholder
- cross browser support. pick two (Chrome, Safari, IE11)

## When you've completed the test

Create a pull request against this repository with the completed code in your repository.
