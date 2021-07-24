// I do the actual login as a discrete function, 'cause when you sign up for an account it also makes sense you'd want to login at the same time, so why not kill two birds with one stone?
async function login(email, password) {
    const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
            email,
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

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    
    if (email && password) {
        login(email, password);
    }
}

async function formSignupHandler(e) {
    e.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            login(email, password);
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form button').addEventListener('click', formLoginHandler);
document.querySelector('.signup-form button').addEventListener('click', formSignupHandler);