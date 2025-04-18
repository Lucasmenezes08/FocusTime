from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('cadastro_materia/' , views.cadastro , name='cadastro_materia'),
    path('cronometro/' , views.cronometro , name='cronometro'),
    path('cadastro/' , views.tela_cadastro , name='cadastro')
]
