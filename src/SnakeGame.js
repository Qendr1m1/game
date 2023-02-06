import React, { useState, useEffect, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  gameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  gameBoard: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  gameSquare: {
    width: '20px',
    height: '20px',
    border: '1px solid black',
  },
});

const SnakeGame = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [speed, setSpeed] = useState(100);
  const [snakeArray, setSnakeArray] = useState([[0, 0], [1, 0], [2, 0]]);
  const [foodArray, setFoodArray] = useState([[10, 10]]);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState('right');

  const handleKeyDown = useCallback(
    (event) => {
      switch (event.keyCode) {
        case 37:
          if (direction !== 'right') setDirection('left');
          break;
        case 38:
          if (direction !== 'down') setDirection('up');
          break;
        case 39:
          if (direction !== 'left') setDirection('right');
          break;
        case 40:
          if (direction !== 'up') setDirection('down');
          break;
        default:
          break;
      }
    },
    [direction]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSnakeArray((prevArray) => {
        let newArray = [...prevArray];
        let head = prevArray[prevArray.length - 1];

        switch (direction) {
          case 'right':
            head = [head[0] + 1, head[1]];
            break;
          case 'left':
            head = [head[0] - 1, head[1]];
            break;
          case 'up':
            head = [head[0], head[1] - 1];
            break;
          case 'down':
            head = [head[0], head[1] + 1];
            break;
          default:
            break;
        }

        newArray.push(head);
        newArray.shift();

        if (
          head[0] >= 20 ||
          head[0] < 0 ||
          head[1] >= 20 ||
          head[1] < 0 ||
          newArray.find((val, idx) => idx !== newArray.length - 1 && val[0] === head[0] && val[1] === head[1])
) {

clearInterval(intervalId);
}
    if (head[0] === foodArray[0][0] && head[1] === foodArray[0][1]) {
      setFoodArray([[Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]]);
      setScore(score + 1);
      newArray.unshift([]);
    }

    return newArray;
  });
}, speed);

return () => clearInterval(intervalId);
}, [direction, foodArray, score, speed]);

return (
<Box className={classes.gameContainer}>
<Box className={classes.gameBoard}>
{Array.from({ length: 20 * 20 }).map((_, index) => {
let squareValue = 'empty';

      snakeArray.forEach((val, idx) => {
        if (val[0] === index % 20 && val[1] === Math.floor(index / 20)) {
          squareValue = 'snake';
        }
      });

      foodArray.forEach((val) => {
        if (val[0] === index % 20 && val[1] === Math.floor(index / 20)) {
          squareValue = 'food';
        }
      });

      return (
        <Box
          key={index}
          className={classes.gameSquare}
          style={{ background: squareValue === 'snake' ? 'lightgreen' : squareValue === 'food' ? 'red' : 'white' }}
        />
      );
    })}
  </Box>
  <Box>Score: {score}</Box>
</Box>
);
};

export default SnakeGame;