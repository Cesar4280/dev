import Cross from "./cross/Cross.jsx"
import Circle from "./circle/Circle.jsx"

export default function DrawSymbol({ figure }) {
    return (
        figure === "CROSS"
            ? <Cross viewport={{ width: 170, height: 170 }} design={{ fill: "#e91f64" }} />
            : <Circle viewport={{ width: 125, height: 125 }} design={{ fill: "#0ea5e9" }} />
    )
}
