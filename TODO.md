# TODO - Cash Book UI/UX + Working Auth

- [x] Fix broken navigation link in `rege.html` (Login -> `login.html`).

- [x] Create `auth.js` to implement working client-side flows using `localStorage`.

  - [ ] Registration: save user credentials.
  - [ ] Login: validate credentials and redirect to `index.html`.
  - [ ] Forgot/Reset: verify email exists, allow setting new password, redirect to `login.html`.
- [x] Update `login.html` to load `log.css` + `auth.js`, add inline error UI, and make form submission handled by JS.

- [x] Update `rege.html` to load `reg.css` + `auth.js`, add inline status/error UI, and make form handled by JS.

- [x] Update `pass.html` to load `pas.css` + `auth.js`, enhance UI to allow password reset (new password + confirm), add inline messages.

- [ ] Quick manual test checklist:
  - [ ] Register a user.
  - [ ] Login with correct credentials -> redirected to `index.html`.
  - [ ] Login with wrong credentials -> error shown.
  - [ ] Forgot password with existing email -> reset allowed.
  - [ ] Forgot password with unknown email -> error shown.

