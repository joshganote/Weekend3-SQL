console.log('JS/JQ');
$(document).ready(init);

function init() {
    $('#addToList').on('submit', onSubmitForm);
    getTask();
}

function onSubmitForm(event) {
    event.preventDefault();

    const newTaskObject = {
        task: $('#task').val(),
        tools: $('#tools').val(),
        complete: $('#complete').val(),
    };

    postTask(newTaskObject);
    console.log(newTaskObject);
};

function getTask() {
    $.ajax({
        method: 'GET',
        url: 'api/to-do-app'
    })
    .then ((response) => {
        console.log('GET');
        render(response);
    })
    .catch ((err) => {
        console.warn(err);
    })
};
function postTask(newTaskObject) {
    $.ajax({
        method: 'POST',
        url: 'api/to-do-app',
        data: newTaskObject
    })
    .then ((response) => {
        console.log('POST');
        getTask();
    })
    .catch ((err) => {
        console.warn(err);
    })
};

function render(response) {
    $('#viewTask').empty();

    for(let i = 0; i < response.length; i++){
        const toDo = response[i];
   
         $('#viewTask').append(`
         <tr>
           <td>${toDo.task}</td>
           <td>${toDo.tools}</td>
           <td>${toDo.complete}</td>
         </tr>
       `)
     
    }
};