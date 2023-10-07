from rest_framework import serializers
from .models import *
from apps.proveedores.serializers import *
from apps.productos.serializers import *

class ComprasSerializer(serializers.ModelSerializer):
    proveedor = ListaProveedoresSerializer()
    class Meta:
        model = Compra
        fields=[
            'id',
            'subtotal',
            'iva',
            'total',
            'proveedor',
            'fecha',
        ]

class DetallesComprasSerializer(serializers.ModelSerializer):
    producto = ListaProductosSerializer()
    compra = ComprasSerializer()
    class Meta:
        model= DetalleCompra
        fields='__all__'