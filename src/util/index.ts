export function ErrorHandler (errorMessage: string): void {
  throw new Error(errorMessage);
}
