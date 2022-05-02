const errand = document.getElementById('errand');
const userLogged = localStorage.getItem('userLogged');
const tableBody = document.getElementById("table");
const user = document.getElementById("user-area");

axios.defaults.baseURL = 'http://localhost:8080';
user.innerHTML = userLogged;


function logout() {
    localStorage.setItem('userLogged', '');
    window.location.href = './login.html';
}

async function checkLogin() {
    const userLogged = localStorage.getItem('userLogged');

    const user = {
        name: userLogged
    }

    await axios.post('/loginAuth', user)
        .then(response => {
            response.data
        })
        .catch(error => {
            console.log(error);
            window.location.href = '../login.html'
        })
}

checkLogin();

async function addErrand() {
    const errand = document.getElementById('errand');
    const users = await axios.get('/user').then(response => response.data)
    id = users.find(user => user.name === userLogged).id
    

    const newErrand = {
        errands: errand.value,
        userId: id
    }

    await axios.post('/errand', newErrand)
        .then(response => {
            response.data
        })
        .catch(error => {
            console.log(error);
        })

    showMessages();
}

async function errandDelete(id) {
    
    await axios.delete(`/errand/${id}`);
    showMessages();
}

async function errandChange(id) {
    const users = await axios.get('/user').then(response => response.data)
    userId = users.find(user => user.name === userLogged).id
    const errand = prompt('Editar o Recado');

    const errandEdited = {
        errands: errand,
        userId: userId
    }

    await axios.put(`/errand/${id}`, errandEdited);
       
    showMessages();
}

async function showMessages() {
    const users = await axios.get('/user').then(response => response.data)
    id = users.find(user => user.name === userLogged).id
    await axios.get(`/errand/${id}`)
        .then(response => {
            tableBody.innerHTML = '';
            const errands = response.data
            return errands.map(item => {
                const position = errands.indexOf(item);
                tableBody.innerHTML += `
            <td class="td">${position + 1}</td>
            <td class="td">${item.errands}</td>
            <td class="td">
                <input type='submit' class='button' value='Editar' onclick="errandChange(${item.id})"> 
                <input type='submit' class='button button-red' value='Excluir' onclick="errandDelete(${item.id})">
            </td>`
            });
        })
        .catch(error => {
            console.log(error);
        });
};

showMessages();
