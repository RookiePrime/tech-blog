async function formPostHandler(e) {
    e.preventDefault();
    console.log('hey');

    const title = document.querySelector('#post-title').value.trim();
    const post_content = document.querySelector('#post-content').value.trim();

    const response = await fetch('/api/posts', {
        method: 'post',
        body: JSON.stringify({
            title,
            post_content,
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form button').addEventListener('click', formPostHandler);