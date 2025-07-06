# Receipt Tracker

A modern SaaS application for tracking and managing receipts with AI-powered expense categorization and real-time analytics.

## Quick Start

```bash
# Clone and install
git clone <repository-url>
cd receipt-tracker
pnpm install

# Set up environment variables
cp .env.example .env.local
# Fill in your environment variables

# Start development
pnpm dev
```

**Frontend**: http://localhost:3000  
**Convex Dashboard**: http://localhost:8000

## Architecture

### Tech Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Backend**: Convex (database + serverless functions)
- **Authentication**: Clerk
- **Billing**: Schematic
- **Background Jobs**: Inngest
- **Styling**: Tailwind CSS + shadcn/ui

### Core Services

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js 15    │    │     Convex      │    │     Clerk       │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│ (Auth)          │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Schematic     │    │    Inngest      │    │   TypeScript    │
│ (Billing)       │    │ (Background)    │    │ (Type Safety)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
receipt-tracker/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   └── manage-plan/        # Subscription management
├── components/             # React components
│   ├── ConvexClientProvider.tsx
│   ├── Header.tsx          # Navigation header
│   ├── schematic/          # Schematic integration
│   └── ui/                 # shadcn/ui components
├── convex/                 # Backend (Convex)
│   ├── schema.ts           # Database schema
│   ├── myFunctions.ts      # Serverless functions
│   └── auth.config.ts      # Authentication config
├── actions/                # Server actions
│   └── getTemporaryAccessToken.ts
├── docs/                   # 📚 Comprehensive documentation
└── lib/                    # Utility functions
```

## ✨ Features

### Implemented

- **Authentication**: Complete Clerk integration with JWT
- **Subscription Management**: Schematic customer portal
- **Real-time Database**: Convex with type-safe queries
- **Modern UI**: Responsive design with Tailwind CSS
- **Type Safety**: End-to-end TypeScript

### In Development

- **Receipt Upload**: File upload with OCR processing
- **Expense Categorization**: AI-powered categorization
- **Background Processing**: Inngest for heavy operations
- **Analytics Dashboard**: Expense insights and reporting

### 📋 Planned

- **Team Collaboration**: Multi-user support
- **Export Functionality**: PDF/CSV reports
- **Mobile App**: React Native companion
- **Advanced Analytics**: Machine learning insights

## Core Functionality with Inngest

### Background Job Processing

```typescript
// Inngest functions for heavy operations
- OCR Processing: Extract text from receipt images
- AI Categorization: Categorize expenses using AI
- Data Synchronization: Sync with external services
- Report Generation: Generate monthly/yearly reports
- Email Notifications: Send expense summaries
```

### Event-Driven Architecture

```typescript
// Events trigger background jobs
- receipt.uploaded → OCR processing
- receipt.processed → AI categorization
- expense.categorized → Analytics update
- report.requested → PDF generation
```

## Development

### Prerequisites

- Node.js 18+
- pnpm package manager
- Git

### Environment Variables

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Convex Backend
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Schematic (Billing)
SCHEMATIC_API_KEY=sch_live_...
NEXT_PUBLIC_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID=comp_...

# Clerk JWT for Convex
CLERK_JWT_ISSUER_DOMAIN=https://clerk.your-app.com

# Inngest (Background Jobs)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### Development Commands

```bash
# Start development servers
pnpm dev                    # Frontend + Backend
pnpm dev:frontend          # Frontend only
pnpm dev:backend           # Backend only

# Build and deploy
pnpm build                 # Production build
pnpm start                 # Start production server

# Code quality
pnpm lint                  # ESLint
pnpm format                # Prettier
```

## Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

- **[Setup Guide](./docs/setup/README.md)** - Complete setup instructions
- **[Environment Variables](./docs/setup/environment-variables.md)** - Configuration details
- **[Development Workflow](./docs/setup/development-workflow.md)** - Best practices
- **[Architecture](./docs/architecture/)** - Technical stack and structure
- **[Troubleshooting](./docs/troubleshooting/common-issues.md)** - Common issues and solutions

## Authentication Flow

1. **User signs in** via Clerk
2. **JWT token** generated with "convex" audience
3. **Convex authenticates** user using JWT
4. **User data** synced across services

## Subscription Management

- **Schematic integration** for billing
- **Customer portal** for plan management
- **Usage-based pricing** with tiered plans
- **Automatic billing** and invoicing

## Deployment

### Frontend (Vercel)

```bash
vercel --prod
```

### Backend (Convex)

```bash
npx convex deploy --prod
```

### Background Jobs (Inngest)

```bash
npx inngest-cli deploy
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: Check the [docs](./docs/) directory
- **Issues**: Create an issue in the repository
- **Discussions**: Use GitHub Discussions for questions

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [docs/](./docs/)
- **Convex Dashboard**: [dashboard.convex.dev](https://dashboard.convex.dev)
- **Clerk Dashboard**: [dashboard.clerk.com](https://dashboard.clerk.com)
- **Schematic Dashboard**: [app.schematichq.com](https://app.schematic.com)
- **Inngest Dashboard**: [cloud.inngest.com](https://cloud.inngest.com)

---

