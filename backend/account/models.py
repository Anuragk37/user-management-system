from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class MyUser(AbstractUser):
    profile_pic = models.ImageField(upload_to='profiles', blank=True, null=True)

    class Meta:
        ordering = ['id']

class Connectivity(models.Model):
    following = models.ForeignKey(MyUser,on_delete=models.CASCADE,related_name='following')
    follower= models.ForeignKey(MyUser,on_delete=models.CASCADE,related_name='followers')

class TeamUp(models.Model):
    title = models.CharField(max_length=100)
    discription = models.TextField()
    skills = models.TextField()

class TeamJoin(models.Model):
    team = models.ForeignKey(TeamUp,on_delete=models.CASCADE,related_name="teamjoin")
    creator=models.ForeignKey(MyUser,on_delete=models.CASCADE,related_name="creator")
    user = models.ForeignKey(MyUser,on_delete=models.CASCADE,related_name="members")
    is_intrested=models.BooleanField(default=False)