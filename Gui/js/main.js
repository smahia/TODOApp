// In order to get the results sent from the python function exposed to eel, the javascript function 
// should become async function and we should await the results come from the python function.
// More info: https://stackoverflow.com/questions/64682705/js-does-not-display-the-result-python-eel
async function showTasks() {
    let tasks = await eel.show_tasks()();
    console.log(tasks);
    let tbody = document.querySelector('tbody');
    for (let i = 0; i < tasks.length; i++) {
        let tr = document.createElement('tr');
        let tdTask = document.createElement('td');
        let tdStatus = document.createElement('td');
        let tdAction = document.createElement('td');
        tdAction.setAttribute('class', 'actionButtons');
        tdTask.innerHTML = tasks[i][1];
        tdStatus.innerHTML = tasks[i][2];
        tdAction.innerHTML = '<a data-id="' + tasks[i][0] + '" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen-to-square"></i></a>';
        tdAction.innerHTML += '<a onClick= "deleteTask(' + tasks[i][0] + ')"><i class="fa-solid fa-trash"></i></a>';
        tr.appendChild(tdTask);
        tr.appendChild(tdStatus);
        tr.appendChild(tdAction);
        tbody.appendChild(tr);
    }
}

async function deleteTask(task_id) {
    let task = eel.get_task(task_id)();
    task.then((data) => {
        Swal.fire({
            title: "Are you sure you want to delete this task: " + data[1] + "?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                eel.delete_task(task_id)().then(() => {
                    Swal.fire({
                        title: "The task has been successfully deleted",
                        icon: "success",
                    }).then(() => {
                        window.location.reload();
                    });
                })
            }
        });
    })
}

async function createTask(task, task_status) {
    await eel.create_task(task, task_status)();
    Swal.fire({
        title: "The task has been successfully created",
        icon: "success",
    }).then(() => {
        window.location.reload();
    });
}

// https://stackoverflow.com/questions/10626885/passing-data-to-a-bootstrap-modal
document.getElementById('exampleModal').addEventListener('show.bs.modal', (e) => {
    console.log(e.relatedTarget.dataset.id);
    let task = eel.get_task(e.relatedTarget.dataset.id)();
    task.then((data) => {
        let editedTask = document.getElementById('editedTask').value = data[1];
        let editedStatus = document.getElementById('editedStatus').value = data[2];

        // Get the form and add the submit event listener
        let form = document.getElementById('editFormTasks');
        form.addEventListener('submit', (event) => {
            // Update the old values
            editedTask = document.getElementById('editedTask').value;
            editedStatus = document.getElementById('editedStatus').value;
            event.preventDefault();
            editTask(editedTask, editedStatus, data[0]);
        });
    })
});

async function editTask(task, task_status, task_id) {
    await eel.edit_task(task, task_status, task_id)();
    Swal.fire({
        title: "The task has been successfully edited",
        icon: "success",
    }).then(() => {
        window.location.reload();
    });
}

showTasks();