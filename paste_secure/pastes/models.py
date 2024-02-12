from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone
from dateutil.relativedelta import relativedelta


class Paste(models.Model):
    MARKDOWN = "Markdown"
    TEXT = "Text"
    CODE = "Code"

    DOC_CHOICES = [
        (MARKDOWN, "Markdown"),
        (TEXT, "Text"),
        (CODE, "Code"),
    ]

    created_at = models.DateTimeField(auto_now_add=True)
    expiry_duration = models.CharField(max_length=4)
    expiry_date = models.DateTimeField(editable=False, null=True, blank=True)
    document_format = models.CharField(max_length=10, choices=DOC_CHOICES)
    text = models.TextField()
    password = models.CharField(max_length=128, null=True, default=None)
    slug = models.CharField(max_length=15)

    def save(self, *args, **kwargs):
        if not self.expiry_date:
            duration = int(self.expiry_duration[:-1])
            unit = self.expiry_duration[-1]

            if unit == "d":
                self.expiry_date = timezone.now() + timezone.timedelta(days=duration)
            elif unit == "m":
                self.expiry_date = timezone.now() + relativedelta(months=duration)
            elif unit == "w":
                self.expiry_date = timezone.now() + timezone.timedelta(weeks=duration)

        super().save(*args, **kwargs)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return f"{self.document_format} {self.expiry_date}"
