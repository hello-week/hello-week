export function warn(...msg: any) {
  console.warn('[WARN]', ...msg);
}

export function log(...msg: any) {
  console.log('[LOG]', ...msg);
}

export function error(...msg: any) {
  throw new Error(`[Hello Week Error]: ${msg}`);
}
