class CreateActivity {
    constructor(name, date) {
        this.name = name;
        this.date = date;
        this.finished = false;
    }

    Create(id){
        let a = `
        <div class="act" name="act-${id}">
            <div class="act-part chechbox">
                <input type="checkbox" class="act-chechbox">
            </div>
            <div class="act-part title">
                <span class="act-title">${this.name}</span>
            </div>
            <div class="act-part date">
                <span class="act-date">vence: ${this.date}</span>
            </div>
        </div>
        `;
        if(this.finished){
            finishedSpace.insertAdjacentHTML("beforeend", a)
        } else{
            currentSpace.insertAdjacentHTML("beforeend", a);
        }
    }

    Delete(id){
        for (let i = 0; i < allActs.length; i++) {
            if(id == allActs[i]){
                allActs.splice(i, 1);

            }
        }
    }

    set state(state){
        if(this.state){
            this.finished = false;
        } else {
            this.finished = true;
        }
    }
}


const allActs = [];
const addAct = document.querySelector(".add-act");
const createAct = document.getElementById("create-act-window");
const formDataCA = document.querySelector(".create-act__form-data");
const finishedSpace = document.querySelector(".finished-acts");
const currentSpace = document.querySelector(".current-acts");
const dateOff =  document.getElementById("date-off");
const actName = document.getElementById("act-name");


function ReLoadActs(){
    finishedSpace.innerHTML = "";
    currentSpace.innerHTML = "";
    for (let i = 0; i < allActs.length; i++) {
        allActs[i].Create(i);
    }
}

ReLoadActs();



addAct.addEventListener("click", () => {
    createAct.showModal();
})

formDataCA.addEventListener("submit", (e) => {
    e.preventDefault();
    var a = {};

    let formDataAct = new FormData(formDataCA);

    formDataAct.forEach((value,key) => {
        a[key] = value; 
    });

    let actividad = new CreateActivity(a["name"], a["date"]);

    allActs.unshift(actividad);

    createAct.close();

    dateOff.value = "";
    actName.value = "";
    
    ReLoadActs();
})