from django.urls import path, include, re_path

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    
]
