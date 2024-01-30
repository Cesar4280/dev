import DrawSymbol from "../drawSymbol/DrawSymbol";

export default function DisplayTurn({ player, isGameOver }) {
    const text = isGameOver ? "Game Over!" : "Turn";
    return (
        <section className="display-turn">
            {!isGameOver && <DrawSymbol player={player} />}
            {text}
        </section>
    )
}
