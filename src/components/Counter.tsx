import React, {useState} from 'react';
import cls from './Counter.module.scss'

export const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count+1)
    }

    console.log(cls)

    return (
        <div>
            <h1 className={cls.counter}>{count}</h1>
            <button onClick={increment}>increment</button>
        </div>
    );
};
