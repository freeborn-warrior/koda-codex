export const TERMINAL_DIVIDER = "────────────────────────────────────────────────────────";

export function sanitizeTerminalText(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/gu, "")
    .replace(/[\u202a-\u202e\u2066-\u2069]/gu, "");
}

export function terminalPanel(title: string, lines: string[] = []): string {
  return [
    "",
    TERMINAL_DIVIDER,
    sanitizeTerminalText(title),
    TERMINAL_DIVIDER,
    ...lines.map(sanitizeTerminalText),
    TERMINAL_DIVIDER,
  ].join("\n");
}

export function terminalBlock(content: string): string {
  return ["", TERMINAL_DIVIDER, sanitizeTerminalText(content), TERMINAL_DIVIDER].join("\n");
}
