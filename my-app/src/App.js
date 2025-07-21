import React, { useEffect, useState } from 'react';
import './App.css';

const NUM_FISH = 20;
const NUM_BUBBLES = 50;
const BUBBLE_WIGGLE = 2;

const fishImages = ['/fish-yellow.png', '/fish-blue.png', '/fish-orange.png'];

function createFish(id) {
  return {
    id,
    x: Math.random() * window.innerWidth,
    y: (Math.random() * window.innerHeight / NUM_FISH) + (window.innerHeight / NUM_FISH)*id,
    speed: 1 + Math.random() * 1.5,
    direction: Math.random() < 0.5 ? 1 : -1,
    img: fishImages[Math.floor(Math.random() * fishImages.length)],
  };
}

function createBubble(id) {
  return {
    id,
    x: (window.innerWidth / NUM_BUBBLES) * (Math.random()*BUBBLE_WIGGLE*id),
    y: window.innerHeight*Math.random(),
    speed: 2.5 + Math.random() * 4,
    size: 1 + (1.5*Math.random())
  }
}

function App() {
  const [fishArray, setFishArray] = useState(
    Array.from({ length: NUM_FISH }, (_, i) => createFish(i))
  );
  const [bubbleArray, setBubbleArray] = useState(
    Array.from({ length: NUM_BUBBLES }, (_, i) => createBubble(i))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFishArray((prev) =>
        prev.map((fish) => {
          let newX = fish.x + fish.speed * fish.direction;
          let newDirection = fish.direction;
          let newSpeed = fish.speed;

          if (fish.direction === 1 && newX > window.innerWidth + 50) {
            newDirection = -1
            newSpeed = 0.5 + Math.random() * 2
          }
          if (fish.direction === -1 && newX < -50) {
            newDirection = 1
            newSpeed = 0.5 + Math.random() * 2
          }

          return { ...fish, x: newX, direction: newDirection, speed: newSpeed };
        })
      );
      setBubbleArray((prev) =>
        prev.map((bubble) => {
          let newY = bubble.y - bubble.speed;

          if (newY < -50) {
            newY = window.innerHeight - 50
          }

          return { ...bubble, y: newY};
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      {bubbleArray.map((bubble) => (
        <img
          key={bubble.id}
          src="/bubble.png"
          className="bubble"
          alt="bubble"
          style={{
            left: bubble.x,
            top: bubble.y,
            transform: `scale(${bubble.size})`
          }}
        />
      ))}
      {fishArray.map((fish) => (
        <img
          key={fish.id}
          src={fish.img}
          className="fish"
          alt="fish"
          style={{
            left: fish.x,
            top: fish.y,
            transform: `scaleX(${fish.direction === 1 ? 1 : -1})`,
            filter: fish.colorFilter,
          }}
        />
      ))}
      
      <div className="content">
        <h1>Hello, fish world</h1>
      </div>
    </div>
  );
}

export default App;
