import { CROSS, CIRCLE, ONGOING, FINISHED_WITH_TIE, FINISHED_WITH_WINNER } from "./symbols.js"

export const PLAYERS = {
    [CROSS]: "CROSS",
    [CIRCLE]: "CIRCLE"
}
export const GAME_STATUS = {
    [ONGOING]: "ONGOING",
    [FINISHED_WITH_TIE]: "FINISHED_WITH_TIE",
    [FINISHED_WITH_WINNER]: "FINISHED_WITH_WINNER"
}
export const WINNING_COMBINATIONS = [
    { NAME: "topRow", POSITIONS: [0, 1, 2] },
    { NAME: "middleRow", POSITIONS: [3, 4, 5] },
    { NAME: "bottomRow", POSITIONS: [6, 7, 8] },
    { NAME: "leftColumn", POSITIONS: [0, 3, 6] },
    { NAME: "middleColumn", POSITIONS: [1, 4, 7] },
    { NAME: "rightColumn", POSITIONS: [2, 5, 8] },
    { NAME: "leftDiagonal", POSITIONS: [0, 4, 8] },
    { NAME: "rightDiagonal", POSITIONS: [2, 4, 6] }
]
