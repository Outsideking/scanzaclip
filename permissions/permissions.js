function checkPermission(permission) {
    return async (req, res, next) => {
        const user = req.user; // สมมติว่า req.user ถูก set จาก authentication
        if (!user) return res.status(401).send('Unauthorized');

        const hasPermission = user.roles.some(role => role.permissions.includes(permission));
        if (!hasPermission) return res.status(403).send('Forbidden');

        next();
    };
}

module.exports = { checkPermission };
