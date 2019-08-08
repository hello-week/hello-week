import hasOwnProp from './has-own-prop';

export function extend(to: any, from: any) {
    for (var i in from) {
        if (hasOwnProp(from, i)) {
            to[i] = from[i];
        }
    }

    if (hasOwnProp(from, 'toString')) {
        to.toString = from.toString;
    }

    if (hasOwnProp(from, 'valueOf')) {
        to.valueOf = from.valueOf;
    }

    return to;
}
