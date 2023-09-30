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
            productos = Producto.objects.all()
            aux = 0
            cantidad = 0
            for oldProduct in productos:
                if producto['id'] == oldProduct.id:
                    prod = Producto.objects.get(id = producto['id'])
                    aux += 1
                    cantidad = oldProduct.cantidad_total
            if aux == 0:
                prod = Producto()
                prod.nombre = producto['nombre']
                prod.marca = producto['marca']
            prod.cantidad_total = cantidad + int(producto['cantidad'])
            print(prod.id)
            prod.save()
            detCompra = DetalleCompra()
            detCompra.producto = prod
            detCompra.compra = compra
            detCompra.cantidad = int(producto['cantidad'])
            detCompra.subtotal = float(producto['subtotal'])
            detCompra.save()
            if aux == 0:
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
        
class CompraView(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self, request, compra, format=None):
        if (Compra.objects.filter(id=compra).exists()):
            result = Compra.objects.get(id=compra)
            serializer = ComprasSerializer(result)
            return Response({'compra':serializer.data},status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Compra no encontrada'}, status=status.HTTP_404_NOT_FOUND)

class EditCompra(APIView):
    permission_classes=(permissions.AllowAny,)
    def put(self, request, compra, format=None):
        if (Compra.objects.filter(id=compra).exists()):
            result = Compra.objects.get(id=compra)
            data = request.data
            return Response({'success':'Compra editada con exito'},status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Compra no encontrada'}, status=status.HTTP_404_NOT_FOUND)

class DeleteCompra(APIView):
    def delete(self, request, compra, format=None):
        if (Compra.objects.filter(id=compra).exists()):
            result = Compra.objects.get(id=compra)
            result.delete
            return Response({'success':'Compra eliminada con exito'},status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Compra no encontrada'}, status=status.HTTP_404_NOT_FOUND)
