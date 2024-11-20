import { v4 as uuidv4 } from 'uuid';
export const logID = (req, res, next) => {
    req.logId = uuidv4();
    next();
};
