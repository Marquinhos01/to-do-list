let allLists =  JSON.parse(localStorage.getItem('lists')) || [];
let formList = document.getElementById('create-activity-form');
let listContent = document.querySelector('.secundary-nav__lists-part');

function assignDeleteListEvent(button) {
    button.addEventListener('click', () => {
        dialogDeleteList.showModal();
        listNameId.innerText = button.name;
    });
}

function assignSelectListActs(list) {
    console.log("evento agregado");
    var listNameN = list.className.split(" ")
    list.addEventListener("click", () => {
        for (let i = 0; i < allLists.length; i++) {
            if(listNameN[3] == allLists[i]["listName"]){
                console.log(listNameN[3])
                allActs = allLists[i]["acts"];
                console.log(allActs[0])
                if(allActs[0] == i){
                    ReLoadActs();
                    console.log("mostrando actividades...");
                    break
                } else{
                    allActs.unshift(i)
                    ReLoadActs();
                    console.log("mostrando actividades...");
                    break
                }
            } else{
                // console.error("no se encontro la lista");
                continue};
        }
    })
}

function refreshDeleteEvents() {
    buttonOpenDeleteList = document.querySelectorAll('.delete-list');
    buttonOpenDeleteList.forEach(button => assignDeleteListEvent(button));
    
    listsOptions = document.querySelectorAll(".select-list");
    listsOptions.forEach(list => assignSelectListActs(list));
}

refreshDeleteEvents();

const ListStructure =  (n) => {
    return `
                    <div class="list-container" name="${n}">
                        <div class="list-container__parts icon">
                            <span class="material-symbols-outlined">
                            filter_alt
                            </span>
                        </div>
                        <div class="list-container__parts title select-list ${n}">
                            <p><span>${n}<span></p>
                            <!-- max = 33unidades -->
                        </div>
                        <div class="list-container__parts delete">
                            <button class="delete-list" name="${n}">
                                <span class="material-symbols-outlined">
                                delete
                                </span>
                            </button>
                            <button class="edit-list" name="${n}">
                                <span class="material-symbols-outlined">
                                    tune
                                    </span>
                            </button>
                        </div>
                    </div>
`
}

function CreateList(name) {
    listContent.insertAdjacentHTML('beforeend',ListStructure(name))
};

for(i of allLists){
    let name = i.listName;
    CreateList(name);
}

// create list

formList.addEventListener('submit', (event) => {
    event.preventDefault();
    let formContent = new FormData(formList);
    let list = {
        "acts" : [],
    };
    formContent.forEach((value,key)=>{
            list[key] = value;
            CreateList(value);
    })

    allLists.unshift(list);

    localStorage.setItem('lists', (JSON.stringify(allLists)));

    let b = document.getElementById('submit-listName');
    b.value = "";

    dialog.close();

    refreshDeleteEvents();
})


// searsh list

const searchContent = document.getElementById('list-search');

searchContent.addEventListener('keyup', () => {
    let v = searchContent.value;
    listContent.innerHTML = ""; 

    for (let i = 0; i < allLists.length; i++){
        if((allLists[i].listName).includes(v)){
            CreateList(allLists[i].listName)
        }else{
            continue
        }
    }
    refreshDeleteEvents();
});

