import Cross from "./cross/Cross.jsx"
import Circle from "./circle/Circle.jsx"

export default function DrawSymbol({ symbolType = "CROSS", symbolSize = 0 }) {
    return (
        symbolType === "CROSS"
            ? <Cross viewport={{ width: 123, height: 123 }} design={{ fill: "#e91f64" }} />
            : <Circle viewport={{ width: 88, height: 88 }} design={{ fill: "#0ea5e9" }} />
    )
}
