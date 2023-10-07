from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import *
from .serializers import *
from .pagination import *

class ListaClientes(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self,request,format=None):
        if Cliente.objects.all().exists():
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(Cliente.objects.all(),request)
            serializer = ClienteSerializer(results,many=True)
            return paginator.get_paginated_response({'clientes':serializer.data})
        else:
            
            return Response({'error':'No existen clientes'},status=status.HTTP_404_NOT_FOUND)

class CrearCliente(APIView):
    permission_classes=(permissions.AllowAny,)
    def post(self,request,format=None):
        data = request.data
        cliente = Cliente()
        cliente.nombres = data['nombres']
        cliente.c_id = data['cedula']
        cliente.email = data['email']
        cliente.direccion = data['direccion']
        cliente.telefono = data['telefono']
        cliente.save()
        return Response({'success':'Cliente creado con exito'},status=status.HTTP_200_OK)
    
class EditarCliente(APIView):
    permission_classes=(permissions.AllowAny,)
    def put(self, request, cliente, format=None):
        data = request.data
        if not Cliente.objects.filter(id = cliente).exists():
            return Response({'error':'No existe cliente'},status=status.HTTP_404_NOT_FOUND)
        result = Cliente.objects.get(id = cliente)
        if(data['nombres']!=''):
            result.nombres = data['nombres']
        if(data['cedula']!=''):
            result.c_id = data['cedula']
        if(data['email']!=''):
            result.email = data['email']
        if(data['direccion']!=''):
            result.direccion = data['direccion']
        if(data['telefono']!=''):
            result.telefono = data['telefono']
        result.save()
        return Response({'success':'Cliente editado con exito'},status=status.HTTP_200_OK)
            
class VistaCliente(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self, request, cliente, format=None):
        if Cliente.objects.filter(id = cliente).exists():
            result = Cliente.objects.get(id = cliente)
            serializer = ClienteSerializer(result)
            return Response({'cliente':serializer.data},status=status.HTTP_200_OK)
        else:
            return Response({'error':'No existe cliente'},status=status.HTTP_404_NOT_FOUND)

class EliminarCliente(APIView):
    permission_classes=(permissions.AllowAny,)
    def delete(self, request, cliente, format=None):
        if Cliente.objects.filter(id = cliente).exists():
            result = Cliente.objects.get(id = cliente)
            result.delete()
            return Response({'success':'Cliente eliminado con exito'},status=status.HTTP_200_OK)
        else:
            return Response({'error':'No existe cliente'},status=status.HTTP_404_NOT_FOUND)

        