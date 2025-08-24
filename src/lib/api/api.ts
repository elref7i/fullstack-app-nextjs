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
export const fetcher = async <TBody = unknown>({
  url,
  method,
  body,
  json = true,
}: FetcherType<TBody>): Promise<unknown> => {
  // Make the HTTP request
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  // Handle HTTP errors
  if (!res.ok) {
    throw new Error("API error");
  }

  // Parse JSON response if requested
  if (json) {
    const payload = await res.json();
    return payload.data; // Return data property for consistency
  }

  return {};
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
    await fetcher({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
      method: "POST",
      body: user,
      json: false,
    });
    toast.success("User registered successfully!");
    router.push("/signin");
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong, please try again." + error);
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
    await fetcher({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/signin`,
      method: "POST",
      body: user,
      json: false,
    });
    toast.success("Login successful ✅");
    router.push("/home");
  } catch (error) {
    console.error(error);
    toast.error("Login failed ❌");
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
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/project`,
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
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/logout`,
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
