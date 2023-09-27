from django.utils import timezone
from django.db import models
from apps.productos.models import *

class Compra(models.Model):
    subtotal = models.DecimalField(max_length=20, max_digits=12, decimal_places=2, default=0.0)
    iva = models.DecimalField(max_length=20, max_digits=12, decimal_places=2, default=0.0)
    total = models.DecimalField(max_length=20, max_digits=12, decimal_places=2, default=0.0)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    fecha = models.DateField(default=timezone.now)
    
    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = 'Compra'
        verbose_name_plural = 'Compras'

class DetalleCompra(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    compra = models.ForeignKey(Compra, on_delete=models.CASCADE)
    cantidad = models.IntegerField(max_length=50, default=1)
    subtotal = models.DecimalField(max_length=20, max_digits=12, decimal_places=2, default=0.0)
    
    def __str__(self):
        return str(self.id)

