import Tracker from "./tracker"

const config = {}

// TODO: sub elems

for (let i = 0; i < 10000; i += 2) {
    config[".parent-" + i] = { eventType: "click" }
    config[".elem-" + (i + 1)] = {}

    const cont = document.createElement("div")
    cont.className = "parent-" + i
    cont.innerText = "parent-" + i + "; "

    const child = document.createElement("span")
    child.className = "elem-" + (i + 1)
    child.innerText = "child-" + (i + 1) + "; "

    cont.appendChild(child)
    document.body.appendChild(cont)
}

const tracker = new Tracker("body", config, (_, sel, entry) => {
    console.log("Event:", sel, "was", entry.eventType + "ed")
})

tracker.mount()
