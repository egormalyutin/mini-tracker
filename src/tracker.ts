// USES:
// document.querySelector

import {
    Selector,
    ConfigEntry,
    UserConfig,
    EventsConfig,
    EventsEntries,
    userToEventsConfig
} from "./config"

import { matches } from "./util"

import { createEvent } from "./event"

export default class Tracker {
    protected readonly rootSelector: Selector
    protected readonly eventsConfig: EventsConfig

    protected root: Node

    constructor(rootSelector: Selector, config: UserConfig) {
        this.rootSelector = rootSelector
        this.eventsConfig = userToEventsConfig(config)

        this.listener = this.listener.bind(this)

        console.log(`Added ${this.rootSelector}:`, this.eventsConfig)
    }

    mount() {
        this.root = document.querySelector(this.rootSelector)
        for (const event in this.eventsConfig) {
            this.root.addEventListener(event, this.listener, true)
        }
    }

    listener(event: Event) {
        const conf = this.eventsConfig[event.type]

        let target: Node | undefined = event.target as Node

        while (target && target != this.root) {
            if (matches(conf.testSelector, target)) {
                const entries = this.findEntries(target, conf.entries)
                for (const entry of entries) {
                    this.handleEvent(target, entry)
                }
            }

            target = target.parentNode
        }
    }

    handleEvent(target: Node, entry: [Selector, ConfigEntry]) {
        console.log(
            "Event:",
            JSON.stringify(createEvent(entry[1][0], entry[0]), null, 2)
        )
    }

    findEntries(
        target: Node,
        entries: EventsEntries
    ): [Selector, ConfigEntry][] {
        const ret = []
        for (const selector in entries) {
            if (matches(selector, target)) {
                ret.push([selector, entries[selector]])
            }
        }
        return ret
    }

    unmount() {}
}
