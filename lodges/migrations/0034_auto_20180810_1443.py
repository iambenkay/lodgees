# Generated by Django 2.0.5 on 2018-08-10 14:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lodges', '0033_transaction_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lodge',
            name='potential_residents',
        ),
        migrations.AddField(
            model_name='lodge',
            name='potential_residents',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='interests',
                                    to=settings.AUTH_USER_MODEL),
        ),
    ]
