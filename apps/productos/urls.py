from django.urls import path, re_path, include
from .views import *

urlpatterns = [
    path('',ListaProductos.as_view()),
    path('buscar/<proveedor>',ListaProductosByProveedor.as_view()),
] 
