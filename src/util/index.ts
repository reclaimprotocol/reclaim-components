export function ErrorHandler (errorMessage: string): void {
  throw new Error(errorMessage);
}

export function isMobile (): boolean {
  const regexp = /iPhone|iPad|iPod|Android|BlackBerry|Windows Phone/i;
  const isMobile = regexp.test(navigator.userAgent);

  return isMobile;
};
