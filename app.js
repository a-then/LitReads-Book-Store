// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded!');
});

// Select DOM elements
// const booksList = document.querySelector('#books');
const addBookForm = document.querySelector('#addBookForm');
const bookTitle = document.querySelector('#addNewTitle');
const bookAuthor = document.querySelector('#addNewAuthor');
const bookPublisher = document.querySelector('#addNewPublisher');
const addBookButton = document.querySelector('#addBookButton');


const booksApi = 'https://bookstore-api-six.vercel.app/api/books/'


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
addBookForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission
    try {
        const payload = { // data being sent to API
            userId: 20, // user ID is hardcoded for now
            title: addNewTitle.value, // value of target input
            author: addNewAuthor.value, // value of target input
            publisher: addNewPublisher.value, // value of target input
        };
        console.log('Payload:', payload);
        const response = await fetch(booksApi, { 
            method: "POST", // HTTP type
            body: JSON.stringify(payload),
            headers: { // headers for the request
                "Content-Type": "application/json", // expected data type being exchanged
            }
        })
        const data = await response.json(); // we need to convert the response to JSON
        const newBook = document.createElement("li"); // create new element to add with our JSON data
        newBook.classList.add("book-card"); // adding a class to the new element for styling
        console.log('New book data:', data);
        // Adding user's new book data to the book list
        newBook.innerHTML = `
            <h3>${payload.title}</h3>
            <p>Author: ${payload.author}</p>
            <p>Publisher: ${payload.publisher}</p>
            <span class="faveBook" id="faveBook">Heart</span>
            <span class="deleteBook" id="deleteBook">X</span>
            `; // template literal to add the book data to the new element
        // Append the new book to the books list
    booksList.prepend(newBook);
        console.log('Book added successfully:', data);
        // Reset the form fields after submission
        event.target.reset();
    } catch (error) {
        console.log(error.message);
    }
}
)
// TODO: delete a book from the bookstore
// TODO: fave a book
// TODO: display books in a grid layout
