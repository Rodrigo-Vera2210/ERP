from django.urls import path, re_path, include
from .views import *

urlpatterns = [
    path('',ListaProveedores.as_view()),
    path('crear/',CreateProveedor.as_view()),
    path('buscar/',SearchProveedorView.as_view()),
    path('view/<proveedor>',ProveedorView.as_view()),
    path('editar/<proveedor>',ProveedorEdit.as_view()),
    path('eliminar/<proveedor>',ProveedorDelete.as_view()),
] 
