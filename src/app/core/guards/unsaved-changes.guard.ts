import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    // If the component has no unsaved changes, allow navigation
    if (!component.canDeactivate || component.canDeactivate()) {
      return true;
    }

    // Confirm with the user before navigating away
    return confirm('You have unsaved changes. Are you sure you want to leave this page?');
  }
}
