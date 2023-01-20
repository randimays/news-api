import React from 'react';
import ArticleMeta from './common/article-meta';

const FullArticle = ({ fullArticle, resetToMainPage }) => {
    const {
        author,
        description,
        publishedAt,
        source,
        title,
        urlToImage
    } = fullArticle;

    return (
        <main className="full-article">
            <h1>{title || 'Untitled'}</h1>
            <ArticleMeta
                author={author}
                publishedAt={publishedAt}
                source={source?.name}
            />
            {urlToImage && <img alt="Article image" src={urlToImage} />}
            <p>{description || 'No article content.'}</p>
            <button onClick={resetToMainPage}>&larr; Back to List</button>
        </main>
    )
};

export default FullArticle;