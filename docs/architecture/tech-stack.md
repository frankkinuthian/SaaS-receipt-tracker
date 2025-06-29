# Technical Stack

This document provides an overview of the technologies and tools used in the Receipt Tracker project.

## Frontend Technologies

### Next.js 15

- **Purpose**: Full-stack React framework
- **Version**: 15.2.3
- **Features Used**:
  - App Router for file-based routing
  - Server Components for improved performance
  - Server Actions for form handling
  - Built-in TypeScript support

### React 19

- **Purpose**: UI library for building user interfaces
- **Version**: 19.0.0
- **Features Used**:
  - Functional components with hooks
  - Server Components
  - Concurrent features

### TypeScript

- **Purpose**: Type-safe JavaScript
- **Version**: 5.x
- **Configuration**: `tsconfig.json`
- **Benefits**:
  - Type safety across the entire stack
  - Better developer experience
  - Reduced runtime errors

### Tailwind CSS

- **Purpose**: Utility-first CSS framework
- **Version**: 4.x
- **Features Used**:
  - Utility classes for styling
  - Responsive design
  - Custom design system

## Backend Technologies

### Convex

- **Purpose**: Backend-as-a-Service with real-time database
- **Version**: 1.23.0
- **Features Used**:
  - Real-time database
  - Serverless functions (queries, mutations, actions)
  - File storage
  - Authentication integration
  - Type-safe API

### Clerk

- **Purpose**: Authentication and user management
- **Version**: 6.12.6
- **Features Used**:
  - User authentication
  - JWT token generation
  - User management
  - Pre-built UI components

## Third-Party Services

### Schematic

- **Purpose**: Subscription and billing management
- **Version**: 1.0.0 (components), 1.2.5 (React), 1.1.11 (TypeScript SDK)
- **Features Used**:
  - Customer portal components
  - Subscription management
  - Billing integration
  - API for programmatic access

## UI Component Libraries

### shadcn/ui

- **Purpose**: Re-usable UI components
- **Components Used**:
  - Button
  - Input
  - Dialog
  - Dropdown
  - Form components

### Lucide React

- **Purpose**: Icon library
- **Version**: 0.525.0
- **Icons Used**:
  - Shield (brand icon)
  - Navigation icons
  - Action icons

## Development Tools

### Package Manager

- **pnpm**: Fast, disk space efficient package manager
- **Version**: 8.x
- **Benefits**:
  - Faster installation
  - Disk space efficiency
  - Strict dependency management

### ESLint

- **Purpose**: Code linting and formatting
- **Version**: 9.x
- **Configuration**: `eslint.config.mjs`
- **Rules**: Next.js recommended rules

### Prettier

- **Purpose**: Code formatting
- **Version**: 3.5.3
- **Configuration**: `.prettierrc`

## Build and Deployment

### Build Tools

- **Next.js Build**: Optimized production builds
- **Convex Build**: Type-safe function deployment
- **TypeScript Compilation**: Type checking and compilation

### Development Scripts

```json
{
  "dev": "npm-run-all --parallel dev:frontend dev:backend",
  "dev:frontend": "next dev",
  "dev:backend": "convex dev",
  "build": "next build",
  "start": "next start"
}
```

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js 15    │    │     Convex      │    │     Clerk       │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│ (Auth)          │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Schematic     │    │   Tailwind CSS  │    │   TypeScript    │
│ (Billing)       │    │   (Styling)     │    │   (Type Safety) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Technology Decisions

### Why Next.js 15?

- **App Router**: Modern routing with better performance
- **Server Components**: Reduced client-side JavaScript
- **Built-in Optimization**: Automatic code splitting and optimization
- **TypeScript Support**: First-class TypeScript support

### Why Convex?

- **Real-time**: Built-in real-time subscriptions
- **Type Safety**: End-to-end type safety
- **Developer Experience**: Excellent DX with hot reloading
- **Scalability**: Automatic scaling

### Why Clerk?

- **Pre-built UI**: Ready-to-use authentication components
- **Security**: Enterprise-grade security
- **Integration**: Easy integration with Convex
- **Customization**: Highly customizable

### Why Schematic?

- **Embedded Components**: Easy integration with React
- **API-First**: Programmatic access to billing data
- **Flexibility**: Customizable subscription management
- **Developer Experience**: TypeScript SDK

## Performance Considerations

### Frontend

- **Server Components**: Reduced client-side JavaScript
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js built-in image optimization
- **Font Optimization**: Google Fonts optimization

### Backend

- **Real-time Queries**: Efficient real-time data fetching
- **Caching**: Automatic query result caching
- **Optimistic Updates**: Immediate UI updates
- **Background Processing**: Actions for heavy operations

## Security

### Authentication

- **JWT Tokens**: Secure token-based authentication
- **Clerk Integration**: Professional authentication service
- **Environment Variables**: Secure configuration management

### Data Protection

- **Type Safety**: TypeScript prevents many security issues
- **Input Validation**: Convex validators for all inputs
- **Access Control**: Row-level security in Convex

## Scalability

### Horizontal Scaling

- **Convex**: Automatic scaling based on usage
- **Next.js**: Vercel deployment with edge functions
- **Clerk**: Enterprise-grade scaling

### Performance Monitoring

- **Convex Dashboard**: Built-in performance monitoring
- **Next.js Analytics**: Built-in performance insights
- **Error Tracking**: Built-in error reporting

## Future Considerations

### Potential Additions

- **Stripe**: Direct payment processing
- **File Storage**: Convex file storage for receipts
- **OCR Processing**: Receipt text extraction
- **Analytics**: User behavior tracking
- **Email**: Transactional email service

### Migration Path

- **Database**: Convex handles scaling automatically
- **Authentication**: Clerk provides migration tools
- **Billing**: Schematic supports migration from other providers
