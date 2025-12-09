

console.log("haha");



let keybinds = {}
let vids = document.querySelectorAll('video');

function update_vids() {
    vids = document.querySelectorAll('video')
}

const observer = new MutationObserver(update_vids)
observer.observe(document, {
    childList: true,
    subtree: true,
})

async function init() {
    result = await chrome.storage.local.get(({ 'keybinds': {} }))
    keybinds = result.keybinds
}

init()

// update keybindings on change
chrome.storage.onChanged.addListener((changes) => {
    if (changes.keybinds) {
        keybinds = changes.keybinds.newValue;
    }
});

function handle_key_down(e) {
    if (!e.repeat && keybinds.hasOwnProperty(e.key)) {
        vids.forEach(el => {
            el.playbackRate = keybinds[e.key];
        });
    }
}


function handle_key_up(e) {
    if (keybinds.hasOwnProperty(e.key)) {
        vids.forEach(el => {
            el.playbackRate = 1.0;
        });
    }


}

document.addEventListener('keydown', handle_key_down);
document.addEventListener('keyup', handle_key_up);