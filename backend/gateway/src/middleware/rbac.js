const roleRank = {
  viewer: 1,
  member: 2,
  analyst: 3,
  manager: 4,
  admin: 5,
  owner: 6,
};

export function requireRole(minRole) {
  return (req, res, next) => {
    if (!req.user?.role) {
      return res.status(403).json({ error: "Missing role context" });
    }
    if ((roleRank[req.user.role] ?? 0) < (roleRank[minRole] ?? 0)) {
      return res.status(403).json({ error: "Insufficient role privileges" });
    }
    return next();
  };
}
