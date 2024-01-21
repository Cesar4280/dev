import { useState } from "react"

import "./App.css"


import Space from "./components/space/Space"
import DrawSymbol from "./components/drawSymbol/DrawSymbol.jsx"

export default function App() {

    const CROSS = Symbol("CROSS")
    const CIRCLE = Symbol("CIRCLE")

    const TURNS = { [CROSS]: "CROSS", [CIRCLE]: "CIRCLE" }
    
    const EMPTY_SPACE = null;
    const EMPTY_BOARD = Array(9).fill(EMPTY_SPACE)

    const [board, setBoard] = useState(EMPTY_BOARD)
    const [symbol, setSymbol] = useState(TURNS[CROSS])

    const applyMove = (currentBoard, currentTurn, squareIndex) => {
        const NEXT_TURN = currentTurn === TURNS[CROSS] ? CIRCLE : CROSS
        const updatedBoard = Array.from(currentBoard)
        updatedBoard[squareIndex] = <DrawSymbol figure={symbol} />
        console.log(updatedBoard);
        setSymbol(NEXT_TURN)
        setBoard(updatedBoard)
    }

    const attemptToMark = (spaceIndex) => {
        const spaceToMark = board[spaceIndex]
        if (spaceToMark === EMPTY_SPACE) {
            console.log("before applyMove()");
            applyMove(board, symbol, spaceIndex)
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
