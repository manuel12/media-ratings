# Generated by Django 4.0.5 on 2022-06-16 16:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('media_ratings', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='imdbscores',
            options={'verbose_name_plural': 'IMDb Scores'},
        ),
        migrations.AlterModelOptions(
            name='media',
            options={'verbose_name_plural': 'Medias'},
        ),
        migrations.AlterModelOptions(
            name='mediascore',
            options={'verbose_name_plural': 'Media Scores'},
        ),
        migrations.AlterModelOptions(
            name='rottentomatoesscores',
            options={'verbose_name_plural': 'Rottentomatoes Scores'},
        ),
        migrations.AlterModelOptions(
            name='tv_series',
            options={'verbose_name_plural': 'TV Series'},
        ),
        migrations.AlterField(
            model_name='imdbscores',
            name='imdb_score',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='rottentomatoesscores',
            name='audience_score',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='rottentomatoesscores',
            name='tomatometer_score',
            field=models.IntegerField(null=True),
        ),
    ]
