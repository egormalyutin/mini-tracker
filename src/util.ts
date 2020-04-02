// USES:
// Object.prototype.hasOwnProperty

export const hasProp = (obj: Object, prop: string | number): boolean =>
    Object.prototype.hasOwnProperty.call(obj, prop)
