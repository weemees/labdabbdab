// Загрузка данных из файла books.json
fetch('books.json')
    .then(response => response.json())
    .then(data => {
        window.books = data; // Сохраняем данные в глобальной переменной
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));

// Функция для рекомендации книг
function recommendBooks() {
    const genre = document.getElementById('genre').value;
    const pages = parseInt(document.getElementById('pages').value);
    const author = document.getElementById('author').value.toLowerCase();
    const language = document.getElementById('language').value;

    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<h2>Рекомендуемые книги:</h2>';

    const recommendedBooks = window.books.filter(book => {
        const matchesGenre = !genre || book.genre === genre;
        const matchesPages = !pages || book.pages <= pages;
        const matchesAuthor = !author || book.author.toLowerCase().includes(author);
        const matchesLanguage = !language || book.language === language;

        return matchesGenre && matchesPages && matchesAuthor && matchesLanguage;
    });

    if (recommendedBooks.length > 0) {
        recommendedBooks.forEach(book => {
            outputDiv.innerHTML += `
                <div class="book">
                    <p><strong>Название:</strong> ${book.title}</p>
                    <p><strong>Автор:</strong> ${book.author}</p>
                    <p><strong>Жанр:</strong> ${book.genre}</p>
                    <p><strong>Страниц:</strong> ${book.pages}</p>
                    <p><strong>Язык:</strong> ${book.language}</p>
                    <hr>
                </div>
            `;
        });
    } else {
        outputDiv.innerHTML += '<p>По вашему запросу ничего не найдено.</p>';
    }
}