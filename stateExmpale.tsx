// // CounterComponent.js
// import React, { useState } from 'react';

// const CounterComponent = () => {
//   const [count, setCount] = useState(0);

//   const handleIncrement = () => {
//     setCount(count + 1);
//   };

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={handleIncrement}>Increment</button>
//     </div>
//   );
// };

// export default CounterComponent;


// Atom creation
import { atom } from 'jotai';
import React from 'react';


export const counterAtom = atom(0);

// Using the atom in a component
import { useAtom } from 'jotai';

const CounterComponent = () => {
  const [counter, setCounter] = useAtom(counterAtom);

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </div>
  );
};

export default CounterComponent;

