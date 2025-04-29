from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth import logout


def logoutView(request):
    logout(request)
    messages.success(request, "Você saiu da sua conta.")
    return redirect('login')

def loginView(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, f"Bem-vindo, {username}!")
            return redirect('index')  
        else:
            messages.error(request, "Usuário ou senha incorretos.")

    return render(request, "users/login.html")
