// Fetch Users
async function fetchUsers() {
    const res = await fetch('/admin/users');
    const users = await res.json();
    const container = document.getElementById('users-list');
    container.innerHTML = '';
    users.forEach(u => {
        container.innerHTML += `<div>${u.name} - ${u.role}</div>`;
    });
}

// Fetch Sclips
async function fetchSclips() {
    const res = await fetch('/admin/sclips');
    const sclips = await res.json();
    const container = document.getElementById('sclip-list');
    container.innerHTML = '';
    sclips.forEach(s => {
        container.innerHTML += `<div>${s.name} - ${s.description}</div>`;
    });
}

// Chat system
document.getElementById('send-btn').addEventListener('click', () => {
    const msg = document.getElementById('chat-input').value;
    if(msg) {
        document.getElementById('chat-box').innerHTML += `<div class="msg">${msg}</div>`;
        document.getElementById('chat-input').value = '';
        // ส่งข้อความไป API backend สำหรับ translation และการบันทึก
    }
});

// Initial load
fetchUsers();
fetchSclips();
