import { useState } from "react"

import "./App.css"

import Square from "./components/square/Square.jsx"
import DrawSymbol from "./components/drawSymbol/DrawSymbol.jsx"

export default function App() {

    const CROSS = Symbol("CROSS")
    const CIRCLE = Symbol("CIRCLE")
    const TIE = Symbol("TIE")
    const ONGOING = Symbol("ONGOING")
    const FINISHED = Symbol("FINISHED")

    const PLAYERS = { [CROSS]: "CROSS", [CIRCLE]: "CIRCLE" }
    const GAME_STATUS = { [ONGOING]: "ONGOING", [FINISHED]: "FINISHED", [TIE]: "TIE" }

    const WINNING_COMBINATIONS = [
        { NAME: "topRow", POSITIONS: [0, 1, 2] },
        { NAME: "middleRow", POSITIONS: [3, 4, 5] },
        { NAME: "bottomRow", POSITIONS: [6, 7, 8] },
        { NAME: "leftColumn", POSITIONS: [0, 3, 6] },
        { NAME: "middleColumn", POSITIONS: [1, 4, 7] },
        { NAME: "rightColumn", POSITIONS: [2, 5, 8] },
        { NAME: "leftDiagonal", POSITIONS: [0, 4, 8] },
        { NAME: "rightDiagonal", POSITIONS: [2, 4, 6] }
    ]

    const EMPTY_SPACE = null;
    // GAME_STATUS = CROSS - CIRCLE - TIE - NONE
    const EMPTY_BOARD = Array(9).fill(EMPTY_SPACE)

    const [board, setBoard] = useState(EMPTY_BOARD)
    const [turn, setTurn] = useState(PLAYERS[CROSS])
    const [gameStatus, setGameStatus] = useState(GAME_STATUS[ONGOING])

    const emptySpacesExist = (updatedBoard, positionsToCheck = EMPTY_SPACE) => {
        return Array.isArray(positionsToCheck) && positionsToCheck.length === 3 ?
            positionsToCheck.some(index => updatedBoard[index] === EMPTY_SPACE) :
            updatedBoard.includes(EMPTY_SPACE)
    }

    const isWinnerWithThisCombination = (updatedBoard, combination) => {
        if (emptySpacesExist(updatedBoard, combination.POSITIONS)) return false
        const [FIRST, SECOND, THIRD] = combination.POSITIONS
        const SQUARES = { FIRST: updatedBoard[FIRST], SECOND: updatedBoard[SECOND], THIRD: updatedBoard[THIRD] }
        return SQUARES.FIRST.props.symbolType === SQUARES.SECOND.props.symbolType &&
            SQUARES.FIRST.props.symbolType === SQUARES.THIRD.props.symbolType
    }

    const checkStatusGame = (updatedBoard) => {
        for (const COMBINATION of WINNING_COMBINATIONS) {
            const IS_WINNER = isWinnerWithThisCombination(updatedBoard, COMBINATION)
            if (IS_WINNER) {
                console.log(`Gano el jugador <<${turn}>>`)
                return setGameStatus(GAME_STATUS[FINISHED])
            }
        }
        const IS_ONGOING = emptySpacesExist(updatedBoard)
        const UPDATED_GAME_STATUS = GAME_STATUS[IS_ONGOING ? ONGOING : TIE]
        console.log(UPDATED_GAME_STATUS)
        return setGameStatus(UPDATED_GAME_STATUS)
    }

    const applyMove = (currentBoard, currentPlayer, squareIndex) => {
        console.log({ board: currentBoard, turn: currentPlayer, index: squareIndex })
        const OPPONENT = currentPlayer === PLAYERS[CROSS] ? CIRCLE : CROSS
        const updatedBoard = Array.from(currentBoard)
        updatedBoard[squareIndex] = <DrawSymbol symbolType={currentPlayer} />
        console.log(updatedBoard)
        setTurn(PLAYERS[OPPONENT])
        setBoard(updatedBoard)
        checkStatusGame(updatedBoard)
    }

    const canPlayerMark = (spaceToMark, currentGameStatus) => {
        return spaceToMark === EMPTY_SPACE && currentGameStatus === GAME_STATUS[ONGOING]
    }

    const attemptToMark = (spaceIndex) => {
        const SPACE_TO_MARK = board[spaceIndex]
        const IS_ABLE_TO_MARK = canPlayerMark(SPACE_TO_MARK, gameStatus)
        if (IS_ABLE_TO_MARK) applyMove(board, turn, spaceIndex)
    }

    return (
        <div className="container">
            {board.map((markOrEmpty, squareIndex) =>
                <Square key={squareIndex} index={squareIndex} attemptToMark={attemptToMark}>
                    {markOrEmpty}
                </Square>
            )}
        </div>
    )

}
