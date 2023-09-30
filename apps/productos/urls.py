from django.urls import path, re_path, include
from .views import *

urlpatterns = [
    path('',ListaProductos.as_view()),
    path('view/<producto>',ProductoView.as_view()),
    path('edit/<producto>',ProductoEdit.as_view()),
    path('delete/<producto>',DeleteProductoView.as_view()),
    path('buscar/<proveedor>',ListaProductosByProveedor.as_view()),
] 
