# Generated by Django 2.0.5 on 2018-08-16 11:27

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('lodges', '0039_auto_20180816_1126'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lodge',
            name='applicants',
            field=models.ManyToManyField(related_name='interests', to=settings.AUTH_USER_MODEL),
        ),
    ]