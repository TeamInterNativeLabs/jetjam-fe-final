import React, { useEffect, useState } from 'react';

const Counter = ({ count, label }) => {
    const [currentCount, setCurrentCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = count;
        if (start === end) return;

        const duration = 2000;
        const incrementTime = Math.abs(Math.floor(duration / (end - start)));

        const timer = setInterval(() => {
            start += 1;
            setCurrentCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [count]);
    return (
        <div className="counter">
            <div className="counter-value">
                <h4 className='akira'>{currentCount}<span className="text-danger ms-2 counter-plus">+</span></h4>
            </div>
            <div className="counter-label l-grey-text">{label}</div>
        </div>
    );
};

export default Counter;