from django.db import models

# Create your models here.
class Soldier(models.Model):
    did = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    rank = models.CharField(max_length=50)
    dob = models.DateField()
    face_embedding = models.TextField()
    voice_embedding = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
