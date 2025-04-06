# models.py
from django.db import models

class Materia(models.Model):
    nome_materia = models.CharField(max_length=100)
    horas = models.CharField(max_length=10)
    minutos = models.CharField(max_length=10)
    segundos = models.CharField(max_length=10)

    def __str__(self):
        return self.nome_materia
    
class Meta(models.Model):
    nome_metas = models.CharField(max_length=100)
    horas_meta = models.CharField(max_length=10)
    minutos_meta = models.CharField(max_length=10)
    segundos_meta = models.CharField(max_length=10)

    def __str__(self):
        return self.nome_metas