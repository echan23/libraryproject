let entryBox = document.getElementById('entryBox');

class Book {
    constructor(
      title = '',
      author = '',
      pages = '',
      isRead = false
    ) {
      this.title = title
      this.author = author
      this.pages = pages
      this.isRead = isRead
    }
}

class Library{
    constructor(){
        this.books = [];
    }

    addBook(book) {
        if(!this.inLibrary(book)){
            book.entryNumber = this.books.length;
            this.books.push(book);
        } else{
            alert('This book is already in your library');
        }
    }

    inLibrary(title){
        return this.books.some((book) => book.title === title);
    }

    removeBook(title) {
        this.books = this.books.filter(book => book.title !== title);
    }
}

const myLibrary = new Library();

//UI

function displayBook(library) {
    resetDisplay();
    for(let i=0; i<library.books.length; i++){
        const currentEntry = library.books[i];
        const newEntry = document.createElement('div'); //Creates box for the entry
        const bookInfo = updateBook(currentEntry);
        const finishedBtn = bookFinished(currentEntry);
        const removeBtn = rmBtn();
        newEntry.classList.add('entry');
        newEntry.setAttribute('data-entryNumber', i);
        entryBox.appendChild(newEntry);
        newEntry.appendChild(bookInfo); //Adding text info for book
        newEntry.appendChild(finishedBtn);
        newEntry.appendChild(removeBtn);

        function rmBtn(){
            const removeBtn = document.createElement('button');
            removeBtn.classList.add('removeBtn');
            removeBtn.textContent = "Remove Book";
            return removeBtn;
        }  

        removeBtn.addEventListener('click', () => {
            library.removeBook(currentEntry.title);
            displayBook(library);
        });
    }
}

function updateBook(book){ //Generates text field for each book card
    const bookInfo = document.createElement('div');
    bookInfo.innerHTML = `
    Title: ${book.title}<br>
    Author: ${book.author}<br>
    Pages: ${book.pages} pages<br>
    `;
    return(bookInfo);
}

function resetDisplay(){
    entryBox.innerHTML = "";
}

function bookFinished(book) {
    const button = document.createElement('button');
    updateButtonState();

    button.addEventListener('click', () => {
        book.isRead = !book.isRead; // Toggle the isRead property
        updateButtonState();
    });

    function updateButtonState() {
        if (book.isRead) {
            button.textContent = 'Finished';
            button.classList.remove('bookIncomplete');
            button.classList.add('bookFinished');
        } else {
            button.textContent = 'Unfinished';
            button.classList.remove('bookFinished');
            button.classList.add('bookIncomplete');
        }
    }
    return button;
}

//Popup Dialog

const dialog = document.querySelector("dialog");
const newBook = document.getElementById("addBook");
const confirmBtn = document.getElementById("confirm");
const closeBtn = document.getElementById("cancel");
const readButton = document.createElement('button');

function getBookFromInput(){
    const bookTitle = document.getElementById("bookTitle").value;
    const bookAuthor = document.getElementById("author").value;
    const pages = document.getElementById("pageNumber").value;
    const isRead = document.getElementById("isRead").checked;
    return new Book(bookTitle, bookAuthor, pages, isRead);
}

function resetDialog(){
    document.getElementById("bookTitle").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pageNumber").value = "";
    document.getElementById("isRead").checked = false;
}

confirmBtn.addEventListener("click", () => {
    myLibrary.addBook(getBookFromInput());
    displayBook(myLibrary);
    dialog.close();
});

newBook.addEventListener("click", () =>{
    dialog.open = true;
    resetDialog();
});

closeBtn.addEventListener("click", () => {;
    dialog.close();
});
