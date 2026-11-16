const API = 'https://jsonplaceholder.typicode.com';
const usersBox = document.getElementById('users');

// Отримати JSON з сервера
async function getJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Помилка запиту: ' + response.status);
    }
    return response.json();
}

// Створити рядок "назва: значення"
function createField(title, value) {
    const p = document.createElement('p');
    const b = document.createElement('b');
    b.textContent = title + ':';
    const span = document.createElement('span');
    span.textContent = ' ' + value;
    p.append(b, span);
    return p;
}

// 1. Отримуємо масив users, 2. для кожного створюємо окремий блок з id та name
getJson(API + '/users')
    .then(users => {
        users.forEach(user => {
            const block = document.createElement('div');
            block.className = 'block';

            // 3. Посилання на user-details.html (id передаємо в адресі)
            const link = document.createElement('a');
            link.className = 'btn';
            link.href = 'user-details.html?id=' + user.id;
            link.textContent = 'Details';

            block.append(
                createField('id', user.id),
                createField('name', user.name),
                link
            );
            usersBox.appendChild(block);
        });
    })
    .catch(err => usersBox.textContent = err.message);
