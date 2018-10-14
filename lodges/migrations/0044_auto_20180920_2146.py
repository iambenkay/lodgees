# Generated by Django 2.0.5 on 2018-09-20 21:46

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lodges', '0043_auto_20180915_1014'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lodge',
            name='applicants',
            field=models.ManyToManyField(blank=True, related_name='interests', to=settings.AUTH_USER_MODEL),
        ),
    ]
