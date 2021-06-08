import './Elevator.css';
import { useRef, useState } from 'react';

function App() {
  const buttons = useRef([]);
  const [scoreCount, setScoreCount] = useState(0);
  const buttonsArr = [];
  const buttonClick = (e) => {
    const buttonId = Number(e.target.innerText - 1);

    if (!buttons.current[buttonId].classList.contains('on')) {
      buttons.current[buttonId].classList.add('on');
    } else {
      buttons.current[buttonId].classList.remove('on');
    }
    if (scoreCount < 100) {
      setScoreCount(scoreCount + 1);
    }
  };
  for (let i = 0; i < 24; i++) {
    buttonsArr.push(
      <button
        key={i}
        ref={(element) => buttons.current.push(element)}
        className="button"
        onClick={buttonClick}
      >
        {i + 1}
      </button>
    );
  }
  return (
    <div id="ElevatorContainer">
      <h1 id="title">ELEVATOR</h1>
      <div id="scoreWindow">
        <p id="scoreCount">{scoreCount}</p>
        <div
          id="needle"
          style={{ transform: `rotate(${-50 + scoreCount}deg)` }}
        ></div>
        <div id="puck"></div>
      </div>
      <div id="buttonsDiv">
        {buttonsArr}
        <div className="screw screwTopLeft">
          <div className="x xTopLeft">x</div>
        </div>
        <div className="screw screwTopRight">
          <div className="x xTopRight">x</div>
        </div>
        <div className="screw screwBottomLeft">
          <div className="x xBottomLeft">x</div>
        </div>
        <div className="screw screwBottomRight">
          <div className="x xBottomRight">x</div>
        </div>
      </div>
    </div>
  );
}

export default App;
