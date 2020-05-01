// listen for auth status changes
auth.onAuthStateChanged(user => {
  setupUi(user)
});

function setupUi(user){
  console.log(user)
  const loggedOutLinks = document.querySelectorAll('.logged-out');
  const loggedInLinks = document.querySelectorAll('.logged-in');
  if (user) {
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'flex');
    loggedOutLinks.forEach(item => item.style.display = 'none');

  } else {
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'flex');
  }
}

// logout
// const logout = document.querySelector('#logout');
// logout.addEventListener('click', (e) => {
//   e.preventDefault();
//   auth.signOut().then(() => {
//     console.log('signed out')
//   })
// });
