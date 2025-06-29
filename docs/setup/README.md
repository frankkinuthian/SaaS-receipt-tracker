# Project Setup Guide

This guide walks you through setting up the Receipt Tracker project from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **Git**

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd receipt-tracker
```

## Step 2: Install Dependencies

```bash
pnpm install
```

This will install all required dependencies including:

- Next.js 15
- React 19
- Convex
- Clerk
- Schematic
- Tailwind CSS
- shadcn/ui components

## Step 3: Environment Configuration

Create a `.env.local` file in the project root:

```bash
touch .env.local
```

Add the following environment variables (see [Environment Variables](./environment-variables.md) for detailed setup):

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Convex Backend
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url

# Schematic (Billing)
SCHEMATIC_API_KEY=your_schematic_api_key
NEXT_PUBLIC_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID=your_component_id

# Clerk JWT for Convex
CLERK_JWT_ISSUER_DOMAIN=your_clerk_jwt_issuer_domain
```

## Step 4: Initialize Convex

1. **Create Convex Account**
   - Go to [convex.dev](https://convex.dev)
   - Sign up and create a new project

2. **Deploy to Convex**

   ```bash
   npx convex dev
   ```

3. **Set Environment Variables in Convex Dashboard**
   - Go to your Convex dashboard
   - Navigate to Settings → Environment Variables
   - Add `CLERK_JWT_ISSUER_DOMAIN` with your Clerk JWT issuer domain

## Step 5: Configure Clerk

1. **Create Clerk Application**
   - Go to [clerk.com](https://clerk.com)
   - Create a new application

2. **Set up JWT Template**
   - In Clerk dashboard, go to JWT Templates
   - Create a new template named "convex"
   - Set the template content:

   ```json
   {
     "aud": "convex",
     "sub": "{{user.id}}",
     "iat": "{{token.iat}}",
     "exp": "{{token.exp}}"
   }
   ```

3. **Get API Keys**
   - Copy your publishable key and secret key
   - Add them to your `.env.local` file

## Step 6: Configure Schematic

1. **Create Schematic Account**
   - Go to [schematic.com](https://schematic.com)
   - Sign up and create a new project

2. **Get API Key**
   - Copy your API key from the Schematic dashboard
   - Add it to your `.env.local` file

3. **Create Customer Portal Component**
   - In Schematic dashboard, create a customer portal component
   - Copy the component ID and add it to your environment variables

## Step 7: Start Development

```bash
pnpm dev
```

This will start both the frontend and backend:

- **Frontend**: http://localhost:3000
- **Convex Dashboard**: http://localhost:8000

## Step 8: Verify Installation

1. **Check Frontend**
   - Open http://localhost:3000
   - You should see the Expensio header with sign-in button

2. **Test Authentication**
   - Click "Sign in" and complete the authentication flow
   - Verify you can access the "Manage Plan" page

3. **Check Convex Dashboard**
   - Open http://localhost:8000
   - Verify your functions are deployed and working

## Troubleshooting

### Common Issues

1. **"Missing audience in JWT payload"**
   - Ensure your Clerk JWT template has `"aud": "convex"`
   - Verify `CLERK_JWT_ISSUER_DOMAIN` is set correctly

2. **Convex connection issues**
   - Check `NEXT_PUBLIC_CONVEX_URL` is correct
   - Verify Convex deployment is running

3. **Schematic integration errors**
   - Ensure `SCHEMATIC_API_KEY` is valid
   - Check component ID is correct

### Next Steps

After successful setup:

1. Review the [Development Workflow](./development-workflow.md)
2. Check [Database Schema](../architecture/database-schema.md) for next steps
3. Start implementing core features

## Support

If you encounter issues during setup:

1. Check the [Troubleshooting Guide](../troubleshooting/common-issues.md)
2. Review the [Common Issues](../troubleshooting/common-issues.md)
3. Create an issue in the project repository
