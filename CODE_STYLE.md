# Code Style Guide

This document outlines the coding standards and best practices for the project management application.

## 📝 General Principles

### 1. **Readability First**

- Write code that is easy to read and understand
- Use descriptive variable and function names
- Add comments for complex logic
- Keep functions small and focused

### 2. **Type Safety**

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type - use proper typing
- Use strict TypeScript configuration

### 3. **Consistency**

- Follow established patterns in the codebase
- Use consistent naming conventions
- Maintain consistent formatting
- Follow the same structure for similar components

## 🏗️ File Organization

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/            # Reusable React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── layout/           # Layout-specific components
│   └── [feature]/        # Feature-specific components
├── lib/                  # Utility libraries and helpers
│   ├── api/             # API client functions
│   └── utils/           # General utilities
├── hooks/               # Custom React hooks
└── types/               # TypeScript type definitions
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `UserMenu.tsx`)
- **Utilities**: camelCase (e.g., `dateFormat.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **Types**: PascalCase (e.g., `UserTypes.ts`)

## 🎨 Component Structure

### Component Template

```tsx
/**
 * Component Name
 *
 * Brief description of what this component does.
 *
 * Features:
 * - Key feature 1
 * - Key feature 2
 * - Key feature 3
 */

import React from "react";
import { ComponentProps } from "./types";

interface ComponentNameProps {
  // Props interface
}

export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // Component logic

  return (
    // JSX structure
  );
}
```

### Component Guidelines

1. **Single Responsibility**: Each component should have one clear purpose
2. **Props Interface**: Always define a proper interface for props
3. **Default Props**: Use default parameters for optional props
4. **Error Boundaries**: Handle errors gracefully
5. **Loading States**: Provide loading indicators where appropriate

## 🔧 TypeScript Guidelines

### Type Definitions

```typescript
// ✅ Good: Specific types
interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

// ❌ Bad: Using any
const user: any = {
  /* ... */
};

// ✅ Good: Proper typing
const users: User[] = [];

// ❌ Bad: No typing
const users = [];
```

### Interface Naming

- **Props**: `ComponentNameProps`
- **State**: `ComponentNameState`
- **API Response**: `ApiResponse<T>`
- **Event Handlers**: `ComponentNameEventHandlers`

## 🎯 React Best Practices

### Hooks Usage

```tsx
// ✅ Good: Custom hooks for reusable logic
const useUserData = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data
  }, [userId]);

  return { user, loading };
};

// ✅ Good: Proper dependency arrays
useEffect(() => {
  // Effect logic
}, [dependency1, dependency2]);
```

### State Management

```tsx
// ✅ Good: Local state for component-specific data
const [isOpen, setIsOpen] = useState(false);

// ✅ Good: Server state for API data
const { data, loading, error } = useQuery(["users"], fetchUsers);

// ✅ Good: Context for global state
const { user, setUser } = useAuthContext();
```

## 🎨 Styling Guidelines

### Tailwind CSS

```tsx
// ✅ Good: Semantic class names
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900">Title</h2>
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Action
  </button>
</div>

// ✅ Good: Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>

// ✅ Good: Dark mode support
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  {/* Content */}
</div>
```

### CSS Classes Organization

1. **Layout**: `flex`, `grid`, `container`
2. **Spacing**: `p-`, `m-`, `gap-`
3. **Typography**: `text-`, `font-`
4. **Colors**: `bg-`, `text-`, `border-`
5. **Effects**: `shadow-`, `rounded-`, `hover:`

## 🔌 API Integration

### API Functions

```typescript
/**
 * Function Name
 *
 * Brief description of what this function does.
 *
 * @param param1 - Description of parameter 1
 * @param param2 - Description of parameter 2
 * @returns Promise with the result
 * @throws Error if the request fails
 */
export const apiFunction = async (param1: string, param2: number) => {
  try {
    const response = await fetch("/api/endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ param1, param2 }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
```

### Error Handling

```typescript
// ✅ Good: Proper error handling
try {
  const result = await apiCall();
  // Handle success
} catch (error) {
  // Handle specific error types
  if (error instanceof NetworkError) {
    // Handle network errors
  } else if (error instanceof ValidationError) {
    // Handle validation errors
  } else {
    // Handle generic errors
  }
}
```

## 📝 Comments and Documentation

### JSDoc Comments

````typescript
/**
 * Calculates the progress percentage of a project
 *
 * @param completedTasks - Number of completed tasks
 * @param totalTasks - Total number of tasks
 * @returns Progress percentage (0-100)
 *
 * @example
 * ```typescript
 * const progress = calculateProgress(5, 10); // Returns 50
 * ```
 */
function calculateProgress(completedTasks: number, totalTasks: number): number {
  if (totalTasks === 0) return 0;
  return Math.round((completedTasks / totalTasks) * 100);
}
````

### Inline Comments

```typescript
// ✅ Good: Explain why, not what
// Skip validation for admin users
if (user.role === "admin") {
  return true;
}

// ✅ Good: Explain complex logic
const sortedProjects = projects.sort((a, b) => {
  // Sort by completion percentage (descending), then by name
  const progressA = calculateProgress(a.completedTasks, a.totalTasks);
  const progressB = calculateProgress(b.completedTasks, b.totalTasks);

  if (progressA !== progressB) {
    return progressB - progressA;
  }

  return a.name.localeCompare(b.name);
});
```

## 🧪 Testing Guidelines

### Component Testing

```typescript
// ✅ Good: Test component behavior
describe("UserMenu", () => {
  it("should display user information", () => {
    const user = { name: "John Doe", email: "john@example.com" };
    render(<UserMenu user={user} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("should handle logout", async () => {
    const mockLogout = jest.fn();
    render(
      <UserMenu
        user={user}
        onLogout={mockLogout}
      />
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(mockLogout).toHaveBeenCalled();
  });
});
```

## 🚀 Performance Guidelines

### Optimization Techniques

1. **Memoization**: Use `React.memo` for expensive components
2. **Lazy Loading**: Use `React.lazy` for route-based code splitting
3. **Virtualization**: Use virtual lists for large datasets
4. **Debouncing**: Debounce user input for search/filter operations

### Bundle Optimization

```typescript
// ✅ Good: Dynamic imports for code splitting
const HeavyComponent = React.lazy(() => import("./HeavyComponent"));

// ✅ Good: Tree shaking friendly imports
import { Button } from "@/components/ui/button";
// ❌ Bad: Import entire library
import * as UI from "@/components/ui";
```

## 🔒 Security Guidelines

### Data Validation

```typescript
// ✅ Good: Validate user input
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ✅ Good: Sanitize data before rendering
const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html);
};
```

### Authentication

```typescript
// ✅ Good: Check authentication status
const ProtectedComponent = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Redirect to="/login" />;

  return <ProtectedContent />;
};
```

## 📋 Code Review Checklist

### Before Submitting

- [ ] Code follows the style guide
- [ ] All TypeScript errors are resolved
- [ ] Components are properly documented
- [ ] Error handling is implemented
- [ ] Loading states are provided
- [ ] Responsive design is tested
- [ ] Accessibility requirements are met
- [ ] Performance is considered
- [ ] Security best practices are followed

### Review Process

1. **Self-review**: Check your own code first
2. **Peer review**: Have another developer review
3. **Automated checks**: Ensure CI/CD passes
4. **Manual testing**: Test the functionality
5. **Documentation**: Update docs if needed

---

**Remember**: Good code is not just about functionality, but also about maintainability, readability, and collaboration. Follow these guidelines to ensure the codebase remains clean and professional.
