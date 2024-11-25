import express, { Express, Request, Response } from 'express';
import responseTime from 'response-time';
import client, { register } from 'prom-client';


client.collectDefaultMetrics({ register });


const reqResTime = new client.Histogram({
    name: 'http_express_req_res_time',
    help: 'Duration of HTTP requests in milliseconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 5, 15, 50, 100, 500],  // Customize as necessary
});


export const getMetrics = responseTime((req: Request, res: Response, time: number) => {
    let route = req.route?.path || req.originalUrl || 'unknown_route';
 

    if (route === '/favicon.ico') return;  

   
    reqResTime.labels(req.method, route, res.statusCode.toString()).observe(time / 1000);
});


export const addMetrics = async (req: Request, res: Response) => {
    res.setHeader('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
};