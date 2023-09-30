from django.db import models
from apps.proveedores.models import *

class Producto(models.Model):
    nombre = models.CharField(max_length=255, blank=False, null=False)
    marca = models.CharField(max_length=255, blank=False, null=False)
    
    cantidad_total = models.IntegerField(max_length=20, default=0)
    precio_venta = models.DecimalField(max_length=20, max_digits=12, decimal_places=2, default=0.0)


    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

class DetalleProductoProveedores(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    precio_compra = models.DecimalField(max_length=20, max_digits=12, decimal_places=2, default=0.0)

    def __str__(self):
        return self.precio_compra