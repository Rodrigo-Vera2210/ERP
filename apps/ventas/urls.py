from django.urls import path, re_path, include
from .views import *

urlpatterns = [
    path('',ListaVenta.as_view()),
    path('crear/',CrearVenta.as_view()),
    path('buscar/',SearchVentaView.as_view()),
    path('editar/<venta>',EditarVenta.as_view()),
    path('eliminar/<venta>',EliminarVenta.as_view()),
    path('vista/<venta>',VistaVenta.as_view()),
] 
