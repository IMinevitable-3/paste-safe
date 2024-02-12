# Generated by Django 5.0.2 on 2024-02-12 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Paste',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('expiry_duration', models.CharField(max_length=4)),
                ('expiry_date', models.DateTimeField(blank=True, editable=False, null=True)),
                ('document_format', models.CharField(choices=[('Markdown', 'Markdown'), ('Text', 'Text'), ('Code', 'Code')], max_length=10)),
                ('text', models.TextField()),
                ('hashed_password', models.CharField(max_length=128)),
                ('slug', models.CharField(max_length=15)),
            ],
        ),
    ]
