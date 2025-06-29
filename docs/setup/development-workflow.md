# Development Workflow

This document outlines the development workflow and best practices for working on the Receipt Tracker project.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Git for version control
- Code editor (VS Code recommended)

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd receipt-tracker

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual values

# Start development servers
pnpm dev
```

## Development Environment

### Running the Application

```bash
# Start both frontend and backend
pnpm dev

# Start only frontend
pnpm dev:frontend

# Start only backend
pnpm dev:backend
```

### Development URLs

- **Frontend**: http://localhost:3000
- **Convex Dashboard**: http://localhost:8000
- **Next.js Dev Tools**: Available in browser

### Hot Reloading

- **Frontend**: Automatic hot reloading for React components
- **Backend**: Convex functions auto-deploy on save
- **TypeScript**: Real-time type checking

## Code Organization

### File Structure

```
receipt-tracker/
├── app/                    # Next.js App Router pages
├── components/             # Reusable React components
├── convex/                 # Backend functions and schema
├── actions/                # Server actions
├── lib/                    # Utility functions
└── docs/                   # Project documentation
```

### Naming Conventions

- **Components**: PascalCase (`Header.tsx`)
- **Functions**: camelCase (`getTemporaryAccessToken`)
- **Files**: kebab-case for routes (`manage-plan/`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)

## Development Workflow

### 1. Feature Development

#### Starting a New Feature

```bash
# Create a new branch
git checkout -b feature/receipt-upload

# Make your changes
# Test locally
# Commit your changes
git add .
git commit -m "feat: add receipt upload functionality"
```

#### Development Process

1. **Plan**: Define the feature requirements
2. **Implement**: Write code following project conventions
3. **Test**: Test locally and verify functionality
4. **Review**: Self-review your code
5. **Commit**: Write clear commit messages

### 2. Database Changes

#### Schema Updates

```typescript
// convex/schema.ts
export default defineSchema({
  receipts: defineTable({
    userId: v.id("users"),
    fileName: v.string(),
    amount: v.number(),
    category: v.string(),
    uploadDate: v.number(),
  }).index("by_user", ["userId"]),
});
```

#### Function Development

```typescript
// convex/receipts.ts
export const createReceipt = mutation({
  args: {
    fileName: v.string(),
    amount: v.number(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = ctx.auth.userId;
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("receipts", {
      userId,
      fileName: args.fileName,
      amount: args.amount,
      category: args.category,
      uploadDate: Date.now(),
    });
  },
});
```

### 3. Frontend Development

#### Component Development

```typescript
// components/receipts/ReceiptUpload.tsx
"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function ReceiptUpload() {
  const [file, setFile] = useState<File | null>(null);
  const createReceipt = useMutation(api.receipts.createReceipt);

  const handleUpload = async () => {
    if (!file) return;

    // Handle file upload logic
    await createReceipt({
      fileName: file.name,
      amount: 0, // Extract from OCR
      category: "uncategorized",
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>Upload Receipt</button>
    </div>
  );
}
```

#### Page Development

```typescript
// app/receipts/page.tsx
import { ReceiptUpload } from "@/components/receipts/ReceiptUpload";
import { ReceiptList } from "@/components/receipts/ReceiptList";

export default function ReceiptsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Receipts</h1>
      <ReceiptUpload />
      <ReceiptList />
    </div>
  );
}
```

## Testing Strategy

### Manual Testing

1. **Authentication Flow**
   - Sign up/sign in
   - Verify user state persistence
   - Test sign out

2. **Core Features**
   - Test each feature end-to-end
   - Verify data persistence
   - Check error handling

3. **Cross-browser Testing**
   - Chrome, Firefox, Safari
   - Mobile responsiveness

### Automated Testing (Future)

```typescript
// __tests__/receipts.test.ts
import { render, screen } from "@testing-library/react";
import { ReceiptUpload } from "@/components/receipts/ReceiptUpload";

describe("ReceiptUpload", () => {
  it("should render upload button", () => {
    render(<ReceiptUpload />);
    expect(screen.getByText("Upload Receipt")).toBeInTheDocument();
  });
});
```

## Code Quality

### TypeScript

- **Strict Mode**: Enabled in `tsconfig.json`
- **Type Safety**: All functions and components typed
- **No `any`**: Avoid using `any` type

### ESLint

```bash
# Check for linting issues
pnpm lint

# Fix auto-fixable issues
pnpm lint --fix
```

### Prettier

```bash
# Format code
pnpm format
```

### Pre-commit Hooks (Future)

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

## Debugging

### Frontend Debugging

```typescript
// Browser console
console.log("Debug info:", data);

// React DevTools
// Install React Developer Tools extension

// Network tab
// Check API requests and responses
```

### Backend Debugging

```typescript
// Convex function logging
export const debugFunction = query({
  args: {},
  handler: async (ctx, args) => {
    console.log("Debug info:", ctx.auth.userId);
    return "Debug complete";
  },
});
```

### Convex Dashboard

- **Functions**: View function logs and performance
- **Data**: Browse and query database
- **Deployments**: Monitor deployment status

## Performance Optimization

### Frontend

```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive rendering */}</div>;
});

// Implement proper loading states
const [isLoading, setIsLoading] = useState(false);

// Use proper key props for lists
{items.map(item => (
  <ListItem key={item.id} item={item} />
))}
```

### Backend

```typescript
// Use indexes for efficient queries
export const getReceiptsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("receipts")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Implement pagination for large datasets
export const getReceiptsPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("receipts")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .paginate(args.paginationOpts);
  },
});
```

## Deployment

### Development Deployment

```bash
# Deploy to Convex
npx convex dev

# Build for production
pnpm build
```

### Production Deployment

```bash
# Deploy frontend (Vercel)
vercel --prod

# Deploy backend (Convex)
npx convex deploy --prod
```

## Collaboration

### Git Workflow

```bash
# Feature branches
git checkout -b feature/new-feature

# Commit messages
git commit -m "feat: add receipt upload"
git commit -m "fix: resolve authentication issue"
git commit -m "docs: update README"

# Pull requests
# Create PR with clear description
# Request code review
# Address feedback
```

### Code Review Checklist

- [ ] Code follows project conventions
- [ ] TypeScript types are correct
- [ ] Error handling is implemented
- [ ] Performance considerations addressed
- [ ] Documentation updated
- [ ] Tests added (if applicable)

## Troubleshooting

### Common Issues

1. **Convex functions not updating**
   - Check `npx convex dev` is running
   - Verify function syntax

2. **Environment variables not loading**
   - Restart development server
   - Check `.env.local` file

3. **TypeScript errors**
   - Run `pnpm type-check`
   - Check import paths

### Getting Help

1. Check the [Troubleshooting Guide](../troubleshooting/common-issues.md)
2. Search existing issues
3. Create a new issue with details

## Best Practices

### Code Organization

- Keep components small and focused
- Use meaningful variable and function names
- Group related functionality together

### Performance

- Implement proper loading states
- Use React.memo for expensive components
- Optimize database queries with indexes

### Security

- Validate all inputs
- Use proper authentication checks
- Never expose sensitive data

### Maintainability

- Write clear, self-documenting code
- Add comments for complex logic
- Keep dependencies updated
