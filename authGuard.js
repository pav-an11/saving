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
    if (hasSession()) return;

    // Prevent dashboard from flashing
    document.documentElement.style.display = "none";

    // Ensure we always go to the correct login page even on deep links
    window.location.replace("/login.html");
  }

  // Use DOMContentLoaded + also handle immediate execution
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runGuard);
  } else {
    runGuard();
  }
})();


