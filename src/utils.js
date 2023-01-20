import { format } from 'date-fns';

export const formatArticles = articles => {
    let id = 0;

    return articles.map(article => {
        article.id = id;

        if (article?.publishedAt) {
            article.publishedAt = format(new Date(article.publishedAt), 'LLL dd, yyyy');
        }

        id++;

        return article;
    });
};

export const getArticleById = (articles, articleId) => {
    return articles.filter(article => article.id === articleId)?.[0];
};

export const searchArticleTitlesByTerm = (articles, searchTerm) => {
    const searchFilter = new RegExp(searchTerm, 'i');

    return articles.filter(article => searchFilter.test(article?.title));
};