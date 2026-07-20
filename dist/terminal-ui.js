export const TERMINAL_DIVIDER = "────────────────────────────────────────────────────────";

export function sanitizeTerminalText(value        )         {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/gu, "")
    .replace(/[\u202a-\u202e\u2066-\u2069]/gu, "");
}

export function terminalPanel(title        , lines           = [])         {
  return [
    "",
    TERMINAL_DIVIDER,
    sanitizeTerminalText(title),
    TERMINAL_DIVIDER,
    ...lines.map(sanitizeTerminalText),
    TERMINAL_DIVIDER,
  ].join("\n");
}

export function terminalBlock(content        )         {
  return ["", TERMINAL_DIVIDER, sanitizeTerminalText(content), TERMINAL_DIVIDER].join("\n");
}


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/terminal-ui.ts