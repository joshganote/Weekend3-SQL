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
};

function postTask(newTaskObject) {
    $.ajax({
        method: 'POST',
        url: 'api/to-do-app',
        data: newTaskObject
    })
    .then ((response) => {
        console.log('client POST');
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
        console.log('client GET');
        render(response);
    })
    .catch ((err) => {
        console.warn(err);
    })
};

function deleteTask (event) {
    const idNumber = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        url: '/api/to-do-app/' + idNumber
    })
    .then((response) => {
        console.log('client DELETE');
        getTask();
    })
    .catch((response) => {
        console.warn(response);
    })
};

function finishedTask(event) {
    updateTask('Finished', $(this).parent().parent().toggleClass('green').data('id'));
    //$(this).parent().parent().toggleClass('green');
};

function updateTask(statusChange, id){
    $.ajax({
        method: 'PUT',
        url: '/api/to-do-app/' + id,
        data: {
            statusChange: statusChange
        }
    })
    .then((response) => {
        console.log('client PUT');
        getTask();
    })
    .catch((err) => {
        console.warn(err);
    })
};

function render(tasks) {
    $('.container').empty();

    for(let task of tasks){
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

// -------Extra Stuff--------
// function newStatus(){
//     updateTask('finished')
// };
//updateTask('Finished', $(this).data('id'));
    // let id = $(this).data('id');
    // let val = 'Finished';
    // const status =$(this).data('status');

    // if( status == 'Finished'){
    //     val = 'no';
    // } else {
    //     val = 'yes';
    // }
    // putTask(val, id);