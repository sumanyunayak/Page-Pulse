# 🚀 Page Pulse

Page Pulse is a web-based SEO and webpage auditing tool built for the Digital Heroes Software Development Internship Assignment.

Users can enter any webpage URL and receive an analysis report containing key technical and SEO metrics.

---

## ✨ Features

- HTTP Status Code
- Response Time
- Page Title
- Meta Description
- H1 Count
- Missing Alt Images
- Approximate Word Count
- Canonical Tag Detection
- Open Graph Title Detection
- Internal Link Count
- External Link Count
- Robust Error Handling
- Responsive React Frontend
- REST API powered by Django

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Axios

### Backend

- Django
- Django REST Framework
- BeautifulSoup4
- Requests

---

## 📂 Project Structure

page-pulse/

backend/

frontend/

---

## 🚀 Running Locally

### Backend

```bash
cd backend

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## API

### POST

```
/api/analyze/
```

Request

```json
{
  "url": "https://example.com"
}
```

Response

```json
{
  "status": 200,
  "response_time": 180,
  "title": "...",
  "meta_description": "...",
  "h1_count": 1,
  "missing_alt_images": 0,
  "word_count": 235,
  "canonical": "Present",
  "open_graph_title": "Present",
  "internal_links": 25,
  "external_links": 8
}
```

---

## Design Decisions

### 1. Service Layer

The parsing and URL validation logic are separated into dedicated service modules, keeping the API view focused on request handling and improving maintainability.

### 2. Django REST Framework

DRF serializers validate incoming requests and provide consistent API responses.

### 3. Component-Based Frontend

The React application is organized into reusable components with API communication isolated in a service layer.

---

## Testing

The backend includes unit tests covering:

- URL validation
- API success cases
- Invalid input
- Error handling

---

## AI Usage

I used AI tools as a development assistant to help with project planning, reviewing implementation approaches, generating initial frontend boilerplate, and refining documentation. I independently implemented the backend logic, integrated the frontend with the API, tested the application, and modified the generated code based on my own design decisions.

---

## Future Improvements

- Lighthouse Performance Scoring
- Accessibility Audit
- PDF Report Export
- Historical Scan Comparison
- Open Graph Preview
- Sitemap Analysis
- robots.txt Validation

---

Built for Digital Heroes Training Task.