# Project Structure

This document provides a detailed overview of the project's file organization and structure.

## Root Directory Structure

```
receipt-tracker/
├── app/                    # Next.js App Router
├── components/             # React components
├── convex/                 # Convex backend
├── actions/                # Server actions
├── lib/                    # Utility functions
├── public/                 # Static assets
├── docs/                   # Project documentation
├── .cursor/                # Cursor IDE configuration
├── .next/                  # Next.js build output
├── node_modules/           # Dependencies
├── .env.local              # Environment variables (not in git)
├── .gitignore              # Git ignore rules
├── .prettierrc             # Prettier configuration
├── components.json         # shadcn/ui configuration
├── eslint.config.mjs       # ESLint configuration
├── middleware.ts           # Next.js middleware
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── pnpm-lock.yaml          # pnpm lock file
├── README.md               # Project overview
└── tsconfig.json           # TypeScript configuration
```

## App Directory (`app/`)

The app directory uses Next.js 15 App Router for file-based routing.

```
app/
├── globals.css             # Global styles
├── layout.tsx              # Root layout component
├── page.tsx                # Home page
└── manage-plan/            # Manage plan route
    └── page.tsx            # Manage plan page
```

### Key Files

- **`layout.tsx`**: Root layout with providers (Clerk, Convex, Header)
- **`page.tsx`**: Home page (currently placeholder)
- **`globals.css`**: Global Tailwind CSS styles
- **`manage-plan/page.tsx`**: Subscription management page

## Components Directory (`components/`)

Reusable React components organized by functionality.

```
components/
├── ConvexClientProvider.tsx    # Convex client provider
├── Header.tsx                  # Navigation header
├── schematic/                  # Schematic integration
│   ├── SchematicComponent.tsx  # Schematic component wrapper
│   └── SchematicEmbed.tsx      # Schematic embed component
└── ui/                         # shadcn/ui components
    └── button.tsx              # Button component
```

### Component Categories

#### Core Components

- **`ConvexClientProvider.tsx`**: Wraps the app with Convex client and Clerk integration
- **`Header.tsx`**: Main navigation header with authentication state

#### Schematic Components

- **`SchematicComponent.tsx`**: Server component wrapper for Schematic integration
- **`SchematicEmbed.tsx`**: Client component for embedding Schematic portal

#### UI Components

- **`ui/`**: shadcn/ui components for consistent design system

## Convex Directory (`convex/`)

Backend logic and database schema using Convex.

```
convex/
├── _generated/             # Auto-generated types and API
│   ├── api.d.ts            # TypeScript API types
│   ├── api.js              # JavaScript API
│   ├── dataModel.d.ts      # Database model types
│   └── server.d.ts         # Server function types
├── auth.config.ts          # Authentication configuration
├── myFunctions.ts          # Convex functions (queries, mutations, actions)
├── schema.ts               # Database schema
├── README.md               # Convex documentation
└── tsconfig.json           # Convex TypeScript configuration
```

### Key Files

- **`schema.ts`**: Database table definitions and indexes
- **`myFunctions.ts`**: Serverless functions (queries, mutations, actions)
- **`auth.config.ts`**: Clerk authentication configuration
- **`_generated/`**: Auto-generated TypeScript types and API

## Actions Directory (`actions/`)

Server actions for server-side operations.

```
actions/
└── getTemporaryAccessToken.ts    # Get Schematic access token
```

### Key Files

- **`getTemporaryAccessToken.ts`**: Server action to generate Schematic access tokens

## Lib Directory (`lib/`)

Utility functions and shared code.

```
lib/
└── (utility functions)     # Shared utilities
```

## Public Directory (`public/`)

Static assets served by Next.js.

```
public/
├── convex.svg              # Convex logo
└── (other static assets)   # Images, icons, etc.
```

## Documentation Directory (`docs/`)

Project documentation organized by topic.

```
docs/
├── README.md               # Documentation index
├── setup/                  # Setup guides
│   ├── README.md           # Project setup
│   ├── environment-variables.md
│   └── development-workflow.md
├── architecture/           # Architecture documentation
│   ├── tech-stack.md       # Technology overview
│   ├── project-structure.md
│   └── database-schema.md
├── implementation/         # Implementation guides
│   ├── authentication.md   # Clerk setup
│   ├── database.md         # Convex setup
│   ├── subscriptions.md    # Schematic setup
│   └── ui-components.md
├── deployment/             # Deployment guides
│   ├── README.md
│   └── environment-setup.md
├── troubleshooting/        # Troubleshooting guides
│   ├── common-issues.md
│   └── debugging.md
└── contributing/           # Contribution guidelines
    └── README.md
```

## Configuration Files

### Package Management

- **`package.json`**: Dependencies, scripts, and project metadata
- **`pnpm-lock.yaml`**: Locked dependency versions

### Development Tools

- **`tsconfig.json`**: TypeScript configuration
- **`eslint.config.mjs`**: ESLint rules and configuration
- **`.prettierrc`**: Code formatting rules
- **`components.json`**: shadcn/ui configuration

### Build and Runtime

- **`next.config.ts`**: Next.js configuration
- **`postcss.config.mjs`**: PostCSS configuration for Tailwind
- **`middleware.ts`**: Next.js middleware for authentication

## File Naming Conventions

### React Components

- **PascalCase**: `Header.tsx`, `SchematicComponent.tsx`
- **Descriptive names**: Clear, purpose-indicating names
- **File extensions**: `.tsx` for React components, `.ts` for utilities

### Convex Functions

- **camelCase**: `listNumbers`, `addNumber`, `myAction`
- **Descriptive names**: Clear function purpose
- **File organization**: Group related functions in files

### Routes

- **kebab-case**: `manage-plan/` for URL-friendly names
- **Nested structure**: Reflects URL hierarchy

## Import Conventions

### Absolute Imports

```typescript
// Use @/ alias for src directory
import { Button } from "@/components/ui/button";
import { getTemporaryAccessToken } from "@/actions/getTemporaryAccessToken";
```

### Relative Imports

```typescript
// Use relative imports for closely related files
import { api } from "./_generated/api";
import { v } from "convex/values";
```

### Third-Party Imports

```typescript
// Group third-party imports first
import React from "react";
import { useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";

// Then local imports
import { Button } from "@/components/ui/button";
```

## Code Organization Principles

### Separation of Concerns

- **Frontend**: React components and UI logic
- **Backend**: Convex functions and database operations
- **Authentication**: Clerk integration
- **Billing**: Schematic integration

### Reusability

- **Components**: Modular, reusable UI components
- **Functions**: Single-purpose, testable functions
- **Utilities**: Shared helper functions

### Maintainability

- **Clear structure**: Logical file organization
- **Consistent naming**: Predictable file and function names
- **Documentation**: Comprehensive documentation for each area

## Future Structure Considerations

### Planned Additions

```
receipt-tracker/
├── app/
│   ├── receipts/           # Receipt management routes
│   ├── dashboard/          # User dashboard
│   └── settings/           # User settings
├── components/
│   ├── receipts/           # Receipt-related components
│   ├── dashboard/          # Dashboard components
│   └── forms/              # Form components
├── convex/
│   ├── receipts.ts         # Receipt functions
│   ├── users.ts            # User functions
│   └── categories.ts       # Category functions
└── lib/
    ├── utils.ts            # General utilities
    ├── validators.ts       # Validation functions
    └── constants.ts        # Application constants
```

### Migration Strategy

- **Incremental**: Add new directories as features are implemented
- **Backward compatible**: Maintain existing structure
- **Documentation**: Update documentation as structure evolves
