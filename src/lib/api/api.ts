/**
 * API Client Utilities
 *
 * This module provides centralized API communication functions for the application.
 * It includes authentication, project management, and task management operations.
 *
 * Features:
 * - Centralized error handling
 * - Toast notifications for user feedback
 * - Automatic navigation after operations
 * - Cache revalidation for data consistency
 */

import { toast } from "sonner";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { revalidateTag } from "next/cache";

/**
 * Configuration interface for the fetcher function
 * @template TBody - Type of the request body
 */
interface FetcherType<TBody = unknown> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: TBody;
  json?: boolean;
}

/**
 * Universal API fetcher function
 *
 * Handles all HTTP requests to the API with consistent error handling
 * and response processing.
 *
 * @param config - Configuration object for the request
 * @returns Promise with the response data
 * @throws Error if the request fails
 */
export const fetcher = async <TBody = unknown, TResponse = unknown>({
  url,
  method,
  body,
  json = true,
}: FetcherType<TBody>): Promise<TResponse> => {
  // Make the HTTP request
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  // Handle HTTP errors
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'API request failed');
  }

  // Parse JSON response if requested
  if (json) {
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  }

  return null as unknown as TResponse;
};

/**
 * User Registration
 *
 * Registers a new user account and redirects to signin page on success.
 *
 * @param user - User registration data (email, password, etc.)
 * @param router - Next.js router instance for navigation
 */
export const register = async (
  user: RegisterForm,
  router: AppRouterInstance
) => {
  try {
    const response = await fetcher<RegisterForm, { success: boolean; message: string }>({
      url: `/api/register`,
      method: "POST",
      body: user,
      json: true,
    });
    
    if (response.success) {
      toast.success(response.message || "Registration successful!");
      router.push("/signin");
    }
  } catch (error) {
    console.error("Registration error:", error);
    toast.error(error instanceof Error ? error.message : "Registration failed. Please try again.");
  }
};

/**
 * User Sign In
 *
 * Authenticates user credentials and redirects to dashboard on success.
 *
 * @param user - User login credentials (email, password)
 * @param router - Next.js router instance for navigation
 */
export const signin = async (user: SigninForm, router: AppRouterInstance) => {
  try {
    const response = await fetcher<SigninForm, { success: boolean; message: string }>({
      url: `/api/signin`,
      method: "POST",
      body: user,
      json: true,
    });
    
    if (response.success) {
      toast.success(response.message || "Login successful ✅");
      router.push("/home");
      router.refresh();
    }
  } catch (error) {
    console.error("Signin error:", error);
    toast.error(error instanceof Error ? error.message : "Login failed. Please try again.");
  }
};

/**
 * Create New Project
 *
 * Creates a new project and invalidates the projects cache to refresh the UI.
 *
 * @param projectData - Project creation data (name, description)
 */
export const createNewPorject = async (projectData: {
  name: string;
  description?: string;
}) => {
  try {
    await fetcher({
      url: `/api/project`,
      method: "POST",
      body: projectData,
      json: true,
    });
    toast.success("Project created successfully ✅");
    revalidateTag("projects"); // Refresh cached project data
  } catch (error) {
    console.error(error);
    toast.error("Failed to create project ❌");
  }
};

/**
 * User Logout
 *
 * Logs out the current user by clearing authentication cookie
 * and redirecting to signin page.
 *
 * @param router - Next.js router instance for navigation
 */
export const logout = async (router: AppRouterInstance) => {
  try {
    await fetcher({
      url: `/api/logout`,
      method: "POST",
      json: false,
    });
    toast.success("Logged out successfully");
    router.push("/signin");
  } catch (error) {
    console.error(error);
    toast.error("Logout failed");
  }
};
