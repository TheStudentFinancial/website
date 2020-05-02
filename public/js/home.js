db.collection('articles').orderBy('timePublished', 'desc').onSnapshot(snapshot => {
  document.querySelector('.last-article-text').innerHTML=''
  doc= snapshot.docs[0]
    document.querySelector('.last-article-text').innerHTML=`<h3 class="last-article-header">${doc.data().title}</h3>
    <small class="last-article-credit">Written by ${doc.data().author}</small>
    <pre class="last-article-blurb">
    ${doc.data().subHeader}
    </pre>
    <a class="readmore" href="article.html">Read&nbsp;more!</a>`
});
