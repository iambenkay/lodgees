# Generated by Django 2.0.5 on 2018-08-12 21:27

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('lodges', '0036_auto_20180812_2122'),
    ]

    operations = [
        migrations.RenameField(
            model_name='lodge',
            old_name='applicants',
            new_name='applicant',
        ),
    ]