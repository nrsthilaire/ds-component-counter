# 🧱 Design System Tracker API

A simple Node + PostgreSQL backend that collects and summarizes usage data for Design System components across multiple Angular apps.

## 🚀 Setup

```bash
git clone <repo-url>
cd design-system-tracker
npm install
cp .env.example .env
npm run dev
```

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------:|-----------|--------------|
| POST | `/ds-usage` | Record a component usage event |
| GET | `/ds-usage/summary` | View aggregated usage data |
| GET | `/ds-usage/trends` | View usage trends over time |

**Auth Header:**  
```
x-api-key: <TRACKER_API_KEY>
```

## 🧮 Example Event

```json
{
  "component": "DSButton",
  "route": "/checkout",
  "hostname": "app1.company.com",
  "appVersion": "1.2.4",
  "environment": "staging"
}
```
