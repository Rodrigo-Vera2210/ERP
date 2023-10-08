import json
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Compra
from .paginations import *
from .serializers import *
from django.db.models.query_utils import Q

class CreateCompra(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        data = request.data
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
            detalles = DetalleCompra.objects.filter(compra_id = result.id)
            serializer = ComprasSerializer(result)
            serializerDetalle = DetallesComprasSerializer(detalles, many=True)
            return Response({'compra':serializer.data, 'detalles':serializerDetalle.data},status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Compra no encontrada'}, status=status.HTTP_404_NOT_FOUND)

class EditCompra(APIView):
    permission_classes=(permissions.AllowAny,)
    def put(self, request, compra, format=None):
        if (Compra.objects.filter(id=compra).exists()):
            compra = Compra.objects.get(id=compra)
            data = request.data
            proveedor = Proveedor.objects.get(id=int(data['proveedor']))
            compra.subtotal = float(data['subtotal'])
            compra.iva = float(data['iva'])
            compra.total = float(data['total'])
            compra.save()
            productos = Producto.objects.all()
            detallesCompra = DetalleCompra.objects.filter(compra_id = compra.id)
            for detalle in detallesCompra:
                detalleProducto = DetalleProductoProveedores.objects.filter(proveedor_id = proveedor.id).filter(producto_id = detalle.producto_id)
                for detalleP in detalleProducto:
                    detalleP.delete()
                detalle.delete()
            for producto in json.loads(data['productos']):
                aux = 0
                for oldProduct in productos:
                    if producto['id'] == oldProduct.id:
                        prod = Producto.objects.get(id = producto['id'])
                        aux += 1
                        break
                if aux == 0:
                    prod = Producto()
                    prod.nombre = producto['nombre']
                    prod.marca = producto['marca']
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
            for oldProduct in productos:
                detCompra = DetalleCompra.objects.filter(producto_id=oldProduct.id)
                cantidad = 0
                for detalle in detCompra:
                    cantidad = cantidad + int(detalle.cantidad)
                oldProduct.cantidad_total = cantidad
                oldProduct.save()
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

class SearchCompraView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request, format=None):
        search_term = request.query_params.get('s')
        proveedors = Proveedor.objects.filter(
            Q(nombre__icontains=search_term) 
        )
        print(proveedors)
        result = []
        for provee in proveedors:
            matches= Compra.objects.filter(proveedor = provee)
            for match in matches:
                result.append(match)
        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(result, request)
        serializer = ComprasSerializer(results, many=True)
        print(serializer.data)
        return paginator.get_paginated_response({'compras_filtradas': serializer.data})
    