from django.urls import path, include
from .views import predictPrice

urlpatterns = [
    path('status/', predictPrice.as_view()),
]
