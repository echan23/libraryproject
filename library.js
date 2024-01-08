const myLibrary = [];
let entries = document.querySelectorAll(".entry");

function Book(name, author, pageNumber) {
    this.name = name;
    this.author = author;
    this.pageNumber = pageNumber;
}

function addBook(book) {
    myLibrary.push(book);
}

function displayLibrary(library) {
    for (let i = 0; i < library.length; i++) {
        entries[i].textContent =
            library[i].name + "\n" + library[i].author + "\n" + library[i].pageNumber;
    }
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 300);
const book2 = new Book("1984", "George Orwell", 350);

addBook(book1);
addBook(book2);

displayLibrary(myLibrary);

let dialog = document.querySelector("dialog");
let confirmButton = document.getElementById("confirm");
let closeButton = document.getElementById("cancel");
let newBook = document.getElementById("addBook");

newBook.addEventListener("click", () =>{
    dialog.open = true;
});

closeButton.addEventListener("click", () => {
    dialog.close();
});