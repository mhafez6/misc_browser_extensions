

document.getElementById('btn').addEventListener('click', () => {
    const key = document.getElementById('key').value;
    const val = document.getElementById('val').value;

    if (!key || !val) {
        return;
    }

    chrome.storage.local.get({ keybinds: {} }, (result) => {
        const keybindings = result.keybinds;
        keybindings[key] = Number(val);
        chrome.storage.local.set({ keybinds: keybindings }, () => {
            // document.getElementById('key').value = '';
            // document.getElementById('val').value = '';
        });
    });
});

