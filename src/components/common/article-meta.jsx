import React from 'react';

const ArticleMeta = ({
    author,
    publishedAt,
    source
}) => {
    return (
        <p className="article-meta">
            <span className="publish-date">{publishedAt || 'No date'}</span>
            {author && <span className="author"> | {author}, </span>}
            {source && <span className="source">{!author && ' | '}{source}</span>}
        </p>
    )
};

export default ArticleMeta;