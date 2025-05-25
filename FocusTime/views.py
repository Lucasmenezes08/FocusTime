from django.shortcuts import render, redirect, get_object_or_404
from .models import Materia, Meta, Lembrete, CorMateria 
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.db.models import Count
from django.http import JsonResponse 
import json 

@login_required(login_url='login')
def index(request):
    materias_qs = Materia.objects.filter(user=request.user)
    materias_list = []
    for materia_obj in materias_qs:
        try:
            cor_materia_obj = CorMateria.objects.get(materia=materia_obj)
            materia_obj.cor = cor_materia_obj.cor
        except CorMateria.DoesNotExist:
           
            materia_obj.cor = '#9A9A9A' 
        materias_list.append(materia_obj)

 
    return render(request, "index.html", {"materias": materias_list})


@login_required(login_url='login')
def editar_materia(request, materia_id):
    materia = get_object_or_404(Materia, id=materia_id, user=request.user)
    
    if request.method == 'POST':
        materia.nome_materia = request.POST.get('nome-materia')
        materia.horas = request.POST.get('horas')
        materia.minutos = request.POST.get('minutos')
        materia.segundos = request.POST.get('segundos')
        materia.save()
        return redirect('index')
    
    return render(request, 'editar_materia.html', {'materia': materia})


@login_required(login_url='login')
def apagar_materia(request, materia_id):
    materia = get_object_or_404(Materia, id=materia_id, user=request.user)
    if request.method == 'POST':
        materia.delete()
        return redirect('index')
    return render(request, 'confirmar_delete.html', {'materia': materia})




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

    lembretes = Lembrete.objects.filter(user=request.user).order_by('data_lembrete')
    datas = [{'nome': lembrete.titulo, 'data': lembrete.data_lembrete} for lembrete in lembretes]

    return render(request, "dia_d.html", {"datas": datas, "lembretes": lembretes})


@login_required(login_url='login')
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
                data_lembrete=data,
                hora_lembrete=hora,
                user=request.user
            )
            return redirect('lembretes')

    lembretes = Lembrete.objects.filter(user=request.user).order_by('data_lembrete', 'hora_lembrete')
    return render(request, 'lembretes.html', {'lembretes': lembretes})



@login_required
def alterar_cor(request, materia_id):
    if request.method == 'POST':
        try:
            nova_cor = request.POST.get('cor')
            if not nova_cor:
                return JsonResponse({'status': 'erro', 'mensagem': 'Cor não fornecida.'}, status=400)

            materia_obj = get_object_or_404(Materia, id=materia_id, user=request.user)
            
            cor_materia_inst, created = CorMateria.objects.get_or_create(materia=materia_obj)
            cor_materia_inst.cor = nova_cor
            cor_materia_inst.save()
            
            return JsonResponse({'status': 'ok', 'nova_cor': nova_cor})
        except Materia.DoesNotExist:
            return JsonResponse({'status': 'erro', 'mensagem': 'Matéria não encontrada.'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'erro', 'mensagem': str(e)}, status=500)
            
    return JsonResponse({'status': 'erro', 'mensagem': 'Método não permitido.'}, status=405)
