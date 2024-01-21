export default function Square({ children, index, attemptToMark }) {

    const SQUARE_DESIGN = `item item-${index}`
    const updateSquare = () => attemptToMark(index)

    return <div className={SQUARE_DESIGN} onClick={updateSquare}>{children}</div>

}
