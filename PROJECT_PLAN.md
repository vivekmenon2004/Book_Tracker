# Book Tracker - Project Plan & Specifications

A clean, minimalist Book Tracker web application built using plain HTML, CSS, and JavaScript with zero frameworks, libraries, or backend dependencies.

## 1. Project Files

- `index.html`: Semantic HTML structure including header, statistics overview, book creation form, search filter, and book card list container.
- `style.css`: Clean Apple-inspired minimal styling using native system fonts, soft backgrounds, rounded cards, subtle shadows, and an `#0071e3` accent. Fully responsive across mobile and desktop.
- `app.js`: State management, `localStorage` persistence, rendering pipeline, status updates, search filtering, and event handling.

## 2. Data Structure & Storage Strategy

### Data Schema
Each book record is stored as an object:
```json
{
  "id": "1728922872345",
  "title": "Atomic Habits",
  "author": "James Clear",
  "status": "reading",
  "createdAt": 1728922872345
}
```

- **Valid Status Values**: `'to-read'`, `'reading'`, `'finished'`
- **Storage Key**: `'book_tracker_books'` in `window.localStorage`

### Lifecycle & Persistence
1. **Load**: On page load, retrieve from `localStorage.getItem('book_tracker_books')`. Fallback to an empty array `[]` if none exists.
2. **Order**: Maintain newest-first order by inserting new entries at the start of the list or sorting by `createdAt` descending.
3. **Persist**: Sync state changes to `localStorage` immediately upon creation, status update, or deletion.
4. **State-Driven Rendering**: Single rendering function updating counters, filtered list view, and empty states.

## 3. Visual & Aesthetic Guidelines (Apple-Inspired Minimalism)

- **Color Palette**:
  - Background: `#ffffff` base with soft `#f5f5f7` canvas and card fills.
  - Text: Primary `#1d1d1f`, secondary/muted `#86868b`.
  - Accent: Apple blue `#0071e3` (hover `#0077ed`).
  - Borders: Refined hairline borders `rgba(0, 0, 0, 0.08)`.
- **Typography**: Native Apple system font stack (`-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif`).
- **Cards & Controls**: Generously rounded corners (`border-radius: 16px - 18px`), ample breathing room, subtle transitions, and interactive pills.

## 4. Implementation Steps

1. **Step 1 - HTML Architecture**: Write semantic markup with accessible forms, search bar, stat badges, and list container.
2. **Step 2 - Design System & CSS**: Implement design tokens, typography, layout grid, input styling, and responsive media queries.
3. **Step 3 - Storage & State Layer**: Implement `loadBooks()` and `saveBooks()` wrappers with robust data handling.
4. **Step 4 - Rendering & Status Updates**: Build dynamic card generation, status change controls, deletion, and empty state.
5. **Step 5 - Search & Metric Counters**: Wire real-time search filtering across title/author and live counter updates.
6. **Step 6 - Verification**: Confirm mobile responsiveness and persistence across browser refreshes.
