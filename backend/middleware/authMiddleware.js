const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header["Authorization"];
    
    if (!token) {
        return res.status(401).json({ message: 'authorization denied' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded; // Store user info in request object
        next(); // Proceed to the next middleware or route handler
    });

    // try{
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = decoded; // Add user data to request
    //     next();
    // } catch (err){
    //     res.status(401).json({msg: "Invalid token."});
    // }
};

module.exports = authMiddleware;