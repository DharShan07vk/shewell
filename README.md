# Shewell

Shewell is a comprehensive healthcare platform monorepo containing multiple applications and shared packages. It is built using a modern tech stack focused on performance, scalability, and developer experience.

## Tech Stack

- **Monorepo Manager**: [Turbo](https://turbo.build/) + [PNPM](https://pnpm.io/)
- **Framework**: [Next.js](https://nextjs.org/) (Apps)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Libraries**:
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Radix UI](https://www.radix-ui.com/)
  - [PrimeReact](https://primereact.org/)
- **Validation**: [Zod](https://zod.dev/)

## Project Structure

This monorepo is organized into `apps` and `packages`:

### Apps

| App             | Description                                 | Port   | Path                                     |
| :-------------- | :------------------------------------------ | :----- | :--------------------------------------- |
| **vyan-client** | proper client-facing application for users. | `3001` | [`apps/vyan-client`](./apps/vyan-client) |
| **vyan-doctor** | Interface for doctors/specialists.          | `3002` | [`apps/vyan-doctor`](./apps/vyan-doctor) |
| **admin**       | Admin dashboard for platform management.    | `3004` | [`apps/admin`](./apps/admin)             |

### Packages

Shared configuration and libraries:

- `packages/database`: Prisma schema and client.
- `packages/ui`: Shared UI components (Tailwind + Radix/Prime).
- `packages/config`: Shared configuration (env, etc.).
- `packages/typescript-config`: Shared `tsconfig` bases.
- `packages/eslint-config`: Shared ESLint configurations.
- `packages/shiprocket`: Shiprocket integration.
- `packages/aws`: AWS S3 integration.
- `packages/mail`: Email service integration.

## Getting Started

### Prerequisites

- **Node.js**: >= 18.0.0
- **PNPM**: >= 8.0.0 (Recommended package manager)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd Shewell
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Environment Setup:**

    Copy the example environment file to `.env`:

    ```bash
    cp .env.example .env
    ```

    > **Note:** You may need to set up environment variables for specific apps in their respective directories if they are not covered by the root `.env`.

### Database Setup

1.  **Run Migrations:**
    Apply the Prisma schema to your local database.

    ```bash
    pnpm database:migration:dev
    ```

2.  **Generate Client:**
    Generate the Prisma client types for use across the repo.

    ```bash
    npx turbo run prisma:generate
    ```

## Running the Project

### Development Mode

To start all applications in development mode parallelly:

```bash
pnpm dev
```

This will run:

- **Client**: http://localhost:3001
- **Doctor**: http://localhost:3002
- **Admin**: http://localhost:3004

### Filtered Execution

To run a specific app only, use the `--filter` flag with Turbo:

```bash
# Run only the Client app
pnpm dev --filter=vyan-client

# Run only the Admin app
pnpm dev --filter=admin
```

## Available Scripts

| Script                         | Description                       |
| :----------------------------- | :-------------------------------- |
| `pnpm build`                   | Build all apps and packages.      |
| `pnpm dev`                     | Run all apps in development mode. |
| `pnpm lint`                    | Lint all apps and packages.       |
| `pnpm format`                  | Format code using Prettier.       |
| `pnpm database:migration:dev`  | Run Prisma migrations (dev).      |
| `pnpm database:migration:prod` | Deploy Prisma migrations (prod).  |

## Contribution

1.  Ensure you are using `pnpm`.
2.  Follow the commit message convention.
3.  Ensure `pnpm lint` and `pnpm build` pass before pushing.
