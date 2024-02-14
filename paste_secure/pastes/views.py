from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PasteSerializer, DisplayPasteSerializer
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
