import React, { useState } from 'react';

const Search = ({ onSearchTermEntry, resetToMainPage, showSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const onClearClick = () => {
        setSearchTerm('');
        resetToMainPage();
    };

    const onSearchClick = () => {
        console.log('searchTerm: ', searchTerm);
        onSearchTermEntry(searchTerm);
    };

    return (
        <section className="search">
            <label>
                <span>Search Article Titles</span>
                <input
                    type="text"
                    name="search-articles"
                    onChange={e => setSearchTerm(e?.target?.value)}
                    onKeyDown={e => {
                        if (e?.code === 'Enter' && searchTerm !== '') {
                            // Enter key is pressed
                            onSearchClick();
                        }
                    }}
                    value={searchTerm}
                />
                <button onClick={onSearchClick}>Search</button>
                {showSearchResults && <button onClick={onClearClick}>Clear Search Results</button>}
            </label>
        </section>
    )
};

export default Search;