from django.urls import path
from FocusTime.views import index, teste

urlpatterns = [
    path("", index, name = "index"),
    path("teste/", teste, name = "teste")
]
