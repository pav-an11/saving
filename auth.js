(function () {
  const STORAGE_KEY = "cashbook_users_v1";

  function getUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function setUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  }

  function setMessage(container, msg, type) {
    if (!container) return;
    container.textContent = msg || "";
    container.dataset.type = type || "";
    container.style.display = msg ? "block" : "none";
  }

  function onAuthPage() {
    const form = document.querySelector("form");
    const page = (form && form.dataset && form.dataset.page) || "";

    const messageEl = document.getElementById("authMessage");

    if (!form || !page) return;

    if (page === "register") {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = normalizeEmail(document.getElementById("email").value);
        const password = document.getElementById("password").value;
        const confirm = document.getElementById("confirm_password").value;

        if (!name || !email || !password) {
          setMessage(messageEl, "Please fill all required fields.", "error");
          return;
        }

        if (password.length < 6) {
          setMessage(messageEl, "Password must be at least 6 characters.", "error");
          return;
        }

        if (password !== confirm) {
          setMessage(messageEl, "Passwords do not match.", "error");
          return;
        }

        const users = getUsers();
        if (users[email]) {
          setMessage(messageEl, "This email is already registered. Please login.", "error");
          return;
        }

        users[email] = { name, password };
        setUsers(users);

        setMessage(messageEl, "Registration successful. Redirecting to login...", "success");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 800);
      });

      return;
    }

    if (page === "login") {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = normalizeEmail(document.getElementById("email").value);
        const password = document.getElementById("password").value;

        if (!email || !password) {
          setMessage(messageEl, "Enter email and password.", "error");
          return;
        }

        const users = getUsers();
        const user = users[email];
        if (!user || user.password !== password) {
          setMessage(messageEl, "Invalid email or password.", "error");
          return;
        }

        setMessage(messageEl, "Login successful! Redirecting...", "success");

        // For demo: store session flag
        localStorage.setItem("cashbook_session_v1", JSON.stringify({ email, at: Date.now() }));

        setTimeout(() => {
          window.location.href = "index.html";
        }, 500);
      });
      return;
    }

    if (page === "reset") {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = normalizeEmail(document.getElementById("email").value);
        const newPass = document.getElementById("new_password").value;
        const confirm = document.getElementById("confirm_new_password").value;

        if (!email) {
          setMessage(messageEl, "Enter your email.", "error");
          return;
        }

        if (newPass.length < 6) {
          setMessage(messageEl, "New password must be at least 6 characters.", "error");
          return;
        }

        if (newPass !== confirm) {
          setMessage(messageEl, "Passwords do not match.", "error");
          return;
        }

        const users = getUsers();
        const user = users[email];
        if (!user) {
          setMessage(messageEl, "No account found for this email.", "error");
          return;
        }

        users[email] = { ...user, password: newPass };
        setUsers(users);

        setMessage(messageEl, "Password updated. Redirecting to login...", "success");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 800);
      });
      return;
    }
  }

  document.addEventListener("DOMContentLoaded", onAuthPage);
})();

