from django.db import models

class Review(models.Model):
    concept = models.TextField()
    image = models.TextField()
    color = models.TextField()

    def __str__(self):
        """A string representation of the model."""
        return self.title

# Create your models here.
