from rest_framework import serializers
from .models import *

class ListaProveedoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields=[
            'id',
            'nombre',
            'ruc',
            'direccion',
            'telefono',
            'email',
        ]