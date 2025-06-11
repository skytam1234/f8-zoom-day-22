$=document.querySelector.bind(document)
$$=document.querySelectorAll.bind(document)
const addBtn= $(".add-btn")
const  addTaskForm=$("#addTaskModal")
const closeTask=$(".modal-close");
const firstInputElement=$(".todo-app-form .form-group:first-child input")
const cancelBtn=$(".modal-footer button:first-child ")
const submitFormBtn=$(".modal-footer button:nth-child(2) ")

const formToDoTask=$(".todo-app-form")

const titleTask=$("#taskTitle")
const taskDescription=$("#taskDescription")
const taskCategory=$("#taskCategory")
const taskPriority=$("#taskPriority")
const startTime=$("#startTime")
const endTime=$("#endTime")
const taskDate=$("#taskDate")
const taskColor=$("#taskColor")
const taskGrid=$(".task-grid")

const todoTasks = []

//dựng đối tượng NewTask
function NewTask(){
    this.title,
    this.description,
    this.category,
    this.priority,
    this.startTime,
    this.endTime,
    this.DueDate,
    this.cardColor,
    this.isCompleted=false;
}


function getDataTask(){
    let newData= new NewTask();
        newData.title=titleTask.value;
        newData.description=taskDescription.value;
        newData.category=taskCategory.value;
        newData.priority=taskPriority.value;
        newData.startTime=startTime.value;
        newData.endTime=endTime.value;
        newData.DueDate=taskDate.value;
        newData.cardColor=taskColor.value;
return newData;
}

//mở form
addBtn.onclick=function(){
    addTaskForm.className="modal-overlay show";
    setTimeout(() => {
        firstInputElement.focus();
    }, 200);
}
//đóng form
closeTask.onclick=function(){
    formToDoTask.reset(); 
    addTaskForm.className="modal-overlay";   
}
cancelBtn.onclick=function(){
    formToDoTask.reset(); 
    addTaskForm.className="modal-overlay";
}

//Bắt sự kiện và Ngăn chặn hành vi submit mặc định của form
formToDoTask.onsubmit=function(event){
    event.preventDefault();   
}
//Thêm task vào todoTasks, reset form, đóng form nhập
submitFormBtn.onclick=function (){
    let dataTask= getDataTask();
    if(dataTask.title.toString().trim()===""||dataTask.description.toString().trim()===""||dataTask.category.toString().trim()===""||dataTask.priority.toString().trim()===""
    ||dataTask.startTime.toString().trim()===""||dataTask.endTime.toString().trim()===""||dataTask.DueDate.toString().trim()===""||dataTask.cardColor.toString().trim()===""){
        
    }else{
        let checkTime= checkDateTime(dataTask.DueDate,dataTask.startTime,dataTask.endTime);
        if(checkTime){
            todoTasks.unshift(dataTask);
            renderTasks()
            formToDoTask.reset(); 
            addTaskForm.className="modal-overlay";
        }        
    }    
}
//Hàm renderTasks()
function renderTasks(){
  let oldHtml=`<!-- Team Meeting Card -->
            <div class="task-card blue completed">
                <div class="task-header">
                    <h3 class="task-title">Team Meeting</h3>
                    <button class="task-menu">
                        <i class="fa-solid fa-ellipsis fa-icon"></i>
                        <div class="dropdown-menu">
                            <div class="dropdown-item">
                                <i class="fa-solid fa-pen-to-square fa-icon"></i>
                                Edit
                            </div>
                            <div class="dropdown-item complete">
                                <i class="fa-solid fa-check fa-icon"></i>
                                Mark as Active
                            </div>
                            <div class="dropdown-item delete">
                                <i class="fa-solid fa-trash fa-icon"></i>
                                Delete
                            </div>
                        </div>
                    </button>
                </div>
                <p class="task-description">Lorem ipsum dolor sit amet, consectetur elit tddv niorem ldfsfrfj.</p>
                <div class="task-time">10:30 AM - 12:00 PM</div>
            </div>

            <!-- Work on Branding Card -->
            <div class="task-card purple">
                <div class="task-header">
                    <h3 class="task-title">Work on Branding</h3>
                    <button class="task-menu">
                        <i class="fa-solid fa-ellipsis fa-icon"></i>
                        <div class="dropdown-menu">
                            <div class="dropdown-item">
                                <i class="fa-solid fa-pen-to-square fa-icon"></i>
                                Edit
                            </div>
                            <div class="dropdown-item complete">
                                <i class="fa-solid fa-check fa-icon"></i>
                                Mark as Complete
                            </div>
                            <div class="dropdown-item delete">
                                <i class="fa-solid fa-trash fa-icon"></i>
                                Delete
                            </div>
                        </div>
                    </button>
                </div>
                <p class="task-description">Lorem ipsum dolor sit amet, consectetur elit tddv niorem ldfsfrfj.</p>
                <div class="task-time">10:30 AM - 12:00 PM</div>
            </div>

            <!-- Make a Report Card -->
            <div class="task-card yellow">
                <div class="task-header">
                    <h3 class="task-title">Make a Report for client</h3>
                    <button class="task-menu">
                        <i class="fa-solid fa-ellipsis fa-icon"></i>
                        <div class="dropdown-menu">
                            <div class="dropdown-item">
                                <i class="fa-solid fa-pen-to-square fa-icon"></i>
                                Edit
                            </div>
                            <div class="dropdown-item complete">
                                <i class="fa-solid fa-check fa-icon"></i>
                                Mark as Complete
                            </div>
                            <div class="dropdown-item delete">
                                <i class="fa-solid fa-trash fa-icon"></i>
                                Delete
                            </div>
                        </div>
                    </button>
                </div>
                <p class="task-description">Lorem ipsum dolor sit amet, consectetur elit tddv niorem ldfsfrfj.</p>
                <div class="task-time">10:30 AM - 12:00 PM</div>
            </div>

            <!-- Create a planer Card -->
            <div class="task-card pink">
                <div class="task-header">
                    <h3 class="task-title">Create a planer</h3>
                    <button class="task-menu">
                        <i class="fa-solid fa-ellipsis fa-icon"></i>
                        <div class="dropdown-menu">
                            <div class="dropdown-item">
                                <i class="fa-solid fa-pen-to-square fa-icon"></i>
                                Edit
                            </div>
                            <div class="dropdown-item complete">
                                <i class="fa-solid fa-check fa-icon"></i>
                                Mark as Complete
                            </div>
                            <div class="dropdown-item delete">
                                <i class="fa-solid fa-trash fa-icon"></i>
                                Delete
                            </div>
                        </div>
                    </button>
                </div>
                <p class="task-description">Lorem ipsum dolor sit amet, consectetur elit tddv niorem ldfsfrfj.</p>
                <div class="task-time">10:30 AM - 12:00 PM</div>
            </div>

            <!-- Create Treatment Plan Card -->
            <div class="task-card green">
                <div class="task-header">
                    <h3 class="task-title">Create Treatment Plan</h3>
                    <button class="task-menu">
                        <i class="fa-solid fa-ellipsis fa-icon"></i>
                        <div class="dropdown-menu">
                            <div class="dropdown-item">
                                <i class="fa-solid fa-pen-to-square fa-icon"></i>
                                Edit
                            </div>
                            <div class="dropdown-item complete">
                                <i class="fa-solid fa-check fa-icon"></i>
                                Mark as Complete
                            </div>
                            <div class="dropdown-item delete">
                                <i class="fa-solid fa-trash fa-icon"></i>
                                Delete
                            </div>
                        </div>
                    </button>
                </div>
                <p class="task-description">Lorem ipsum dolor sit amet, consectetur elit tddv niorem ldfsfrfj.</p>
                <div class="task-time">10:30 AM - 12:00 PM</div>
            </div>`;
 let html=  todoTasks.map((task)=>{
            return `<div class="task-card ${task.cardColor} ${task.isCompleted?task.isCompleted:""}">
                        <div class="task-header">
                            <h3 class="task-title">${task.title}</h3>
                            <button class="task-menu">
                            <i class="fa-solid fa-ellipsis fa-icon"></i>
                            <div class="dropdown-menu">
                                <div class="dropdown-item">
                                    <i class="fa-solid fa-pen-to-square fa-icon"></i>
                                    Edit
                                </div>
                                <div class="dropdown-item complete">
                                    <i class="fa-solid fa-check fa-icon"></i>
                                    Mark as Complete
                                </div>
                                <div class="dropdown-item delete">
                                    <i class="fa-solid fa-trash fa-icon"></i>
                                    Delete
                                </div>
                            </div>
                            </button>
                        </div>
                        <p class="task-description">${task.description}</p>
                        <div class="task-time">${customTime(task.startTime)} -${customTime(task.endTime)}</div>
                    </div>`
                }).join(" ");
    
taskGrid.innerHTML= html + oldHtml;
}
//Hàm kiểm tra thời gian
function checkDateTime(date, timeStart, timeEnd){

    console.log(timeStart)
    if(new Date(date)<new Date) {
        alert("Bạn cần nhập thời  gian lớn hơn hoặc bằng hôm nay");
        return false;
    };
    if(timeStart>=timeEnd){
        alert("Thời gian kết thúc phải lớn hơn thời gian bắt đầu");
        return false;
    };
    return true;
}
//Hàm đưa ra định dạng thời gian
function customTime(time){
    let result="";
    let arr=time.toString().split(":");
    if(arr[0]>12) return result= `${(arr[0]-12).toString().padStart(2,'0')}:${arr[1]} PM`;
    if(arr[0]<=12) return result= `${arr[0]}:${arr[1]} AM`;
}


