import { useState } from "react"
import { useCounter } from "./hooks/useCounter.js"

import "./App.css"

import DisplayTurn from "./components/displayTurn/DisplayTurn.jsx"
import Square from "./components/square/Square.jsx"
import DrawSymbol from "./components/drawSymbol/DrawSymbol.jsx"
import Modal from "./components/modal/Modal.jsx"

import { EMPTY, EMPTY_BOARD, INITIAL_SCORE } from "./constants/initialValues.js"

import {
    CROSS,
    CIRCLE,
    ONGOING,
    FINISHED_WITH_WINNER,
    FINISHED_WITH_TIE
} from "./constants/symbols.js"

import { PLAYERS, GAME_STATUS, WINNING_COMBINATIONS } from "./constants/directories.js"

import {
    calculateOpponent,
    canPlayerMark,
    emptySpacesExist,
    isWinnerWithThisCombination
} from "./utils/logic.js"

export default function App() {

    // useStates
    const [board, setBoard] = useState(EMPTY_BOARD)
    const [turn, setTurn] = useState(PLAYERS[CROSS])
    const [gameStatus, setGameStatus] = useState(GAME_STATUS[ONGOING])

    // custom hooks
    const croosScore = useCounter(INITIAL_SCORE)
    const circleScore = useCounter(INITIAL_SCORE)
    const tieScore = useCounter(INITIAL_SCORE)

    const attemptToMark = (spaceIndex) => {
        const SPACE_TO_MARK = board[spaceIndex]
        const IS_ABLE_TO_MARK = canPlayerMark(SPACE_TO_MARK, gameStatus)
        if (IS_ABLE_TO_MARK) applyMove(board, turn, spaceIndex)
    }

    const applyMove = (currentBoard, currentPlayer, squareIndex) => {
        const updatedBoard = Array.from(currentBoard)
        const LENGTH_IN_PIXELS = currentPlayer === PLAYERS[CIRCLE] ? 88 : 123
        updatedBoard[squareIndex] = <DrawSymbol player={currentPlayer} size={LENGTH_IN_PIXELS} />
        setBoard(updatedBoard)
        checkGameStatus(updatedBoard, currentPlayer)
    }
    
    const increaseScoreForPlayer = (player = EMPTY) => {
        switch (player) {
            case PLAYERS[CROSS]:
                croosScore.increment()
                break
            case PLAYERS[CIRCLE]:
                circleScore.increment()
                break
            default:
                tieScore.increment()
        }
    }

    const checkGameStatus = (updatedBoard, currentPlayer) => {
        let hasWinner = false
        for (const COMBINATION of WINNING_COMBINATIONS) {
            hasWinner = isWinnerWithThisCombination(updatedBoard, COMBINATION)
            if (hasWinner) {
                setGameStatus(GAME_STATUS[FINISHED_WITH_WINNER])
                increaseScoreForPlayer(currentPlayer)
                break
            }
        }
        if (!hasWinner) {
            const CAN_CONTINUE = emptySpacesExist(updatedBoard)
            if (CAN_CONTINUE) {
                const OPPONENT = calculateOpponent(currentPlayer)
                setTurn(OPPONENT)
            } else {
                setGameStatus(GAME_STATUS[FINISHED_WITH_TIE])
                increaseScoreForPlayer(EMPTY)
            }
        }
    }

    const resetGame = () => {
        setBoard(EMPTY_BOARD)
        setTurn(PLAYERS[CROSS])
        setGameStatus(GAME_STATUS[ONGOING])
    }

    return (
        <div className="container-board-game">
            <div className="game-section">
                <main className="board-game">
                    <DisplayTurn player={turn} isGameOver={gameStatus !== GAME_STATUS[ONGOING]} />
                    <section className="container">
                        {board.map((markOrEmpty, squareIndex) =>
                            <Square key={squareIndex} index={squareIndex} attemptToMark={attemptToMark}>
                                {markOrEmpty}
                            </Square>
                        )}
                    </section>
                    <section className="scores">
                        <div className="case-score">
                            {croosScore.counter}
                            <div className="case">
                                <DrawSymbol player={PLAYERS[CROSS]} size={28} />
                                PLAYER 1
                            </div>
                        </div>
                        <div className="case-score">
                            {tieScore.counter}
                            <div>TIES</div>
                        </div>
                        <div className="case-score">
                            {circleScore.counter}
                            <div className="case">
                                <DrawSymbol player={PLAYERS[CIRCLE]} size={28} />
                                &nbsp; PLAYER 2
                            </div>
                        </div>
                    </section>
                    <Modal status={gameStatus} player={turn} onResetGame={resetGame} />
                </main>
            </div>
        </div>
    )

}
