from django.shortcuts import render, redirect
from django.contrib import messages

# Create your views here.

def home (request):
    return render(request, "index.html")


def cadastro (request):
    if request.method == 'POST':
        nome_materia = request.POST.get('nome-materia')
        horas_meta = request.POST.get('horas-meta')
        minutos_meta = request.POST.get('minutos-meta')
        segundos_meta = request.POST.get('segundos-meta')
        horas = request.POST.get('horas')
        minutos = request.POST.get('minutos')
        segundos = request.POST.get('segundos')
        
    
        messages.success(request, f'Materia "{nome_materia}" cadastrada!')
        cadastro.save()
        return redirect('index')
    
    return render (request ,"cadastro.html")

