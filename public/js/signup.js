async function signupFormHandler(event) {
  event.preventDefault(); 

  const username = document.querySelector('#usernameSignup').value.trim();
  const email = document.querySelector('#emailSignup').value.trim();
  const password = document.querySelector('#passwordSignup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
      alert('Account created! Logging you in now.');
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}


document.querySelector('.signupForm').addEventListener('submit', signupFormHandler);
