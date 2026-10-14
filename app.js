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
const booksSummary = document.getElementById('books-summary');

// Update summary counts line: "X finished, Y reading, Z to read"
function updateSummary() {
  if (!booksSummary) return;

  const finishedCount = books.filter((b) => b.status === 'Finished').length;
  const readingCount = books.filter((b) => b.status === 'Reading').length;
  const toReadCount = books.filter((b) => b.status === 'To read').length;

  booksSummary.textContent = `${finishedCount} finished, ${readingCount} reading, ${toReadCount} to read`;
}

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

// Deterministic gradient selection based on title DJB2 hash (0 to 5)
function getTitleGradientClass(title) {
  let hash = 5381;
  const clean = title.trim();
  for (let i = 0; i < clean.length; i++) {
    hash = (hash * 33) ^ clean.charCodeAt(i);
  }
  return 'gradient-' + (Math.abs(hash) % 6);
}

// Helper to render empty state with SVG icon and textContent
function renderEmptyState(message) {
  while (emptyMessage.firstChild) {
    emptyMessage.removeChild(emptyMessage.firstChild);
  }

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', 'empty-state-icon');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.5');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');

  const path1 = document.createElementNS(svgNS, 'path');
  path1.setAttribute('d', 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20');
  const path2 = document.createElementNS(svgNS, 'path');
  path2.setAttribute('d', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z');
  svg.appendChild(path1);
  svg.appendChild(path2);

  const textEl = document.createElement('p');
  textEl.className = 'empty-state-text';
  textEl.textContent = message;

  emptyMessage.appendChild(svg);
  emptyMessage.appendChild(textEl);
  emptyMessage.style.display = 'flex';
}

// Create and render a single book card element using textContent
function createBookElement(book) {
  const li = document.createElement('li');
  li.className = 'book-card';
  li.setAttribute('data-id', book.id);

  // Cover-style block with initial letter on a soft gradient
  const coverEl = document.createElement('div');
  const gradientClass = getTitleGradientClass(book.title);
  coverEl.className = 'book-cover ' + gradientClass;
  const firstLetter = book.title.trim().charAt(0).toUpperCase() || 'B';
  coverEl.textContent = firstLetter;

  // Details container
  const detailsEl = document.createElement('div');
  detailsEl.className = 'book-details';

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
  statusEl.setAttribute('data-status', book.status);

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
      statusEl.setAttribute('data-status', newStatus);
      saveBooks();
      updateSummary();
    }
  });

  // Delete button asking "Delete this book?" before removing
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'card-delete-btn';
  deleteBtn.setAttribute('aria-label', 'Delete ' + book.title);
  deleteBtn.textContent = 'Delete';

  deleteBtn.addEventListener('click', () => {
    const shouldDelete = window.confirm('Delete this book?');
    if (shouldDelete) {
      const index = books.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        books.splice(index, 1);
        saveBooks();
        renderBooks();
        updateSummary();
      }
    }
  });

  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'card-controls';
  controlsContainer.appendChild(statusSelect);
  controlsContainer.appendChild(deleteBtn);

  statusContainer.appendChild(statusEl);
  statusContainer.appendChild(controlsContainer);

  detailsEl.appendChild(titleEl);
  detailsEl.appendChild(authorEl);
  detailsEl.appendChild(statusContainer);

  li.appendChild(coverEl);
  li.appendChild(detailsEl);

  return li;
}

// Render the book list based on current books and active search query
function renderBooks(animatedBookId = null) {
  const query = searchInput.value.trim().toLowerCase();

  // Clear existing items in list without using innerHTML
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }

  // Case 1: Overall book collection is empty
  if (books.length === 0) {
    renderEmptyState('No books yet. Add your first book above.');
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
    renderEmptyState('No books found');
    return;
  }

  // Case 3: Display matching books
  while (emptyMessage.firstChild) {
    emptyMessage.removeChild(emptyMessage.firstChild);
  }
  emptyMessage.style.display = 'none';

  filteredBooks.forEach((book) => {
    const element = createBookElement(book);
    if (book.id === animatedBookId) {
      element.classList.add('card-animate-in');
    }
    bookList.appendChild(element);
  });
}

// Listen for search input typing
searchInput.addEventListener('input', () => {
  renderBooks();
});

// Initial render on page load
renderBooks();
updateSummary();

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

  // Re-render list respecting active search filter and animating new card
  renderBooks(newBook.id);
  updateSummary();

  // Clear form
  bookForm.reset();
  titleInput.focus();
});
