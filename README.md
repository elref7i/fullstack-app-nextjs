# Fullstack Next.js Project Management App

A modern, responsive project management application built with Next.js 15, TypeScript, Prisma, and Tailwind CSS.

## 🏗️ Project Structure

```
fullstack-app-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes (grouped)
│   │   │   ├── layout.tsx     # Auth layout
│   │   │   ├── register/      # Registration page
│   │   │   └── signin/        # Sign in page
│   │   ├── (dashboard)/       # Dashboard routes (grouped)
│   │   │   ├── layout.tsx     # Dashboard layout with sidebar
│   │   │   ├── home/          # Home dashboard
│   │   │   └── project/       # Project details
│   │   ├── api/               # API routes
│   │   │   ├── register/      # User registration
│   │   │   ├── signin/        # User authentication
│   │   │   ├── logout/        # User logout
│   │   │   ├── project/       # Project CRUD operations
│   │   │   └── task/          # Task CRUD operations
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── not-found.tsx      # 404 page
│   ├── components/            # Reusable components
│   │   ├── ui/                # Base UI components (shadcn/ui)
│   │   ├── layout/            # Layout components
│   │   │   └── sidebar/       # Navigation sidebar
│   │   ├── providers/         # Context providers
│   │   ├── auth-form.tsx      # Authentication forms
│   │   ├── project-card.tsx   # Project display card
│   │   ├── task-card.tsx      # Task display card
│   │   ├── user-menu.tsx      # User dropdown menu
│   │   └── logout-button.tsx  # Logout functionality
│   ├── lib/                   # Utility libraries
│   │   ├── api/               # API client functions
│   │   ├── db.ts              # Database connection
│   │   ├── utils.ts           # General utilities
│   │   └── utils/             # Specific utilities
│   │       ├── auth-bcrypt.ts # Authentication utilities
│   │       ├── auth-content.ts # Auth content helpers
│   │       └── date-format.ts # Date formatting
│   ├── hooks/                 # Custom React hooks
│   ├── generated/             # Generated files
│   └── middleware.ts          # Next.js middleware
├── prisma/                    # Database schema and migrations
├── public/                    # Static assets
└── package.json               # Dependencies and scripts
```

## 🚀 Features

### Authentication

- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Secure password hashing with bcrypt
- ✅ Protected routes with middleware
- ✅ User logout functionality

### Project Management

- ✅ Create, read, update projects
- ✅ Project progress tracking
- ✅ Task management within projects
- ✅ Real-time data updates with caching

### User Interface

- ✅ Responsive design (mobile-first)
- ✅ Dark/light theme support
- ✅ Modern glass morphism design
- ✅ Intuitive navigation
- ✅ Loading states and error handling

### Technical Features

- ✅ TypeScript for type safety
- ✅ Prisma ORM for database management
- ✅ Next.js 15 with App Router
- ✅ Tailwind CSS for styling
- ✅ shadcn/ui component library
- ✅ Optimistic updates and caching

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **State Management**: React hooks + server state
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fullstack-app-nextjs
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Required environment variables:

   ```env
   DATABASE_URL="postgresql://..."
   JWT_SECRET="your-secret-key"
   COOKIE_NAME="auth-token"
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🎯 Key Components

### Authentication Flow

- **Registration**: User creates account with email/password
- **Login**: JWT token stored in HTTP-only cookie
- **Protected Routes**: Middleware validates authentication
- **Logout**: Clears authentication cookie

### Data Management

- **Caching**: Uses Next.js `unstable_cache` for performance
- **Revalidation**: Automatic cache invalidation on data changes
- **Optimistic Updates**: Immediate UI feedback

### Responsive Design

- **Mobile**: Bottom navigation bar
- **Desktop**: Side navigation with user menu
- **Breakpoints**: Tailwind responsive utilities

## 🔧 Development

### Code Organization

- **Components**: Reusable, composable UI elements
- **API Routes**: RESTful endpoints with proper error handling
- **Database**: Prisma schema with relationships
- **Utilities**: Helper functions and type definitions

### Best Practices

- **Type Safety**: Full TypeScript coverage
- **Error Handling**: Comprehensive error boundaries
- **Performance**: Optimized loading and caching
- **Accessibility**: ARIA labels and keyboard navigation

## 📝 API Endpoints

### Authentication

- `POST /api/register` - User registration
- `POST /api/signin` - User login
- `POST /api/logout` - User logout

### Projects

- `POST /api/project` - Create new project
- `GET /api/project` - Get user projects (via server components)

### Tasks

- `POST /api/task` - Create new task
- `GET /api/task` - Get user tasks (via server components)

## 🎨 Design System

### Colors

- **Primary**: Brand colors for main actions
- **Secondary**: Supporting UI elements
- **Muted**: Background and subtle elements
- **Accent**: Highlight colors for interactions

### Typography

- **Headings**: Clear hierarchy with proper sizing
- **Body**: Readable text with good contrast
- **Code**: Monospace for technical content

### Components

- **Cards**: Content containers with shadows
- **Buttons**: Consistent styling with states
- **Forms**: Accessible input components
- **Navigation**: Intuitive menu systems

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Other Platforms

- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**
