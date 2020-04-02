// USES:
// document.getElementById

import {
    Selector,
    Entry,
    UserConfig,
    InternalConfig,
    InternalEntries,
    userConfigToInternalConfig
} from "./config"

// TODO: unmount

const getSelector = (
    target: Element,
    entries: InternalEntries
): Selector | null => {
    for (const sel in entries) {
        if (target.matches(sel)) {
            return sel
        }
    }
    return null
}

export interface Handler {
    (element: Element, selector: Selector, entry: Entry): void
}

export default class Tracker {
    protected readonly rootSelector: string
    protected readonly config: InternalConfig

    protected readonly handler: Handler

    protected rootElement: Element

    constructor(
        rootSelector: Selector,
        userConfig: UserConfig,
        handler: Handler
    ) {
        this.rootSelector = rootSelector
        this.config = userConfigToInternalConfig(userConfig)
        this.handler = handler

        this.listener = this.listener.bind(this)
    }

    listener(event: Event) {
        const start = new Date()

        // Get event group
        const group = this.config[event.type]
        if (!group) return

        // Get target element
        const tg = event.target
        if (!(tg instanceof Element)) return
        const target = tg as Element

        // Find closest matching element
        const closest = target.closest(group.globalSelector)
        if (!closest) return

        // Find selector for matching element
        const selector = getSelector(closest, group.entries)
        if (!selector) return

        const end = new Date()
        console.log("Handled in:", end.getTime() - start.getTime())

        this.handler(target, selector, group.entries[selector])
    }

    mount() {
        this.rootElement = document.querySelector(this.rootSelector)

        for (const event in this.config) {
            this.rootElement.addEventListener(event, this.listener, true)
        }
        console.log(this.config)
    }
}
