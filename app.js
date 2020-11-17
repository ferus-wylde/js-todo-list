//Selectors

const reminderInput = document.querySelector(".reminder-input");
const reminderButton = document.querySelector(".reminder-button");
const reminderList = document.querySelector(".reminder-list");
const filterOption = document.querySelector(".filter-reminder");

//Event Listeners
document.addEventListener("DOMContentLoaded", getReminders);
reminderButton.addEventListener("click", addReminder);
reminderList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterReminder);

//Functions

function addReminder(event) {
  //Prevent form from submitting
  event.preventDefault();
  //Reminder DIV
  const reminderDiv = document.createElement("div");
  reminderDiv.classList.add("reminder");
  //Create LI
  const newReminder = document.createElement("li");
  newReminder.innerText = reminderInput.value;
  newReminder.classList.add("reminder-item");
  reminderDiv.appendChild(newReminder);
  //Add to local storage
  saveLocalReminders(reminderInput.value);
  //Completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-btn");
  reminderDiv.appendChild(completedButton);
  //Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  reminderDiv.appendChild(deleteButton);
  //Append to list
  reminderList.appendChild(reminderDiv);
  //Clear reminder input
  reminderInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //Delete reminder
  if (item.classList[0] === "delete-btn") {
    const reminder = item.parentElement;
    //Animation
    reminder.classList.add("fall");
    removeLocalReminders(reminder);
    reminder.addEventListener("transitionend", function () {
      reminder.remove();
    });
  }

  //Delete complete
  if (item.classList[0] === "completed-btn") {
    const reminder = item.parentElement;
    reminder.classList.toggle("completed");
  }
}

function filterReminder(e) {
  const reminders = reminderList.childNodes;
  reminders.forEach(function (reminder) {
    switch (e.target.value) {
      case "all":
        reminder.style.display = "flex";
        break;
      case "completed":
        if (reminder.classList.contains("completed")) {
          reminder.style.display = "flex";
        } else {
          reminder.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!reminder.classList.contains("completed")) {
          reminder.style.display = "flex";
        } else {
          reminder.style.display = "none";
        }
    }
  });
}

function saveLocalReminders(reminder) {
  //Check to see if already presnet
  let reminders;
  if (localStorage.getItem("reminders") === null) {
    reminders = [];
  } else {
    reminders = JSON.parse(localStorage.getItem("reminders"));
  }
  reminders.push(reminder);
  localStorage.setItem("reminders", JSON.stringify(reminders));
}

function getReminders() {
  let reminders;
  if (localStorage.getItem("reminders") === null) {
    reminders = [];
  } else {
    reminders = JSON.parse(localStorage.getItem("reminders"));
  }
  reminders.forEach(function (reminder) {
    const reminderDiv = document.createElement("div");
    reminderDiv.classList.add("reminder");
    //Create LI
    const newReminder = document.createElement("li");
    newReminder.innerText = reminder;
    newReminder.classList.add("reminder-item");
    reminderDiv.appendChild(newReminder);
    //Completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    reminderDiv.appendChild(completedButton);
    //Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    reminderDiv.appendChild(deleteButton);
    //Append to list
    reminderList.appendChild(reminderDiv);
  });
}

function removeLocalReminders(reminder) {
  let reminders;
  if (localStorage.getItem("reminders") === null) {
    reminders = [];
  } else {
    reminders = JSON.parse(localStorage.getItem("reminders"));
  }
  const reminderIndex = reminder.children[0].innerText;
  reminders.splice(reminders.indexOf(reminderIndex), 1);
  localStorage.setItem("reminders", JSON.stringify(reminders));
}

