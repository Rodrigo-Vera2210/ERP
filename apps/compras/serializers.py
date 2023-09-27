from rest_framework import serializers
from .models import *

class ComprasSerializer(serializers.ModelSerializer):
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