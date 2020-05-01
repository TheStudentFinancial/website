const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const article = urlParams.get('article')
renderArticle(article)

function renderArticle(article){
  db.collection('articles').doc(article).get().then(function (doc){
    document.querySelector('.main-article').innerHTML = `
    <div class="article-header">
      <h1 class="main-article-header">${doc.data().title}</h1>
      <p class="article-subscript">${doc.data().subHeader}</p>
      <hr class="article-hr" />
        <ul class="article-colofon">
          <li class="colofon-element"><abbr title="Written by"><i class="fas fa-pen-nib article-icon"></i>${doc.data().author}</abbr></li>
          <li class="colofon-element"><abbr title="Publication date"><i class="far fa-clock article-icon"></i>${doc.data().publishedOn}</abbr></li>
          <li class="colofon-element"><abbr title="Estimated reading time"><i class="fas fa-hourglass-end article-icon"></i><span id="reading-time"></span> ${doc.data().readingTime} minutes</abbr></li>
        </ul>
      <hr class="article-hr" />
    </div>
    <pre class="article-body">${doc.data().content}    </pre>`;
  })
};
