let allLists =  JSON.parse(localStorage.getItem('lists'))?.map(list => new ListConstructor(list.listName, list.acts, list.emogi, list.id)) || [];
let formList = document.getElementById('create-activity-form');
let listContent = document.querySelector('.secundary-nav__lists-part');
let pageWidth = window.innerWidth;

refreshDeleteEvents();

// * It creates the list store in the local storage
for (let i = 0; i < allLists.length; i++) {
    const element = allLists[i];
    element.Id = i;
    element.CreateList();
}

formList.addEventListener('submit', (event) => {
    event.preventDefault();
    let formContent = new FormData(formList);
    let list;
    for (const element of allLists) {
        element.Id += 1;
    }
    formContent.forEach((value)=>{
            list = new ListConstructor(value);
            list.Id = 0;
    })

    allLists.unshift(list);

    listContent.innerHTML = "";
    for (let i = 0; i < allLists.length; i++) {
        const element = allLists[i];
        element.CreateList();
    }

    localStorage.setItem('lists', (JSON.stringify(allLists)));

    let b = document.getElementById('submit-listName');
    b.value = "";

    dialog.close();

    if(allActs.length > 1){
        allActs[0]++;
    }
    
    refreshDeleteEvents();
})

const searchContent = document.getElementById('list-search');

searchContent.addEventListener('keyup', () => {
    let v = searchContent.value;
    listContent.innerHTML = ""; 

    for (let i = 0; i < allLists.length; i++){
        if((allLists[i].listName).includes(v)){ //? <-- Find the list?
            const element = allLists[i];
            element.CreateList();
        }else{
            continue
        }
    }
    refreshDeleteEvents();
    ReLoadActs();
});