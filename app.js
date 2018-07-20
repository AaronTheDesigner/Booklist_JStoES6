// Book Constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor

function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  // Create tr element
  const row = document.createElement('tr');
  //insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = "#" class = "delete" >X<a></td>
  `;

  list.appendChild(row);
}

//Show Alert
UI.prototype.showAlert = function(message, className) {
  //Create div
  const div = document.createElement('div');
  //Add Classes
  div.className = `alert ${className}`;
  //Add Text
  div.appendChild(document.createTextNode(message));
  // Get Parent
  const container = document.querySelector('.container');
  //Get Form
  const form = document.querySelector('#book-form');
  //Insert Alert
  container.insertBefore(div, form);
  //timeout after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);


}

UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear Fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Add Event Listeners
document.getElementById("book-form").addEventListener("submit", 
function(e){
  const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value

  // Instantiate Book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  // Validate
  if(title === '' | author === '' | isbn ==='') {
    //Error Message
    ui.showAlert('Please fill in all fields', 'error');
  } else {

  // Add book to list
  ui.addBookToList(book);

  // Show Success
  ui.showAlert('Book Added!', 'success');

  e.preventDefault();

  }
});

// Delete Event Listener
document.getElementById('book-list').addEventListener
('click', function(e){
  //Instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target);

  //Show Message
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});