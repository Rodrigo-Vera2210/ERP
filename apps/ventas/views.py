from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import *
from .serializers import *
from .pagination import *

class CrearVenta(APIView):
    permission_classes = (permissions.AllowAny,)
    def put(self, request, format=None):
        venta = Venta()
        # data = request.data
        # servicio.nombre = data['nombre']
        # servicio.precio = float(data['precio'])
        # categoria = Categoria.objects.get(id = int(data['categoria']))
        # servicio.categoria = categoria
        # servicio.save()
        return Response({'success':'Servicio creado con exito'}, status=status.HTTP_200_OK)

class EditarVenta(APIView):
    permission_classes = (permissions.AllowAny,)
    def put(self, request, venta, format=None):
        if Venta.objects.filter(id = venta).exists():
            data = request.data
            result = Venta.objects.get(id = venta)
            # if data['nombre'] != '':
            #     result.nombre = data['nombre']
            # if data['categoria'] != '':
            #     categoria = Categoria.objects.get(id = int(data['categoria'])) 
            #     result.nombre = categoria
            # if data['precio'] != '':
            #     result.precio = float(data['precio'])
            # result.save()
            return Response({'success':'Servicio editado con exito'}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'No existe el servicio'},status=status.HTTP_404_NOT_FOUND)

class EliminarVenta(APIView):
    permission_classes = (permissions.AllowAny,)
    def delete(self, request, venta, format=None):
        if Venta.objects.filter(id = venta).exists():
            result = Venta.objects.get(id = venta)
            result.delete()
            return Response({'success':'Venta editado con exito'}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'No existe el servicio'},status=status.HTTP_404_NOT_FOUND)

class ListaVenta(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self, request, format = None):
        if Venta.objects.all().exists():
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(Venta.objects.all(), request)
            serializer = VentaSerializer(results, many=True)
            return paginator.get_paginated_response({'ventas':serializer.data})
        else:
            return Response({'error':'No existen ventas'},status=status.HTTP_404_NOT_FOUND)

class VistaVenta(APIView):
    permission_classes = (permissions.AllowAny,)
    def put(self, request, venta, format=None):
        if Venta.objects.filter(id = venta).exists():
            result = Venta.objects.get(id = venta)
            serializer = VentaSerializer(result)
            return Response({'venta':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'No existe el venta'},status=status.HTTP_404_NOT_FOUND)

