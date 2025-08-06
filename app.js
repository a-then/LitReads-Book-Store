// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded!');
});

// Select DOM elements
// const booksList = document.querySelector('#books');
const addBookForm = document.querySelector('#addBookForm');
const bookTitle = document.querySelector('#addNewTitle');
const bookAuthor = document.querySelector('#addNewAuthor');
const bookPublisher = document.querySelector('#addNewPublisher');
const addBookButton = document.querySelector('#addBookButton');
const deleteBookButton = document.getElementById('deleteBook');

const booksApi = 'https://bookstore-api-six.vercel.app/api/books/'

// helper function
const setImgColor = () => {
    const themeColors = ["#1fb854", '#1eb88e', '#1e8bb8', '#1e5eb8', '#1e3fb8', '#1e3fb8', '#b81e3f', '#b81e5e', '#b81e8b', '#b81eb8', '#b81eb8', '#b81eb8'];

  const randomColor = Math.floor(Math.random()* themeColors.length)
    return themeColors[randomColor].replace('#', ''); 
}

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
            bookItem.classList.add('list-row'); // Add a class for styling
            bookItem.innerHTML = `
            <div>
                <img class="size-10 rounded-box" src="https://placehold.co/40x40/${setImgColor()}/FFF?text=${book.author[0]}"/>
            </div>
            <div>
                <h3>${book.title}</h3><p class="text-xs uppercase font-semibold opacity-60">Author: ${book.author}</p><p>Publisher: ${book.publisher}</p> 
            </div>
            <button id="faveBook" class="btn btn-circle btn-ghost">
                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
            </button>
            <button id="deleteBook" class="btn btn-square btn-ghost">
                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </button>`;
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
        newBook.classList.add("list-row"); // adding a class to the new element for styling
        console.log('New book data:', data);
        // Adding user's new book data to the book list
        newBook.innerHTML = `
        <div> 
        <img class="size-10 rounded-box" src="https://placehold.co/40x40/${setImgColor()}/FFF?text=${payload.author[0]}"/>
        </div>
        <div>
        <h3>${payload.title}</h3>
        <p class="text-xs uppercase font-semibold opacity-60">Author: ${payload.author}</p>
        <p>Publisher: ${payload.publisher}</p>
        </div>
        <button id="faveBook" class="btn btn-circle btn-ghost">
                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
        </button>
        <button id="deleteBook" class="btn btn-square btn-ghost">
            <svg class="size-[1.2em] xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>     
        </button>
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

// delete a book from the bookstore
const booksList = document.getElementById('booksList');

// // Add an event listener to the parent (event delegation)
booksList.addEventListener('click', function (event) {
    event.preventDefault();
    // console.log('Clicked element:', event.target);
    const item = event.target.closest('li.list-row');
    item.remove();
    // console.log('Book removed successfully'); 
});

// TODO: fave a book
// TODO: display books in a grid layout

