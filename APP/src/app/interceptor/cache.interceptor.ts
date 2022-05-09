import {
  HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const httpRequest = req.clone({
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
      })
    });

    return next.handle(httpRequest);
  }
}
