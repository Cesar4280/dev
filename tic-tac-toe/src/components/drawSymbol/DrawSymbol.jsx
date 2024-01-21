import Cross from "../cross/Cross.jsx"
import Circle from "../circle/Circle.jsx"

export default function DrawSymbol({ figure }) {
    return (
        figure === "CROSS"
            ? <Cross viewport={{ width: 190, height: 190 }} design={{ fill: "#e91f64" }} />
            : <Circle viewport={{ width: 176, height: 132 }} design={{ fill: "#0ea5e9" }} />
    )
}
