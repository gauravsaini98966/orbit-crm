// Lightweight header-based admin check for the bonus admin dashboard.
// Not a substitute for real auth (JWT/OAuth) in production.
export function adminAuth(req, res, next) {
  const configuredKey = process.env.ADMIN_KEY;
  if (!configuredKey) return next(); // no key configured -> open (dev mode)

  const providedKey = req.headers["x-admin-key"];
  if (providedKey && providedKey === configuredKey) {
    return next();
  }
  return res.status(401).json({ success: false, message: "Unauthorized: missing or invalid admin key" });
}
