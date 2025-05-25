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
    path('dia-d/', views.dia_d ,name='dia-d'),
    path('lembretes/', views.lembretes, name='lembretes'),
    path('materia/editar/<int:materia_id>/', views.editar_materia, name='editar_materia'),
    path('materia/deletar/<int:materia_id>/', views.apagar_materia, name='apagar_materia'),
    path("alterar-cor/<int:materia_id>/", views.alterar_cor, name="alterar_cor"),
]