from django.db import models
from django.contrib.auth.models import User


class Materia(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nome_materia = models.CharField(max_length=100)
    horas = models.CharField(max_length=10)
    minutos = models.CharField(max_length=10)
    segundos = models.CharField(max_length=10)

    def _str_(self):
        return self.nome_materia

class Meta(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nome_metas = models.CharField(max_length=100)
    horas_meta = models.CharField(max_length=10)
    minutos_meta = models.CharField(max_length=10)
    segundos_meta = models.CharField(max_length=10)

    def _str_(self):
        return self.nome_metas
    
# class DataD (models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     nome = models.CharField(max_length=100)
#     data = models.DateField()

#     def _str_(self):
#         return f"{self.nome} - {self.data}"
   

class Lembrete(models.Model):
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    data_lembrete = models.DateField()
    hora_lembrete = models.TimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.titulo} - {self.data_lembrete} {self.hora_lembrete}"
    
class CorMateria(models.Model):
    materia = models.OneToOneField(Materia, on_delete=models.CASCADE, primary_key=True)
    cor = models.CharField(max_length=7, default="#9A9A9A") 

    def __str__(self):
        return f"{self.materia.nome_materia} - {self.cor}"
