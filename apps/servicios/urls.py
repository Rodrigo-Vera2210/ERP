from django.urls import path, re_path, include
from .views import *

urlpatterns = [
    path('',ListaServicio.as_view()),
    path('crear/',CrearServicio.as_view()),
    path('editar/<servicio>',EditarServicio.as_view()),
    path('eliminar/<servicio>',EliminarServicio.as_view()),
    path('vista/<servicio>',VistaServicio.as_view()),
    path('categorias/',ListaCategorias.as_view()),
    path('categorias/crear/',CrearCategoria.as_view()),
    path('categorias/eliminar/<categoria>',EliminarCategoria.as_view()),
] 
