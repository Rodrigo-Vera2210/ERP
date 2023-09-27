from rest_framework import serializers
from .models import *

class ListaProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields=[
            'id',
            'nombre',
            'marca',
            'cantidad_total',
            'precio_venta',
        ]