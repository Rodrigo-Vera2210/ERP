from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from django.shortcuts import render
from .models import *
from .serializers import *

class UserView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None, **kwargs):
        if UserAccount.objects.filter(email=self.request.user).exists():
            usuario = UserAccount.objects.get(email=self.request.user)
            serializer = UserSerializer(usuario)
            return Response({'empleado':serializer.data})
        else:
            return Response({'error':'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

class UserEdit(APIView):
    permission_classes = (permissions.AllowAny,)
    def put(self, request, format=None):
        data = self.request.data
        usuario = UserAccount.objects.get(email=self.request.user)
        if(data['nombres'] != ''):
            usuario.nombres = data['nombres']
        if(data['apellidos'] != ''):
            usuario.apellidos = data['apellidos']
        if(data['cedula'] != ''):
            usuario.cedula = data['cedula']
        if(data['email'] != ''):
            usuario.email = data['email']
        usuario.save()
        return Response({'success': 'Post edited'})