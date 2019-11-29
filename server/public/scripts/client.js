console.log('JS/JQ');
$(document).ready(init);

function init() {
    $('#addToList').on('submit', onSubmitForm);
}

function onSubmitForm(event) {
    event.preventDefault();

    const newTaskObject = {
        task: $('#task').val(),
        tools: $('#tools').val(),
        complete: $('#complete').val()
    }
    console.log(newTaskObject);
};