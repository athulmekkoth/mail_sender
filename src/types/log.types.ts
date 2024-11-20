export interface LogObject{
    logId: string;          
    message: string;        
    timestamp: string;
}
export interface Log {
    logID: string;
    logMessage: string;
    logObject: Record<string, any>;
    type: string;
    createdAt: Date;
}
