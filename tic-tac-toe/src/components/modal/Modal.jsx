import { GAME_STATUS, PLAYERS } from "../../constants/directories.js"
import { CROSS, FINISHED_WITH_TIE, FINISHED_WITH_WINNER, ONGOING } from "../../constants/symbols.js"
import { EMPTY } from "../../constants/initialValues.js"

export default function Modal({ status, player, onResetGame }) {

    console.log("Current Turn:", player)

    const IS_GAME_OVER = status !== GAME_STATUS[ONGOING]
    const MASK_STYLE = `overlay-mask ${IS_GAME_OVER && "active"}`

    const updateModalContent = () => {
        switch (status) {
            case GAME_STATUS[FINISHED_WITH_TIE]:
                return "Draw!"
            case GAME_STATUS[FINISHED_WITH_WINNER]:
                return `Player ${player === PLAYERS[CROSS] ? 1 : 2} Wins!`
            default:
                return EMPTY
        }
    }

    return (
        <section className={MASK_STYLE} onClick={onResetGame}>
            <div className="modal-game-over">
                <h1 className="end-game">{IS_GAME_OVER && updateModalContent()}</h1>
                <span className="reset-game">Press anywhere to play again.</span>
            </div>
        </section>
    )
}
