# Generated by Django 2.0.5 on 2018-09-15 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lodges', '0042_auto_20180915_0829'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='fullname',
            new_name='firstname',
        ),
        migrations.AddField(
            model_name='profile',
            name='lastname',
            field=models.CharField(default='', max_length=100),
        ),
    ]
