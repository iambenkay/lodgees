# Generated by Django 2.0.5 on 2018-07-22 23:54

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lodges', '0008_transactions'),
    ]

    operations = [
        migrations.AddField(
            model_name='transactions',
            name='time',
            field=models.DateField(default=datetime.datetime(2018, 7, 22, 23, 54, 43, 230914)),
        ),
    ]
