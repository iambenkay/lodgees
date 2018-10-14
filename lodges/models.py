from django.db import models
from django.contrib.auth.models import User
import django

# Create your models here.


class Zone(models.Model):
    name = models.CharField(max_length=60)
    code = models.CharField(max_length=10)
    count = models.IntegerField(default=0)
    base_price = models.IntegerField(default=0, null=True)

    def __str__(self):
        return f"{self.name}({self.code})"


class Lodge(models.Model):
    name = models.CharField(max_length=60)
    address = models.CharField(max_length=255, default='#')
    price = models.IntegerField(default=60000)
    zone = models.ForeignKey(Zone, on_delete=models.CASCADE, related_name="lodges")
    rating = models.IntegerField(default=1)
    short_description = models.CharField(max_length=20, default="")
    description = models.CharField(max_length=150, default="")
    applicants = models.ManyToManyField(User, related_name="interests", blank=True)

    def __str__(self):
        return f"{self.name} Lodge in {self.zone}"


class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="transactions")
    lodge = models.ForeignKey(Lodge, on_delete=models.CASCADE)
    time = models.DateField(default=django.utils.timezone.now)
    status = models.BooleanField(default=False)

    def __str__(self):
        return f"#{self.id} - for {self.lodge} on {self.time} by {self.user}.(completed transaction - {self.status})"


class Testimony(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="testimony")
    testimony = models.CharField(max_length=800)

    def __str__(self):
        return f"{self.user} wrote a testimony."


class Profile(models.Model):
    phone = models.CharField(max_length=20)
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    firstname = models.CharField(max_length=100, default="")
    lastname = models.CharField(max_length=100, default="")
    email = models.CharField(max_length=70, unique=True, default="example@gmail.com")
    gender = models.CharField(max_length=15, default="Rather not say")

    def __str__(self):
        return f"{self.firstname} {self.lastname}"
