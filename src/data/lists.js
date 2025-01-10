let allLists =  JSON.parse(localStorage.getItem('lists')) || [];
let formList = document.getElementById('create-activity-form');
let listContent = document.querySelector('.secundary-nav__lists-part');
let pageWidth = window.innerWidth;

refreshDeleteEvents();

// * It creates the list store in the local storage
for (let i = 0; i < allLists.length; i++) {
    const element = allLists[i];
    CreateList(i, element.listName)
}

formList.addEventListener('submit', (event) => {
    event.preventDefault();
    let formContent = new FormData(formList);
    let list = {
        "acts" : [],
    };
    formContent.forEach((value,key)=>{
            list[key] = value;
    })

    allLists.unshift(list);

    listContent.innerHTML = "";
    for (let i = 0; i < allLists.length; i++) {
        const element = allLists[i];
        CreateList(i, element.listName)
    }

    localStorage.setItem('lists', (JSON.stringify(allLists)));

    let b = document.getElementById('submit-listName');
    b.value = "";

    dialog.close();

    refreshDeleteEvents();
})

const searchContent = document.getElementById('list-search');

searchContent.addEventListener('keyup', () => {
    let v = searchContent.value;
    listContent.innerHTML = ""; 

    for (let i = 0; i < allLists.length; i++){
        if((allLists[i].listName).includes(v)){ //? <-- Find the list?
            CreateList(i, allLists[i].listName)
        }else{
            continue
        }
    }
    refreshDeleteEvents();
    ReLoadActs();
});