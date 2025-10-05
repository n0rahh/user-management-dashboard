# User Management Table (Vue 3 + TypeScript)

A small Vue 3 project demonstrating a **user list table** with search, status filter, and delete functionality using **Composition API** and **TypeScript**.

Features include:

- Display users in a paginated table
- Filter by **name/email** and **status**
- Delete users with **confirmation dialog**
- Toast notifications for success/error
- Responsive design with horizontal scroll for small screens
- Mocked API with simulated delay

---

## Demo

🚀 **Live Preview:** [https://user-management-dashboard-vue.web.app/](https://user-management-dashboard-vue.web.app/)

---

## Technologies

- [Vue 3](https://vuejs.org/) + `<script setup>`
- [TypeScript](https://www.typescriptlang.org/)
- Composition API
- SCSS for styling (no UI framework)
- Custom reusable components: Table, Input, Select, Button, Chip, Dialog
- Toast notifications via `useToast` composable

---

## Project Structure

src/
├─ components/
│ ├─ UI/ # Reusable UI components (Button, Table, Dialog, Chip, Input, Select)
│ └─ UserList.vue # User management table
├─ composables/
│ ├─ useUsers.ts # Mock API composable
│ └─ useToast.ts # Toast notifications composable
├─ styles/
│ ├─ colors.scss # Global colors
│ └─ global.scss # Global styles
├─ types/
│ ├─ button.ts # Button variants
│ └─ status.ts # Status types
├─ App.vue
└─ main.ts

---

## Setup

1. **Install dependencies**

npm install

2. **Run development server**

npm run dev

3. **Build for production**

npm run build

---

## Code Quality / Linting

This project uses **ESLint** and **Prettier** to maintain consistent code style and catch potential issues early.

### ESLint

- Lints your Vue 3 + TypeScript code for syntax errors, unused variables, and best practices.

### Prettier

- Automatically formats your code to a consistent style.
- Works with ESLint to avoid conflicts.
- Supports `.vue`, `.ts`, `.scss`, `.js`, `.json`, and other files.

---

## Usage

- **Search users:** Use the input field to filter users by name or email
- **Filter by status:** Select `All`, `Active`, or `Inactive`
- **Delete user:** Click **Delete**, confirm in the dialog, and see a toast notification
