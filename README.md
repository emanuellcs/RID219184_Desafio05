# RID219184_Desafio05 - Book Management System

A modern book management system built with React, Vite, Vercel, and Supabase.

## 🚀 Overview

This project is a full-stack book management application that allows users to:
- View a list of books
- Add new books
- Edit existing books
- Delete books
- Search and filter books

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: SCSS
- **Routing**: React Router v6
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## ⚡ Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Vercel account (free)
- Supabase account (free)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RID219184_Desafio05
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run development server**
   ```bash
   npm run vercel-dev
   ```

The application will be available at http://localhost:3000

## 📚 Documentation

For detailed setup instructions, deployment guides, and troubleshooting:

- **[Setup Instructions](./SETUP_INSTRUCTIONS.md)** - Complete guide for local development and production deployment
- **[Test Checklist](./TEST_CHECKLIST.md)** - Comprehensive testing procedures
- **[Migration Plan](./MIGRATION_PLAN.md)** - Architecture and migration details

## 🗂️ Project Structure

```
├── api/                    # Vercel serverless functions
│   └── livros/            # Book API endpoints
├── src/
│   ├── api/               # Frontend API service layer
│   ├── components/        # Reusable React components
│   ├── db/                # Database schema
│   ├── lib/               # Utility libraries (Supabase client, validation)
│   ├── views/             # Page components
│   └── main.jsx           # Application entry point
├── public/                # Static assets
├── .env.local.example     # Environment variables template
├── vercel.json           # Vercel configuration
└── vite.config.js        # Vite configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start Vite development server
- `npm run vercel-dev` - Start Vercel development environment
- `npm run build` - Build for production
- `npm run deploy` - Deploy to Vercel
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🚀 Deployment

Deploy to Vercel with one command:

```bash
npm run deploy
```

Or use the Vercel CLI:

```bash
vercel --prod
```

Remember to set environment variables in your Vercel dashboard!

## 🔒 Environment Variables

### Development
Create a `.env.local` file with:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Production
Set the same variables in your Vercel project settings.

## 🧪 Testing

Run the test suite:
```bash
npm test
```

For API testing:
```bash
npm run test:api
```

See [TEST_CHECKLIST.md](./TEST_CHECKLIST.md) for manual testing procedures.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of the DNC School Software Engineer course - Challenge 05.

## 🆘 Support

For detailed troubleshooting and setup help, please refer to:
- [Setup Instructions](./SETUP_INSTRUCTIONS.md)
- [Test Checklist](./TEST_CHECKLIST.md)

---

Built with ❤️ using React, Vercel, and Supabase