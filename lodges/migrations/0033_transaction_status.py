# Generated by Django 2.0.5 on 2018-08-05 13:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lodges', '0032_auto_20180804_2320'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='status',
            field=models.BooleanField(default=False),
        ),
    ]
