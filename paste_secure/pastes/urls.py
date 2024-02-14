from django.urls import path
from . import views

urlpatterns = [
    path("api/pastes/", views.PasteCreateView.as_view(), name="paste-creation"),
    # path("api/<slug>/", views.PasteRetrieveView.as_view(), name="paste-retrieve"),
]
