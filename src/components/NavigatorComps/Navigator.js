import React from 'react';

const Navigator = (props) => {
    const dots = [];
    for (let i = 1; i <= props.totalSteps; i += 1) {
        const isActive = props.currentStep === i;
        dots.push((
            <span
                key={`step-${i}`}
                className={`dot ${isActive ? 'active' : ''}`}
                onClick={() => props.goToStep(i)}
            >&bull;</span>
        ));
    }

    return (
        <div className={'nav'}>{dots}</div>
    );
};

export default Navigator;