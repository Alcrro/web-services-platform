🧭 1️⃣ The purpose of the features/ folder

A features/ folder groups together self-contained functionality that serves a specific purpose, but doesn’t belong entirely to one domain like orders, clients, or services.

Think of features as:

“Something the user can do” — not just data you have.

✅ Examples of features:
Feature Description Example Location
auth login, register, logout, password reset src/features/auth/
notifications toasts, in-app notifications, email triggers src/features/notifications/
search universal search bar logic src/features/search/
filters filtering for products or services src/features/filters/
file-upload reusable upload logic for forms src/features/file-upload/
analytics user activity, conversion tracking src/features/analytics/
seo reusable SEO helpers src/features/seo/ (if complex)
🧩 2️⃣ Difference between features/ and modules/
Folder Represents Examples
modules/ Your core business domains orders, services, clients, payments
features/ Functional capabilities that cut across multiple modules auth, search, notifications, seo, uploads
📘 Example
src/
├── modules/
│ ├── orders/
│ ├── services/
│ ├── clients/
│ └── payments/
│
├── features/
│ ├── auth/
│ ├── search/
│ ├── filters/
│ └── seo/

🛠️ 3️⃣ Inside a feature/ folder

Each feature can have its own clean structure (like a mini module):

src/features/search/
├── components/
│ ├── SearchInput.tsx
│ ├── SearchResultList.tsx
├── hooks/
│ ├── useSearch.ts
├── lib/
│ ├── searchUtils.ts
├── api/
│ ├── searchApi.ts
└── index.ts

components/ — UI for that feature (search bar, filter, modal)

hooks/ — custom hooks (state, fetching logic, etc.)

lib/ — pure utilities

api/ — fetchers or API calls

index.ts — re-exports (for clean imports)

🧠 4️⃣ When to use features/ instead of modules/

✅ Use features/ when:

It’s a cross-domain feature (used in multiple modules).

It’s UI + logic combined (auth modal, file upload, search).

It does not represent a business entity.

🚫 Don’t use features/ for:

Core entities like Order, Client, Product, Service.
→ Those go in modules/.

🧩 5️⃣ Example from your project

Let’s map your project to this idea:

Purpose Folder
Orders, clients, services modules/orders, modules/clients, modules/services
Price calculation modules/services/domain/priceCalculator.ts
Order configurator modules/orders/components/OrderConfigurator.tsx
Authentication features/auth/
SEO generation features/seo/ or lib/seo.ts (if simple)
Notifications / Toasts features/notifications/
🔥 Summary
Concept Folder Contains
Business entities /modules Orders, Clients, Services
Cross-cutting functionality /features Auth, SEO, Search, Upload
Shared small UI /components/ui Button, Input, Card
Data /data Static config, seed, constants
Lib /lib Utilities, API clients, helpers
