const localStorageKey = "todolistkey"

let inputText = document.getElementById("input-text")
inputText.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addNewTask()
  }
})


function validateRepetition(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputTextValue = document.getElementById("input-text").value
    let exists = values.find(x => x.name == inputTextValue)
    return exists ? true : false

}

function addNewTask()
{
    let inputText = document.getElementById("input-text")
    if(!inputText.value){
        alert("Insira uma tarefa")
    }else if(validateRepetition()){
        alert("Digite uma nova tarefa não repetida")
    }else{
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: inputText.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
    }
    showList()
    inputText.value = ""
    inputText.focus()
}

function showList(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let taskList = document.getElementById("list-of-tasks")
    taskList.innerHTML = ""
    for (let i = 0;i<values.length;i++){
        taskList.innerHTML += `<li>${values[i].name}<button id="btn-delete-task" onclick="deleteTask('${values[i].name}')"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg></button></li>`
    }



}

function deleteTask(data){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showList()
}

showList()