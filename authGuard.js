(function () {
  const SESSION_KEY = "cashbook_session_v1";

  function hasSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      return !!(parsed && parsed.email);
    } catch {
      return false;
    }
  }

  function runGuard() {
    if (!hasSession()) {
      // Prevent dashboard from flashing
      document.body.innerHTML = "";
      window.location.replace("login.html");
      return;
    }
  }

  document.addEventListener("DOMContentLoaded", runGuard);
})();

