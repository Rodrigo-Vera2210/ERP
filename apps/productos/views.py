from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .paginations import *
from .serializers import *
from apps.proveedores.serializers import *
from django.db.models.query_utils import Q

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
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(productos, request)
            serializer = ListaProductosSerializer(results, many=True)
            return paginator.get_paginated_response({'productos':serializer.data})
        else:
            return Response({'error':'Productos no encontrados'}, status=status.HTTP_404_NOT_FOUND) 

class ProductoView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, producto, format=None):
        if Producto.objects.filter(id=producto).exists():
            productoL = Producto.objects.get(id=producto)
            serializer = ListaProductosSerializer(productoL)
            print(productoL.id)
            detproveedores = DetalleProductoProveedores.objects.filter(producto_id = productoL.id)
            # print(detproveedores)
            serializersDet = DetProductoProveedorSerializer(detproveedores, many=True) 
            print(serializersDet.data)
            listaProveedores = []
            for detproveedor in detproveedores:
                listaProveedores.append(Proveedor.objects.get(id = detproveedor.proveedor_id))
            serializerProveedor = ListaProveedoresSerializer(listaProveedores,many=True)
            return Response({'producto':serializer.data,'proveedores':serializerProveedor.data,'detproveedores':serializersDet.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)

class ProductoEdit(APIView):
    permission_classes = (permissions.AllowAny,)
    def put(self, request, producto, format=None):
        data = self.request.data
        producto = Producto.objects.get(id=producto)
        if(data['nombre'] != ''):
            producto.nombre = data['nombre']
        if(data['marca'] != ''):
            producto.marca = data['marca']
        if(data['precio'] != ''):
            producto.precio_venta = float(data['precio'])
        producto.save()
        return Response({'success': 'Post edited'})

class DeleteProductoView(APIView):
    permission_classes = (permissions.AllowAny, )
    def delete(self, request, producto, format=None):
        producto = Producto.objects.get(id=producto)
        producto.delete()
        return Response({'success': 'Producto deleted'})

class SearchProductoView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request, format=None):
        search_term = request.query_params.get('s')
        matches = Producto.objects.filter(
            Q(nombre__icontains=search_term) |
            Q(marca__icontains=search_term) 
        )
        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(matches, request)

        serializer = ListaProductosSerializer(results, many=True)
        
        return paginator.get_paginated_response({'productos_filtrados': serializer.data})
    