from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('cadastro_materia/' , views.cadastro , name='cadastro_materia')
]
