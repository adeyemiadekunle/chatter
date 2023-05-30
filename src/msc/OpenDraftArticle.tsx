import React from 'react';
import useArticleManagement from './useArticleManagement';

const DraftArticles = () => {
  const { articles, openDraftArticle } = useArticleManagement();

  return (
    <div>
      <h2>Draft Articles</h2>
      {articles.map(article => (
        <div key={article.id}>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          <button onClick={() => openDraftArticle(article.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default DraftArticles;
