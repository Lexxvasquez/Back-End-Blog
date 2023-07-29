async function editFormHandler(event) {
  event.preventDefault(); 
  const id = window.location.toString().split('/')[ 
    window.location.toString().split('/').length - 1 
  ];

  const title = document.querySelector('input[name="postTitle"]').value;
  const post_text = document.querySelector('textarea[name="postText"]').value;

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.editPostform').addEventListener('submit', editFormHandler);