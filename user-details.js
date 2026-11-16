const API = 'https://jsonplaceholder.typicode.com';

// id користувача беремо з адреси: user-details.html?id=3
const userId = new URLSearchParams(location.search).get('id');

const userInfo = document.getElementById('user-info');
const postsBtn = document.getElementById('posts-btn');
const postsBox = document.getElementById('posts');

// Отримати JSON з сервера
async function getJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Помилка запиту: ' + response.status);
    }
    return response.json();
}

// Рекурсивно виводить ВСІ поля об'єкта (включно з вкладеними address, geo, company)
function renderObject(obj) {
    const ul = document.createElement('ul');
    for (const key in obj) {
        const li = document.createElement('li');
        const value = obj[key];
        const b = document.createElement('b');
        b.textContent = key + ':';
        li.appendChild(b);

        if (value !== null && typeof value === 'object') {
            li.appendChild(renderObject(value));
        } else {
            const span = document.createElement('span');
            span.textContent = ' ' + value;
            li.appendChild(span);
        }
        ul.appendChild(li);
    }
    return ul;
}

// 4. Вся інформація про user
getJson(API + '/users/' + userId)
    .then(user => userInfo.appendChild(renderObject(user)))
    .catch(err => userInfo.textContent = err.message);

// 5. Кнопка "post of current user" показує title усіх постів
postsBtn.addEventListener('click', () => {
    getJson(API + '/users/' + userId + '/posts')
        .then(posts => {
            postsBox.replaceChildren();
            posts.forEach(post => {
                const block = document.createElement('div');
                block.className = 'block';

                const title = document.createElement('p');
                title.textContent = post.title;

                // 6. Посилання на post-details.html
                const link = document.createElement('a');
                link.className = 'btn';
                link.href = 'post-details.html?id=' + post.id;
                link.textContent = 'Post details';

                block.append(title, link);
                postsBox.appendChild(block);
            });
        })
        .catch(err => postsBox.textContent = err.message);
});
