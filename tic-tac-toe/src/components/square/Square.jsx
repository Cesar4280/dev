export default function Square({ children, index, attemptToMark }) {

    const SQUARE_DESIGN = `item item-${index}`
    const updateSquare = () => attemptToMark(index)

    return (
        <button type="button" className={SQUARE_DESIGN} onClick={updateSquare} role="button">
            {children}
        </button>
    )

}
