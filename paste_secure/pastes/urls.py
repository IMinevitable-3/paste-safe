from django.urls import path
from . import views

urlpatterns = [
    path("api/pastes/", views.PasteCreateView.as_view()),
]