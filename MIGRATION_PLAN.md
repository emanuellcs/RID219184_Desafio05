# Migration Plan: Netlify to Vercel with Supabase Integration

## Executive Summary

This document outlines a comprehensive plan to migrate the online library system from Netlify to Vercel deployment with Supabase as the database provider. The current architecture has significant code duplication between local development (Express server) and production (Netlify serverless functions), which will be addressed in this migration.

## 1. Architecture Decision

### Current Architecture Issues
- **Code Duplication**: Controller logic exists in both `netlify/functions/api.js` and `src/server/controllers/livroController.js`
- **Dual Deployment**: Different code paths for local (Express) vs production (Netlify Functions)
- **Database Dependency**: Local PostgreSQL requires manual setup

### Recommended Approach: Option A - Vercel Serverless Functions

**Recommendation**: Use Vercel serverless functions with API routes in the `/api` directory.

#### Option A: Vercel Serverless Functions (Recommended)
**Pros:**
- Native Vercel integration with zero configuration
- Automatic scaling and optimal performance
- Unified codebase - same code runs locally and in production
- Better TypeScript support if needed in future
- Simpler deployment process
- Built-in environment variable management

**Cons:**
- Requires restructuring current Express routes
- Different routing pattern than Express

#### Option B: Express as Serverless Function
**Pros:**
- Minimal code changes required
- Familiar Express patterns maintained

**Cons:**
- Larger bundle size and slower cold starts
- Not utilizing Vercel's optimization features
- Still maintains separation between local and production code
- More complex configuration

## 2. Supabase Integration Plan

### Database Migration Strategy

1. **Supabase Project Setup**
   - Create a new Supabase project
   - Note the project URL and anon key
   - Access the SQL editor to create tables

2. **Schema Migration**
   ```sql
   -- Run in Supabase SQL editor
   CREATE TABLE livros (
       id SERIAL PRIMARY KEY,
       titulo VARCHAR(255) NOT NULL,
       numero_paginas INTEGER,
       isbn VARCHAR(255),
       editora VARCHAR(255)
   );
   
   -- Enable Row Level Security (recommended)
   ALTER TABLE livros ENABLE ROW LEVEL SECURITY;
   
   -- Create a policy for public access (adjust as needed)
   CREATE POLICY "Enable all operations for all users" ON livros
       FOR ALL USING (true) WITH CHECK (true);
   ```

3. **Required Environment Variables**
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   
   # Optional: For server-side operations requiring elevated privileges
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Data Migration**
   - Export existing data from local PostgreSQL
   - Import into Supabase using the dashboard or API

## 3. Code Structure Changes

### Proposed File Structure
```
├── api/                      # Vercel API routes
│   └── livros/
│       ├── index.js         # GET all, POST new
│       └── [id].js          # GET one, PUT update, DELETE
├── src/
│   ├── api/
│   │   └── LivrosService.js # Frontend API client
│   ├── lib/
│   │   ├── supabase.js      # Supabase client initialization
│   │   └── validation.js    # Joi validation schemas
│   ├── components/
│   ├── views/
│   └── main.jsx
├── public/
├── .env.local               # Local environment variables
├── vercel.json              # Vercel configuration
└── package.json
```

### Key Changes
1. **Remove Duplicate Code**
   - Delete `netlify/` directory
   - Delete `src/server/` directory
   - Move validation logic to `src/lib/validation.js`

2. **Create Unified API Routes**
   - Single codebase for local development and production
   - Vercel automatically handles serverless deployment

3. **Supabase Client**
   ```javascript
   // src/lib/supabase.js
   import { createClient } from '@supabase/supabase-js'
   
   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
   
   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

## 4. Migration Steps

### Phase 1: Preparation
1. **Backup Current Data**
   - Export all books from local PostgreSQL
   - Create JSON or CSV backup file

2. **Setup Supabase**
   - Create Supabase account and project
   - Run schema creation SQL
   - Import existing data

3. **Install Dependencies**
   ```bash
   npm install @supabase/supabase-js
   npm install --save-dev vercel
   ```

### Phase 2: Code Migration
1. **Create API Route Structure**
   ```
   api/
   └── livros/
       ├── index.js     # Handles /api/livros
       └── [id].js      # Handles /api/livros/:id
   ```

2. **Implement Supabase Integration**
   - Replace PostgreSQL pool with Supabase client
   - Update CRUD operations to use Supabase SDK

3. **Update Frontend API Client**
   ```javascript
   // src/api/LivrosService.js
   const apiClient = axios.create({
     baseURL: '/api',  // Unified for both local and production
     headers: {
       'Content-Type': 'application/json',
     },
   });
   ```

4. **Environment Configuration**
   - Create `.env.local` for local development
   - Configure environment variables in Vercel dashboard

### Phase 3: Testing
1. **Local Testing**
   ```bash
   vercel dev  # Runs local development server with API routes
   ```

2. **API Endpoint Testing**
   - Test all CRUD operations
   - Verify data persistence in Supabase

3. **Frontend Integration Testing**
   - Ensure all views work correctly
   - Test error handling

### Phase 4: Deployment
1. **Vercel Setup**
   ```bash
   vercel login
   vercel link  # Link to Vercel project
   ```

2. **Configure Production Environment**
   - Add environment variables in Vercel dashboard
   - Set up custom domain if needed

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Phase 5: Cleanup
1. **Remove Old Files**
   - Delete `netlify.toml`
   - Delete `netlify/` directory
   - Delete `src/server/` directory
   - Update `.gitignore`

2. **Update Package Scripts**
   ```json
   {
     "scripts": {
       "dev": "vercel dev",
       "build": "vite build",
       "preview": "vite preview",
       "deploy": "vercel --prod"
     }
   }
   ```

## 5. Environment Variables

### Development (.env.local)
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Optional for enhanced security
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Production (Vercel Dashboard)
Configure the same variables in Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (if using server-side auth)

### Frontend Access
Vite automatically exposes `NEXT_PUBLIC_` prefixed variables to the frontend:
```javascript
// Available in frontend code
const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL
```

## 6. API Route Implementation Example

### api/livros/index.js
```javascript
import { supabase } from '../../src/lib/supabase.js'
import { bookSchema } from '../../src/lib/validation.js'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('livros')
        .select('*')
      
      if (error) throw error
      return res.status(200).json(data)
    }
    
    if (req.method === 'POST') {
      const { error: validationError, value } = bookSchema.validate(req.body)
      if (validationError) {
        return res.status(400).json({ 
          message: validationError.details[0].message 
        })
      }
      
      const { data, error } = await supabase
        .from('livros')
        .insert([value])
        .select()
      
      if (error) throw error
      return res.status(201).json(data[0])
    }
    
    return res.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ 
      message: 'Algo deu errado no servidor!' 
    })
  }
}
```

## 7. Benefits of Migration

1. **Unified Codebase**: Single source of truth for API logic
2. **Better Performance**: Vercel's edge network and optimizations
3. **Simplified Development**: Same code runs locally and in production
4. **Managed Database**: Supabase handles backups, scaling, and maintenance
5. **Cost Efficiency**: Both Vercel and Supabase offer generous free tiers
6. **Real-time Capabilities**: Supabase provides real-time subscriptions if needed
7. **Better Developer Experience**: Modern tooling and deployment workflow

## 8. Rollback Plan

If issues arise during migration:

1. **Code Rollback**: Git repository maintains all previous code
2. **Data Backup**: Keep PostgreSQL dump for 30 days
3. **Netlify Functions**: Can be quickly redeployed if needed
4. **DNS Rollback**: If using custom domain, can repoint to Netlify

## 9. Success Criteria

- [ ] All CRUD operations working with Supabase
- [ ] Zero code duplication between environments
- [ ] Successful deployment to Vercel
- [ ] All existing features maintained
- [ ] Performance equal or better than Netlify deployment
- [ ] Environment variables properly configured
- [ ] Local development workflow simplified

## 10. Next Steps

After successful migration, consider:

1. **Authentication**: Implement Supabase Auth for user management
2. **Row Level Security**: Enhance data security with RLS policies
3. **Edge Functions**: Utilize Vercel Edge Functions for better performance
4. **Monitoring**: Set up Vercel Analytics and Supabase monitoring
5. **CI/CD**: Implement GitHub Actions for automated testing and deployment