from django.urls import path
from users.views import loginView, logoutView
from FocusTime.views import tela_cadastro

urlpatterns = [
    path("login/", loginView, name = "login"),
    path('logout/', logoutView, name='logout'),
    path('cadastro/', tela_cadastro, name='cadastro'),

]
