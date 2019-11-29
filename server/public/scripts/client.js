console.log('JS/JQ');
$(document).ready(init);

function init() {
    getTask();
    $('#addToList').on('submit', onSubmitForm);
    $('.container').on('click', '.finished-btn', finishedTask);
    $('.container').on('click', '.delete-btn', deleteTask);
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

function finishedTask(event) {
    $(this).parent().parent().toggleClass('green');
};

// As it is right now it will delete an entry, but without being able to 
// add the 'id' in there I'm afraid to move forward with making a DELETE ajax call
function deleteTask (event) {
    const idNumber = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        url: '/api/to-do-app/' + idNumber
    })
    .then((response) => {
        getTask();
    })
    .catch((response) => {
        console.warn(response);
    })
};

// I want to click the 'finished' button and update my status
// on server to say finished as well
function updateStatus(){}

// I tried adding a '<div> tag to the table data and tucking it inside there
// But I couldn't get it to work.
// If I keep it tucked into the <td> tag it works. I'm not confident it will 
// carry over to the server side
function render(tasks) {
    $('.container').empty();

    for(let task of tasks){
        console.log(task)
        $('.container').append(`
        <tr>
          <div>
          <td>${task.task}</td>
          <td>${task.tools}</td>
          <td>${task.complete}</td>
          <td><button class="finished-btn" data-id="${task.id}">Finished</button></td>
          <td><button class="delete-btn" data-id="${task.id}">Delete</button></td>
          </div>
        </tr>

      `)
    }
};