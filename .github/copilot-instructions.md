# Lumière E-Store - AI Assistant Instructions

## Architecture Overview

**Tech Stack:** Next.js 14, React 18, TypeScript, Supabase (auth + database), Stripe, Gemini AI, TailwindCSS

**Data Flow:**
- Frontend uses React Context (`StoreContext`) for state management (user, cart, products, orders)
- Cart persists to `localStorage` with key `"lumiere_cart"` 
- API routes in `/app/api/**` handle backend logic with token-based auth via Supabase
- Supabase manages PostgreSQL database + auth; two clients exist: browser (anon key) and admin (service role)

**Critical Service Boundaries:**
1. **Product Management** - Supabase `products` table, fetch public (no auth), create/delete require admin
2. **Authentication** - Supabase auth handles login/signup; admin users stored in separate `admin_users` table
3. **Orders** - User-scoped in Supabase `orders` table; Stripe integration for payment processing
4. **AI Recommendations** - Google Gemini API (`gemini-2.5-flash` model) with structured JSON schema responses

## Key Conventions

### Auth Pattern
- **User Authentication:** Use `requireUser(req: NextRequest)` in API routes to extract + verify Bearer token
- **Admin Check:** Use `requireAdmin(req)` to enforce admin-only endpoints; checks `admin_users` table
- **Client-Side:** Get token via `supabaseBrowser.auth.getSession()`, pass in `Authorization: Bearer ${token}` headers

### Error Handling
- API routes throw error objects with `.status` property (default 401/403/500)
- Catch blocks extract status with `error?.status ?? 500` and return `NextResponse.json({ message }, { status })`
- Client-side fetches check `res.ok` before parsing JSON; fallback to empty arrays on failure

### Data Validation
- Use Zod schemas for complex payloads (defined in `types.ts` as interfaces; Zod can wrap them)
- Normalize numeric inputs: `Number(payload.price)` and validate with `Math.max()` for quantities
- Always verify product IDs exist in database before using in calculations

### State Management
- Cart operations (`addToCart`, `removeFromCart`, `updateQuantity`) update React state + localStorage automatically
- `StoreContext` exposes helper methods; components use `useContext(StoreContext)` to access
- `isCartOpen` boolean controls `<CartDrawer>` visibility (toggle with `toggleCart()`)

## File Locations & Purpose

| Path | Purpose |
|------|---------|
| `/lib/auth.ts` | Bearer token extraction, user/admin verification |
| `/lib/supabase/{client,admin}.ts` | Supabase client initialization (browser vs service role) |
| `/lib/stripe.ts` | Stripe instance with fallback for missing key |
| `/services/geminiService.ts` | AI recommendation logic with defensive API error handling |
| `/context/StoreContext.tsx` | Global state (user, cart, products, orders) |
| `/app/api/products/route.ts` | GET all products (public), POST to create (admin-only) |
| `/app/api/checkout/route.ts` | Create Stripe session + order record; validates cart items |
| `/app/api/ai-stylist/route.ts` | POST query → fetch products → call Gemini → return recommendations |

## Common Tasks

### Add an API Endpoint
1. Create `/app/api/[resource]/route.ts` (Next.js file-based routing)
2. Import `requireUser` or `requireAdmin` for auth, create Supabase admin client
3. Return `NextResponse.json({ data }, { status })`; error objects must include `.status` property

### Modify Product Data
- Products table columns: `id`, `name`, `price`, `category`, `description`, `image`, `stock`, `created_at`
- Always fetch fresh products via `/api/products` when inventory changes
- Call `refreshProducts()` in context after product mutations

### Handle Checkout
- Items must exist in database; cart format: `{ id, quantity, ... }`
- Stripe session created with metadata (`orderId`, `userId`); stored via webhook in `orders` table
- Success URL redirects to `/success?session_id={CHECKOUT_SESSION_ID}`

### Extend AI Stylist
- Edit `geminiService.ts` to adjust prompt, schema, or model version
- Returns `{ recommendedIds: string[], reasoning: string }`; `reasoning` should be marketing-friendly copy
- Defensive fallback returns mock recommendations if API key missing

## Development Commands

```bash
npm run dev     # Start dev server (localhost:3000)
npm run build   # Production build
npm run lint    # ESLint check
npm start       # Run prod build
```

**Required ENV Variables:**
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY
GEMINI_API_KEY
```

## Debugging Tips

- **Auth Issues:** Check Bearer token format in request headers; verify Supabase session exists
- **Cart Persistence:** Inspect `localStorage.lumiere_cart` in browser DevTools
- **Product Fetch Failures:** Verify Supabase `products` table has records; check network tab for 500 errors
- **Stripe/Gemini Failures:** Gracefully handled with fallback messages; check console for logged errors
