# Generated by Django 2.0.5 on 2018-07-24 06:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lodges', '0015_profile_email'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='full_name',
            new_name='fullname',
        ),
    ]