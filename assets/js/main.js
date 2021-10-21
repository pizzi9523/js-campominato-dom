/*L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata,
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.*/

/*ELEMENTO DOM*/
const containerElement = document.querySelector(".container")
const playButtonElement = document.getElementById("play")
const selectElement = document.getElementById("difficulty")
let flag = 0;

//L'utente indica un livello di difficoltà


//console.log(user_choice_difficult);
playButtonElement.addEventListener("click", function () {
    let user_choice_difficult = selectElement.value;
    console.log(user_choice_difficult);

    let cell_number = selectLevel(user_choice_difficult)

    //QUESTE DUE RIGHE MI HANNO FATTO IMPAZZIRE
    containerElement.innerHTML = ""
    createGridClick(cell_number)
    //console.log(cell_number);

})

function selectLevel(user_choice_difficult) {
    //In base alla scelta do una dimensione alla griglia
    let cell_number;
    if (user_choice_difficult == 1) {
        cell_number = 100;
        containerElement.style.width = "1000px"
        return cell_number;
    } else if (user_choice_difficult == 2) {
        cell_number = 81;
        containerElement.style.width = "900px"
        return cell_number;
    } else if (user_choice_difficult == 3) {
        cell_number = 49;
        containerElement.style.width = "700px"
        return cell_number;
    }
}

//Creo la griglia cliccabile in base al valore passato
function createGridClick(cell_number) {
    for (let i = 1; i <= cell_number; i++) {
        let gridElement = document.createElement("div")
        gridElement.className = "grid_cell"
        gridElement.innerHTML = i
        containerElement.append(gridElement)

        gridElement.addEventListener("click", function () {
            //console.log(this);
            this.classList.add("clicked")
        })
    }
}

