from django.urls import path, re_path, include
from .views import *

urlpatterns = [
    path('',ListaCompras.as_view()),
    path('crear/',CreateCompra.as_view()),
    path('view/<compra>',CompraView.as_view()),
    path('edit/<compra>',EditCompra.as_view()),
    path('delete/<compra>',DeleteCompra.as_view()),
] 
