import { isDef } from './../util/index';

export function date(dt?: any): any {
  if (isDef(dt)) {
    return new Date(dt);
  }
  return new Date();
}
