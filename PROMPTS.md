# Development Prompts Log

This document records the prompt sequence used to design, build, test, and style the Book Tracker application.

---

### Prompt 1: Initial Planning & Architecture
> I want to build a Book Tracker web page using plain HTML, CSS and JavaScript (no frameworks, no server, no database).
>
> Features:
> - Add a book with title, author and status (To read, Reading, Finished). Title and author are required.
> - Show the list, newest first.
> - Search the list by title or author.
> - Change a book's status.
> - Keep the data after a page refresh using localStorage.
> - Later, optionally: delete a book, show counts, and a phone-friendly layout.
>
> Visual direction: clean and minimal, inspired by the Apple India Store (lots of white space, system font, rounded cards, one blue accent colour). It must be my own design, with no copied code, logos or images.
>
> Before writing any code, list the files you will create, explain how the data will be saved, and outline the build in small steps. Do not write code yet.

---

### Prompt 2: Core Form & Validation
> Create index.html, style.css and app.js.
>
> Add a form with Title, Author and a Status dropdown (To read, Reading, Finished). When I click Add, the book appears at the top of a list below the form, showing title, author and a status label.
>
> Rules:
> - Title and Author are required. Trim spaces, so spaces-only counts as empty.
> - If one is empty, show a message under that box: "Please enter a title" or "Please enter an author".
> - Clear the form after a successful add.
> - Store each book as an object with id, title, author, status and createdAt.
> - Show typed text using textContent, not innerHTML, so nobody can inject HTML or scripts.
> - Very long titles must wrap and not break the layout.
>
> Only build this feature. No search, saving or styling polish yet.

---

### Prompt 3: Persistence with localStorage
> Save the book list in localStorage so it is still there after I refresh the page. Load the saved list when the page opens.
>
> If the saved data is missing or corrupted, start with an empty list instead of crashing. Make sure every field is saved, including the status. Do not change any other feature.

---

### Prompt 4: Case-Insensitive Search & Empty States
> Add a search box above the list. As I type, show only books whose title or author contains the text, ignoring capital letters.
>
> - Only filter what is displayed. Never change or delete the saved data.
> - If nothing matches, show "No books found".
> - If the list is empty, show "No books yet. Add your first book above."
> - If I add a book while a search is active, the list must still respect the search.

---

### Prompt 5: Book Status Updating
> On each book, add a control to change the status between To read, Reading and Finished (a dropdown or small segmented buttons). When I change it, update the label, save to localStorage, and keep the current search filter applied. Do not change any other feature.

---

### Prompt 6: Apple-Inspired Minimalist & Responsive Design
> Restyle the app using my own design inspired by the Apple India Store's look and feel. Change style.css and only the minimum class names in the HTML. Do not change any behaviour.
>
> - Font: system font stack (-apple-system, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif).
> - Light grey page background, white rounded cards (about 16px radius), soft shadow, generous spacing.
> - One blue accent colour for the Add button (pill-shaped) and focus states.
> - Status labels as small pill badges with a different soft colour for each status.
> - Sticky top header with the app name and a subtle blur or translucent background.
> - Phone layout: single column, full-width inputs, tap targets at least 44px high, no horizontal scrolling at 360px width.
> - Do not use Apple logos, images, font files or copied code.
