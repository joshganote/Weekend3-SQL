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

function deleteTask (event) {
    $(this).parent().parent().remove();
    
}

function render(tasks) {
    $('.container').empty();

    for(let task of tasks){
        console.log(task)
        $('.container').append(`
         <tr>
           <div >
           <td>${task.task}<br><button class="finished-btn">Finished</button><button class="delete-btn" data-id="${task.id}">Delete</button></td>
           <td>${task.tools}</td>
           <td>${task.complete}</td>
           </div>
         </tr>
       `)
    }
};