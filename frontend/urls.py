from django.urls import path, re_path
from .views import index

urlpatterns = [
    # re_path(r'^.*$', index)  # This will catch all other URLs and direct them to index
    path('', index),
    path('join', index),
    path('create', index),
    path('room/<str:roomCode>', index)
]
