# DemoApp

DemoApp is a modern money lending dashboard built with [Vite](https://vitejs.dev/), [ReactJS](https://react.dev/), and [TypeScript](https://www.typescriptlang.org/). The app uses [Tailwind CSS](https://tailwindcss.com/) for utility-first styling and [ShadCN UI](https://ui.shadcn.com) components for a consistent, accessible design system. The project follows a **mobile-first approach** to ensure a responsive and user-friendly experience across all devices.

## Features

- **Mobile-First Responsive Design:**  
  Layout adapts seamlessly from mobile to desktop using Tailwind’s responsive utilities and grid/flex layouts.

- **UI Components:**  
  Built with ShadCN UI for tabs, cards, accordions, radio groups, buttons, and more.

- **State Management:**  
  Uses React’s Context API to manage shared state such as active borrower, pipeline tab.

- **Borrower Pipeline:**  
  Tabbed interface to view borrowers by status (`New`, `In Review`, `Approved`). Includes radio filters and interactive borrower cards.

- **Borrower Details:**  
  Center panel displays selected borrower’s details, AI explainability flags, loan summary, and action buttons.

- **Broker Overview:**  
  Right panel shows broker information, stats, onboarding workflow (styled as a vertical timeline/stepper), and an AI assistant toggle.

- **Testing:**  
  End-to-end tests written with [Cypress](https://www.cypress.io/) to validate core user flows, including borrower selection, explainability section toggling, and button actions.

## Tech Stack

- **Frontend:** Vite + ReactJS + TypeScript
- **Styling:** Tailwind CSS + ShadCN UI
- **State Management:** Context API
- **Icons:** Lucide Icons
- **Testing:** Cypress (E2E)

## Development Approach

- **Mobile-first:** All layouts and components are designed for optimal mobile usability first, then enhanced for desktop.
- **Component-based:** Each major UI section is a separate React component for maintainability and reuse.
- **Mock APIs:** Uses local mock data and API response structures for development and testing.

## Getting Started

1. **Install dependencies:**
   
   npm install

2. **Start the development server:**
   npm run dev

3. **Run Cypress E2E tests:**

   npx cypress open