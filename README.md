# 🌐 EventHopper Frontend

EventHopper Frontend is a modern **Angular** web application that provides a clean and interactive interface for event discovery, organization, and management.

---

## 🚀 Overview

The frontend connects directly to the **Spring Boot** backend API, offering:

- Registration and login for **three user types**:
  - 👤 **User** – browse, follow, and attend events
  - 🎤 **Organizer** – create and manage personal events
  - 🛠️ **Service Provider** – offer products and services related to events
- Creating, scheduling, and editing events
- Sending **invitations** and **notifications** to participants
- Searching and filtering events by category, date, or location
- **Purchasing products** and **booking services** associated with events
- Viewing and tracking upcoming and past events
- Full integration between **mobile**, **web**, and **backend API** clients

🔗 **Related Repositories**

- **Backend:** [EventHopper Backend](https://github.com/Bruda04/event-hopper-backend)
- **Mobile App:** [EventHopper Mobile](https://github.com/Bruda04/event-hopper-mobile)

---

## 🧰 Tech Stack

| Component        | Technology                 |
| ---------------- | -------------------------- |
| Framework        | **Angular**                |
| Language         | **TypeScript**             |
| Styling          | **CSS / Angular Material** |
| API Integration  | **REST (HTTPClient)**      |
| State Management | **RxJS / Services**        |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Bruda04/event-hopper-frontend.git
cd event-hopper-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Edit the environment file (`src/environments/environment.ts`) and set your local backend URL:

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:8080/api",
};
```

---

### 4. Run the Application

```bash
ng serve
```

Visit [http://localhost:4200](http://localhost:4200) to access the app.

---

## 👥 Authors

- [Marija Parežanin](https://github.com/marijaparezanin)
- [Vanja Kostić](https://github.com/vanjakostic03)
- [Luka Bradić](https://github.com/Bruda04)
