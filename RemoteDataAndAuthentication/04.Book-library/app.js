// function attachEvents() {
//     // TODO

//     // get data (buttons, etc) from html
//     // fetch -> get
//     // update html
//     // fetch -> post
//     // validation
//     // fetch -> put
//     // fetch -> delete
//     // get book (optional)

//     const baseUrl = "http://localhost:3030/jsonstore/collections/books";

//     const tableBody = document.querySelector("table tbody");

//     const bookTitle = document.querySelector('form input[name="title"][type="text"]');
//     const bookAuthor = document.querySelector('form input[name="author"][type="text"]');
//     const createBtn = document.querySelector("form button");

//     const loadBtn = document.getElementById("loadBooks");

//     loadBtn.addEventListener("click", load);
//     createBtn.addEventListener("click", createBook);

//     async function load(e) {
//         const response = await fetch(baseUrl);

//         const data = await response.json();

//         tableBody.textContent = "";

//         Object.entries(data).forEach(([key, book]) => {
//             const trEl = document.createElement("tr");

//             const tdTitle = document.createElement("td");
//             const tdAuthor = document.createElement("td");
//             const tdAction = document.createElement("td");

//             const editBtn = document.createElement("button");
//             const deleteBtn = document.createElement("button");

//             tdTitle.textContent = book.title;
//             tdAuthor.textContent = book.author;

//             editBtn.textContent = "Edit";
//             editBtn.setAttribute("id", key);

//             deleteBtn.textContent = "Delete";
//             deleteBtn.setAttribute("id", key);


//             tdAction.appendChild(editBtn);
//             tdAction.appendChild(deleteBtn);

//             trEl.appendChild(tdTitle);
//             trEl.appendChild(tdAuthor);
//             trEl.appendChild(tdAction);

//             tableBody.appendChild(trEl);

//             editBtn.addEventListener("click", editBook);
//             deleteBtn.addEventListener("click", deleteBook);
//         });

//     }


//     async function editBook(e) {
//         const bookId = e.target.id;

//         const settings = {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 "author": bookAuthor,
//                 "title": bookTitle
//             })
//         };

//         document.getElementsByTagName("h3").textContent = "Edit FORM";
//         document.querySelector("form button").textContent = "Save";

//         let arr = e.target.parentElement.parentElement.children;

//         for (let i = 0; i < arr.length - 1; i+=2) {
//             bookTitle.value = arr[0].value;
//             bookAuthor.value = arr[1].value;

//             await fetch(`${baseUrl}/${bookId}`, settings);

//         load();
//         }

//     }


//     async function deleteBook(e) {
//         const bookId = e.target.id;

//         const settings = {
//             method: "DELETE"
//         };

//         await fetch(`${baseUrl}/${bookId}`, settings);

//         load();
//     }

//     async function createBook(e) {
//         e.preventDefault();

//         if(!bookTitle.value.trim() || !bookAuthor.value.trim()){
//             alert("Title and Author fields are required!");
//         }else{
//             const settings = {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     "author": bookAuthor.value,
//                     "title": bookTitle.value
//                 })
//             };
            
//             await fetch(baseUrl, settings);
    
//             load();
    
//             bookTitle.value = "";
//             bookAuthor.value = "";
//         }
//     }

// }

// attachEvents();

function solution() {
    // API Endpoint
    const apiEndpoint = "http://localhost:3030/jsonstore/collections/books/";
  
    // Current Mode [Edit, Create] - Default Create
    let selectedBookId = '';
  
    // Get "LOAD ALL BOOKS" button
    const loadBooksBtn = document.getElementById('loadBooks');
  
    // Add event listener to the button
    loadBooksBtn.addEventListener('click', loadBooks);
  
    // Get createBook button
    const createBookBtn = document.getElementById('submitBook');
  
    // Add event listener to the submit book button
    createBookBtn.addEventListener('click', createOrUpdateBook);
  
    async function loadBooks() {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const books = await response.json();
        displayBooks(books);
      } catch (error) {
        console.error('Load Books Error:', error);
      }
    }
  
    function displayBooks(books) {
      const tableBody = document.querySelector('tbody');
      tableBody.innerHTML = '';
  
      for (const bookId in books) {
        const book = books[bookId];
        const row = createTableRow(bookId, book.title, book.author);
        tableBody.appendChild(row);
      }
    }
  
    function createTableRow(bookId, title, author) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${title}</td>
        <td>${author}</td>
        <td>
          <button class="editButton">Edit</button>
          <button class="deleteButton">Delete</button>
        </td>
      `;
  
      const editButton = row.querySelector('.editButton');
      editButton.addEventListener('click', () => editBook(bookId, title, author));
  
      const deleteButton = row.querySelector('.deleteButton');
      deleteButton.addEventListener('click', () => deleteBook(bookId));
  
      return row;
    }
  
    function editBook(bookId, title, author) {
      const formTitle = document.getElementById('formTitle');
      const bookTitleInput = document.getElementsByName('title')[0];
      const bookAuthorInput = document.getElementsByName('author')[0];
      const createBookBtn = document.getElementById('submitBook');
  
      formTitle.textContent = 'Edit FORM';
      createBookBtn.textContent = 'Save';
      bookTitleInput.value = title;
      bookAuthorInput.value = author;
      selectedBookId = bookId;
    }
  
    async function deleteBook(bookId) {
      try {
        const deleteEndpoint = apiEndpoint + bookId;
        const response = await fetch(deleteEndpoint, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        loadBooks();
      } catch (error) {
        console.error('Delete Book Error:', error);
      }
    }
  
    async function createOrUpdateBook(event) {
      event.preventDefault();
  
      const title = document.getElementsByName('title')[0].value;
      const author = document.getElementsByName('author')[0].value;
  
      if (!title || !author) {
        return;
      }
  
      const bookData = { title, author };
  
      try {
        if (selectedBookId) {
          // Update existing book
          const updateEndpoint = apiEndpoint + selectedBookId;
          const response = await fetch(updateEndpoint, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
          });
          if (!response.ok) {
            throw new Error(response.statusText);
          }
        } else {
          // Create new book
          const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
          });
          if (!response.ok) {
            throw new Error(response.statusText);
          }
        }
  
        resetForm();
        loadBooks();
      } catch (error) {
        console.error('Create or Update Book Error:', error);
      }
    }
  
    function resetForm() {
      const formTitle = document.getElementById('formTitle');
      const createBookBtn = document.getElementById('submitBook');
      const bookTitleInput = document.getElementsByName('title')[0];
      const bookAuthorInput = document.getElementsByName('author')[0];
  
      formTitle.textContent = 'FORM';
      createBookBtn.textContent = 'Submit';
      bookTitleInput.value = '';
      bookAuthorInput.value = '';
      selectedBookId = '';
    }
  }
  
  solution();