const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const article = urlParams.get('article')
renderArticle(article)

function renderArticle(article){
  db.collection('articles').doc(article).get().then(function (doc){
    document.querySelector('.main-article').innerHTML = `
    <div class="article-header">
      <h1 class="main-article-header">${doc.data().title}</h1>
      <p class="article-subscript"><span class="article-type">Lorem Ipsum </span>vitae malesuada nibh turpis nec eros. Phasellus cursus quam nec nisl imperdiet scelerisque. Suspendisse potenti. Duis fermentum in nunc suscipit aliquet. Integer porttitor elementum tincidunt. </p>
      <hr class="article-hr" />
        <ul class="article-colofon">
          <li class="colofon-element"><abbr title="Written by"><i class="fas fa-pen-nib article-icon"></i>${doc.data().author}</abbr></li>
          <li class="colofon-element"><abbr title="Publication date"><i class="far fa-clock article-icon"></i>${doc.data().publishedOn}</abbr></li>
          <li class="colofon-element"><abbr title="Estimated reading time"><i class="fas fa-hourglass-end article-icon"></i><span id="reading-time"></span> ${doc.data().readingTime}minutes</abbr></li>
        </ul>
      <hr class="article-hr" />
    </div>
    <pre class="article-body">${doc.data().content}    </pre>`;
  })

    /*
    let header = document.createElement('div');
    let title = document.createElement('span');
    let content = document.createElement('div');
    let contentArticle = document.createElement('span');
    let right = document.createElement('span');
    let votes= document.createElement('span');

    //create the icons
    let upvote = createIcon('thumb_up_alt');
    let downvote = createIcon('thumb_down_alt');
    let cross = createIcon('delete',admin=true);
    let edit = createIcon('editing',admin=true);
    let update = createIcon('replay',admin=true);

    header.classList.add('collapsible-header','grey','lighten-4');
    content.classList.add('collapsible-body','white');
    edit.classList.add('modal-trigger');

    right.style.display= 'inherit';
    header.style.display= 'flex';
    header.style['justify-content'] = 'space-between';


    let comments = document.createElement('ul') ;
    db.collection('articles').doc(doc.id).collection('comments').onSnapshot(snapshot=>{
      comments.innerHTML = '';
      snapshot.docs.forEach(comment => {
        let toAdd = renderComment(comment);
        comments.appendChild(toAdd);
      }, function(error) {
        showNotification(error.message);
      });
    });

    // let comments = document.createElement('ul') ;
    // const docs = await db.collection('articles').doc(doc.id).collection('comments').get()
    // await docs.forEach(comment => {
    //   let toAdd = renderComment(comment);
    //   comments.appendChild(toAdd);
    // });
    //

    let form= renderForm()

    edit.setAttribute('data-target', 'modal-editArticle');
    right.setAttribute('data-id', doc.id);
    content.setAttribute('data-id', doc.id);
    title.textContent = doc.data().title;
    contentArticle.textContent = doc.data().content;
    votes.textContent = doc.data().upvotes;
    content.appendChild(contentArticle)
    content.appendChild(comments);
    content.appendChild(form);

    right.appendChild(downvote);
    right.appendChild(votes);
    right.appendChild(upvote);
    right.appendChild(cross);
    right.appendChild(edit);
    right.appendChild(update);
    header.appendChild(title);
    header.appendChild(right);
    li.appendChild(header);
    li.appendChild(content);


    document.querySelector('#guide-list').appendChild(li)



    // upvoting the article
    upvote.addEventListener('click', (e)=>{
      e.stopPropagation()
      const voteUp = functions.httpsCallable('upvote');
      voteUp({
        id: e.target.parentElement.getAttribute('data-id')
      })
      .catch(error => {
        showNotification(error.message);
      });
    });

    // downvoting the article
    downvote.addEventListener('click', (e)=>{
      e.stopPropagation()
      const voteDown = functions.httpsCallable('downvote');
      voteDown({
        id: e.target.parentElement.getAttribute('data-id')
      })
      .catch(error => {
        showNotification(error.message);
      });
    });

    // deleting the article
    cross.addEventListener('click', (e)=>{
      e.stopPropagation()
      const deleteArticle = functions.httpsCallable('deleteArticle');
      deleteArticle({
        id: e.target.parentElement.getAttribute('data-id')
      })
      .catch(error => {
        showNotification(error.message);
      });
    });

    //this is the button you need to press before editing the article
    //in order to load in the right content
    update.addEventListener('click', (e)=>{
      e.stopPropagation()
      const id = e.target.parentElement.getAttribute('data-id')
      document.querySelector('#editArticle-form').setAttribute('data-id', id)
      db.collection('articles').doc(id).get().then((doc)=>{
        const toUpdate = document.querySelector('#modal-editArticle #title');
        toUpdate.value=doc.data().title;
        const toUpdatetoo = document.querySelector('#modal-editArticle #content');
        toUpdatetoo.value=doc.data().content;
      })

    });

    //Posting a commment
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const addComment = functions.httpsCallable('addComment');
      const id = e.target.parentElement.getAttribute('data-id')
      addComment({
        articleId: id,
        content: form.comment.value,
        username: 'nog te doen'
      }).then(() => {
        // reset form
        form.reset();
        showNotification("comment posted")
      }).catch(err => {
        form.querySelector('.error').innerHTML = err.message;
      });
    });
    */
};
