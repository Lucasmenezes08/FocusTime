from django.urls import path, include
from django.shortcuts import redirect
from . import views

def redirect_to_login(request):
    return redirect('login')  

urlpatterns = [
    path('', redirect_to_login),
    path('users/', include('users.urls')),
    path('index/', views.index, name='index'),
    path('cadastro_materia/', views.cadastro, name='cadastro_materia'),
    path('cronometro/', views.cronometro, name='cronometro'), 
    path("cadastro/", views.tela_cadastro, name = "cadastro_FocusTime"), 
    path('ranking/', views.ranking, name='ranking'),  
]
