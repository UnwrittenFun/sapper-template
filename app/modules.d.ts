declare module '*.html';
declare module 'sapper/runtime.js';
declare module 'sapper';
declare module 'polka' {
    import { Request, Response, NextFunction } from 'express';
    export { Request, Response, NextFunction };

    const polka: any; // TODO
    export default polka;
}
