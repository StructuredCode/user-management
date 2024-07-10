import { HttpContextToken, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';

/**
 * Add authorization token to each request.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // If the request context is marked as public there's no need of authorization.
  if (req.context.get(IS_PUBLIC))
    return next(req);

  const authToken = authService.getAuthToken();

  if (authToken) {
    const authRequest = addAuthorizationHeader(req);
    return next(authRequest);
  }

  return next(req);
};

/**
 * Add authorization Bearer token to the request.
 * @param req - Http request that needs auth token.
 * @returns - New HttpRequest with authorization barer token in header.
 */
const addAuthorizationHeader = (req: HttpRequest<any>) => {
  const authService = inject(AuthService);

  const token = authService.getAuthToken();

  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  })
}

export const IS_PUBLIC = new HttpContextToken(() => false);
