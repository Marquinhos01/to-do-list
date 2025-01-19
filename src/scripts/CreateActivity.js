class CreateActivity {
    name;
    date;
    finished;
    id;
    constructor(name, date, finished, id) {
        this.name = name;
        this.date = date;
        this.finished = finished;
        this.id = id;
    }

    Create(){
        let a = `
        <div class="act ${this.id}">
            <div class= "act-part fst" >
                <div class="act-part chechbox">
                    <input type="checkbox" class="act-chechbox ${this.id}">
                </div>
                <div class="act-part title">
                    <p class="act-title">${this.name}</p>
                </div>
                <div class="act-part date">
                    <span class="act-date">${this.date != ""? `vence: ${this.date}` : ""}</span>
                </div>
            </div>
            <div class= "act-part scd">
                <button class="delete-act" name="${this.id}">
                    <span class="material-symbols-outlined">
                    delete
                    </span>
                </button>
            </div>
        </div>
        `;
        if(this.finished){
            finishedSpace.insertAdjacentHTML("beforeend", a)
        } else{
            currentSpace.insertAdjacentHTML("beforeend", a);
        }
    }

    ChangeState(){
        if(this.finished){
            this.finished = false;
        } else {
            this.finished = true;
        }
    }

    set Id(newId){
        this.id = newId;
    }

    get Data(){
        return [this.id ,this.name, this.date]
    }
}