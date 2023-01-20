import React from 'react';

const Actions = ({ onCountryClick, resetToMainPage }) => {
    return (
        <nav role="navigation">
            <ul>
                <li><button onClick={resetToMainPage}>Top News</button></li>
                <li><button onClick={() => onCountryClick('gb')}>Great Britain</button></li>
                <li><button onClick={() => onCountryClick('us')}>United States</button></li>
            </ul>
        </nav>
    )
};

export default Actions;