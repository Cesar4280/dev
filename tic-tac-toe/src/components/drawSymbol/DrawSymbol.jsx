import Cross from "./cross/Cross.jsx"
import Circle from "./circle/Circle.jsx"

export default function DrawSymbol({ player = "CROSS", size = 123 }) {
    const VIEWPORT = { width: size, height: size }
    return (
        player === "CROSS"
            ? <Cross viewport={VIEWPORT} design={{ fill: "#e91f64" }} />
            : <Circle viewport={VIEWPORT} design={{ fill: "#0ea5e9" }} />
    )
}
