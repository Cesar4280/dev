import { EMPTY } from "../constants/initialValues"
import { CROSS, CIRCLE, ONGOING } from "../constants/symbols.js"
import { PLAYERS, GAME_STATUS } from "../constants/directories.js"

export const emptySpacesExist = (updatedBoard, positionsToCheck = EMPTY) => {
    return Array.isArray(positionsToCheck) && positionsToCheck.length === 3 ?
        positionsToCheck.some(index => updatedBoard[index] === EMPTY) :
        updatedBoard.includes(EMPTY)
}

export const isWinnerWithThisCombination = (updatedBoard, combination) => {
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

export const calculateOpponent = (currentPlayer) => {
    return currentPlayer === PLAYERS[CROSS] ? PLAYERS[CIRCLE] : PLAYERS[CROSS]
}

export const canPlayerMark = (spaceToMark, currentGameStatus) => {
    return spaceToMark === EMPTY && currentGameStatus === GAME_STATUS[ONGOING]
}
