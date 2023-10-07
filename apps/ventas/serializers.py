from rest_framework import serializers
from .models import *
from apps.clientes.serializers import *
from apps.servicios.serializers import *
from apps.productos.serializers import *

class VentaSerializer(serializers.ModelSerializer):
    cliente=ClienteSerializer()
    class Meta:
        model = Venta
        fields='__all__'

class VentaProductoSerializer(serializers.ModelSerializer):
    producto=ListaProductosSerializer()
    venta=VentaSerializer()
    class Meta:
        model = detalleProducto
        fields = '__all__'

class VentaServicioSerializer(serializers.ModelSerializer):
    servicio=ServicioSerializer()
    venta=VentaSerializer()
    class Meta:
        model = DetalleServicio
        fields = '__all__'