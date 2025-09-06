# React + TypeScript + Vite

# Users Posts App

Kullanıcılar ve gönderilerle çalışan, React + TypeScript + MUI tabanlı basit bir uygulama.

---

## Özellikler

- Kullanıcıların listelenmesi, eklenmesi, düzenlenmesi ve silinmesi
- JSONPlaceholder API'sinden kullanıcı verilerinin çekilmesi
- Lokal depolama (localStorage) ile kullanıcı verilerinin saklanması
- Tema desteği (Light & Dark)
- Material-UI bileşenleri ile şık ve duyarlı arayüz
- React Router ile sayfalar arası geçiş

---

## Teknolojiler

- React
- TypeScript
- Material-UI (MUI)
- Axios
- React Router
- Vite

---
## Proje Dizini
users-posts-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── davincilogo.png
│   │   └── react.svg
│   ├── pages/
│   │   ├── AdminPanel.tsx
│   │   ├── HomePage.tsx
│   │   ├── PostsPage.tsx
│   │   ├── UserLoginPage.tsx
│   │   ├── UserProfilePage.tsx
│   │   └── UsersPage.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── posts.ts
│   │   └── users.ts
│   ├── types/
│   │   ├── post.ts
│   │   └── user.ts
│   ├── App.tsx
│   ├── App.css
│   ├── ThemeContext.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── eslint.config.js


## Vercel

https://react-users-posts-app.vercel.app/

## Kurulum

```bash
git clone https://github.com/rcicekli/users-posts-app.git
cd users-posts-app
npm install
npm run dev

* LocalStorage üzerinde çalışan bir proje olduğu için verilerin listelenmediği durumlarda;
-localStorage.clear()
-localStorage.removeItem('posts') 
 
 