from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PasteSerializer


class PasteCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PasteSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            return Response({"slug": instance.slug}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
