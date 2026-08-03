export type ResponseType = "json" | "blob" | "arrayBuffer";

export abstract class BaseAPI {
  protected readonly API_URL =
    process.env.NEXT_PUBLIC_API || "http://localhost:3000";

  protected abstract BASE_PATH: string;

  protected buildUrl(path: string): string {
    return `${this.API_URL}${this.BASE_PATH}${path}`;
  }

  protected async request<T>(
    path: string,
    options: RequestInit = {},
    responseType: ResponseType = "json"
  ): Promise<T> {
    try {
      const response = await fetch(this.buildUrl(path), {
        ...options,
        credentials: options.credentials ?? "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`(${response.status}) ${errorText}`);
      }

      switch (responseType) {
        case "blob":
          return response.blob() as T;
        case "arrayBuffer":
          return response.arrayBuffer() as T;
        default:
          return (await response.json()) as T;
      }
    } catch (error) {
      console.error(`API error at ${path}:`, error);
      throw error;
    }
  }
}
