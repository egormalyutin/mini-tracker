import { toArray, hasProp } from "./util"

export type Selector = string
export type EventType = string

// Base config entry
export interface ConfigEntry {
    eventType: EventType
}

// Config entry with partial options
type UserConfigEntry = Partial<ConfigEntry>

// Fill not filled config entry options
export const toConfigEntry = (c: UserConfigEntry): ConfigEntry => ({
    eventType: c.eventType || "click"
})

// Config with entries or arrays of entries with partial options
export type UserConfig = Record<Selector, UserConfigEntry | UserConfigEntry[]>

// Entries with selectors
export type EventsEntries = Record<Selector, ConfigEntry[]>

// Entries with optimization data
export interface EventsCollection {
    testSelector: Selector
    entries: EventsEntries
}

// Config with entries grouped by event type
export type EventsConfig = Record<EventType, EventsCollection>

// Transform UserConfig to EventsConfig
export function userToEventsConfig(user: UserConfig): EventsConfig {
    // Here goes top tier shitcode
    const ret: EventsConfig = Object.create(null)
    for (const sel in user) {
        if (!hasProp(user, sel)) continue

        const entries = toArray(user[sel])
        for (const userEntry of entries) {
            const entry = toConfigEntry(userEntry)

            if (!ret[entry.eventType]) {
                ret[entry.eventType] = {
                    testSelector: "",
                    entries: Object.create(null)
                }
            }

            if (!ret[entry.eventType][sel]) {
                ret[entry.eventType].entries[sel] = []
            }

            ret[entry.eventType].entries[sel].push(entry)
        }
    }

    for (const eventName in ret) {
        const event = ret[eventName]
        const selectors = []
        for (const selector in event.entries) {
            selectors.push(selector)
        }
        event.testSelector = selectors.join(", ")
    }

    return ret
}
