document.addEventListener("DOMContentLoaded", function() {
    var addTaskBtn = document.getElementById("addTaskBtn");
    addTaskBtn.addEventListener("click", addTask);
  
    var sendWhatsAppBtn = document.getElementById("sendWhatsAppBtn");
    sendWhatsAppBtn.addEventListener("click", sendWhatsApp);
  
    function addTask() {
      var taskInput = document.getElementById("taskInput");
      var taskText = taskInput.value.trim();
  
      if (taskText !== "") {
        var taskList = document.getElementById("taskList");
        var currentDate = new Date();
        var dateTime = currentDate.toLocaleString();
        var newTaskItem = document.createElement("li");
        newTaskItem.className = "list-group-item";
        newTaskItem.innerHTML = `
          <div class="form-check">
            <input type="checkbox" class="form-check-input">
            <label class="form-check-label">${taskText} - ${dateTime}</label>
            <button type="button" class="btn btn-sm btn-success float-right mr-2">Concluir</button>
            <button type="button" class="btn btn-sm btn-danger float-right">Remover</button>
          </div>
        `;
        taskList.appendChild(newTaskItem);
  
        var removeBtn = newTaskItem.querySelector(".btn-danger");
        removeBtn.addEventListener("click", function() {
          removeTask(newTaskItem);
        });
  
        var completeBtn = newTaskItem.querySelector(".btn-success");
        completeBtn.addEventListener("click", function() {
          completeTask(newTaskItem);
        });
  
        taskInput.value = "";
      }
    }
  
    function removeTask(taskItem) {
      taskItem.parentNode.removeChild(taskItem);
    }
  
    function completeTask(taskItem) {
      taskItem.classList.toggle("completed");
      var checkbox = taskItem.querySelector("input[type='checkbox']");
      checkbox.checked = !checkbox.checked;
    }
  
    function sendWhatsApp() {
      
      var taskListItems = document.querySelectorAll("#taskList .list-group-item");
      var message = "Minha lista de tarefas:\n";
      taskListItems.forEach(function(taskItem) {
        var taskLabel = taskItem.querySelector(".form-check-label").innerText;
        var isCompleted = taskItem.classList.contains("completed");
        var statusMarker = isCompleted ? "[Concluido]" : "[A Fazer]";
        message += statusMarker + " " + taskLabel + "\n";
      });
      var whatsappLink = "https://wa.me/?text=" + encodeURIComponent(message);
      window.open(whatsappLink, "_blank");
    }
  });
  