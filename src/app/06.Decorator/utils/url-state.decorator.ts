import { ActivatedRoute, Router } from '@angular/router';
import isEqual from 'lodash.isequal';
import { distinctUntilChanged } from 'rxjs/operators';

/**custom url state decorator
usage:
export class SomeComponent implements OnInit {
@UrlState() params;
constructor(public injector: Injector) {}
.....
public SomeMethod(): void {
 this.params = {page: 5, size: 10}
}
*/

export function UrlState(
  settings = {
    parseFct: (val: any) => val
  }
): PropertyDecorator {
  return (target: any, propertyKey: any) => {
    let propertyValue: unknown;
    let activatedRoute: ActivatedRoute;
    let router: Router;

    const ngOnInitUnpatched = target.ngOnInit;
    target.ngOnInit = function (this) {
      activatedRoute = this.injector.get(ActivatedRoute);
      router = this.injector.get(Router);

      activatedRoute.queryParams.pipe(distinctUntilChanged((a, b) => isEqual(a, b))).subscribe(params => {
        if (typeof target[propertyKey] !== 'object') {
          return;
        }

        Object.keys(target[propertyKey]).forEach(key => {
          if (params[key]) {
            target[propertyKey][key] = settings.parseFct(params[key]);
          }
        });
      });

      if (ngOnInitUnpatched) {
        return ngOnInitUnpatched.call(this);
      }
    };

    function getter(): unknown {
      return propertyValue;
    }

    function setter(value: any): void {
      propertyValue = value;
      if (activatedRoute) {
        const newQueryParam = { ...value };

        router.navigate([], {
          relativeTo: activatedRoute,
          queryParams: newQueryParam,
          queryParamsHandling: 'merge',
          replaceUrl: false
        });
      }
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}
