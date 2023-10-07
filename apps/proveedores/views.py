from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .pagination import *
from .serializers import *

class CreateProveedor(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        data = request.data
        proveedor = Proveedor()
        proveedor.nombre = data['nombre']
        proveedor.ruc = data['ruc']
        proveedor.direccion = data['direccion']
        proveedor.telefono = data['telefono']
        proveedor.email = data['email']
        proveedor.save()
        return Response({'success': 'Post edited'})

class ListaProveedores(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        if Proveedor.objects.all().exists():
            proveedores = Proveedor.objects.all()
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(proveedores, request)
            serializer = ListaProveedoresSerializer(results, many=True)
            return paginator.get_paginated_response({'proveedores':serializer.data})
        else:
            return Response({'error':'Proveedores no encontrados'}, status=status.HTTP_404_NOT_FOUND)

class ProveedorView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, proveedor, format=None):
        if Proveedor.objects.filter(id = proveedor).exists():
            result = Proveedor.objects.get(id = proveedor)
            serializer = ListaProveedoresSerializer(result)
            return Response({'proveedor':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Proveedor no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
class ProveedorEdit(APIView):
    permission_classes = (permissions.AllowAny,)
    def put(self, request, proveedor, format=None):
        if Proveedor.objects.filter(id = proveedor).exists():
            data = request.data
            result = Proveedor.objects.get(id = proveedor)
            if(data['nombre']!=''):
                result.nombre = data['nombre']
            if(data['ruc']!=''):
                result.ruc = data['ruc']
            if(data['direccion']!=''):
                result.direccion = data['direccion']
            if(data['telefono']!=''):
                result.telefono = data['telefono']
            if(data['email']!=''):
                result.email = data['email']
            result.save()
            return Response({'success':'Editado con exito'})
        else:
            return Response({'error':'Proveedor no encontrado'}, status=status.HTTP_404_NOT_FOUND)

class ProveedorDelete(APIView):
    permission_classes = (permissions.AllowAny,)
    def delete(self, request, proveedor, format=None):
        if Proveedor.objects.filter(id = proveedor).exists():
            result = Proveedor.objects.get(id = proveedor)
            result.delete()
            return Response({'success':'Eliminado con exito'})
        else:
            return Response({'error':'Proveedor no encontrado'}, status=status.HTTP_404_NOT_FOUND)
