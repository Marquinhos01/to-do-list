// * ReLoadActs pero por fecha en vez de hacerlo por orden de creacion
// * setea todas las actividades como Activity --> guarda esa info en allActs y las sube al local storage y a la lista.
function ReLoadActs(){
    finishedSpace.innerHTML = "";
    currentSpace.innerHTML = "";
    if (allActs.length > 1){ //? are activities inside  ? 
        let f = allActs.map((e) => new Activity(e.name, e.date, e.finished,e.id,e.description)) //* <-- Assign the class for each activity.
        let g = allActs.slice(0, 1)
        
        allActs.splice(0, allActs.length)
        allActs = f.slice(1, f.length);
        allActs.unshift(g[0]);

        for (let i = 1; i < allActs.length; i++) {
            allActs[i].Id = i;
            allActs[i].Create();
        }
        // * cada que se refresque la zona de actividades se verficara si esta o no el filtro por fecha
        const checkboxChangeStateActs = document.querySelectorAll(".act-checkbox");
        checkboxChangeStateActs.forEach(checkbox => AssignEventOfCompleteAct(checkbox));
        allLists[(allActs[0])].Acts = allActs;
        localStorage.setItem('lists', (JSON.stringify(allLists)));
        
        actsFilterByDate = document.getElementById("acts-filter");
        if(actsFilterByDate.value == "date"){
            OrderActsByDate();
        }
    }
};

function OrderActsByDate() {
    finishedSpace.innerHTML = "";
    currentSpace.innerHTML = "";

    const makingNewOrder = new Promise((resolve, reject) => {
        try {
            actsOrder = allActs.filter(a => a.date !="");
            actsOrder.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            let actsWithoutDate = allActs.filter(a => a.date == "");

            actsOrder = actsOrder.concat(actsWithoutDate);

            resolve(actsOrder)
        } catch (error) {
            reject("Error al ordenar los actos: " + error.message);
        }
    });

    makingNewOrder
        .then(value => {
            for (let i = 1; i < value.length; i++) {
                value[i].Create();
            }
            refreshDeleteEvents();
        })
        .catch(err => console.error(err));
};

function assignDeleteListEvent(type, button) {
    const listNameId = document.querySelector('.list-name-id');
    button.addEventListener('click', () => {
        dialogDeleteList.showModal();
        listNameId.innerText = type + ':' + button.name;
    });
};

// * Assign the complete option to the acts
function AssignEventOfCompleteAct(checkbox) {
    const checkboxActId = checkbox.className.split(" ");
    checkbox.addEventListener("click", () => {
        allActs[checkboxActId[2]? checkboxActId[2] : checkboxActId[1]].ChangeState();
        ReLoadActs();
        const buttonOpenDeleteAct = document.querySelectorAll('.delete-act');
        buttonOpenDeleteAct.forEach(button => assignDeleteListEvent('act', button));
        const openBtn = document.querySelectorAll(".open-modify-act-space");
        openBtn.forEach(btn => {
            btn.addEventListener("click", ()=>{
                aside.style.display = "flex";
                actSelectedMD = allActs[btn.name];
                nameSpace.value = actSelectedMD.Name;
                dateSpace.value = actSelectedMD.Date;
                detailsSpace.value = actSelectedMD.Description?actSelectedMD.Description:"";
            })
        });
    })
};

// * This function assign for each list an event --> Show his acts 
function assignSelectListActs(list) {
    const listNameN = list.className.split(" "); // ? <-- separa las clases para luego seleccionar solo la que necesita (la última)
    list.addEventListener("click", () => {
        for (let i = 0; i < allLists.length; i++) {
            if(listNameN[3] == i){
                allActs = allLists[i]["acts"];
                if(allActs[0] == i){
                    ReLoadActs();
                    pageWidth = window.innerWidth;
                    if(pageWidth <= 1160){
                        secondNav.classList.remove("active");
                    }
                    refreshDeleteEvents();
                    break
                } else{
                    allActs.shift();
                    allActs.unshift(i)
                    ReLoadActs();
                    pageWidth = window.innerWidth;
                    if(pageWidth <= 1160){
                        secondNav.classList.remove("active");
                    }
                    break
                }
            } else{
                continue
            };
        }
    })
};

function AssignChangeListName(button) {
    button.addEventListener("click", ()=>{
        const id = button.name;

        allLists[id].listName = prompt("cual sera el nuevo nombre?");

        const listContent = document.querySelector('.secundary-nav__lists-part');
        listContent.innerHTML = "";

        for (let i = 0; i < allLists.length; i++) {
            const element = allLists[i];
            element.CreateList();
        }

        localStorage.setItem('lists', (JSON.stringify(allLists)));
        
        refreshDeleteEvents();
        ReLoadActs();
    })
}

// * Reune las dos funciones para asignar eventos (deletelist, listoptions)
function refreshDeleteEvents() {
    const buttonOpenDeleteList = document.querySelectorAll('.delete-list');
    buttonOpenDeleteList.forEach(button => assignDeleteListEvent('list', button));
    
    const buttonOpenDeleteAct = document.querySelectorAll('.delete-act');
    buttonOpenDeleteAct.forEach(button => assignDeleteListEvent('act', button));

    const changeListName = document.querySelectorAll(".edit-list");
    changeListName.forEach(button => AssignChangeListName(button));

    const listsOptions = document.querySelectorAll(".select-list");
    listsOptions.forEach(list => assignSelectListActs(list));

    const checkboxChangeStateActs = document.querySelectorAll(".act-checkbox");
    checkboxChangeStateActs.forEach(checkbox => AssignEventOfCompleteAct(checkbox));

    const actName = document.querySelectorAll(".act-part.title");
    actName.forEach(checkbox => AssignEventOfCompleteAct(checkbox));

    const openBtn = document.querySelectorAll(".open-modify-act-space");
    openBtn.forEach(btn => {
        btn.addEventListener("click", ()=>{
            aside.style.display = "flex";
            actSelectedMD = allActs[btn.name];
            nameSpace.value = actSelectedMD.Name;
            dateSpace.value = actSelectedMD.Date;
            detailsSpace.value = actSelectedMD.Description?actSelectedMD.Description:"";
        })
    });
};