
/* =====================
   1. AUTHENTICATION CHECK
   ===================== */
function checkAuth() {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") ||
    sessionStorage.getItem("isLoggedIn");

  // If not logged in → redirect
  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "login.html";
  }
}

// Run on page load
checkAuth();


/* =====================
   2. ACTIVE MENU HIGHLIGHT
   ===================== */
(function setActiveMenu() {
  const currentPage = window.location.pathname.split("/").pop();
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item) => {
    const href = item.getAttribute("href");
    if (href === currentPage) {
      item.classList.add("active");
    }
  });
})();


/* =====================
   3. PROFILE DROPDOWN
   ===================== */
(function profileDropdownHandler() {
  const profileBtn = document.getElementById("profileDropdownBtn");
  const dropdown = document.getElementById("profileDropdown");
  const icon = document.getElementById("dropdownIcon");

  if (!profileBtn) return;

  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("hidden");

    // Rotate icon
    if (icon) {
      icon.style.transform = dropdown.classList.contains("hidden")
        ? "rotate(0deg)"
        : "rotate(180deg)";
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add("hidden");
      if (icon) icon.style.transform = "rotate(0deg)";
    }
  });
})();


/* =====================
   4. MOBILE SIDEBAR TOGGLE
   ===================== */
(function mobileSidebarToggle() {
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const sidebar = document.getElementById("sidebar");

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
  });
})();


/* =====================
   5. CENTER TOAST SYSTEM
   ===================== */
function showCenterToast(message, type = "success") {
  // Remove existing toast
  const oldToast = document.getElementById("centerToast");
  if (oldToast) oldToast.remove();

  const toast = document.createElement("div");
  toast.id = "centerToast";

  // Toast styles
  let bg = "bg-green-500";
  let icon = "fa-check-circle";

  if (type === "error") {
    bg = "bg-red-500";
    icon = "fa-exclamation-circle";
  } else if (type === "info") {
    bg = "bg-blue-500";
    icon = "fa-info-circle";
  } else if (type === "warning") {
    bg = "bg-yellow-500";
    icon = "fa-exclamation-triangle";
  }

  toast.className = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${bg} text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50`;

  toast.innerHTML = `
    <i class="fas ${icon}"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    toast.remove();
  }, 2000);
}


/* =====================
   6. LOGOUT SYSTEM
   ===================== */
(function logoutSystem() {
  const modal = document.getElementById("logoutModal");
  const sidebarBtn = document.getElementById("sidebarLogoutBtn");
  const dropdownBtn = document.getElementById("dropdownLogoutBtn");
  const confirmBtn = document.getElementById("confirmLogoutBtn");
  const cancelBtn = document.getElementById("cancelLogoutBtn");
  const backdrop = document.getElementById("modalBackdrop");

  function showModal() {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }

  function hideModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }

  function logout() {
    // Clear storage
    localStorage.clear();
    sessionStorage.clear();

    showCenterToast("Logged out successfully");
    hideModal();

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);
  }

  if (sidebarBtn) sidebarBtn.addEventListener("click", showModal);
  if (dropdownBtn) dropdownBtn.addEventListener("click", showModal);
  if (confirmBtn) confirmBtn.addEventListener("click", logout);
  if (cancelBtn) cancelBtn.addEventListener("click", hideModal);
  if (backdrop) backdrop.addEventListener("click", hideModal);
})();



/* =====================
   8. SUBMENU SYSTEM (Reusable)
   ===================== */
function setupSubmenu(menuBtnId, submenuId, iconId) {
  const btn = document.getElementById(menuBtnId);
  const submenu = document.getElementById(submenuId);
  const icon = document.getElementById(iconId);

  if (!btn || !submenu) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    submenu.classList.toggle("hidden");

    if (icon) {
      icon.style.transform = submenu.classList.contains("hidden")
        ? "rotate(0deg)"
        : "rotate(180deg)";
    }
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !submenu.contains(e.target)) {
      submenu.classList.add("hidden");
      if (icon) icon.style.transform = "rotate(0deg)";
    }
  });
}

// Initialize all submenus
setupSubmenu("projectsMenuBtn", "projectsSubmenu", "projectsDropdownIcon");
setupSubmenu("tasksMenuBtn", "tasksSubmenu", "tasksDropdownIcon");
setupSubmenu("clientsMenuBtn", "clientsSubmenu", "clientsDropdownIcon");
setupSubmenu("teamMenuBtn", "teamSubmenu", "teamDropdownIcon");

