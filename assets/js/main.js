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
const esitoELement = document.querySelector(".esito")
let contatore = 0;
let flag = 0;

//L'utente indica un livello di difficoltà
playButtonElement.addEventListener("click", function () {
    let user_choice_difficult = selectElement.value;
    let cell_number = selectLevel(user_choice_difficult)
    //console.log(user_choice_difficult);

    contatore = 0;
    esitoELement.innerHTML = ""
    containerElement.innerHTML = ""
    createGridClick(cell_number)
    let bombs = generateBomb(cell_number)
    console.log(bombs);

    const gridElements = document.getElementsByClassName("grid_cell")

    for (let i = 0; i < gridElements.length; i++) {
        const gridElement = gridElements[i];

        gridElement.addEventListener("click", function abc(e) {
            //console.log(this);

            let cella_number = parseInt(this.innerText)

            if (verifyBomb(cella_number, bombs)) {
                this.classList.add("bomb")
                console.log(contatore)
                for (let i = 0; i < bombs.length; i++) {
                    document.getElementsByClassName("grid_cell").item(bombs[i] - 1).classList.add("clicked");
                    document.getElementsByClassName("grid_cell").item(bombs[i] - 1).classList.add("bomb");
                    document.getElementsByClassName("grid_cell").item(bombs[i] - 1).innerHTML = `<i class="fas fa-bomb"></i>`
                }
                esitoELement.innerHTML = `GAME OVER <br> PUNTEGGIO: ${contatore}`
                esitoELement.style.color = "red"
            }

            if (!this.classList.contains("clicked")) {
                this.classList.add("clicked")
                this.innerHTML = `<i class="fas fa-check"></i>`
                contatore++;
                //console.log(cell_number);
                if (contatore == cell_number - 16) {
                    esitoELement.innerHTML = `GAME OVER <br> PUNTEGGIO: ${contatore} <br> HAI VINTO`
                    esitoELement.style.color = "green"
                    for (let i = 0; i < bombs.length; i++) {
                        document.getElementsByClassName("grid_cell").item(bombs[i] - 1).classList.add("clicked");
                        document.getElementsByClassName("grid_cell").item(bombs[i] - 1).classList.add("bomb");
                        document.getElementsByClassName("grid_cell").item(bombs[i] - 1).innerHTML = `<i class="fas fa-bomb"></i>`
                    }
                    for (let i = 0; i < cell_number; i++) {
                        document.getElementsByClassName("clicked").item(i).classList.add("win")
                    }
                }
            }
        })

    }
})

function verifyBomb(cell_number, bombs) {
    if (bombs.includes(cell_number)) {
        return true;
    }
    return false;
}


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
    }
}

function generateBomb(cell_number) {
    let bombs = []
    for (let i = 0; i < 16; i++) {
        let bomb = Math.floor(Math.random() * cell_number) + 1
        if (bombs.includes(bomb)) {
            //console.log(bomb);
            i--;
        }
        else {
            bombs.push(bomb)
        }


    }
    return bombs.sort(function (a, b) { return a - b });
}
