const nameUser = document.getElementById('name');
const password = document.getElementById('password');
const message = document.getElementById('message');

axios.defaults.baseURL = 'http://localhost:8080';

function setUserLogged(name) {
    localStorage.setItem('userLogged', name);
}

function login(event) {
    event.preventDefault();
    setUserLogged(nameUser.value);

    const user = {
        name: nameUser.value,
        password: password.value
    };

    axios.post('/login', user)
        .then(response => {
            message.style.display = 'block';
            message.style.backgroundColor = '#28ff5e65';
            message.innerHTML = response.data.message;
            setTimeout(() => (window.location.href = "./errands.html"), 750);
        })
        .catch(error => {
            message.style.display = 'block';
            message.style.backgroundColor = '#ff282865';
            message.innerHTML = error.response.data.message;
        })
}
