const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const STORAGE_KEY = "auth_user";

export class ApiClientError extends Error {
  status: number;
  fieldErrors?: Record<string, string>;

  constructor(message: string, status: number, fieldErrors?: Record<string, string>) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

function getToken(): string | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw).token ?? null;
  } catch {
    return null;
  }
}

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    let fieldErrors: Record<string, string> | undefined;

    try {
      const body = await response.json();
      message = body.message ?? message;
      fieldErrors = body.fieldErrors;
    } catch {
      // response wasn't JSON, keep the generic message
    }

    if (response.status === 401) {
      localStorage.removeItem(STORAGE_KEY);
    }

    throw new ApiClientError(message, response.status, fieldErrors);
  }

  return response.json();
}