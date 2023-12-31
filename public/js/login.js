async function loginFormHandler(event) {
  event.preventDefault(); 
  
  const email = document.querySelector('#emailLogin').value.trim();
  const password = document.querySelector('#passwordLogin').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {'Content-Type': 'application/json'}
    });
 
    if (response.ok) {document.location.replace('/dashboard');
    } else {
      let result = await response.json();
      alert(result.message);
    }
  }
}


document.querySelector('.loginForm').addEventListener('submit', loginFormHandler);
