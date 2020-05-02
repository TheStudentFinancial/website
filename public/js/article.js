const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const article = urlParams.get('article')
renderArticle(article)
renderComments(article)

//function to render an article given the article id
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


// a function that renders all comments corresponiding to the given article id.
function renderComments(article){
  let comments = document.querySelector('.comment-section') ;
  db.collection('articles').doc(article).collection('comments').orderBy('createdOnExact','desc').onSnapshot(snapshot=>{
    comments.innerHTML=``;
    let commentTop=renderReply(article,false)
    comments.appendChild(commentTop);

    snapshot.docs.forEach(comment => {
      let toAdd = renderComment(comment);
      comments.appendChild(toAdd);
      db.collection('articles').doc(article).collection('comments').doc(comment.id).collection('subcomments').orderBy('createdOnExact','desc').onSnapshot(subcomments=>{
      subcomments.docs.forEach((subcomment,i)=>{
        console.log(i)
        if (subcomments.docChanges()[i].type === "added") {
          let toAddReply = renderComment(subcomment,commentId=comment.id,isSubcomment=true);
          var child = document.getElementById(comment.id);
          comments.insertBefore(toAddReply,child);
        }
      });
    });
      let div = document.createElement('div') ;
      div.setAttribute('id', comment.id);
      comments.appendChild(div);


    }, function(error) {
      showNotification(error.message);
    });
  });

};

function renderComment(doc,commentId='',isSubcomment=false){
    let div = document.createElement('div') ;

    let contentComment = document.createElement('pre') ;
    contentComment.textContent = doc.data().content;

    let reply = document.createElement('div') ;



    let name = document.createElement('p') ;
    name.classList.add('exisiting-comment-name','comment-name');
    name.textContent = doc.data().by;

    let button = document.createElement('button') ;
    button.classList.add('comment-action');
    button.setAttribute('type', 'button');
    button.setAttribute('name', 'reply');
    button.textContent = 'Reply';

    if (isSubcomment){
      div.classList.add('existing-reply');
      contentComment.classList.add('exisiting-reply-text');
      reply.classList.add('existing-reply-under','comment-under');
      name.classList.add('exisiting-reply-name','comment-name');
      button.setAttribute('name', 'button');
      reply.setAttribute('data-id', commentId);

    }else{
      div.classList.add('exisiting-comment');
      contentComment.classList.add('existing-comment-text');
      reply.classList.add('existing-comment-under','comment-under');
      name.classList.add('exisiting-comment-name','comment-name');
      button.setAttribute('name', 'reply');
      reply.setAttribute('data-id', doc.id);
    }

    reply.appendChild(name);
    reply.appendChild(button);
    div.appendChild(contentComment);
    div.appendChild(reply);

    //Posting a commment
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const id = e.target.parentElement.getAttribute('data-id');
      let comments = document.querySelector('.comment-section') ;
      var child = document.getElementById(id);
      comments.replaceChild(renderReply(article, true, commmentId=id), child);

    });
    return div
};

function renderReply(article,reply,commentId=''){
  let div = document.createElement('div');
  let form = document.createElement('form');
  //form.setAttribute('action', 'reply');
  form.setAttribute('method', 'post');
  let textarea= document.createElement('textarea') ;
  textarea.setAttribute('name', 'name');
  textarea.setAttribute('id', 'comment');
  textarea.setAttribute('placeholder', 'Write a comment...');


  let comment= document.createElement('div') ;
  comment.classList.add('comment-under');
  let name= document.createElement('p') ;
  name.classList.add('comment-name');
  var user = auth.currentUser;
  name.textContent = user.displayName;
  let input= document.createElement('input') ;
  input.classList.add('comment-action');
  input.setAttribute('name', 'comment-submit');
  input.setAttribute('value', 'Submit');
  input.setAttribute('type', 'submit');

  if (reply){
    div.classList.add('reply-comment');
    form.classList.add('reply-form');
    textarea.classList.add('reply-textarea');
    div.setAttribute('data-id', article);
    div.setAttribute('comment-id', commentId);
    div.setAttribute('id', commentId);


  }else{
    div.classList.add('comment-maker');
    form.classList.add('comment-form');
    textarea.classList.add('comment-textarea');
    div.setAttribute('data-id', article);
    div.setAttribute('comment-id', commentId);

  }
  comment.appendChild(name);
  comment.appendChild(input);
  form.appendChild(textarea);
  form.appendChild(comment);
  div.appendChild(form);

  //Posting a commment
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    var user = auth.currentUser;
    const addComment = functions.httpsCallable('addComment');
    const id = e.target.parentElement.getAttribute('data-id');
    const commentID = e.target.parentElement.getAttribute('comment-id');
    if (commentID!=''){
      addComment({
        reply:true,
        commentId:commentID,
        articleId: id,
        content: form.comment.value,
        by: user.displayName,
      }).then(() => {
        // reset form
        form.reset();
        console.log("comment posted")
      }).catch(err => {
        console.log(err.message)
      });
    }else{
      addComment({
        reply:false,
        articleId: id,
        content: form.comment.value,
        by: user.displayName,
      }).then(() => {
        // reset form
        form.reset();
        console.log("comment posted")
      }).catch(err => {
        console.log(err.message)
      });
    }
  });
  return div;
}
