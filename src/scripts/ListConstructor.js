class ListConstructor{
    listName;
    acts = [];
    emogi;
    id;

    constructor(listName, acts, emogi, id){
        this.listName = listName;
        this.acts = acts ? acts : [];
        this.emogi = emogi;
        this.id = id;
    }

    set listName(newName) {
        this.listName = newName;
    }
    set Acts(newActs) {
        this.acts = newActs;
    }
    set Emoji(newEmoji) {
        this.emogi = newEmoji;
    }
    set Id(newId) {
        this.id = newId;
    }
    get Id() {
        return this.id;
    }
    get listName() {
        return this.listName;
    }
    get Acts() {
        return this.acts;
    }
    get Emogi() {
        return this.emogi;
    }

    get AllData(){
        return[this.listName, this.acts, this.emogi, this.id];
    }

    DeleteAct(idAct){
        this.acts.splice(idAct, 1);
    }

    CreateList(){
        const structure = `
        <div class="list-container" name="${this.id}">
            <div class="list-container__parts icon">
                <span class="material-symbols-outlined">
                filter_alt
                </span>
            </div>
            <div class="list-container__parts title select-list ${this.id}">
                <p><span>${this.listName}<span></p>
                <!-- max = 33unidades -->
            </div>
            <div class="list-container__parts delete">
                <button class="delete-list" name="${this.id}">
                    <span class="material-symbols-outlined">
                    delete
                    </span>
                </button>
                <button class="edit-list" name="${this.id}">
                    <span class="material-symbols-outlined">
                        tune
                        </span>
                </button>
            </div>
        </div>
        `
        listContent.insertAdjacentHTML('beforeend', structure);
    }
}