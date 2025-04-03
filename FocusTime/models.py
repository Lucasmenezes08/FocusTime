from django.db import models

class Materia(models.Model):
    nome = models.CharField(max_length=25)

class Meta(models.Model):
    materia = models.ForeignKey(Materia, on_delete=models.CASCADE, related_name="metas")
    horas = models.PositiveIntegerField(default=0)
    minutos = models.PositiveIntegerField(default=0)
    segundos = models.PositiveIntegerField(default=0)
    def __str__(self):
        return self.materia
