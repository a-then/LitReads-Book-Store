// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded!');
});

// Select DOM elements
const booksList = document.querySelector('#books');
const bookTitle = document.querySelector('#bookTitle');
const bookAuthor = document.querySelector('#bookAuthor');
const bookPublisher = document.querySelector('#bookPublisher');
const addBookButton = document.querySelector('#addBookButton');


const booksApi = 'https://bookstore-api-six.vercel.app/api/books/'

// Add event listener for the button
addBookButton.addEventListener('click', addBook);

// Fetch books from the API
const requestOptions = {
  method: "GET",
  redirect: "follow"
};
async function fetchBooks() {
try {
  const response = await fetch(booksApi, requestOptions);
  const result = await response.json();
  console.log(result)
  for (const book of result) {
    const bookItem = document.createElement('li');
    bookItem.innerHTML = `<h3>${book.title}</h3><p>Author: ${book.author}</p><p>Publisher: ${book.publisher}</p>`;
    booksList.appendChild(bookItem);
  }
  console.log('Books fetched successfully');
} catch (error) {
  console.error(error);
};
}
fetchBooks()
// Add a book to the bookstore
function addBook(book) {
    fetch(booksUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(data => {
        //TODO: 
        displayBooks(data);
        console.log('Book added:', data)
    })
    .catch(error => console.error('Error adding book:', error));
}
// TODO: delete a book from the bookstore
// TODO: fave a book
// TODO: 


