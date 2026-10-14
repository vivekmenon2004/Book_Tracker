# Book Tracker

A lightweight, responsive web application for managing your personal reading collection. It lets you organize books by reading status, search titles and authors in real time, and track your progress through a clean, modern interface with zero setup required.

## Features

- **Add Books**: Enter a book title, author, and reading status (`To read`, `Reading`, or `Finished`).
- **Input Validation**: Requires non-empty title and author fields with clear error indicators.
- **Local Storage Persistence**: Automatically saves your book list to browser `localStorage` so data remains intact across page refreshes.
- **Live Search**: Filter books in real time by title or author with case-insensitive matching.
- **Status Updating**: Change any book's status on the fly with immediate persistence.
- **In-App Delete Confirmation**: Safely remove books via a dedicated in-app modal confirmation dialog.
- **Status Summary Chips**: Dynamically displays counts of books finished, currently reading, and to read.
- **Responsive Design**: Two-column layout on desktop screens and an optimized single-column layout for mobile devices.

## How to Run

No installation, build step, or server is required:
1. Clone or download this repository.
2. Open [index.html](index.html) directly in any modern web browser (Chrome, Firefox, Safari, Edge).

## Technologies Used

- **HTML5**: Semantic document structure and accessible forms.
- **Vanilla CSS3**: Custom design system, CSS variables, flexbox, grid, glassmorphism, and responsive breakpoints.
- **Vanilla JavaScript (ES6+)**: DOM manipulation, event handling, and `localStorage` API.

## Note

AI tools were used during development to assist with implementation, styling, and iteration. The application was thoroughly reviewed, tested, and validated by the author.
