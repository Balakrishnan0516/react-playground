import { useState, useEffect } from "react";
import "../App.css";

const Board = () => {
  const [size, setSize] = useState(8);
  const [cards, setCards] = useState([{}]);

  const initializeGame = () => {
    setCards({});
    let newArray = [...Array(size).keys()];
    let secondArray = [...newArray, ...newArray];

    for (let i = secondArray.length - 1; i >= 0; i--) {
      let randomIndex = Math.floor(Math.random() * i + 1); //It returs any value between 0 to i, to limit it to 0 to i-1 i use Math.floor
      //swap the values
      [secondArray[randomIndex], secondArray[i]] = [
        secondArray[i],
        secondArray[randomIndex],
      ];
    }

    const newObj = secondArray.map((e, index) => {
      return { card: e + 1, id: index };
    });
    console.log(newObj);
    setCards(newObj);
  };

  useEffect(() => initializeGame(), [size]);

  return (
    <>
      <div className="grid-container">
        <h3>The Memory Game 🎮</h3>
        <input
          type="number"
          placeholder="enter grid size"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          style={{ maxWidth: "400px" }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.ceil(
              Math.sqrt(cards.length)
            )},1fr)`,
            gap: "2px",
            margin: "20px",
          }}
        >
          {cards.map((card, index) => {
            return (
              <button key="index" style={{ width: "100px", height: "100px" }}>
                {card.card}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Board;
