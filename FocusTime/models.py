# models.py
from django.db import models
from django.contrib.auth.models import User


class Materia(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nome_materia = models.CharField(max_length=100)
    horas = models.CharField(max_length=10)
    minutos = models.CharField(max_length=10)
    segundos = models.CharField(max_length=10)

    def __str__(self):
        return self.nome_materia
    
class Meta(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nome_metas = models.CharField(max_length=100)
    horas_meta = models.CharField(max_length=10)
    minutos_meta = models.CharField(max_length=10)
    segundos_meta = models.CharField(max_length=10)

    def __str__(self):
        return self.nome_metas