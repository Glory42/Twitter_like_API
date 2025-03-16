function saveToken() {
    localStorage.setItem('jwt', token);
};

function getToken() {
    return localStorage.getItem('jwt');
};

function checkAuth() {
    if (!getToken() && !window.location.href.includes('index.html')) {
        window.location.href = 'index.html';
    };
};

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            saveToken(data.token);
            window.location.href = 'feed.html';
        } else {
            document.getElementById('error').textContent = data.error;
        };
    } catch (err) {
        console.error('Login failed:', err);
    };
});