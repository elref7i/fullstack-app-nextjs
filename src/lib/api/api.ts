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
 * - Enhanced error parsing and type safety
 */

import { toast } from "sonner";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { revalidateTag } from "next/cache";

// Type definitions
export interface RegisterForm {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}

export interface SigninForm {
  email: string;
  password: string;
}

export interface ProjectData {
  name: string;
  description?: string;
}

export interface APIResponse<T = unknown> {
  data?: T;
  message?: string;
  error?: string;
}

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
 * Custom API Error class for better error handling
 */
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: APIResponse
  ) {
    super(message);
    this.name = "APIError";
  }
}

/**
 * Universal API fetcher function
 *
 * Handles all HTTP requests to the API with consistent error handling
 * and response processing.
 *
 * @param config - Configuration object for the request
 * @returns Promise with the response data
 * @throws APIError if the request fails
 */
export const fetcher = async <TBody = unknown, TResponse = unknown>({
  url,
  method,
  body,
  json = true,
}: FetcherType<TBody>): Promise<TResponse> => {
  try {
    // Make the HTTP request
    const res = await fetch(url, {
      method,
      ...(body && { body: JSON.stringify(body) }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // Parse response
    let responseData: APIResponse<TResponse> = {};
    try {
      responseData = await res.json();
    } catch {
      // Handle non-JSON responses
      responseData = { message: "Invalid response format" };
    }

    // Handle HTTP errors with more specific messaging
    if (!res.ok) {
      const errorMessage = responseData.error || 
                          responseData.message || 
                          `HTTP ${res.status}: ${res.statusText}`;
      throw new APIError(errorMessage, res.status, responseData);
    }

    // Return appropriate data based on json flag
    if (json && responseData.data !== undefined) {
      return responseData.data;
    }
    
    return (json ? responseData : {}) as TResponse;
  } catch (error) {
    // Re-throw APIErrors as-is
    if (error instanceof APIError) {
      throw error;
    }
    
    // Handle network errors or other fetch failures
    throw new APIError(
      error instanceof Error ? error.message : "Network error occurred",
      0
    );
  }
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
): Promise<void> => {
  try {
    await fetcher({
      url: `/api/register`,
      method: "POST",
      body: user,
      json: false,
    });
    
    toast.success("Account created successfully! Please sign in.");
    router.push("/signin");
  } catch (error) {
    console.error("Registration failed:", error);
    
    if (error instanceof APIError) {
      toast.error(`Registration failed: ${error.message}`);
    } else {
      toast.error("Registration failed. Please try again.");
    }
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
export const signin = async (
  user: SigninForm, 
  router: AppRouterInstance
): Promise<void> => {
  try {
    await fetcher({
      url: `/api/signin`,
      method: "POST",
      body: user,
      json: false,
    });
    
    toast.success("Welcome back! ✅");
    router.push("/home");
  } catch (error) {
    console.error("Sign in failed:", error);
    
    if (error instanceof APIError) {
      // Handle specific error cases
      if (error.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.status === 429) {
        toast.error("Too many login attempts. Please try again later.");
      } else {
        toast.error(`Sign in failed: ${error.message}`);
      }
    } else {
      toast.error("Sign in failed. Please check your connection.");
    }
  }
};

/**
 * Create New Project
 *
 * Creates a new project and invalidates the projects cache to refresh the UI.
 *
 * @param projectData - Project creation data (name, description)
 */
export const createNewProject = async (
  projectData: ProjectData
): Promise<void> => {
  try {
    await fetcher({
      url: `/api/project`,
      method: "POST",
      body: projectData,
      json: true,
    });
    
    toast.success(`Project "${projectData.name}" created successfully! ✅`);
    revalidateTag("projects"); // Refresh cached project data
  } catch (error) {
    console.error("Project creation failed:", error);
    
    if (error instanceof APIError) {
      if (error.status === 409) {
        toast.error("A project with this name already exists");
      } else if (error.status === 400) {
        toast.error("Invalid project data. Please check your inputs.");
      } else {
        toast.error(`Failed to create project: ${error.message}`);
      }
    } else {
      toast.error("Failed to create project. Please try again.");
    }
  }
};

/**
 * Update Project
 *
 * Updates an existing project and refreshes the cache.
 *
 * @param projectId - ID of the project to update
 * @param projectData - Updated project data
 */
export const updateProject = async (
  projectId: string,
  projectData: Partial<ProjectData>
): Promise<void> => {
  try {
    await fetcher({
      url: `/api/project/${projectId}`,
      method: "PUT",
      body: projectData,
      json: true,
    });
    
    toast.success("Project updated successfully! ✅");
    revalidateTag("projects");
  } catch (error) {
    console.error("Project update failed:", error);
    
    if (error instanceof APIError) {
      toast.error(`Failed to update project: ${error.message}`);
    } else {
      toast.error("Failed to update project. Please try again.");
    }
  }
};

/**
 * Delete Project
 *
 * Deletes a project and refreshes the cache.
 *
 * @param projectId - ID of the project to delete
 */
export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    await fetcher({
      url: `/api/project/${projectId}`,
      method: "DELETE",
      json: false,
    });
    
    toast.success("Project deleted successfully");
    revalidateTag("projects");
  } catch (error) {
    console.error("Project deletion failed:", error);
    
    if (error instanceof APIError) {
      if (error.status === 404) {
        toast.error("Project not found");
      } else {
        toast.error(`Failed to delete project: ${error.message}`);
      }
    } else {
      toast.error("Failed to delete project. Please try again.");
    }
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
export const logout = async (router: AppRouterInstance): Promise<void> => {
  try {
    await fetcher({
      url: `/api/logout`,
      method: "POST",
      json: false,
    });
    
    toast.success("Logged out successfully");
    router.push("/signin");
  } catch (error) {
    console.error("Logout failed:", error);
    
    // Even if logout fails on server, redirect user anyway
    toast.warning("Logged out (with warnings)");
    router.push("/signin");
  }
};

/**
 * Generic data fetcher for GET requests
 *
 * @param endpoint - API endpoint to fetch from
 * @param tags - Cache tags for revalidation
 */
export const fetchData = async <T = unknown>(
  endpoint: string,
  tags?: string[]
): Promise<T> => {
  try {
    return await fetcher<never, T>({
      url: endpoint,
      method: "GET",
      json: true,
    });
  } catch (error) {
    console.error(`Failed to fetch data from ${endpoint}:`, error);
    throw error;
  }
};