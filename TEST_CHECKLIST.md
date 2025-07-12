# Test Checklist - Book Management System

This checklist ensures all functionality works correctly after the migration to Vercel + Supabase.

## Pre-Testing Setup

- [ ] Verify `.env.local` file exists with correct Supabase credentials
- [ ] Confirm all dependencies are installed (`npm install`)
- [ ] Ensure Supabase database schema is deployed
- [ ] Verify `livros` table exists in Supabase

## Local Development Tests

### 1. Environment Setup
- [ ] Run `npm run vercel-dev`
- [ ] Verify server starts without errors
- [ ] Confirm application loads at http://localhost:3000
- [ ] Check browser console for any errors

### 2. Navigation Tests
- [ ] Home page loads correctly
- [ ] "Livros" link in navigation works
- [ ] "Cadastrar Livro" button is visible and clickable
- [ ] Page routing works without full page refreshes

### 3. Book Listing (Read Operation)
- [ ] Books page displays existing books from database
- [ ] Book cards show all fields: título, autor, ano
- [ ] "Editar" and "Excluir" buttons are visible on each book
- [ ] Empty state message shows when no books exist

### 4. Create Book (Create Operation)
- [ ] Click "Cadastrar Livro" opens the form
- [ ] Form displays all required fields
- [ ] Validation works:
  - [ ] Cannot submit with empty título
  - [ ] Cannot submit with empty autor
  - [ ] Cannot submit with invalid ano (non-numeric, <1000, >current year)
  - [ ] Shows appropriate error messages
- [ ] Successful submission:
  - [ ] Book is saved to database
  - [ ] Success toast notification appears
  - [ ] Redirects to books list
  - [ ] New book appears in the list

### 5. Edit Book (Update Operation)
- [ ] Click "Editar" on a book card
- [ ] Form pre-fills with existing book data
- [ ] Can modify all fields
- [ ] Validation works same as create
- [ ] Cancel button returns to list without saving
- [ ] Save changes:
  - [ ] Updates are saved to database
  - [ ] Success toast notification appears
  - [ ] Redirects to books list
  - [ ] Updated data shows in the list

### 6. Delete Book (Delete Operation)
- [ ] Click "Excluir" on a book card
- [ ] Confirmation modal appears
- [ ] Modal shows correct book title
- [ ] Cancel button closes modal without deleting
- [ ] Confirm deletion:
  - [ ] Book is removed from database
  - [ ] Success toast notification appears
  - [ ] Book disappears from list
  - [ ] No console errors

### 7. Error Handling
- [ ] Temporarily break Supabase connection (wrong credentials)
- [ ] Verify error messages appear appropriately
- [ ] Application doesn't crash
- [ ] Restore connection and verify recovery

## API Endpoint Tests

### Test Each Endpoint Manually

1. **GET /api/livros**
   ```bash
   curl http://localhost:3000/api/livros
   ```
   - [ ] Returns array of books
   - [ ] Status code 200

2. **GET /api/livros/[id]**
   ```bash
   curl http://localhost:3000/api/livros/1
   ```
   - [ ] Returns single book object
   - [ ] Status code 200 for existing book
   - [ ] Status code 404 for non-existent book

3. **POST /api/livros**
   ```bash
   curl -X POST http://localhost:3000/api/livros \
     -H "Content-Type: application/json" \
     -d '{"titulo":"Test Book","autor":"Test Author","ano":2024}'
   ```
   - [ ] Creates new book
   - [ ] Returns created book with ID
   - [ ] Status code 201
   - [ ] Validation errors return 400

4. **PUT /api/livros/[id]**
   ```bash
   curl -X PUT http://localhost:3000/api/livros/1 \
     -H "Content-Type: application/json" \
     -d '{"titulo":"Updated Book","autor":"Updated Author","ano":2024}'
   ```
   - [ ] Updates existing book
   - [ ] Returns updated book
   - [ ] Status code 200
   - [ ] Non-existent ID returns 404

5. **DELETE /api/livros/[id]**
   ```bash
   curl -X DELETE http://localhost:3000/api/livros/1
   ```
   - [ ] Deletes book
   - [ ] Returns success message
   - [ ] Status code 200
   - [ ] Non-existent ID returns 404

## Production Deployment Tests

### 1. Deployment Process
- [ ] Run `vercel` or `npm run deploy`
- [ ] Build completes without errors
- [ ] Deployment successful
- [ ] Receive production URL

### 2. Environment Variables
- [ ] Verify environment variables are set in Vercel dashboard
- [ ] Redeploy after setting variables
- [ ] Application connects to Supabase in production

### 3. Production Functionality
Repeat all local tests on production URL:
- [ ] Navigation works
- [ ] List books
- [ ] Create new book
- [ ] Edit existing book
- [ ] Delete book
- [ ] Error handling works

### 4. Performance Tests
- [ ] Page load time is reasonable (<3 seconds)
- [ ] API responses are fast (<500ms)
- [ ] No memory leaks during extended use

### 5. Browser Compatibility
Test on multiple browsers:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (responsive design)

## Security Tests

- [ ] Environment variables are not exposed in client
- [ ] API endpoints validate all inputs
- [ ] No SQL injection vulnerabilities
- [ ] CORS is properly configured
- [ ] No sensitive data in console logs

## Regression Tests

After any code changes:
- [ ] All CRUD operations still work
- [ ] No new console errors
- [ ] Performance hasn't degraded
- [ ] UI remains responsive

## Notes

- Mark each item as complete (✓) when tested
- Document any issues found with steps to reproduce
- Test both positive and negative scenarios
- Pay attention to edge cases (empty strings, special characters, etc.)

## Issue Tracking

Use this section to document any issues found:

| Issue | Steps to Reproduce | Severity | Status |
|-------|-------------------|----------|---------|
| Example: Form validation not working | 1. Go to create book 2. Submit empty form | High | Fixed |

## Sign-off

- [ ] All tests completed successfully
- [ ] No critical issues remaining
- [ ] Application ready for production use

Tested by: _________________  
Date: _________________  
Environment: _________________