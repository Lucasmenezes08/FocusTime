
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('cadastro_materia/', views.cadastro, name='cadastro_materia'),
    path('cronometro/', views.cronometro, name='cronometro'),
    path('cadastro_usuario/', views.tela_cadastro, name='cadastro'),  # nome 'cadastro' é usado no template
]
