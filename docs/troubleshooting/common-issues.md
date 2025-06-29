# Common Issues and Solutions

This document provides solutions to common issues you may encounter while working with the Receipt Tracker project.

## Authentication Issues

### "Missing audience in JWT payload"

**Error Message:**

```
Failed to authenticate: "Missing audience in JWT payload", check your server auth config
```

**Cause:** The JWT token from Clerk doesn't have the required `aud` (audience) claim set to "convex".

**Solution:**

1. **Check Clerk JWT Template:**
   - Go to your [Clerk Dashboard](https://dashboard.clerk.com)
   - Navigate to **JWT Templates**
   - Find the "convex" template
   - Ensure it contains:

   ```json
   {
     "aud": "convex",
     "sub": "{{user.id}}",
     "iat": "{{token.iat}}",
     "exp": "{{token.exp}}"
   }
   ```

2. **Verify Environment Variables:**
   - Check `CLERK_JWT_ISSUER_DOMAIN` is set correctly in `.env.local`
   - Ensure the same variable is set in your Convex dashboard

3. **Restart Development Server:**
   ```bash
   pnpm dev
   ```

### "You forgot to wrap your code with <EmbedProvider>"

**Error Message:**

```
[Error: You forgot to wrap your code with <EmbedProvider>.]
```

**Cause:** Schematic components require an `EmbedProvider` wrapper.

**Solution:**
Wrap your Schematic component with `EmbedProvider`:

```typescript
import { EmbedProvider } from "@schematichq/schematic-components";

function SchematicEmbed({ accessToken, componentId }) {
  return (
    <EmbedProvider>
      <SchematicEmbedComponent accessToken={accessToken} id={componentId} />
    </EmbedProvider>
  );
}
```

### "Maximum call stack size exceeded"

**Error Message:**

```
RangeError: Maximum call stack size exceeded
```

**Cause:** Recursive component call in Schematic component.

**Solution:**
Ensure you're calling the actual package component, not your wrapper:

```typescript
// ❌ Wrong - calls itself recursively
function SchematicEmbed({ accessToken, componentId }) {
  return <SchematicEmbed accessToken={accessToken} componentId={componentId} />;
}

// ✅ Correct - calls the package component
import { SchematicEmbed as SchematicEmbedComponent } from "@schematichq/schematic-components";

function SchematicEmbed({ accessToken, componentId }) {
  return <SchematicEmbedComponent accessToken={accessToken} id={componentId} />;
}
```

## Convex Issues

### "Convex connection failed"

**Error Message:**

```
Failed to connect to Convex
```

**Cause:** Invalid or missing Convex URL.

**Solution:**

1. **Check Environment Variable:**
   - Verify `NEXT_PUBLIC_CONVEX_URL` is set correctly
   - Ensure it starts with `https://`

2. **Check Convex Dashboard:**
   - Go to your [Convex Dashboard](https://dashboard.convex.dev)
   - Copy the deployment URL from Settings → General

3. **Restart Development:**
   ```bash
   pnpm dev
   ```

### "Function not found"

**Error Message:**

```
Function "api.myFunctions.listNumbers" not found
```

**Cause:** Function not deployed or incorrect import.

**Solution:**

1. **Check Function Deployment:**
   - Run `npx convex dev` to deploy functions
   - Check the Convex dashboard for deployment status

2. **Verify Import:**

   ```typescript
   // ✅ Correct import
   import { api } from "@/convex/_generated/api";

   // ❌ Wrong import
   import { api } from "convex/api";
   ```

3. **Check Function Registration:**
   - Ensure functions are exported from `convex/myFunctions.ts`
   - Verify function names match the import

## Schematic Issues

### "Invalid API key"

**Error Message:**

```
Invalid API key
```

**Cause:** Incorrect or expired Schematic API key.

**Solution:**

1. **Check API Key:**
   - Go to your [Schematic Dashboard](https://app.schematic.com)
   - Navigate to API Keys
   - Copy the correct API key

2. **Verify Environment Variable:**
   - Ensure `SCHEMATIC_API_KEY` is set in `.env.local`
   - Check for typos or extra spaces

3. **Check Key Format:**
   - Schematic API keys start with `sch_`
   - Ensure you're using the correct environment (test/live)

### "Component not found"

**Error Message:**

```
Component not found
```

**Cause:** Invalid component ID or component doesn't exist.

**Solution:**

1. **Check Component ID:**
   - Go to your Schematic Dashboard
   - Navigate to Components → Customer Portal
   - Copy the correct component ID

2. **Verify Environment Variable:**
   - Ensure `NEXT_PUBLIC_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID` is set
   - Component IDs start with `comp_`

## Environment Variable Issues

### "Environment variable not found"

**Error Message:**

```
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is undefined
```

**Cause:** Environment variable not set or file not loaded.

**Solution:**

1. **Check File Location:**
   - Ensure `.env.local` is in the project root
   - Verify the file name is exactly `.env.local`

2. **Check Variable Name:**
   - Ensure variable names match exactly
   - Check for typos or case sensitivity

3. **Restart Development Server:**

   ```bash
   pnpm dev
   ```

4. **Verify File Format:**

   ```env
   # ✅ Correct format
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

   # ❌ Wrong format (no spaces around =)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_test_...
   ```

## Build Issues

### "TypeScript compilation failed"

**Error Message:**

```
Type '{ accessToken: string; componentId: string; }' is not assignable to type 'IntrinsicAttributes & EmbedProps'.
```

**Cause:** Incorrect prop names or types.

**Solution:**

1. **Check Prop Names:**
   - Verify you're using the correct prop names
   - Check the component's TypeScript definitions

2. **Fix Prop Names:**

   ```typescript
   // ❌ Wrong prop name
   <SchematicEmbed componentId={componentId} />

   // ✅ Correct prop name
   <SchematicEmbed id={componentId} />
   ```

### "Module not found"

**Error Message:**

```
Module not found: Can't resolve '@/components/ui/button'
```

**Cause:** Missing component or incorrect import path.

**Solution:**

1. **Check File Exists:**
   - Verify the component file exists
   - Check the file path is correct

2. **Install Missing Dependencies:**

   ```bash
   pnpm install
   ```

3. **Check Import Path:**

   ```typescript
   // ✅ Correct import
   import { Button } from "@/components/ui/button";

   // ❌ Wrong import
   import { Button } from "@/components/Button";
   ```

## Performance Issues

### "Slow page load"

**Symptoms:** Pages take a long time to load.

**Solutions:**

1. **Check Network Tab:**
   - Open browser dev tools
   - Check for failed requests or slow responses

2. **Verify Convex Connection:**
   - Check Convex dashboard for function performance
   - Look for slow queries or mutations

3. **Optimize Components:**
   - Use React.memo for expensive components
   - Implement proper loading states

### "Memory leaks"

**Symptoms:** Application becomes slower over time.

**Solutions:**

1. **Check for Unused Subscriptions:**
   - Ensure Convex queries are properly cleaned up
   - Use useEffect cleanup functions

2. **Monitor Component Lifecycle:**
   - Check for components that don't unmount properly
   - Verify event listeners are removed

## Development Workflow Issues

### "Hot reload not working"

**Symptoms:** Changes don't reflect immediately.

**Solutions:**

1. **Check File Watchers:**
   - Ensure you're editing the correct files
   - Check for file system watcher limits

2. **Restart Development Server:**

   ```bash
   pnpm dev
   ```

3. **Clear Cache:**
   ```bash
   rm -rf .next
   pnpm dev
   ```

### "Convex functions not updating"

**Symptoms:** Backend changes don't reflect.

**Solutions:**

1. **Check Convex Dev:**
   - Ensure `npx convex dev` is running
   - Check for deployment errors

2. **Force Redeploy:**

   ```bash
   npx convex dev --once
   ```

3. **Check Function Syntax:**
   - Verify TypeScript compilation
   - Check for syntax errors

## Getting Help

If you encounter an issue not covered here:

1. **Check Logs:**
   - Browser console for frontend errors
   - Terminal for backend errors
   - Convex dashboard for function logs

2. **Search Documentation:**
   - [Next.js Documentation](https://nextjs.org/docs)
   - [Convex Documentation](https://docs.convex.dev)
   - [Clerk Documentation](https://clerk.com/docs)
   - [Schematic Documentation](https://docs.schematic.com)

3. **Create Issue:**
   - Include error message
   - Provide steps to reproduce
   - Share relevant code snippets
   - Include environment information

## Prevention Tips

1. **Keep Dependencies Updated:**

   ```bash
   pnpm update
   ```

2. **Use TypeScript Strictly:**
   - Enable strict mode in `tsconfig.json`
   - Fix all TypeScript errors

3. **Follow Best Practices:**
   - Use proper error boundaries
   - Implement loading states
   - Handle edge cases

4. **Regular Testing:**
   - Test authentication flow
   - Verify Convex functions
   - Check Schematic integration
