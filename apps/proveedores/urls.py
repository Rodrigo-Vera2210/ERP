from django.urls import path, re_path, include
from .views import *

urlpatterns = [
    path('',ListaProveedores.as_view()),
    path('crear/',CreateProveedor.as_view()),
] 
