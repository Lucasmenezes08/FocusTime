# models.py
from django.db import models

class Materia(models.Model):
    nome_materia = models.CharField(max_length=100)
    horas_meta = models.IntegerField()
    minutos_meta = models.IntegerField()
    segundos_meta = models.IntegerField()
    horas = models.IntegerField()
    minutos = models.IntegerField()
    segundos = models.IntegerField()

    def __str__(self):
        return self.nome_materia
