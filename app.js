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
const searchInput = document.getElementById('search-input');
const emptyMessage = document.getElementById('empty-message');
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

  const statusContainer = document.createElement('div');
  statusContainer.className = 'status-control';

  const statusEl = document.createElement('span');
  statusEl.className = 'book-status';
  statusEl.textContent = book.status;

  const statusSelect = document.createElement('select');
  statusSelect.className = 'card-status-select';
  statusSelect.setAttribute('aria-label', 'Change status for ' + book.title);

  const statusOptions = ['To read', 'Reading', 'Finished'];
  statusOptions.forEach((optionValue) => {
    const opt = document.createElement('option');
    opt.value = optionValue;
    opt.textContent = optionValue;
    if (optionValue === book.status) {
      opt.selected = true;
    }
    statusSelect.appendChild(opt);
  });

  statusSelect.addEventListener('change', (e) => {
    const newStatus = e.target.value;
    const targetBook = books.find((b) => b.id === book.id);
    if (targetBook) {
      targetBook.status = newStatus;
      statusEl.textContent = newStatus;
      saveBooks();
    }
  });

  statusContainer.appendChild(statusEl);
  statusContainer.appendChild(statusSelect);

  li.appendChild(titleEl);
  li.appendChild(authorEl);
  li.appendChild(statusContainer);

  return li;
}

// Render the book list based on current books and active search query
function renderBooks() {
  const query = searchInput.value.trim().toLowerCase();

  // Clear existing items in list without using innerHTML
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }

  // Case 1: Overall book collection is empty
  if (books.length === 0) {
    emptyMessage.textContent = 'No books yet. Add your first book above.';
    emptyMessage.style.display = 'block';
    return;
  }

  // Filter books matching search query (title or author, case-insensitive)
  const filteredBooks = query
    ? books.filter((book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      )
    : books;

  // Case 2: Books exist, but none match the search filter
  if (filteredBooks.length === 0) {
    emptyMessage.textContent = 'No books found';
    emptyMessage.style.display = 'block';
    return;
  }

  // Case 3: Display matching books
  emptyMessage.textContent = '';
  emptyMessage.style.display = 'none';

  filteredBooks.forEach((book) => {
    bookList.appendChild(createBookElement(book));
  });
}

// Listen for search input typing
searchInput.addEventListener('input', () => {
  renderBooks();
});

// Initial render on page load
renderBooks();

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

  // Re-render list respecting active search filter
  renderBooks();

  // Clear form
  bookForm.reset();
  titleInput.focus();
});
