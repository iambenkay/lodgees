# Generated by Django 2.0.5 on 2018-07-22 23:56

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('lodges', '0010_auto_20180722_2355'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transactions',
            name='time',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
