import { CanDeactivateFn } from '@angular/router';

export const canDeactivateGuard: CanDeactivateFn<any> = (component) => {
  if (component.canDeactivate) {
    return component.canDeactivate();
  }

  return true;
};
