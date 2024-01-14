const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
let btnAdd = $('#app_add--btn')
let inputAdd = $('#app_add--input')
let listTask = $('#app_taskList')
let formApp = $('#app')
let btnAll = $('#All')
let btnDone = $('#Done')
let btnUndone = $('#Undone')
let tabs = $$('.menu_tool--item')
let arrTemp = []

let count = 4

let todoList = [{
    id: 1,
    name: "item1",
    done: true
},
{
    id: 2,
    name: "item2",
    done: true
},
{
    id: 3,
    name: "item3",
    done: false
},
{
    id: 4,
    name: "item4",
    done: false
}
]



let addEventHandle = (e) => {
    count = count + 1
    let newItem = {
        id: count,
        name: inputAdd.value,
        done: false
    }
    todoList.unshift(newItem)
    inputAdd.focus()
    $('.menu_tool--item.active').classList.remove('active')
    btnAll.classList.add('active')
    Render(todoList)
}
let saveTabbedArray = (status) => {
    arrTemp = todoList.filter((item) => {
    return item.done === status
    })
    Render(arrTemp)
}
btnAdd.addEventListener('click', addEventHandle)

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        $('.menu_tool--item.active').classList.remove('active')
        tab.classList.add('active')
        switch(index){
            case 0 : 
            Render(todoList)
            break;
            case 1 : 
            saveTabbedArray(true)
            break;
            case 2 : 
            saveTabbedArray(false)
            break;
        }
    })
})

function Render(arrList) {
    console.log(arrList)
    listTask.innerHTML = arrList.map((item) => {
        if(item.done == true){
            return `
            <li class="app_taskList--item done">
                       <h2 class="nameTask">${item.name}</h2>
                       <div class="Task_tool">
                        <i class="fa-solid fa-trash trash" style="color: rgb(252, 59, 59);"></i>
                        <i class="fa-solid fa-pen-to-square edit" style="color: aquamarine;"></i>
                       </div>
                    </li>
            `
        }else{
            return `
            <li class="app_taskList--item">
                       <h2 class="nameTask">${item.name}</h2>
                       <div class="Task_tool">
                        <i class="fa-solid fa-trash trash" style="color: rgb(252, 59, 59);"></i>
                        <i class="fa-solid fa-pen-to-square edit" style="color: aquamarine;"></i>
                       </div>
                    </li>
            `
        }
    }).join('')

    let items = $$('.app_taskList--item')
    items.forEach((element,index) => {
        let btnTrash = element.querySelector('.trash')
        let btnEdit = element.querySelector('.edit')
        let formEdit = $('.app_edit')
        let btnDone = $('#Done')
        let btnUnDone = $('#Undone')
        let formEdit_nameTask = $('.app_edit--name')
        let formEdit_status = $('.app_edit--status')
        let formEdit_btnsave = formEdit.querySelector('.app_edit--save')
        let formEdit_close = formEdit.querySelector('.close')
        
        let resetMainList = (elementCheck) => {
            todoList.forEach((element,index) => {
                if(element.id == elementCheck){
                    todoList.splice(index,1)
                }
            })

        }
        let TrashHandle = () => {
            resetMainList(arrList[index].id)
            if(arrList !== todoList){
                arrList.splice(index, 1)
            }
            Render(arrList)
            
        }

        btnTrash.addEventListener('click', TrashHandle) 
        let EditHandle = (event) => {
            event.stopPropagation();
            let btnSaveHandler = () => {
                arrList[index].name = formEdit_nameTask.value;
                arrList[index].done = formEdit_status.checked;
                formEdit.classList.remove('display');
                formApp.classList.remove('test');
                if (btnUnDone.classList.contains("active")) {
                    saveTabbedArray(false);
                } else if (btnDone.classList.contains("active")) {
                    saveTabbedArray(true);
                } else {
                    Render(todoList);
                }
                formEdit_btnsave.removeEventListener('click', btnSaveHandler);
            };
        
            let btnCloseHandler = () => {
                formEdit.classList.remove('display');
                formApp.classList.remove('test');
                Render(arrList);
                formEdit_close.removeEventListener('click', btnCloseHandler);
                formEdit_btnsave.removeEventListener('click', btnSaveHandler); 
            };

            

            
        
            formEdit_close.addEventListener('click', btnCloseHandler);
            formEdit_btnsave.addEventListener('click', btnSaveHandler);
        
            formEdit.classList.add('display');
            formApp.classList.add('test');
            formEdit_nameTask.value = arrList[index].name;
            formEdit_status.checked = arrList[index].done;

            let outsideClickHandler = (event) => {
                if (!formEdit.contains(event.target)) {
                    formEdit.classList.remove('display');
                    formApp.classList.remove('test');
                    Render(arrList);
                    btnEdit.removeEventListener('click', EditHandle);
                    document.removeEventListener('mousedown', outsideClickHandler);
                    formEdit_close.removeEventListener('click', btnCloseHandler);
                    formEdit_btnsave.removeEventListener('click', btnSaveHandler);
                }
            };
            document.addEventListener('click', outsideClickHandler);
        };
        btnEdit.addEventListener('click', EditHandle);
          


});
}

Render(todoList)




