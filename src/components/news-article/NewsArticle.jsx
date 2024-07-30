const defaultImage =
  "https://png.pngtree.com/png-clipart/20190925/original/pngtree-no-image-vector-illustration-isolated-png-image_4979075.jpg";

function NewsArticle({ articleObj }) {
  const publishedDate = articleObj.publishedAt.slice(0, 10); // To extract the date from PublishedAt (property)

  return (
    <li className={`container ${articleObj.author ? "" : "removed"}`}>
      <article className="card">
        <div className="preview">
          <img
            src={articleObj.urlToImage || defaultImage}
            alt={articleObj.author}
          />
        </div>
        <div className="content">
          <div className="reference">
            <h4 className="refernce__content">
              <span>Source :</span>
              {articleObj.source.name}
            </h4>

            <h4 className="reference__content">
              <span>Publised Date:</span> {publishedDate}
            </h4>
          </div>
          <div className="card__content">
            <h3>{articleObj.title}</h3>
            <p>{articleObj.description}</p>
            <a href={articleObj.url} target="_blank">
              📕 Read article ...
            </a>
          </div>
        </div>
      </article>
    </li>
  );
}

export default NewsArticle;
