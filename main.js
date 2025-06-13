$= document.querySelector.bind(document)
$$=document.querySelectorAll.bind(document)

const searchInput=$('.search-input')
const activeBtn=$('#active-btn')
const completedBtn=$('#completed-btn')
const allTaskBtn=$('#allTask-btn')
const addBtn= $('.add-btn')
const closeBtn=$(".modal-close")
const cancelBtn=$('.btn-cancel')
const submitBtn=$('.btn-submit')
const todoForm= $('#addTaskModal')

const taskTitle=$('#taskTitle')

const todoTask=$('.todo-app-form')
const todoList=$('#todoList')
let todoTasks=[];
let indexEdit=null;


function customTime(time){
    let result="";
    let arr=time.toString().split(":");
    if(arr[0]>=12) return result= `${(arr[0]-12).toString().padStart(2,'0')}:${arr[1]} PM`;
    if(arr[0]<12) return result= `${arr[0]}:${arr[1]} AM`;
}
function getTaskInLocalstorage(){
  let tasks=JSON.parse( localStorage.getItem('todoTasks'))??[];
  return tasks;
}
function saveTaskInLocalstorage(todoTasks){
    localStorage.setItem('todoTasks',JSON.stringify(todoTasks))
}
function renderTasks(arrTask){
   let tasks=getTaskInLocalstorage();
   if(arrTask!==undefined) tasks=arrTask;
       
    let html=""+ tasks.map(function(task,index){
        return `
        <div class="task-card ${task.color} ${
                task.isCompleted ? "completed" : ""
            }">
        <div class="task-header">
          <h3 class="task-title">${task.title}</h3>
          <button class="task-menu">
            <i class="fa-solid fa-ellipsis fa-icon"></i>
            <div class="dropdown-menu">
              <div class="dropdown-item edit-btn" data-index="${index}">
                <i class="fa-solid fa-pen-to-square fa-icon"></i>
                Edit
              </div>
              <div class="dropdown-item complete-btn" data-index="${index}">
                <i class="fa-solid fa-check fa-icon"></i>
                ${task.isCompleted ? "Mark as Active" : "Mark as Complete"} 
              </div>
              <div class="dropdown-item delete delete-btn" data-index="${index}">
                <i class="fa-solid fa-trash fa-icon"></i>
                Delete
              </div>
            </div>
          </button>
        </div>
        <p class="task-description">${task.description}</p>
        <div class="task-time">${customTime(task.startTime)} - ${customTime(task.endTime)}</div>
      </div>
        `
    }).join("");


    if(html.length===0) html=`<div>Không tìm thấy nhiệm vụ vào</div>`
    todoList.innerHTML=html;
}

function openTodoForm(){
    todoForm.className="modal-overlay show"
    setTimeout(()=>{taskTitle.focus()},100)
}

function closeTodoForm(){
    setTimeout(()=>todoForm.querySelector(".modal").scrollTop=0,200)
    
    todoForm.className="modal-overlay"
    todoTask.reset();
}
// Đóng mở form nhập dữ liệu
addBtn.onclick=function(){
    indexEdit=null;
    const modalTitle= todoForm.querySelector('.modal-title')
    modalTitle.textContent=" Add New Task"
    submitBtn.textContent="Create Task"
    openTodoForm();
};
closeBtn.onclick=closeTodoForm;
cancelBtn.onclick=closeTodoForm;

//Submit form
todoTask.onsubmit=function(event){
    event.preventDefault();
    let task=Object.fromEntries(new FormData(todoTask)); 
    task.isCompleted=false;   
    todoTasks=getTaskInLocalstorage();
    if(indexEdit===null){
        if(!todoTasks.find((data)=>data.title===task.title)){
            todoTasks.unshift(task); 
            saveTaskInLocalstorage(todoTasks);  
            renderTasks();
            closeTodoForm();         
        }else{
            alert('Thêm task thất bại, trùng title')
        }       
    }else{
        let newTasks=todoTasks.slice();
        newTasks.splice(indexEdit,1);
        if(!newTasks.find((data)=>data.title===task.title)){
            todoTasks[indexEdit]=task;
            saveTaskInLocalstorage(todoTasks);
            renderTasks();
            closeTodoForm();   
        }else{
            alert('Sửa task thất bại, trùng title')
        }       
    }   
    
}
//render lần đầu
renderTasks()
// Sửa xóa
todoList.onclick=function(event){
    const editBtn=event.target.closest(".edit-btn");
    const completedBtn=event.target.closest(".complete-btn");
    const deleteBtn=event.target.closest(".delete-btn")

    if(deleteBtn){
        let tasks= getTaskInLocalstorage();
        let index= deleteBtn.dataset.index;
        if(confirm("Bạn chắc chắn muốn xóa  công việc này?")){
            let newTasks= tasks.splice(index,1);
            saveTaskInLocalstorage(tasks);
            renderTasks();
        }
    }
    if(completedBtn){
        let tasks= getTaskInLocalstorage();
        let index= completedBtn.dataset.index;
        tasks[index].isCompleted=true;
        saveTaskInLocalstorage(tasks);
        renderTasks();
    }
    if( editBtn){
        let index= editBtn.dataset.index;
        indexEdit=index;
        openTodoForm();
        const modalTitle= todoForm.querySelector('.modal-title')
        modalTitle.textContent=" Edit todo Tasks"
        submitBtn.textContent="Save Edit"
        let task= getTaskInLocalstorage()[index];

        for(let key in task){
            if(key !="isCompleted"){
                const input=$(`[name=${key}]`)
                input.value=task[key];
            }           
        }
    }
}
// chức năng tìm kiếm
searchInput.oninput=function(){
    if(searchInput.value !=null){
        allTaskBtn.className="tab-button active";
        completedBtn.className="tab-button completed-btn";
        activeBtn.className="tab-button ";
        let str= searchInput.value.toString().toLowerCase();
        let todoTasks=getTaskInLocalstorage();
        let newList= todoTasks.filter((task)=> (task.title.toString().toLowerCase().includes(str)||task.description.toString().toLowerCase().includes(str)));
        renderTasks(newList);
    }     
}
//loc complete. active
allTaskBtn.onclick=function(){
    allTaskBtn.className="tab-button active";
    completedBtn.className="tab-button completed-btn";
    activeBtn.className="tab-button ";
    renderTasks();
}
activeBtn.onclick=function(){
    allTaskBtn.className="tab-button";
    completedBtn.className="tab-button completed-btn";
    activeBtn.className="tab-button active";
    let todoTasks=getTaskInLocalstorage();
    let newList= todoTasks.filter((task)=> task.isCompleted===false);
    renderTasks(newList);
}
completedBtn.onclick=function(){
    allTaskBtn.className="tab-button";
    activeBtn.className="tab-button ";
    completedBtn.className="tab-button completed-btn active";
    let todoTasks=getTaskInLocalstorage();
    let newList= todoTasks.filter((task)=> task.isCompleted===true);
    renderTasks(newList);
}

