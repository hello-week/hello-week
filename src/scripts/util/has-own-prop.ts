export default function hasOwnProp(a: any, b: any) {
    return Object.prototype.hasOwnProperty.call(a, b);
}
