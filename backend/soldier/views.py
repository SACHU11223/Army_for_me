from ai_models.face_embedding import generate_face_embedding
from ai_models.voice_embedding import generate_voice_embedding

from rest_framework.views import APIView
from django.shortcuts import render

# Create your views here.
class RegisterSoldierView(APIView):
    def post(self, request):
        serializer = SoldierSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data})
        return Response(serializer.errors, status=400)

class QuerySoldierView(APIView):
    def get(self, request, did):
        try:
            soldier = Soldier.objects.get(did=did)
            serializer = SoldierSerializer(soldier)
            return Response(serializer.data)
        except Soldier.DoesNotExist:
            return Response({"error": "Not Found"}, status=404)
