import { useState } from "react"

import "./App.css"

import Space from "./components/space/Space.jsx"
import DrawSymbol from "./components/drawSymbol/DrawSymbol.jsx"

export default function App() {

    const CROSS = Symbol("CROSS")
    const CIRCLE = Symbol("CIRCLE")

    const PLAYERS = { [CROSS]: "CROSS", [CIRCLE]: "CIRCLE" }
    
    const EMPTY_SPACE = null;
    const EMPTY_BOARD = Array(9).fill(EMPTY_SPACE)

    const [board, setBoard] = useState(EMPTY_BOARD)
    const [turn, setTurn] = useState(PLAYERS[CROSS])

    console.log("Rendering...");

    const applyMove = (currentBoard, currentPlayer, squareIndex) => {
        console.log({ board: currentBoard, turn: currentPlayer, index: squareIndex });
        const OPPONENT = currentPlayer === PLAYERS[CROSS] ? CIRCLE : CROSS
        const updatedBoard = Array.from(currentBoard)
        updatedBoard[squareIndex] = <DrawSymbol figure={currentPlayer} />
        console.log(updatedBoard)
        setTurn(PLAYERS[OPPONENT])
        setBoard(updatedBoard)
    }

    const attemptToMark = (spaceIndex) => {
        const spaceToMark = board[spaceIndex]
        if (spaceToMark === EMPTY_SPACE) {
            applyMove(board, turn, spaceIndex)
        } else {
            console.log("Espacio ya ocupado por un Jugador");
        }
    }

    return (
       <div className="container">
            {board.map((markOrEmpty, squareIndex) => (
                <Space key={squareIndex} index={squareIndex} attemptToMark={attemptToMark}>
                    {markOrEmpty}
                </Space>
            ))}
        </div>
    )

}
