// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded!');
});

// Select DOM elements
const booksList = document.querySelector('#books');
const bookTitle = document.querySelector('#bookTitle').value;
const bookAuthor = document.querySelector('#bookAuthor').value;
const bookPublisher = document.querySelector('#bookPublisher').value;
const addBookButton = document.querySelector('#addBookButton');


const booksUrl = 'https://bookstore-api-six.vercel.app/api/books'

// Add event listener for the button
addBookButton.addEventListener('click', addBook);

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded!');
});
// Fetch books from the API
function getBooks() {
    fetch(booksUrl)
    .then(response => response.json())
    .then(data => {
        // TODO: 
        displayBooks(data);
        console.log('Books fetched:', data);
    })
    .catch(error => console.error('Error fetching books:', error));
        
}

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

// TODO: Funtionc to update the UI
function displayBooks(data) {
    book
}
