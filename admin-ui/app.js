const permissions = [
    { id: 1, name: "Founder", access: "All" },
    { id: 2, name: "GENAI", access: "Full" },
    { id: 3, name: "User", access: "Limited" },
];

function renderPermissions() {
    const container = document.getElementById('permission-list');
    container.innerHTML = '';
    permissions.forEach(p => {
        const div = document.createElement('div');
        div.className = 'permission-item';
        div.innerText = `${p.name} - Access: ${p.access}`;
        container.appendChild(div);
    });
}

renderPermissions();
