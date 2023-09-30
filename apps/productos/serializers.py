from rest_framework import serializers
from .models import *

class ListaProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields='__all__'


class DetProductoProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleProductoProveedores
        fields = '__all__'