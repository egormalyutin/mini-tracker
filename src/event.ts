import { Selector, ConfigEntry } from "./config"

export const createEvent = (entry: ConfigEntry, selector: Selector) => ({
    event_name: entry.eventType,
    event_value: selector
})
