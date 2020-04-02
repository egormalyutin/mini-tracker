import { hasProp } from "./util"

export type Selector = string
export type EventType = string

export interface Entry {
    eventType: EventType
}

export type UserEntry = Partial<Entry>

const userEntryToEntry = (user: UserEntry): Entry => ({
    eventType: user.eventType || "click"
})

export type UserConfig = Record<Selector, UserEntry>

export type InternalEntries = Record<Selector, Entry>

export interface InternalEventGroup {
    globalSelector: Selector
    entries: InternalEntries
}

export type InternalConfig = Record<EventType, InternalEventGroup>

export const userConfigToInternalConfig = (us: UserConfig): InternalConfig => {
    const internal: InternalConfig = Object.create(null)

    for (const sel in us) {
        if (!hasProp(us, sel)) continue
        const entry = userEntryToEntry(us[sel])

        if (!internal[entry.eventType]) {
            internal[entry.eventType] = {
                globalSelector: "",
                entries: Object.create(null)
            }
        }

        internal[entry.eventType].entries[sel] = entry
    }

    for (const eventType in internal) {
        const sels = []
        for (const sel in internal[eventType].entries) {
            sels.push(sel)
        }
        internal[eventType].globalSelector = sels.join(", ")
    }

    return internal
}
