{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const doneTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const bindDoneEvents = () => {
    const doneButtons = document.querySelectorAll(".js-done");

    doneButtons.forEach((doneButton, index) => {
      doneButton.addEventListener("click", () => {
        doneTask(index);
      });
    });
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };


  const renderTasks = () => {
    const taskToHTML = task => `
          <li class="
          task__item${task.done && hideDoneTasks ? " task__item--hidden" : ""} js-task">
              <button class="task__button task__button--done js-done">
                ${task.done ? "✔" : ""}
              </button>
              <span class="task__content${task.done ? " task__content--done" : ""}">${task.content}</span>
              <button class="task__button task__button--remove js-remove">🗑</button>
          </li>
        `;

    const tasksElement = document.querySelector(".js-task");
    tasksElement.innerHTML = tasks.map(taskToHTML).join("");
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }
    buttonsElement.innerHTML = `
       <button class="section__button js-toggleHideDoneTasksButton">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button 
                class="section__button js-markAllDone"
                ${tasks.every(({ done }) => done) ? "disabled" : ""}
            >
                Ukończ wszystkie
            </button>
        `;
  };

  const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllTasksDone);
    }

    const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasksButton");

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindDoneEvents();
    bindRemoveEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskItem = document.querySelector(".js-newTask");
    const newTaskContent = newTaskItem.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskItem.value = "";
      newTaskInput.focus();
    }

  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();

}