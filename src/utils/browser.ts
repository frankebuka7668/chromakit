export interface ClipboardEnvironment {
  clipboard?: Pick<Clipboard, 'writeText'>;
  fallbackCopy: (text: string) => boolean;
}

/** Try the async Clipboard API, then a document.execCommand fallback. */
export async function copyTextWithFallback(
  text: string,
  environment: ClipboardEnvironment
): Promise<boolean> {
  try {
    if (environment.clipboard) {
      await environment.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Permission and insecure-context errors should still get the legacy attempt.
  }

  try {
    return environment.fallbackCopy(text);
  } catch {
    return false;
  }
}

export function copyTextUsingTemporaryInput(text: string): boolean {
  const input = document.createElement('textarea');
  input.value = text;
  input.setAttribute('readonly', '');
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  try {
    input.select();
    return document.execCommand('copy');
  } finally {
    document.body.removeChild(input);
  }
}

export function copyTextToClipboard(text: string): Promise<boolean> {
  let clipboard: Clipboard | undefined;
  try {
    clipboard = typeof navigator !== 'undefined' ? navigator.clipboard : undefined;
  } catch {
    clipboard = undefined;
  }
  return copyTextWithFallback(text, {
    clipboard,
    fallbackCopy: copyTextUsingTemporaryInput
  });
}

export interface DownloadEnvironment {
  document: Pick<Document, 'body' | 'createElement'>;
  createObjectURL: (blob: Blob) => string;
  revokeObjectURL: (url: string) => void;
  schedule: (callback: () => void, delayMs: number) => unknown;
}

/** Keep each download URL alive long enough for the browser to consume it. */
export function downloadBlob(
  blob: Blob,
  filename: string,
  environment: DownloadEnvironment = {
    document,
    createObjectURL: (value) => URL.createObjectURL(value),
    revokeObjectURL: (url) => URL.revokeObjectURL(url),
    schedule: (callback, delayMs) => window.setTimeout(callback, delayMs)
  }
): string {
  const url = environment.createObjectURL(blob);
  const anchor = environment.document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  let appended = false;
  try {
    environment.document.body.appendChild(anchor);
    appended = true;
    anchor.click();
  } finally {
    try {
      if (appended) environment.document.body.removeChild(anchor);
    } finally {
      environment.schedule(() => environment.revokeObjectURL(url), 1000);
    }
  }
  return url;
}
