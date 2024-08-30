# NG Simple Finance 2

A simple Finance app built with Angular 18, completely zoneless with Signals Woohoo! Exciting times :)  


The goal of this project is to manage your personal finances by tracking income, expenses, and savings goals, with a focus on clean UI and simple functionality.

## Features

### Essential Features

- **Income and Expenses Columns (Per Month)**
  - **Income Column:** A list where users can add income sources with an amount and date (one-time or recurring).
  - **Expenses Column:** A similar list for expenses, with the option to categorize (e.g., rent, groceries, utilities). Also, allow one-time or recurring entries.
  - **Recurring Items:** Implement a simple recurring logic (e.g., every month, quarter, or year) that automatically adds future entries based on the recurrence setting.

- **Total Balance Calculation**
  - **Balance Display:** Calculate and display the current balance (total income - total expenses). This should update dynamically as new entries are added.
  - **Balance History:** Consider showing a monthly view of the balance over time, helping users see trends in their finances.

- **Savings Goals Column**
  - **Savings Goals:** Allow users to create savings goals, with a target amount and a deadline.
  - **Savings Calculation:** Based on the user's remaining balance after expenses, calculate how long it will take to reach the savings goal at the current rate. Display this as an estimated time to achieve the goal.

- **Basic Analytics**
  - **Visuals:** Add simple charts to visually represent income vs. expenses (e.g., bar chart or pie chart). Use a library like Chart.js or ngx-charts for Angular.
  - **Trends:** Include a basic trend analysis (e.g., whether expenses are rising or falling month-to-month).

### Additional Features (If Time Allows)

- **Basic Authentication**
  - Allow users to log in and store their data, demonstrating knowledge of basic user authentication (e.g., using Firebase or a simple JWT authentication system).

- **Data Persistence**
  - **Local Storage or Backend:** Store user data in local storage or a basic backend (e.g., Firebase or a Node.js/Express API) so that it persists across sessions.

- **Expense Categories & Filtering**
  - Allow users to categorize expenses (e.g., food, transportation, utilities) and filter by category. This adds a layer of complexity and showcases the ability to work with more intricate data models.

- **Export/Import Data**
  - Add the ability to export the financial data as a CSV or JSON file and allow users to import it back. This demonstrates skills in handling data export and file handling in Angular.

## Suggested Implementation Strategy

1. **Start with Core Features:** Focus first on income/expense management and balance calculation. This forms the core functionality of the app.
2. **Build Simple, Reusable Components:** Create reusable components for adding income, expenses, and savings goals. Utilize Angular Forms to handle user inputs effectively.
3. **Incremental Updates:** Once the core is working, incrementally add the savings goals, analytics, and persistence features if time permits.
