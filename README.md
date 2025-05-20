# Driva Frontend

## Setup

```bash
npm install
npm start  # http://localhost:3000
```

## Tailwind CSS

Already configured via `tailwind.config.js` and `postcss.config.js`.

## API Proxy Setup (Development)

To forward API requests from your React frontend (running on port 3000) to your backend server (e.g., running on port 4000), you can use a proxy. This avoids CORS issues and allows you to use relative API paths in your code.

**Steps:**

1. **Install the proxy middleware:**

   ```bash
   npm install http-proxy-middleware --save
   ```

2. **Create a proxy setup file:**

   - Create a file named `setupProxy.js` (or `setupProxy.ts` for TypeScript) in your `src` directory.

3. **Add the following code to `setupProxy.js`:**

   ```js
   const { createProxyMiddleware } = require("http-proxy-middleware");

   module.exports = function (app) {
     app.use(
       "/api",
       createProxyMiddleware({
         target: "http://localhost:4000", // Change this to your backend port
         changeOrigin: true,
       })
     );
   };
   ```

4. **How it works:**

   - Any request from your React app to `/api` (e.g., `/api/apply`) will be forwarded to your backend server.
   - This allows you to use relative URLs in your frontend code (e.g., `fetch('/api/apply')`), and the proxy will handle routing to the backend.

5. **Note:**
   - You do not need to run or import this file manually; `react-scripts` will automatically use it during development.
   - Make sure to restart your development server after adding or changing the proxy setup.

## Testing

### Unit & Integration

- React Testing Library: `npm test`

### End-to-End

```bash
npm install --save-dev cypress
npx cypress open
```

Tests located in `cypress/integration/form.spec.ts` cover form navigation, validation, and API submission.

## Architecture

- **React v18 + TypeScript**
- **React Hook Form** & **Zod** for schema-driven validation
- **Tailwind CSS** for utility-first styling
- **Atomic Components**: `PersonalDetailsForm`, `LoanDetailsForm`, `Results`
- **Fetch API** to POST `/api/apply`

## Submission Guidelines

- Push to GitHub including `node_modules` (lockfile present)
- Ensure README.md explains setup & design
- Be ready to discuss DRY, SOLID, YAGNI choices, and testing strategy

## Next Steps

- Add CI (GitHub Actions) to run tests
- Integrate a component library for more polished UI
