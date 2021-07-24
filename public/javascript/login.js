// I do the actual login as a discrete function, 'cause when you sign up for an account it also makes sense you'd want to login at the same time, so why not kill two birds with one stone?
async function login(username, password) {
    const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
            username,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

async function formLoginHandler(e) {
    e.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    
    if (username && password) {
        login(username, password);
    }
}

async function formSignupHandler(e) {
    e.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            login(username, password);
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form button').addEventListener('click', formLoginHandler);
document.querySelector('.signup-form button').addEventListener('click', formSignupHandler);