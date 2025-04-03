from django.shortcuts import render

# Create your views here.

def home (request):
    return render(request, "index.html")


def cadastro (request):
    return render (request ,"cadastro.html")
