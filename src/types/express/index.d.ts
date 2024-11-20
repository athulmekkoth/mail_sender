import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      logId?: string; 
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken | null;
    }
  }
}

export {};