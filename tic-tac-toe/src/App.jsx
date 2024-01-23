import { useState } from "react"
import { useCounter } from "./hooks/useCounter.js"

import "./App.css"

import Square from "./components/square/Square.jsx"
import DrawSymbol from "./components/drawSymbol/DrawSymbol.jsx"
import Cross from "./components/drawSymbol/cross/Cross"
import Circle from "./components/drawSymbol/circle/Circle"

export default function App() {

    // contansts
    const CROSS = Symbol("CROSS")
    const CIRCLE = Symbol("CIRCLE")
    const FINISHED_WITH_TIE = Symbol("FINISHED_WITH_TIE")
    const ONGOING = Symbol("ONGOING")
    const FINISHED_WITH_WINNER = Symbol("FINISHED_WITH_WINNER")

    const PLAYERS = {
        [CROSS]: "CROSS",
        [CIRCLE]: "CIRCLE"
    }
    const GAME_STATUS = {
        [ONGOING]: "ONGOING",
        [FINISHED_WITH_WINNER]: "FINISHED_WITH_WINNER",
        [FINISHED_WITH_TIE]: "FINISHED_WITH_TIE"
    }
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

    const NONE = null
    const EMPTY_SPACE = null
    const INITIAL_SCORE = 0

    const EMPTY_BOARD = Array(9).fill(EMPTY_SPACE)

    // useStates
    const [board, setBoard] = useState(EMPTY_BOARD)
    const [turn, setTurn] = useState(PLAYERS[CROSS])
    const [gameStatus, setGameStatus] = useState(GAME_STATUS[ONGOING])

    // custom hooks
    const croosScore = useCounter(INITIAL_SCORE)
    const circleScore = useCounter(INITIAL_SCORE)
    const tieScore = useCounter(INITIAL_SCORE)

    const emptySpacesExist = (updatedBoard, positionsToCheck = NONE) => {
        return Array.isArray(positionsToCheck) && positionsToCheck.length === 3 ?
            positionsToCheck.some(index => updatedBoard[index] === EMPTY_SPACE) :
            updatedBoard.includes(EMPTY_SPACE)
    }

    const isWinnerWithThisCombination = (updatedBoard, combination) => {
        if (emptySpacesExist(updatedBoard, combination.POSITIONS)) return false
        const [FIRST, SECOND, THIRD] = combination.POSITIONS
        const SQUARES = {
            FIRST: updatedBoard[FIRST],
            SECOND: updatedBoard[SECOND],
            THIRD: updatedBoard[THIRD]
        }
        return SQUARES.FIRST.props.symbolType === SQUARES.SECOND.props.symbolType &&
            SQUARES.FIRST.props.symbolType === SQUARES.THIRD.props.symbolType
    }

    const increaseScoreForPlayer = (player = NONE) => {
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
                increaseScoreForPlayer(turn)
                // resetGame()
                break
            }
        }
        if (!hasWinner) {
            const CAN_CONTINUE = emptySpacesExist(updatedBoard)
            if (!CAN_CONTINUE) {
                setGameStatus(GAME_STATUS[FINISHED_WITH_TIE])
                increaseScoreForPlayer(NONE)
                // resetGame()
            }
        }
    }

    const applyMove = (currentBoard, currentPlayer, squareIndex) => {
        const OPPONENT = currentPlayer === PLAYERS[CROSS] ? CIRCLE : CROSS
        const updatedBoard = Array.from(currentBoard)
        updatedBoard[squareIndex] = <DrawSymbol symbolType={currentPlayer} />
        console.log(updatedBoard)
        setTurn(PLAYERS[OPPONENT])
        setBoard(updatedBoard)
        checkGameStatus(updatedBoard)
    }

    const canPlayerMark = (spaceToMark, currentGameStatus) => {
        return spaceToMark === EMPTY_SPACE && currentGameStatus === GAME_STATUS[ONGOING]
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

    const displayEndGame = (gameStatus) => {
        switch (gameStatus) {
            case GAME_STATUS[FINISHED_WITH_TIE]:
                return "Draw!"
            case GAME_STATUS[FINISHED_WITH_WINNER]:
                return `Player ${turn === PLAYERS[CROSS] ? 1 : 2} Wins!`
            default:
                return null
        }
    }

    return (
        <div className="container-board-game">
            <div className="game-section">
                <main className="board-game">
                    <section className="display-turn">
                        {turn === PLAYERS[CROSS]
                            ? <Cross viewport={{ width: 50, height: 50 }} design={{ fill: "#e91f64" }} />
                            : <Circle viewport={{ width: 35, height: 35 }} design={{ fill: "#0ea5e9" }} />}
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
                            {croosScore.counter} {/* <DrawSymbol symbolType={PLAYERS[CROSS]} /> */}
                            <div className="case">
                                <Cross viewport={{ width: 28, height: 28 }} design={{ fill: "#e91f64" }} /> PLAYER 1
                            </div>
                        </div>
                        <div className="case-score">
                            {tieScore.counter}
                            <div>TIES</div>
                        </div>
                        <div className="case-score">
                            {circleScore.counter} {/* <DrawSymbol symbolType={PLAYERS[CIRCLE]} /> */}
                            <div className="case">
                                <Circle viewport={{ width: 28, height: 28 }} design={{ fill: "#0ea5e9" }} />
                                &nbsp; PLAYER 2
                            </div>
                        </div>
                    </section>
                    <section className={`overlay-mask ${gameStatus !== GAME_STATUS[ONGOING] && "active"}`} onClick={resetGame}>
                        <div className="modal-game-over">
                            <h1 className="end-game">{displayEndGame(gameStatus)}</h1>
                            <span className="reset-game">Press anywhere to play again.</span>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )

}
