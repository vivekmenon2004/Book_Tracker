// In-memory state
const books = [];

// DOM Element references
const bookForm = document.getElementById('book-form');
const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('book-author');
const statusSelect = document.getElementById('book-status');
const titleError = document.getElementById('title-error');
const authorError = document.getElementById('author-error');
const bookList = document.getElementById('book-list');

// Clear error messages on input
titleInput.addEventListener('input', () => {
  if (titleInput.value.trim() !== '') {
    titleError.textContent = '';
  }
});

authorInput.addEventListener('input', () => {
  if (authorInput.value.trim() !== '') {
    authorError.textContent = '';
  }
});

// Create and render a single book card element using textContent
function createBookElement(book) {
  const li = document.createElement('li');
  li.className = 'book-card';
  li.setAttribute('data-id', book.id);

  const titleEl = document.createElement('h3');
  titleEl.className = 'book-title';
  titleEl.textContent = book.title;

  const authorEl = document.createElement('p');
  authorEl.className = 'book-author';
  authorEl.textContent = 'By ' + book.author;

  const statusEl = document.createElement('span');
  statusEl.className = 'book-status';
  statusEl.textContent = book.status;

  li.appendChild(titleEl);
  li.appendChild(authorEl);
  li.appendChild(statusEl);

  return li;
}

// Handle form submission
bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const trimmedTitle = titleInput.value.trim();
  const trimmedAuthor = authorInput.value.trim();
  let hasError = false;

  // Validate title
  if (!trimmedTitle) {
    titleError.textContent = 'Please enter a title';
    hasError = true;
  } else {
    titleError.textContent = '';
  }

  // Validate author
  if (!trimmedAuthor) {
    authorError.textContent = 'Please enter an author';
    hasError = true;
  } else {
    authorError.textContent = '';
  }

  if (hasError) {
    return;
  }

  // Create book object
  const newBook = {
    id: Date.now().toString(),
    title: trimmedTitle,
    author: trimmedAuthor,
    status: statusSelect.value,
    createdAt: Date.now()
  };

  // Add to internal list (newest first)
  books.unshift(newBook);

  // Prepend to UI list
  const bookElement = createBookElement(newBook);
  bookList.prepend(bookElement);

  // Clear form
  bookForm.reset();
  titleInput.focus();
});
