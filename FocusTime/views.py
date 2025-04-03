from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Materia

# Create your views here.

def index (request):
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
        
        materia = Materia(
            nome_materia=nome_materia,
            horas_meta=horas_meta,
            minutos_meta=minutos_meta,
            segundos_meta=segundos_meta,
            horas=horas,
            minutos=minutos,
            segundos=segundos
        )
        materia.save()
    
        messages.success(request, f'Materia "{nome_materia}" cadastrada!')
    
        return redirect('index')
    
    return render (request ,"cadastro.html")

