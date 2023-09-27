import json
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .paginations import *
from .serializers import *

class CreateCompra(APIView):
    permission_classes = (permissions.AllowAny,)
    def put(self, request, format=None):
        data = request.data
        print(data)
        compra = Compra()
        proveedor = Proveedor.objects.get(id=int(data['proveedor']))
        compra.proveedor = proveedor
        compra.subtotal = float(data['subtotal'])
        compra.iva = float(data['iva'])
        compra.total = float(data['total'])
        compra.save()
        for producto in json.loads(data['productos']):
            prod = Producto()
            prod.nombre = producto['nombre']
            prod.marca = producto['marca']
            prod.cantidad_total = int(producto['cantidad'])
            prod.save()
            detCompra = DetalleCompra()
            detCompra.producto = prod
            detCompra.compra = compra
            detCompra.cantidad = int(producto['cantidad'])
            detCompra.subtotal = float(producto['subtotal'])
            detCompra.save()
            detProdProv = DetalleProductoProveedores()
            detProdProv.producto = prod
            detProdProv.proveedor = proveedor
            detProdProv.precio_compra = float(producto['precio'])
            detProdProv.save()
        return Response({'success': 'Post edited'})

class ListaCompras(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        if Compra.objects.all().exists():
            compras = Compra.objects.all()
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(compras, request)
            serializer = ComprasSerializer(results, many=True)
            return paginator.get_paginated_response({'compras':serializer.data})
        else:
            return Response({'error':'Compras no encontrados'}, status=status.HTTP_404_NOT_FOUND) 
        