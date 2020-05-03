const createForm = document.querySelector('.create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const title = document.getElementById("title").value;
  const subHeader = document.getElementById("subHeader").value;
  const author = document.getElementById("author").value;
  const content = document.getElementById("create-textarea").value;
  var words= content.split(' ').length
  var readingTime=  Math.round(words / 180);

  // sign up the user & add firestore data
  const addArticle = firebase.functions().httpsCallable('addArticle');
  addArticle({
    title: title,
    content: content,
    subHeader:subHeader,
    readingTime: readingTime,
    words:words,
    author: author
  })
  .then(() => {
    // close the signup modal & reset form
    console.log("you succesfully uploaded an article")
  }).catch(function (err) {
    console.log("there has been an error")
    console.log(err.message)

  });
});
