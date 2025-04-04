from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Materia
from .models import Meta

# Create your views here.

def index (request):
    materias = Materia.objects.all()
    return render(request, "index.html")


def cadastro (request):
    if request.method == 'POST':
        nome_materia = request.POST.get('nome-materia')
        horas = request.POST.get('horas')
        minutos = request.POST.get('minutos')
        segundos = request.POST.get('segundos')
        nome_meta = request.POST.get('nome-meta')
        horas_meta = request.POST.get('horas-meta')
        minutos_meta = request.POST.get('minutos-meta')
        segundos_meta = request.POST.get('segundos-meta')
        if nome_materia and horas and minutos and segundos and nome_meta and horas_meta and minutos_meta and segundos_meta:
            materia = Materia(
                nome_materia=nome_materia,
                horas=horas,
                minutos=minutos,
                segundos=segundos,
            )
            meta = Meta(
                nome_metas=nome_meta,
                horas_meta=horas_meta,
                minutos_meta=minutos_meta,
                segundos_meta=segundos_meta,
            )
            meta.save()
            materia.save()
            return redirect('index')
        else:
            messages.error(request, 'Por favor, preencha todos os campos da matéria.')
            return render(request, "cadastro.html")
        
    
    return render (request ,"cadastro.html")


def cronometro (request):
    return render (request,"cronometro.html")

# def CadastroMetas(request):
#     if request.method == 'POST':
#         nome_meta = request.POST.get('nome-meta')
#         horas_meta = request.POST.get('horas-meta')
#         minutos_meta = request.POST.get('minutos-meta')
#         segundos_meta = request.POST.get('segundos-meta')

#         if nome_meta and horas_meta and minutos_meta and segundos_meta:
#             meta = Meta(
#                 horas_meta=horas_meta,
#                 minutos_meta=minutos_meta,
#                 segundos_meta=segundos_meta,
#             )
#             meta.save()
#             return redirect('index')
#         else:
#             messages.error(request, 'Por favor, preencha todos os campos da meta.')

#     return render (request ,"cadastro.html")

