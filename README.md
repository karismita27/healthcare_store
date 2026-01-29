# Healthcare Machines – React + Vite (Frontend-only)

## 1) Install
```bash
npm install
```

## 2) Run
```bash
npm run dev
```

Open: http://localhost:5173

## Notes
- Cart and Checkout are protected routes.
- If you click Cart without login, you will be redirected to /auth.
- You can login/register, or buy as guest (guest form).
- All auth/cart data is stored in localStorage.
- Coupons:
  - SAVE10 (10% off)
  - HEALTH20 (20% off)
