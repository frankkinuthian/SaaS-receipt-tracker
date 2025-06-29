# Environment Variables Guide

This document provides detailed information about all environment variables required for the Receipt Tracker project.

## Environment File Setup

Create a `.env.local` file in your project root:

```bash
touch .env.local
```

## Required Environment Variables

### Clerk Authentication

```env
# Your Clerk publishable key (public)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# Your Clerk secret key (private)
CLERK_SECRET_KEY=sk_test_...
```

**How to get these:**

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **API Keys**
3. Copy the **Publishable Key** and **Secret Key**

### Convex Backend

```env
# Your Convex deployment URL
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

**How to get this:**

1. Go to your [Convex Dashboard](https://dashboard.convex.dev)
2. Navigate to **Settings** → **General**
3. Copy the **Deployment URL**

### Schematic (Billing/Subscriptions)

```env
# Your Schematic API key
SCHEMATIC_API_KEY=sch_live_...

# Your Schematic customer portal component ID
NEXT_PUBLIC_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID=comp_...
```

**How to get these:**

1. Go to your [Schematic Dashboard](https://app.schematic.com)
2. Navigate to **API Keys** for the API key
3. Navigate to **Components** → **Customer Portal** for the component ID

### Clerk JWT for Convex Integration

```env
# Your Clerk JWT issuer domain
CLERK_JWT_ISSUER_DOMAIN=https://clerk.your-app.com
```

**How to get this:**

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **JWT Templates**
3. Copy the **Issuer URL** (looks like `https://clerk.your-app.com`)

## Complete Example

Here's a complete `.env.local` file example:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_abc123def456ghi789
CLERK_SECRET_KEY=sk_test_xyz789abc123def456

# Convex Backend
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Schematic (Billing)
SCHEMATIC_API_KEY=sch_live_1234567890abcdef
NEXT_PUBLIC_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID=comp_abcdef123456

# Clerk JWT for Convex
CLERK_JWT_ISSUER_DOMAIN=https://clerk.your-app.com
```

## Environment Variable Types

### Public Variables (`NEXT_PUBLIC_*`)

These variables are exposed to the browser and can be used in client-side code:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_CONVEX_URL`
- `NEXT_PUBLIC_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID`

### Private Variables

These variables are only available on the server side:

- `CLERK_SECRET_KEY`
- `SCHEMATIC_API_KEY`
- `CLERK_JWT_ISSUER_DOMAIN`

## Convex Environment Variables

You also need to set environment variables in your Convex dashboard:

1. Go to your [Convex Dashboard](https://dashboard.convex.dev)
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:

```env
CLERK_JWT_ISSUER_DOMAIN=https://clerk.your-app.com
```

## Validation

To validate your environment variables are set correctly:

1. **Check if variables are loaded:**

   ```bash
   # In your terminal
   echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   ```

2. **Test in your application:**

   ```javascript
   // In your browser console
   console.log(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
   ```

3. **Verify Convex connection:**
   - Start your development server: `pnpm dev`
   - Check the Convex dashboard at http://localhost:8000
   - Verify functions are deployed successfully

## Security Notes

- **Never commit `.env.local` to version control**
- **Use different keys for development and production**
- **Rotate keys regularly**
- **Use environment-specific configurations**

## Troubleshooting

### Common Issues

1. **"Environment variable not found"**
   - Ensure the variable name is correct
   - Check for typos in the variable name
   - Restart your development server after adding variables

2. **"Invalid API key"**
   - Verify the key format is correct
   - Check if the key is from the right environment (test/live)
   - Ensure the key hasn't expired

3. **"Missing audience in JWT payload"**
   - Verify `CLERK_JWT_ISSUER_DOMAIN` is set correctly
   - Check that the JWT template in Clerk has `"aud": "convex"`

### Environment-Specific Configurations

#### Development

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

#### Production

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

## Next Steps

After setting up environment variables:

1. Follow the [Project Setup Guide](./README.md)
2. Test the [Authentication Setup](../implementation/authentication.md)
3. Verify the [Database Setup](../implementation/database.md)
