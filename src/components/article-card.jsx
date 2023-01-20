import React from 'react';
import ArticleMeta from './common/article-meta';

const ArticleCard = ({ article, setArticleToShow, setShowFullArticle }) => {
    const {
        author,
        description,
        id,
        publishedAt,
        source,
        title,
        urlToImage
    } = article;

    return (
        <article onClick={() => {
            setShowFullArticle(true);
            setArticleToShow(id);
        }}>
            {urlToImage && <img alt="Article image" src={urlToImage} />}
            <section>
                <h2>{title || 'Untitled'}</h2>
                <ArticleMeta
                    author={author}
                    publishedAt={publishedAt}
                    source={source?.name}
                />
                <p>{description || 'No article content.'}</p>
            </section>
        </article>
    );
};

export default ArticleCard;