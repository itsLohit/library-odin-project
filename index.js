const addBookBtn = document.querySelector(".addBookBtn");
const form = document.querySelector("#bookForm");
const cancelBtn = document.querySelector("#cancelBtn");
const submitBtn = document.querySelector("#submitBtn");
const dialog = document.querySelector("#addBookDialog");
const dialogCaption = document.querySelector(".dialog-caption");
const containerMain = document.querySelector(".containerMain");
const cardsContainer = document.querySelector(".cards-container");
const dialogBtns = document.querySelector(".dialog-buttons-edit");

document.addEventListener("DOMContentLoaded", function(){
  dialog.close();
});



const myLibrary = [];



//book constructor
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function loadCredentials(book){
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let readStatus = document.getElementById("readStatus").value;
  book = new Book(title, author, pages, readStatus);
  return book;
}





//function to add the user inputs to the array
function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(myLibrary);
}










submitBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  
  const book = loadCredentials();
  if(book.title && book.author && book.pages){
    addBookToLibrary(loadCredentials());
    createBookCards(loadCredentials());
    dialog.close();
    form.reset();
  }
  else{
    alert("Fill all the credentials");
  }
});

cancelBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  dialog.close();
  form.reset();
});

addBookBtn.addEventListener("click", ()=>{
  dialogCaption.textContent = "Add Book";
  dialog.showModal();
});


function createBookCards(book){
  const container = document.createElement("div");
  container.classList.add("container");
  cardsContainer.appendChild(container);
  
  const bookTitle = document.createElement("div");
  bookTitle.classList.add("bookTitle");
  container.appendChild(bookTitle);
  bookTitle.textContent = book.title;

  const authorLabel = document.createElement("div");
  authorLabel.classList.add("card-label");
  authorLabel.textContent = "Author:";
  container.appendChild(authorLabel);
  const bookAuthor = document.createElement("div");
  bookAuthor.classList.add("bookAuthor");
  authorLabel.appendChild(bookAuthor);
  bookAuthor.textContent = book.author;

  const pagesLabel = document.createElement("div");
  pagesLabel.classList.add("card-label");
  pagesLabel.textContent = "No. of. Pages:";
  container.appendChild(pagesLabel);
  const bookPages = document.createElement("div");
  bookPages.classList.add("bookPages");
  pagesLabel.appendChild(bookPages);
  bookPages.textContent = book.pages;

  const readStatusLabel = document.createElement("div");
  readStatusLabel.classList.add("card-label");
  readStatusLabel.textContent = "Status:";
  container.appendChild(readStatusLabel);
  const bookReadStatus = document.createElement("button");
  bookReadStatus.classList.add("bookReadStatus");
  readStatusLabel.appendChild(bookReadStatus);
  bookReadStatus.textContent = book.readStatus;
  bookReadStatus.addEventListener("click", ()=>{
    toggleRead(book);
    bookReadStatus.textContent = book.readStatus;
    console.log(myLibrary);
  });

  const otherOptionsLabel = document.createElement("div");
  otherOptionsLabel.classList.add("card-label");
  otherOptionsLabel.textContent = "Other Options:"
  container.appendChild(otherOptionsLabel);
  const editBookBtn = document.createElement("button");
  editBookBtn.classList.add("editBooksBtn");
  container.appendChild(editBookBtn);
  editBookBtn.textContent = "Edit";
  editBookBtn.addEventListener("click", ()=>{
    editBookDialog(book);
  });
  const removeBookBtn = document.createElement("button");
  removeBookBtn.classList.add("removeBooksBtn");
  container.appendChild(removeBookBtn);
  removeBookBtn.textContent = "Delete";
  removeBookBtn.addEventListener("click", ()=>{
    removeBookFromLibrary(findIndex(title));
    container.remove();
  });
}





//default books in library
const defaultBook1 = new Book("Selfish Gene", "Richard Dawkins", "500", "Read");
const defaultBook2 = new Book("Homo Sapiens", "Yuval Nova Harari", "300", "Not Read");





function findIndex(title){
  myLibrary.forEach((book)=>{
    if(this.title === title){
      return myLibrary.indexOf(book);
    }
  })
}

function removeBookFromLibrary(book){
  myLibrary.splice(book, 1);
  console.log(myLibrary);
}

function toggleRead(book) {
  if(book.readStatus === "Read"){
    book.readStatus = "Not Read";
  }
  else{
    book.readStatus = "Read";
  }
}



function editBookDialog(book){
  dialogCaption.textContent = "Edit Book";
  dialog.showModal();
  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("pages").value = book.pages;
  document.getElementById("readStatus").value = book.readStatus;

  submitBtn.hidden = true;
  cancelBtn.hidden = true;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");
  dialogBtns.appendChild(editButton);
  editButton.addEventListener("click", ()=>{
    editBook(book);
    editButton.remove();
    discardChangesButton.remove();
    dialog.close();
    submitBtn.hidden = false;
    cancelBtn.hidden = false;
    resetInputs();
  });

  const discardChangesButton = document.createElement("button");
  discardChangesButton.textContent = "Discard";
  discardChangesButton.classList.add("discard-button");
  dialogBtns.appendChild(discardChangesButton);
  discardChangesButton.addEventListener("click", ()=>{
    editButton.remove();
    discardChangesButton.remove();
    dialog.close();
    submitBtn.hidden = false;
    cancelBtn.hidden = false;
    resetInputs();
  });

  window.addEventListener("keydown", e=>{
    const key = e.key;
    if(key === "Escape"){
      resetInputs();
      editButton.remove();
      discardChangesButton.remove();
    }
  });
  
}




function editBook(book){
  let index = myLibrary.indexOf(book);
  let editedBook = loadCredentials();
  myLibrary[index] = editedBook;
  cardsContainer.textContent = "";
  for(let book of myLibrary){
    createBookCards(book);
  }
}

function resetInputs(){
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("readStatus").value = "Not Selected";
  submitBtn.hidden = false;
  cancelBtn.hidden = false;
}



addBookToLibrary(defaultBook1);
createBookCards(defaultBook1);
addBookToLibrary(defaultBook2);
createBookCards(defaultBook2);


