const API = 'https://jsonplaceholder.typicode.com';

// id поста беремо з адреси: post-details.html?id=5
const postId = new URLSearchParams(location.search).get('id');

const postInfo = document.getElementById('post-info');
const commentsBox = document.getElementById('comments');

// Отримати JSON з сервера
async function getJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Помилка запиту: ' + response.status);
    }
    return response.json();
}

// Виводить ВСІ поля об'єкта списком
function renderObject(obj) {
    const ul = document.createElement('ul');
    for (const key in obj) {
        const li = document.createElement('li');
        const b = document.createElement('b');
        b.textContent = key + ':';
        const span = document.createElement('span');
        span.textContent = ' ' + obj[key];
        li.append(b, span);
        ul.appendChild(li);
    }
    return ul;
}

// 7. Вся інформація про пост
getJson(API + '/posts/' + postId)
    .then(post => postInfo.appendChild(renderObject(post)))
    .catch(err => postInfo.textContent = err.message);

// 8. Всі коментарі поточного поста
getJson(API + '/posts/' + postId + '/comments')
    .then(comments => {
        comments.forEach(comment => {
            const block = document.createElement('div');
            block.className = 'block';
            block.appendChild(renderObject(comment));
            commentsBox.appendChild(block);
        });
    })
    .catch(err => commentsBox.textContent = err.message);
