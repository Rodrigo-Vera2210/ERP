from django.urls import path, re_path, include
from .views import *

urlpatterns = [
    path('',ListaClientes.as_view()),
    path('crear/',CrearCliente.as_view()),
    path('buscar/',SearchClienteView.as_view()),
    path('vista/<cliente>',VistaCliente.as_view()),
    path('editar/<cliente>',EditarCliente.as_view()),
    path('eliminar/<cliente>',EliminarCliente.as_view()),
] 
