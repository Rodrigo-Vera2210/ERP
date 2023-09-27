from django.urls import path, re_path, include
from .views import *

urlpatterns = [
    path('',ListaCompras.as_view()),
    path('crear/',CreateCompra.as_view()),
] 
