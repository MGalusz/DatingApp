import { Injectable } from '@angular/core';
import { HttpInterceptor,  HTTP_INTERCEPTORS, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';


@Injectable()

export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error.status === 401) {
                    throw throwError(error.statusText);
                }
                if (error instanceof HttpErrorResponse) {
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        throw throwError(applicationError);
                    }

                    const serverErroor = error.error;
                    let modelStateErrors = '';
                    if (serverErroor.errors && typeof serverErroor.errors === 'object') {
                        for (const key in serverErroor.errors) {
                            if (serverErroor.errors[key]) {
                                modelStateErrors += serverErroor.errors[key] + '\n';
                            }
                        }
                    }
                    return throwError(modelStateErrors || serverErroor || 'Server Error');
                }
            })
        );
    }

}

 export const ErrorInterceptorProvider = {
     provide : HTTP_INTERCEPTORS,
     useClass: ErrorInterceptor,
     multi: true
 };
