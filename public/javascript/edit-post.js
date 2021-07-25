async function editFormHandler(e) {
    e.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

    const postRef = document.querySelector('form div a').getAttribute('href');
    const postId = postRef.slice(postRef.lastIndexOf('/') + 1);

    if (title && post_content) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'put',
            body: JSON.stringify({
                title,
                post_content
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
}

document.querySelector('.save-post-btn').addEventListener('click', editFormHandler);