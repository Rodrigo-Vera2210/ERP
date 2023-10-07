import json
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import *
from .serializers import *
from .pagination import *

class CrearVenta(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        venta = Venta()
        data = request.data
        venta.cliente = Cliente.objects.get(id=int(data['cliente']))
        venta.subtotal = float(data['subtotal'])
        venta.iva = float(data['iva'])
        venta.total = float(data['total'])
        venta.save()
        for producto in json.loads(data['productos']):
            detProd = detalleProducto()
            detProd.producto = Producto.objects.get(id = producto['id'])
            detProd.cantidad = producto["cantidad"]
            detProd.precio = float(producto['precio'])
            detProd.subtotal = producto['subtotal']
            detProd.venta = venta
            detProd.save()
        for servicio in json.loads(data['servicios']):
            detSer = DetalleServicio()
            detSer.servicio = Servicio.objects.get(id = servicio['id'])
            detSer.cantidad = servicio["cantidad"]
            detSer.precio = float(servicio['precio'])
            detSer.subtotal = servicio['subtotal']
            detSer.venta = venta
            detSer.save()
        return Response({'success':'Servicio creado con exito'}, status=status.HTTP_200_OK)

class EditarVenta(APIView):
    permission_classes = (permissions.AllowAny,)
    def put(self, request, venta, format=None):
        if Venta.objects.filter(id = venta).exists():
            data = request.data
            print(data)
            if(data['aprobar']=='false'):
                venta = Venta.objects.get(id = venta)
                venta.subtotal = float(data['subtotal'])
                venta.iva = float(data['iva'])
                venta.total = float(data['total'])
                venta.save()
                detalleP = detalleProducto.objects.filter(venta_id = venta)
                detalleS = DetalleServicio.objects.filter(venta_id = venta)
                for detalle in detalleP:
                    detalle.delete()
                for detalle in detalleS:
                    detalle.delete()
                for producto in json.loads(data['productos']):
                    detProd = detalleProducto()
                    detProd.producto = Producto.objects.get(id = producto['id'])
                    detProd.cantidad = producto["cantidad"]
                    detProd.precio = float(producto['precio'])
                    detProd.subtotal = producto['subtotal']
                    detProd.venta = venta
                    detProd.save()
                for servicio in json.loads(data['servicios']):
                    detSer = DetalleServicio()
                    detSer.servicio = Servicio.objects.get(id = servicio['id'])
                    detSer.cantidad = servicio["cantidad"]
                    detSer.precio = float(servicio['precio'])
                    detSer.subtotal = servicio['subtotal']
                    detSer.venta = venta
                    detSer.save()
            elif(data['aprobar']=='true'):
                venta = Venta.objects.get(id = venta)
                venta.aprobacion = True
                venta.save()
                for producto in json.loads(data['productos']):
                    Prod = Producto.objects.get(id=producto['id'])
                    Prod.producto = Producto.objects.get(id = producto['id'])
                    Prod.cantidad_total -= int(producto["cantidad"])
                    Prod.save()
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
    def get(self, request, venta, format=None):
        if Venta.objects.filter(id = venta).exists():
            result = Venta.objects.get(id = venta)
            detallesP = detalleProducto.objects.filter(venta_id = result.id)
            detallesS = DetalleServicio.objects.filter(venta_id = result.id)
            serializer = VentaSerializer(result)
            serializerP = VentaProductoSerializer(detallesP, many=True) 
            serializerS = VentaServicioSerializer(detallesS, many=True)
            return Response({'venta':serializer.data, 'detalleP':serializerP.data, 'detalleS':serializerS.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'No existe el venta'},status=status.HTTP_404_NOT_FOUND)

