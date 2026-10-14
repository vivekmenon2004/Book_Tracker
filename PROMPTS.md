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
> Visual direction: clean and minimal,(lots of white space, system font, rounded cards, one blue accent colour).
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

### Prompt 6: Minimalist & Responsive Design
> Restyle the app using my own design inspired by the Apple India Store's look and feel. Change style.css and only the minimum class names in the HTML. Do not change any behaviour.
>
> - Font: system font stack (-apple-system, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif).
> - Light grey page background, white rounded cards (about 16px radius), soft shadow, generous spacing.
> - One blue accent colour for the Add button (pill-shaped) and focus states.
> - Status labels as small pill badges with a different soft colour for each status.
> - Sticky top header with the app name and a subtle blur or translucent background.
> - Phone layout: single column, full-width inputs, tap targets at least 44px high, no horizontal scrolling at 360px width.
> - Do not use Apple logos, images, font files or copied code.

---

### Prompt 7: Attractive & Polished Redesign
> Redesign the look of my Book Tracker so it is more attractive and polished. It is a plain HTML, CSS and vanilla JavaScript app (index.html, style.css, app.js). 
>
> IMPORTANT: this is a visual change only. Do not change how adding, validation, search, status change or localStorage saving works. Do not rename functions or change the book data shape. If a small JavaScript change is needed for a visual effect, keep it minimal and tell me exactly what you changed and why.
>>
> - Content max-width about 1000px, centred.
> - Screens 900px and wider: two columns. Left: the "Add a book" card, sticky while scrolling. Right: the Books heading, search box and list.
> - Below 900px: a single column.
> - Header: Sticky, translucent white with backdrop-filter blur and a thin bottom border. App name "Book Tracker" with a small book icon drawn as inline SVG, and a short muted subtitle such as "Keep track of what you read."
> - Form card: White card, 20px radius, layered soft shadow. All inputs, the select and the search box share the same shape: 48px height, 12px radius, light border, blue focus ring. Fix the large uneven gaps between fields: keep consistent spacing, and let the error message take space only when it is visible. Error messages in a soft red with small text. Add button: pill-shaped, solid blue accent, subtle hover and press effect.
> - Book list: Each book is a card with a cover-style block on the left showing the first letter of the title on a soft gradient (pick the gradient from a small set based on the title; no images). Title bold, author muted, long text wraps (overflow-wrap: anywhere). Status badge as a small pill: To read = amber, Reading = blue, Finished = green. The status control is restyled as a compact pill-shaped select. Hover: card lifts 2px with a stronger shadow. Transitions 150 to 200ms. A newly added book fades and slides in. Wrap animations in prefers-reduced-motion so they are disabled for users who request it.
> - Empty states: "No books yet. Add your first book above." and "No books found" centred, muted, with a simple inline SVG icon.
> - Colour and theme: Define colours as CSS variables. One blue accent colour. Page background: very light grey to faint blue gradient. Support dark mode with @media (prefers-color-scheme: dark).
> - Phone (600px and below): Single column, full-width inputs and a full-width Add button. Tap targets at least 44px high. No horizontal scrolling at 360px width.
> - Accessibility: Keep all labels. Visible focus states. Good text contrast.
>
> use the .agent skill for it
>
> Only change what is needed. Do not add new features such as delete or counts.

---

### Prompt 8: White Radiant Gradient & UI Refinement
> use white gradiant background and use .agent skill to impove the ui and design

---

### Prompt 9: Delete Button & Dynamic Summary Line
> Add two small features without changing existing behaviour:
> 1. A Delete button on each book. Ask "Delete this book?" before removing it, and update localStorage.
> 2. A summary line above the list, such as "3 finished, 1 reading, 2 to read", which updates when books are added, changed or deleted.

---

### Prompt 10: Red Delete Button, In-App Modal & Button-Like Summary Chips
> make the delete button red colour and change the localhost meaasage for delete to a pop up and make the A summary line above the list, such as "3 finished, 1 reading, 2 to read", which updates when books are added, changed or deleted. attractive like in a button like that and add this to the prompts.md Add two small features without changing existing behaviour:
> 1. A Delete button on each book. Ask "Delete this book?" before removing it, and update localStorage.
> 2. A summary line above the list, such as "3 finished, 1 reading, 2 to read", which updates when books are added, changed or deleted.
>
> and push to main branch

