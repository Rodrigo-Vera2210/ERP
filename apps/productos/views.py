from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .paginations import *
from .serializers import *

class ListaProductos(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        if Producto.objects.all().exists():
            productos = Producto.objects.all()
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(productos, request)
            serializer = ListaProductosSerializer(results, many=True)
            return paginator.get_paginated_response({'productos':serializer.data})
        else:
            return Response({'error':'Productos no encontrados'}, status=status.HTTP_404_NOT_FOUND) 
        
class ListaProductosByProveedor(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, proveedor,format=None):
        if DetalleProductoProveedores.objects.filter(proveedor_id=proveedor).exists():
            detproductos = DetalleProductoProveedores.objects.filter(proveedor_id=proveedor)
            productos = []
            for detprod in detproductos:
                producto = Producto.objects.get(id=detprod.producto_id)
                productos.append(producto)
            print(productos)
            serializer = ListaProductosSerializer(productos, many=True)
            print(serializer.data)
            return Response({'productos':serializer.data})
        else:
            return Response({'error':'Productos no encontrados'}, status=status.HTTP_404_NOT_FOUND) 
        