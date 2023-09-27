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
    def put(self, request, format=None):
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