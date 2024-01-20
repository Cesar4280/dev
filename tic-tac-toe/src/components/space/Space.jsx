export default function Space({ children, index, attemptToMark }) {

    const updateSquare = () => attemptToMark(index)

    return (
        <div className="item" onClick={updateSquare}>
            {children}
        </div>
    )
    
}
