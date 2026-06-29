# Seapedia UI

A modern web application built with Next.js, React, and Tailwind CSS.

## Prerequisites

Before getting started, make sure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [pnpm](https://pnpm.io/) (Package manager)

## Setup and Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd seapedia-ui
   ```

2. **Install dependencies**:
   Run the following command to install all necessary packages.
   ```bash
   pnpm install
   ```

## Running the Application

### Development Server
To start the local development server:
```bash
pnpm run dev
```
Once the server is running, open [http://localhost:3000](http://localhost:3000) in your web browser to see the application in action.

### Production Build
To build the application for production:
```bash
pnpm run build
```
After building, you can start the production server with:
```bash
pnpm run start
```

## Code Quality

This project uses [Biome](https://biomejs.dev/) as its primary linter and formatter.

- **Lint the code**: Check for potential errors and warnings.
  ```bash
  pnpm run lint
  ```
- **Format the code**: Automatically format the codebase.
  ```bash
  pnpm run format
  ```

## Key Technologies
- **Framework:** Next.js
- **Styling:** Tailwind CSS v4, Base UI, Radix UI, Shadcn
- **State Management:** Zustand, Immer
- **Data Fetching:** TanStack React Query, Axios
