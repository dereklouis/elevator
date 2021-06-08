import './Elevator.css';
import { useRef, useState, useEffect } from 'react';

function App() {
  useEffect(() => {
    if (localStorage.getItem('elevatorHighScore') === null) {
      localStorage.setItem('elevatorHighScore', 0);
    }
  }, []);
  const buttons = useRef([]);
  const master = useRef(null);
  const loadingColor = useRef(null);
  const upButton = useRef(null);
  const highScoreRef = useRef(null);

  const [gameState, setGameState] = useState(false);

  const [scoreCount, setScoreCount] = useState(0);
  const scoreCountRef = useRef(0);
  const [highScore, setHighScore] = useState(
    localStorage.getItem('elevatorHighScore') || 0
  );

  const buttonsArr = [];

  const buttonClick = (e) => {
    const buttonId = Number(e.target.innerText - 1);
    if (gameState) {
      if (!buttons.current[buttonId].classList.contains('on')) {
        if (scoreCount > 0) {
          setScoreCount(scoreCount - 1);
          scoreCountRef.current--;
          const pointFlash = document.createElement('p');
          master.current.appendChild(pointFlash);
          pointFlash.className = 'pointFlashMinus';
          pointFlash.innerText = '-1';
          pointFlash.addEventListener('animationend', function () {
            pointFlash.remove();
          });
        }
      } else {
        buttons.current[buttonId].classList.remove('on');
        if (scoreCount < 100) {
          setScoreCount(scoreCount + 1);
          scoreCountRef.current++;
          const pointFlash = document.createElement('p');
          master.current.appendChild(pointFlash);
          pointFlash.className = 'pointFlashPlus';
          pointFlash.innerText = '+1';
          pointFlash.addEventListener('animationend', function () {
            pointFlash.remove();
          });
        }
        const random = Math.floor(Math.random() * 42);
        buttons.current[random].classList.add('on');
      }
    } else {
      if (!buttons.current[buttonId].classList.contains('on')) {
        buttons.current[buttonId].classList.add('on');
      } else {
        buttons.current[buttonId].classList.remove('on');
      }
    }
  };
  for (let i = 0; i < 42; i++) {
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
  const divClick = (e) => {
    if (gameState && e.target.id === 'buttonsDiv') {
      if (scoreCount > 0) {
        setScoreCount(scoreCount - 1);
        scoreCountRef.current--;
        const pointFlash = document.createElement('p');
        master.current.appendChild(pointFlash);
        pointFlash.className = 'pointFlashMinus';
        pointFlash.innerText = '-1';
        pointFlash.addEventListener('animationend', function () {
          pointFlash.remove();
        });
      }
    }
  };
  const startGame = () => {
    if (!gameState) {
      for (let i = 0; i < 42; i++) {
        buttons.current[i].classList.remove('on');
      }
      setGameState(true);
      setScoreCount(0);
      scoreCountRef.current = 0;
      const random = Math.floor(Math.random() * 42);
      buttons.current[random].classList.add('on');
      setTimeout(() => {
        setGameState(false);
        upButton.current.className = 'upButtonOff';
        for (let i = 0; i < 42; i++) {
          buttons.current[i].classList.remove('on');
        }
        if (
          scoreCountRef.current >
          Number(localStorage.getItem('elevatorHighScore'))
        ) {
          localStorage.setItem('elevatorHighScore', scoreCountRef.current);
          setHighScore(scoreCountRef.current);
          highScoreRef.current.className = 'highScoreAnimation';
        }
      }, 30000);
      loadingColor.current.classList.remove('loadingAnimation');
      void loadingColor.current.offsetWidth;
      loadingColor.current.classList.add('loadingAnimation');
      upButton.current.className = 'upButtonOn';
    }
  };

  return (
    <div id="ElevatorContainer" ref={master}>
      <h1 id="title">Elevator</h1>
      <p
        id="highScore"
        ref={highScoreRef}
        onAnimationEnd={() => {
          highScoreRef.current.className = '';
        }}
      >
        HIGH SCORE: {highScore}
      </p>
      <div id="mobileWindow">
        <div id="scoreWindowMobile">
          <p id="scoreCount">{scoreCount}</p>
          <div
            id="needle"
            style={{ transform: `rotate(${-50 + scoreCount}deg)` }}
          />
          <div id="puck" />
        </div>
        <div id="loadingBarMobile">
          <div id="loadingColorMobile" ref={loadingColor} />
        </div>
        <button
          id="upButtonMobile"
          className="upButtonOff"
          onClick={startGame}
          ref={upButton}
        >
          UP
        </button>
      </div>
      <div id="buttonsDiv" onClick={divClick}>
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
      <div id="scoreWindow">
        <p id="scoreCount">{scoreCount}</p>
        <div
          id="needle"
          style={{ transform: `rotate(${-50 + scoreCount}deg)` }}
        />
        <div id="puck" />
      </div>
      <div id="loadingBar">
        <div id="loadingColor" ref={loadingColor} />
      </div>
      <button
        id="upButton"
        className="upButtonOff"
        onClick={startGame}
        ref={upButton}
      >
        UP
      </button>
      <h1 id="titleMobile">Elevator</h1>
    </div>
  );
}

export default App;
