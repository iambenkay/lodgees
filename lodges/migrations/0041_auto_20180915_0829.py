# Generated by Django 2.0.5 on 2018-09-15 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lodges', '0040_auto_20180816_1127'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='status',
            field=models.BooleanField(default=True),
        ),
    ]