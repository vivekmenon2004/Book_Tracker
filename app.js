// Storage Key
const STORAGE_KEY = 'book_tracker_books';

// Load books safely from localStorage
function loadBooks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.warn('Could not read or parse books from localStorage. Starting with an empty list.', err);
    return [];
  }
}

// Save current books array to localStorage safely
function saveBooks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (err) {
    console.error('Failed to save books to localStorage:', err);
  }
}

// In-memory state initialized from localStorage
const books = loadBooks();

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

// Render initially loaded books (saved in newest-first order)
books.forEach((book) => {
  bookList.appendChild(createBookElement(book));
});

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

  // Create book object (all fields preserved including status)
  const newBook = {
    id: Date.now().toString(),
    title: trimmedTitle,
    author: trimmedAuthor,
    status: statusSelect.value,
    createdAt: Date.now()
  };

  // Add to internal list (newest first)
  books.unshift(newBook);

  // Persist updated list to localStorage
  saveBooks();

  // Prepend to UI list
  const bookElement = createBookElement(newBook);
  bookList.prepend(bookElement);

  // Clear form
  bookForm.reset();
  titleInput.focus();
});
