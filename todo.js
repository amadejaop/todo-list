window.onload = function() {
  /* getting and displaying today's date */
  var htmlDate = document.getElementById("todaysDate");
  var today = new Date;
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  htmlDate.innerHTML = day + ". " + month + ". " + year;
  
  /* setting and modifying the main goal for the day */
  var goal = document.getElementById("goal");
  var goalButton = document.getElementById("setGoal");
  var textarea = document.getElementById("goalMessage");
  var changeGoalButton = document.getElementById("changeGoal");
  
  textarea.onkeyup = function() {
    if (window.event.keyCode == 13) {
      goalButton.click();
    }
  }
  
  goalButton.onclick = function() {
    goal.style.display = "inline";
    goal.innerHTML = textarea.value;
    textarea.value = "";
    textarea.style.display = "none";
    goalButton.style.display = "none";
    changeGoalButton.style.display = "inline";
  }
  
  changeGoalButton.onclick = function() {
    changeGoalButton.style.display = "none";
    textarea.style.display = "inline-block";
    textarea.focus();
    goalButton.style.display = "inline";
    goal.style.display = "none";
  }
  
  /* clearing the entire webpage */
  var clearButton = document.getElementById("clear");
  clearButton.onclick = function() {
    window.removeEventListener('beforeunload', confirmClosure);
    if (confirm("This will delete your daily goal and all of your tasks. Are you sure you want to start over?")) {
      textarea.value = "";
      location.reload();
    }
  }
  
  /* setting tasks for the day */
  var checkboxes = document.getElementsByClassName("checkboxes");
  var tasks = document.getElementsByClassName("tasks");
  var inputTasks = document.getElementsByClassName("inputTasks");
  var buttonTasks = document.getElementsByClassName("buttonTasks");
  var numOfButtons = buttonTasks.length;
  var numOfTasks = tasks.length;
  
  for (var i = 0; i < numOfTasks; i++) {
    checkboxes[i].style.display = "none";
    tasks[i].style.display = "none";
    tasks[i].previouslyDeleted = false;
    inputTasks[i].addEventListener("keyup", pressEnter);
    inputTasks[i].taskIndex = i;
    buttonTasks[i].addEventListener("click", addTask);
    buttonTasks[i].buttonIndex = i;
    
    if (i > 0) {
      if (i != 10 && i != 20) {
        inputTasks[i].style.display = "none";
        buttonTasks[i].style.display = "none";
      }
    }
  }
  
  function pressEnter(event) {
    var index = event.currentTarget.taskIndex;
    if (window.event.keyCode == 13) {
      buttonTasks[index].click();
    }
  }
  
  var maxIndex = 0;
  
  function addTask(event) {
    var index = event.currentTarget.buttonIndex;
    if (maxIndex < index) {
      maxIndex = index;
    }
    
    if (inputTasks[index].value == "") {
      alert("Please write a task, this field cannot be empty!");
    } else {
      if (!tasks[index].previouslyDeleted || (index === 0 && maxIndex === 0) || index === maxIndex) { // show 1 only if 0 is the only task visible
        // if a task has not been previously deleted, show next input box
        if (index != 9 && index != 19 && index != 29) {
          // if the current input is not the last in each group, show the next text input and focus on it
          inputTasks[index+1].style.display = "inline";
          inputTasks[index+1].focus();
          buttonTasks[index+1].style.display = "inline";
        }
      }
        
      tasks[index].innerHTML = inputTasks[index].value;
      inputTasks[index].value = "";
      deleteButtons[index].insertAdjacentHTML('afterend', "<br>");
      checkboxes[index].style.display = "inline";
      tasks[index].style.display = "inline-block";
      inputTasks[index].style.display = "none";
      buttonTasks[index].style.display = "none";
      deleteButtons[index].style.display = "inline";
    }
  }
  
  /* deleting tasks */
  var deleteButtons = document.getElementsByClassName("deleteButtons");
  var delButtonsLength = deleteButtons.length;
  
  for (var i = 0; i < delButtonsLength; i++) {
    deleteButtons[i].delButtonIndex = i;
    deleteButtons[i].addEventListener("click", deleteTask);
    deleteButtons[i].style.display = "none";
  }
  
  function deleteTask(event) {
    var index = event.currentTarget.delButtonIndex;
    
    tasks[index].innerHTML = "";
    checkboxes[index].style.display = "none";
    tasks[index].style.display = "none";
    inputTasks[index].style.display = "inline";
    inputTasks[index].focus();
    buttonTasks[index].style.display = "inline";
    deleteButtons[index].style.display = "none";
    deleteButtons[index].nextSibling.remove(); // remove the added br
    tasks[index].previouslyDeleted = true;
    
    if (index !== 9 && index !== 19) {
      buttonTasks[index+1].style.display = "none";
      inputTasks[index+1].style.display = "none";
    }
  }
  
  /* ask user to confirm when leaving page, to avoid losing data */
  window.addEventListener('beforeunload', confirmClosure);
  
  function confirmClosure(event) {
    event.preventDefault();
    event.returnValue = "";
    return;
  }
}
