/* ============================================
   AEROVA - Authentication Check System
   ============================================ */

function isLoggedIn() {
    return localStorage.getItem('aerova-current-user') !== null;
}

function getCurrentUser() {
    const user = localStorage.getItem('aerova-current-user');
    return user ? JSON.parse(user) : null;
}

function logout() {
    localStorage.removeItem('aerova-current-user');
    showToast('Logged out successfully!', 'info');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

function requireAuth() {
    if (!isLoggedIn()) {
        showToast('Please login to access this page!', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
        return false;
    }
    return true;
}

function updateAuthUI() {
    const currentUser = getCurrentUser();
    const loginBtn = document.getElementById('loginBtn');
    
    if (currentUser && loginBtn) {
        const firstName = currentUser.name.split(' ')[0];
        loginBtn.innerHTML = `
            <span>${firstName}</span>
            <i class="fas fa-sign-out-alt"></i>
        `;
        loginBtn.href = '#';
        loginBtn.onclick = function(e) {
            e.preventDefault();
            logout();
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const protectedPages = [
        'flights.html',
        'airport-guide.html',
        'booking.html',
        'boarding-pass.html',
        'lost-found.html'
    ];
    
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        requireAuth();
    }
    
    updateAuthUI();
});
