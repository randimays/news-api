import React, { useEffect, useState } from 'react';
import Actions from './components/actions';
import ArticleCard from './components/article-card';
import FullArticle from './components/full-article';
import Search from './components/search';
import { formatArticles, getArticleById, searchArticleTitlesByTerm } from './utils';

const App = () => {
    const [country, setCountry] = useState('us');
    const [articles, setArticles] = useState([]);

    // Page view states
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [showFullArticle, setShowFullArticle] = useState(false);
    const [articleToShow, setArticleToShow] = useState(null);

    // Clear all state values and go back to main news page
    // for currently selected country
    const resetToMainPage = () => {
        setShowSearchResults(false);
        setShowFullArticle(false);
        setSearchResults([]);
        setArticleToShow(null);
    };

    let fullArticle = null;

    if (articleToShow !== null) {
        fullArticle = getArticleById(articles, articleToShow);
    }

    // When a search term is entered, filter article titles for 
    // a match and set the search results in the local state
    const onSearchTermEntry = searchTerm => {
        setShowSearchResults(true);

        if (articles) {
            const matchingArticles = searchArticleTitlesByTerm(articles, searchTerm);

            if (matchingArticles?.length > 0) {
                setSearchResults(matchingArticles);
            } else {
                setSearchResults([]);
            }
        }
    };

    // Render all articles or a subset of articles (for search results)
    const renderArticles = articles => {
        return articles.map((article, index) => {
            return (
                <ArticleCard
                    article={article}
                    key={index}
                    setArticleToShow={setArticleToShow}
                    setShowFullArticle={setShowFullArticle}
                />
            );
        });
    };

    // Fetch articles from News API once, and then when country changes
    useEffect(() => {
        fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=7728c937ed8a4c93bc60691330e734bb`)
            .then(response => response.json())
            .then(({ articles }) => {
                const numberedArticles = formatArticles(articles);
                setArticles(numberedArticles);
            })
            .catch(error => console.error(error));
    }, [country]);

    const setNewCountry = country => {
        resetToMainPage();
        setCountry(country);
    };

    return (
        <>
            <Actions onCountryClick={setNewCountry} resetToMainPage={resetToMainPage} />
            {/* Single article page */}
            {showFullArticle && fullArticle && (
                <FullArticle
                    fullArticle={fullArticle}
                    resetToMainPage={resetToMainPage}
                    setArticleToShow={setArticleToShow}
                    setShowFullArticle={setShowFullArticle}
                />
            )}
            {/* Main articles page */}
            {!showFullArticle && (
                <main>
                    <h1>Top News in {country === 'us' ? 'the United States' : 'Great Britain'} Today</h1>
                    {!showFullArticle && (
                        <Search
                            onSearchTermEntry={onSearchTermEntry}
                            resetToMainPage={resetToMainPage}
                            showSearchResults={showSearchResults}
                        />
                    )}
                    {/* Search results exist */}
                    {showSearchResults &&
                        searchResults?.length > 0 && (
                            <section className="search-results">
                                <p>Search results: </p>
                                <div>
                                    {renderArticles(searchResults)}
                                </div>
                            </section>
                        )}
                    {/* No search results */}
                    {showSearchResults &&
                        searchResults?.length === 0 && (
                            <p>No results for your search terms.</p>
                        )}
                    {/* Standard article view */}
                    {!showSearchResults &&
                        articles.length > 0 && (
                            <section className="articles">
                                {renderArticles(articles)}
                            </section>
                        )}
                </main>
            )}
        </>
    );
};

export default App;