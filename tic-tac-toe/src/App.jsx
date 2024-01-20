import { useState } from "react"

import "./App.css"

import Cross from "./components/cross/Cross.jsx"
import Circle from "./components/circle/Circle.jsx"
import Space from "./components/space/Space"

export default function App() {

    // <Board viewport={{ width: 462.728, height: 464.652 }} design={{ fill: "#000", stroke: "#1e1e1e", strokeLinecap: "round", strokeWidth: 4 }} />

    const CROSS = Symbol("CROSS")
    const CIRCLE = Symbol("CIRCLE")

    const TURNS = {
        [CROSS]: <Cross viewport={{ width: 190, height: 190 }} design={{ fill: "#e91f64" }} />,
        [CIRCLE]: <Circle viewport={{ width: 176, height: 132 }} design={{ fill: "#0ea5e9" }} />
    }

    console.log(TURNS[CROSS] === TURNS[CROSS])

    console.log(TURNS[CROSS])
    console.log(TURNS[CROSS])
    console.log(TURNS[CROSS])

    console.log(TURNS[CROSS] === TURNS[CROSS])


    const EMPTY_SPACE = null;
    const EMPTY_BOARD = Array(9).fill(EMPTY_SPACE)

    const [board, setBoard] = useState(EMPTY_BOARD)
    const [symbol, setSymbol] = useState(TURNS[CROSS])

    const attemptToMark = (spaceIndex) => {
        const spaceToMark = board[spaceIndex]
        if (spaceToMark === EMPTY_SPACE) {
            const PLAYER = symbol === TURNS[CROSS] ? CIRCLE : CROSS
            const NEXT_SYMBOL = TURNS[PLAYER]
            const updatedBoard = Array.from(board)
            updatedBoard[spaceIndex] = symbol
            setSymbol(NEXT_SYMBOL)
            setBoard(updatedBoard)
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
