from django.shortcuts import render, redirect
from .models import Materia, Meta, Lembrete
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.db.models import Count

@login_required(login_url='login')
def index(request):
    materias = Materia.objects.filter(user=request.user)
    return render(request, "index.html", {"materias": materias})



@login_required(login_url='login')

def cadastro(request):
    if request.method == 'POST':
        nome_materia = request.POST.get('nome-materia')
        horas1 = request.POST.get('horas')
        horas2 = request.POST.get('horas2')
        horas = str(horas1) + str(horas2) if horas1 and horas2 else '00'

        minutos1 = request.POST.get('minutos')
        minutos2 = request.POST.get('minutos2')
        minutos = str(minutos1) + str(minutos2) if minutos1 and minutos2 else '00'

        segundos1 = request.POST.get('segundos')
        segundos2 = request.POST.get('segundos2')
        segundos = str(segundos1) + str(segundos2) if segundos1 and segundos2 else '00'

        nome_meta = request.POST.get('nome-meta')
        horas_meta1 = request.POST.get('horas-meta')
        horas_meta2 = request.POST.get('horas-meta2')
        horas_meta = str(horas_meta1) + str(horas_meta2) if horas_meta1 and horas_meta2 else '00'

        minutos_meta1 = request.POST.get('minutos-meta')
        minutos_meta2 = request.POST.get('minutos-meta2')
        minutos_meta = str(minutos_meta1) + str(minutos_meta2) if minutos_meta1 and minutos_meta2 else '00'

        segundos_meta1 = request.POST.get('segundos-meta')
        segundos_meta2 = request.POST.get('segundos-meta2')
        segundos_meta = str(segundos_meta1) + str(segundos_meta2) if segundos_meta1 and segundos_meta2 else '00'

        if nome_materia and horas and minutos and segundos and nome_meta and horas_meta and minutos_meta and segundos_meta:
            materia = Materia(
                user=request.user,
                nome_materia=nome_materia,
                horas=horas,
                minutos=minutos,
                segundos=segundos,
            )
            materia.save()

            meta = Meta(
                user=request.user,
                nome_metas=nome_meta,
                horas_meta=horas_meta,
                minutos_meta=minutos_meta,
                segundos_meta=segundos_meta,
            )
            meta.save()
            
            return redirect('index')
        else:
            return render(request, "cadastro.html")

    return render(request, "cadastro.html")



@login_required(login_url='login')
def cronometro(request):
    materias = Materia.objects.filter(user=request.user)
    metas = Meta.objects.filter(user=request.user)
    contexto = {
        "materias": materias,
        "metas": metas
    }
    return render(request, "cronometro.html", contexto)


def tela_cadastro(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Usuário já existe!')
            return redirect('cadastro')

        user = User.objects.create_user(username=username, password=password)
        user.save()

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, 'Usuário cadastrado e logado com sucesso!')
            return redirect('index') 


    return render(request, "users/tela_cadastro.html")

@login_required(login_url='login')

def ranking(request):
    total_user = (
        User.objects
        .annotate(total_materias=Count('materia'))
        .order_by('-total_materias')
    )
    ranking_user = total_user[:3]
    resto_user = total_user[3:]


    return render(request, "ranking.html", {
        'ranking_user': ranking_user,
        'resto_user': resto_user
    })

@login_required(login_url='login')
def dia_d(request):
    if request.method == 'POST':
        nome = request.POST.get('nome-day')
        data = request.POST.get('data-day')

        if nome and data:
            Lembrete.objects.create(user=request.user, nome=nome, data=data)
            return redirect('dia-d')  

    lembretes = Lembrete.objects.filter(user=request.user).order_by('data')
    return render(request, "dia_d.html", {"lembretes": lembretes})

def lembretes(request):
    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        descricao = request.POST.get('descricao')
        data = request.POST.get('data')
        hora = request.POST.get('hora')

        if titulo and descricao and data and hora:
            Lembrete.objects.create(
                titulo=titulo,
                descricao=descricao,
                data=data,
                hora=hora
            )
            return redirect('lembretes')

    lembretes = Lembrete.objects.all()
    return render(request, 'lembretes.html', {'lembretes': lembretes})

