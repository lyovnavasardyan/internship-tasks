document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.button-style');
    const inputField = document.querySelector('.inpute-style');
    const taskList = document.querySelector('.task-list');

    addButton.addEventListener('click', () => {
        const taskText = inputField.value.trim();

        if (taskText) {
            
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';

            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', () => {
                taskItem.classList.toggle('completed', checkbox.checked);
            });

            
            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;

            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                taskItem.remove(); 
            });

            
            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskSpan);
            taskItem.appendChild(deleteButton);

            
            taskList.appendChild(taskItem);

           
            inputField.value = '';
        } else {
            alert('Please enter a task.'); 
        }
    });
});