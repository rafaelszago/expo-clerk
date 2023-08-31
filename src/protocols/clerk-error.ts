export type ClerkError = {
  status: number;
  clerkError: boolean;
  errors: {
    code: string;
    message: string;
    longMessage: string;
    meta: Record<string, string>;
  }[];
};
