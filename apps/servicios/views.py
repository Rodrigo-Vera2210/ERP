from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import *
from .serializers import *
from .pagination import *
from django.db.models.query_utils import Q

class ListaCategorias(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        if Categoria.objects.all().exists():
            categories = Categoria.objects.all()
            result = []
            for category in categories:
                if not category.parent:
                    item = {}
                    item['id']=category.id
                    item['nombre']=category.nombre
                
                    item['sub_categories'] = []
                    for sub_category in categories:
                        sub_item = {}
                        if sub_category.parent and sub_category.parent.id == category.id:
                            sub_item['id']=sub_category.id
                            sub_item['nombre']=sub_category.nombre
                            item['sub_categories'].append(sub_item)
                    result.append(item)
            return Response({'categories': result}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No categories found'}, status=status.HTTP_404_NOT_FOUND)

class CrearCategoria(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        categoria = Categoria()
        data = request.data
        categoria.nombre = data['nombre']
        if data['padre'] != '':
            padre = Categoria.objects.get(id = data['padre'])
            categoria.parent = padre
        categoria.save()
        return Response({'success':'Categoria creada con exito'})
    
class EliminarCategoria(APIView):
    permission_classes = (permissions.AllowAny,)
    def delete(self, request, categoria, format=None):
        if Categoria.objects.filter(id = categoria).exists():
            result = Categoria.objects.get(id = categoria)
            result.delete()
            return Response({'success':'Categoria eliminada con exito'})
        else:
            return Response({'error':'No existe categoria'}, status=status.HTTP_404_NOT_FOUND)

class CrearServicio(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        servicio = Servicio()
        data = request.data
        servicio.nombre = data['nombre']
        servicio.precio = float(data['precio'])
        categoria = Categoria.objects.get(id = int(data['categoria']))
        servicio.categoria = categoria
        servicio.save()
        return Response({'success':'Servicio creado con exito'}, status=status.HTTP_200_OK)

class EditarServicio(APIView):
    permission_classes = (permissions.AllowAny,)
    def put(self, request, servicio, format=None):
        if Servicio.objects.filter(id = servicio).exists():
            data = request.data
            print(request.data)
            result = Servicio.objects.get(id = servicio)
            if data['nombre'] != '':
                result.nombre = data['nombre']
            if data['categoria'] != '':
                categoria = Categoria.objects.get(id = int(data['categoria'])) 
                result.categoria = categoria
            if data['precio'] != '':
                result.precio = float(data['precio'])
            result.save()
            return Response({'success':'Servicio editado con exito'}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'No existe el servicio'},status=status.HTTP_404_NOT_FOUND)

class EliminarServicio(APIView):
    permission_classes = (permissions.AllowAny,)
    def delete(self, request, servicio, format=None):
        if Servicio.objects.filter(id = servicio).exists():
            result = Servicio.objects.get(id = servicio)
            result.delete()
            return Response({'success':'Servicio editado con exito'}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'No existe el servicio'},status=status.HTTP_404_NOT_FOUND)

class ListaServicio(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self, request, format = None):
        if Servicio.objects.all().exists():
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(Servicio.objects.all(), request)
            serializer = ServicioSerializer(results, many=True)
            return paginator.get_paginated_response({'servicios':serializer.data})
        else:
            return Response({'error':'No existen servicios'},status=status.HTTP_404_NOT_FOUND)

class VistaServicio(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, servicio, format=None):
        if Servicio.objects.filter(id = servicio).exists():
            result = Servicio.objects.get(id = servicio)
            serializer = ServicioSerializer(result)
            return Response({'servicio':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'No existe el servicio'},status=status.HTTP_404_NOT_FOUND)

class SearchServicioView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request, format=None):
        search_term = request.query_params.get('s')
        search_term_category = request.query_params.get('c')
        if(search_term!=None):
            matches = Servicio.objects.filter(
                Q(nombre__icontains=search_term)
            )
        if(search_term_category!=None):
            matches = Servicio.objects.filter(categoria_id = int(search_term_category))
        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(matches, request)

        serializer = ServicioSerializer(results, many=True)
        
        return paginator.get_paginated_response({'servicios_filtrados': serializer.data})
    