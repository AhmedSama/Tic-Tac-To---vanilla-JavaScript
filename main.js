// VARIABLES
let cells = document.querySelectorAll(".cell")
cells = Array.from(cells)
const winContainer = document.getElementById("win")
const winText = document.getElementById("win-text")
const restartBtn = document.getElementById("restart-btn")
// STATES
let turn = null
let winner = null
let grid = null
const winStates = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// FUNCTIONS
const changeTurn = () => {
    turn = turn === "x" ? "o" : "x"
}

const checkWin = () => {
    for(let i = 0; i < winStates.length; i++){
        const [x,y,z] = winStates[i]
        if(grid[x] !== "" && grid[x] === grid[y] && grid[x] === grid[z]){
            return turn
        }
    }
    return null
}

const start = () => {
    grid = Array(9).fill("")
    turn = "x"
    winner = null
    winContainer.classList.remove("active")
    cells.forEach(cell=>{
        cell.innerText = ""
    })
}

// EVENT LISTENERS
cells.forEach(cell=>{
    cell.addEventListener("click",()=>{
        if(cell.innerText !== "" || winner) return
        cell.innerText = turn
        grid[Number(cell.dataset.index)] = turn
        winner = checkWin()
        if(winner !== null){
            winContainer.classList.add("active")
            winText.innerText = "The winner is "
            const winnerElement = document.createElement("span")
            winnerElement.classList.add("winner")
            winnerElement.innerText = turn.toUpperCase()
            winText.appendChild(winnerElement)
        }
        changeTurn()
    })
})



restartBtn.addEventListener("click",start)




start()

