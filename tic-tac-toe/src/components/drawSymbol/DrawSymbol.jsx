import Cross from "./fontAwesomeSvg/cross/Cross.jsx"
import Circle from "./fontAwesomeSvg/circle/Circle.jsx"

import { CROSS } from "../../constants/symbols.js"
import { PLAYERS } from "../../constants/directories.js"
import { INITIAL_SCORE as ZERO } from "../../constants/initialValues.js"

export default function DrawSymbol({ player = PLAYERS[CROSS], size = ZERO }) {
    const IS_CROSS = player === PLAYERS[CROSS]
    const LENGTH_IN_PIXELS = size === ZERO ? IS_CROSS ? 50 : 35 : size
    const MEASURES = { width: LENGTH_IN_PIXELS, height: LENGTH_IN_PIXELS }
    return IS_CROSS ?
        <Cross viewport={MEASURES} design={{ fill: "#e91f64" }} /> :
        <Circle viewport={MEASURES} design={{ fill: "#0ea5e9" }} />
}
