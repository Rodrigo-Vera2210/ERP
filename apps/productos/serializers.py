from rest_framework import serializers
from .models import *
from apps.proveedores.serializers import *

class ListaProductosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Producto
        fields='__all__'


class DetProductoProveedorSerializer(serializers.ModelSerializer):
    proveedor = ListaProveedoresSerializer()
    class Meta:
        model = DetalleProductoProveedores
        fields = '__all__'