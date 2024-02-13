from rest_framework import serializers
from .models import Paste
import string
import random


class PasteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paste
        fields = [
            "expiry_duration",
            "document_format",
            "text",
            "password",
            "slug",
        ]
        extra_kwargs = {"slug": {"read_only": True}}

    def generate_random_slug(self, length=8):
        characters = string.ascii_letters + string.digits
        return "".join(random.choice(characters) for _ in range(length))

    def create(self, validated_data):
        expiry_duration = validated_data.pop("expiry_duration")
        document_format = validated_data.pop("document_format")
        text = validated_data.pop("text", "")
        password = validated_data.pop("password", None)

        slug = self.generate_random_slug()
        while Paste.objects.filter(slug=slug).exists():
            slug = self.generate_random_slug()

        paste_instance = Paste(**validated_data)
        paste_instance.expiry_duration = expiry_duration
        paste_instance.document_format = document_format
        paste_instance.text = text
        if password != None:
            paste_instance.set_password(password)
        paste_instance.slug = slug
        paste_instance.save()

        return paste_instance


class DisplayPasteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paste
        fields = ["document_format", "text", "password"]
