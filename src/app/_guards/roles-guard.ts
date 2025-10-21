import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth';

type Role = 'ADMIN' | 'USER';

export const roleGuard = (roles: Role[]): CanActivateFn => {
  return async () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    let user = auth.me();

    if (user === undefined) {
      try {
        await auth.fetchCurrentUser();
        user = auth.me();
      } catch (err) {
        console.error('❌ Failed to fetch user:', err);
        router.navigate(['/login']);
        return false;
      }
    }

    if (!user) {
      router.navigate(['/login']);
      return false;
    }

    // 🔒 проверка роли
    if (!roles.includes(user.role as Role)) {
      router.navigate(['/403']);
      return false;
    }

    return true;
  };
};
