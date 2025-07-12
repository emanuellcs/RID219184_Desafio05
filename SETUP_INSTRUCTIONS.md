# Setup Instructions - Book Management System

This guide provides detailed instructions for setting up the Book Management System with Vercel and Supabase.

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git
- Vercel account (free tier is sufficient)
- Supabase account (free tier is sufficient)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd RID219184_Desafio05
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Supabase

1. **Create a Supabase Project**
   - Go to https://app.supabase.com
   - Click "New project"
   - Choose your organization
   - Set a project name (e.g., "book-management")
   - Generate a strong database password (save this!)
   - Select your region (preferably closest to your users)
   - Click "Create new project"

2. **Set Up the Database Schema**
   - In your Supabase dashboard, go to the SQL Editor
   - Open the file `src/db/supabase-schema.sql` from this project
   - Copy the entire content and paste it into the SQL Editor
   - Click "Run" to execute the schema creation
   - Verify the `livros` table was created in the Table Editor

3. **Get Your API Credentials**
   - In the Supabase dashboard, go to Settings > API
   - Copy the following values:
     - Project URL (looks like: https://xxxxx.supabase.co)
     - anon/public key (a long JWT token)

### 4. Configure Environment Variables

1. **Create `.env.local` file** (copy from `.env.local.example`):
   ```bash
   cp .env.local.example .env.local
   ```

2. **Edit `.env.local`** and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 5. Run the Development Server

```bash
npm run vercel-dev
```

The application will be available at http://localhost:3000

## Vercel Deployment

### 1. Install Vercel CLI (if not already done)

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy to Vercel

For the first deployment:
```bash
vercel
```

Follow the prompts:
- Set up and deploy: Yes
- Which scope: Select your account
- Link to existing project?: No (for first time)
- Project name: Choose a name or use default
- In which directory is your code located?: ./ (current directory)
- Override settings?: No

For subsequent deployments:
```bash
vercel --prod
```

### 4. Configure Production Environment Variables

After deployment, you need to set the environment variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add the following variables for Production:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
5. Click "Save"
6. Redeploy for changes to take effect:
   ```bash
   vercel --prod
   ```

## Environment Variables Reference

### Local Development (.env.local)
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Production (Vercel Dashboard)
Same variables as above, configured through Vercel's dashboard.

## Testing the Setup

### Local Testing

1. Start the development server:
   ```bash
   npm run vercel-dev
   ```

2. Open http://localhost:3000

3. Test the following:
   - View the home page
   - Navigate to "Livros" page
   - Create a new book
   - Edit an existing book
   - Delete a book
   - Search for books

### Production Testing

After deployment:

1. Visit your Vercel URL (e.g., https://your-project.vercel.app)
2. Perform the same tests as local testing
3. Check the browser console for any errors
4. Verify data persistence in Supabase dashboard

## Troubleshooting

### Common Issues

1. **"Failed to fetch" errors**
   - Check that environment variables are set correctly
   - Verify Supabase project is active
   - Check browser console for CORS errors

2. **Empty book list**
   - Verify the `livros` table exists in Supabase
   - Check if the table has the correct schema
   - Look for errors in browser console

3. **Vercel deployment fails**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

4. **Environment variables not working**
   - In development: Ensure `.env.local` file exists
   - In production: Verify variables are set in Vercel dashboard
   - Remember to redeploy after changing production variables

### Debug Mode

To enable debug logging:

1. Open browser developer tools
2. Check Console tab for detailed error messages
3. Check Network tab for failed API requests

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

## Support

For issues specific to this project:
1. Check the TEST_CHECKLIST.md for testing procedures
2. Review the MIGRATION_PLAN.md for architecture details
3. Consult the README.md for general information