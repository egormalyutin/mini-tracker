// USES:
// Element.prototype.querySelectorAll
// Object.prototype.hasOwnProperty

const ep: any = Element.prototype

const matchesFunc =
    ep.matches ||
    ep.matchesSelector ||
    ep.webkitMatchesSelector ||
    ep.mozMatchesSelector ||
    ep.msMatchesSelector ||
    // bruh
    function (selector: string) {
        let nodes = (this.parentNode || this.document).querySelectorAll(
            selector
        )

        let i = -1

        while (nodes[++i] && nodes[i] != this);

        return !!nodes[i]
    }

// Element.prototype.matches polyfill
export const matches = (selector: string, node: Node) =>
    matchesFunc.call(node, selector)

// If `x` is not an array, wrap it in array, otherwise return `x`
export const toArray = <T>(x: T | T[]): T[] => (Array.isArray(x) ? x : [x])

// Short Object.prototype.hasOwnProperty
export const hasProp = (obj: Object, prop: number | string): boolean =>
    Object.prototype.hasOwnProperty.call(obj, prop)
