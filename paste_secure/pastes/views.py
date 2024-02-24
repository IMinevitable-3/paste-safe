from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    PasteSerializer,
    DisplayPasteSerializer,
    CheckPasswordSerializer,
    PasswordSerializer,
)
from .models import Paste


class PasteCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PasteSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            return Response({"slug": instance.slug}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        try:
            paste_instance = Paste.objects.get(slug=request.GET.get("slug"))
        except Paste.DoesNotExist:
            return Response(
                {"detail": "Paste not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = DisplayPasteSerializer(paste_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CheckPasswordView(APIView):
    def post(self, request, *args, **kwargs):

        try:
            serializer = PasswordSerializer(data=request.data)
            paste_instance = None
            paste_instance = Paste.objects.get(slug=request.GET.get("slug"))
        except Paste.DoesNotExist:
            return Response(
                {"detail": "Paste not found"}, status=status.HTTP_404_NOT_FOUND
            )
        if serializer.is_valid():
            is_authentication = serializer.validated_data["password"]
            if (
                paste_instance.check_password(is_authentication)
                or is_authentication == None
            ):
                serializer = DisplayPasteSerializer(paste_instance)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"detail": "Incorrect Password"}, status=status.HTTP_403_FORBIDDEN
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        try:
            paste_instance = Paste.objects.get(slug=request.GET.get("slug"))
        except Paste.DoesNotExist:
            return Response(
                {"detail": "Paste not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = CheckPasswordSerializer(paste_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
