function displayKeybindings() {
    chrome.storage.local.get({ keybinds: {} }, (result) => {
        const keybindings = result.keybinds;
        const listContainer = document.getElementById('keybindings-list');
        
        listContainer.innerHTML = '';
        
        const keys = Object.keys(keybindings);
        
        if (keys.length === 0) {
            listContainer.innerHTML = '<div class="empty-state">No keybindings set</div>';
            return;
        }
        
        keys.forEach(key => {
            const item = document.createElement('div');
            item.className = 'keybinding-item';
            
            const info = document.createElement('div');
            info.className = 'keybinding-info';
            
            const keyDisplay = document.createElement('div');
            keyDisplay.className = 'key-display';
            keyDisplay.textContent = key;
            
            const valueDisplay = document.createElement('div');
            valueDisplay.className = 'value-display';
            valueDisplay.textContent = `Speed: ${keybindings[key]}x`;
            
            info.appendChild(keyDisplay);
            info.appendChild(valueDisplay);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                deleteKeybinding(key);
            });
            
            item.appendChild(info);
            item.appendChild(deleteBtn);
            listContainer.appendChild(item);
        });
    });
}

function deleteKeybinding(key) {
    chrome.storage.local.get({ keybinds: {} }, (result) => {
        const keybindings = result.keybinds;
        delete keybindings[key];
        chrome.storage.local.set({ keybinds: keybindings }, () => {
            displayKeybindings();
        });
    });
}

displayKeybindings();

chrome.storage.onChanged.addListener((changes) => {
    if (changes.keybinds) {
        displayKeybindings();
    }
});

