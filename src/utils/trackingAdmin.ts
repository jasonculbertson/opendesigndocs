// Only Clerk's verified server session can authorize private tracking reads.
const ADMIN_USER_IDS = new Set([
  'user_2ycNsYsOHZUfRlxgP2ysOCztGkt',
  'user_2yhwbXQyVgKDpgEisp93K3ObWSQ',
]);

export function isTrackingAdmin(locals: { auth?: unknown }): boolean {
  if (typeof locals.auth !== 'function') return false;
  try {
    const session = locals.auth();
    return typeof session?.userId === 'string' && ADMIN_USER_IDS.has(session.userId);
  } catch {
    return false;
  }
}
