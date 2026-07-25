from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path


def home(request):
    return JsonResponse(
        {
            "project": "Page Pulse Backend",
            "status": "running",
            "framework": "Django REST Framework",
            "api_endpoint": "/api/analyze/"
        }
    )


urlpatterns = [
    path("", home),
    path("admin/", admin.site.urls),
    path("api/", include("analyzer.urls")),
]