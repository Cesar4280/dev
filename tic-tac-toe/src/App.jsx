import { useState } from "react"
import { useCounter } from "./hooks/useCounter.js"

import "./App.css"

import Square from "./components/square/Square.jsx"
import DrawSymbol from "./components/drawSymbol/DrawSymbol.jsx"

import {
    CROSS,
    CIRCLE,
    ONGOING,
    FINISHED_WITH_TIE,
    FINISHED_WITH_WINNER
} from "./constants/symbols.js"
import { PLAYERS, GAME_STATUS, WINNING_COMBINATIONS } from "./constants/directories.js"
import { EMPTY, EMPTY_BOARD, INITIAL_SCORE } from "./constants/initialValues.js"
import Modal from "./components/modal/Modal.jsx"

export default function App() {

    // useStates
    const [board, setBoard] = useState(EMPTY_BOARD)
    const [turn, setTurn] = useState(PLAYERS[CROSS])
    const [gameStatus, setGameStatus] = useState(GAME_STATUS[ONGOING])

    // custom hooks
    const croosScore = useCounter(INITIAL_SCORE)
    const circleScore = useCounter(INITIAL_SCORE)
    const tieScore = useCounter(INITIAL_SCORE)

    const emptySpacesExist = (updatedBoard, positionsToCheck = EMPTY) => {
        return Array.isArray(positionsToCheck) && positionsToCheck.length === 3 ?
            positionsToCheck.some(index => updatedBoard[index] === EMPTY) :
            updatedBoard.includes(EMPTY)
    }

    const isWinnerWithThisCombination = (updatedBoard, combination) => {
        if (emptySpacesExist(updatedBoard, combination.POSITIONS)) return false
        const [FIRST, SECOND, THIRD] = combination.POSITIONS
        const SQUARES = {
            FIRST: updatedBoard[FIRST],
            SECOND: updatedBoard[SECOND],
            THIRD: updatedBoard[THIRD]
        }
        return SQUARES.FIRST.props.player === SQUARES.SECOND.props.player &&
            SQUARES.FIRST.props.player === SQUARES.THIRD.props.player
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

    const checkGameStatus = (updatedBoard) => {
        let hasWinner = false
        for (const COMBINATION of WINNING_COMBINATIONS) {
            hasWinner = isWinnerWithThisCombination(updatedBoard, COMBINATION)
            if (hasWinner) {
                setGameStatus(GAME_STATUS[FINISHED_WITH_WINNER])
                increaseScoreForPlayer(turn) // resetGame()
                break
            }
        }
        if (!hasWinner) {
            const CAN_CONTINUE = emptySpacesExist(updatedBoard)
            if (!CAN_CONTINUE) {
                setGameStatus(GAME_STATUS[FINISHED_WITH_TIE])
                increaseScoreForPlayer(EMPTY) // resetGame()
            }
        }
    }

    const applyMove = (currentBoard, currentPlayer, squareIndex) => {
        let opponent = PLAYERS[CROSS], lengthInPixels = 123
        if (currentPlayer === opponent) opponent = PLAYERS[CIRCLE]
        else lengthInPixels = 88
        const updatedBoard = Array.from(currentBoard)
        updatedBoard[squareIndex] = <DrawSymbol player={currentPlayer} size={lengthInPixels} />
        console.log("Current Turn:", currentPlayer);
        console.log(updatedBoard)
        setBoard(updatedBoard)
        setTurn(opponent)
        checkGameStatus(updatedBoard)
    }

    const canPlayerMark = (spaceToMark, currentGameStatus) => {
        return spaceToMark === EMPTY && currentGameStatus === GAME_STATUS[ONGOING]
    }

    const attemptToMark = (spaceIndex) => {
        const SPACE_TO_MARK = board[spaceIndex]
        const IS_ABLE_TO_MARK = canPlayerMark(SPACE_TO_MARK, gameStatus)
        if (IS_ABLE_TO_MARK) applyMove(board, turn, spaceIndex)
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
                    <section className="display-turn">
                        <DrawSymbol player={turn} />
                        Turn
                    </section>
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
