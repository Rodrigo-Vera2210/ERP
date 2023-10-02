from django.db import models
from django.utils import timezone
from apps.productos.models import *
from apps.servicios.models import *
from apps.clientes.models import *

class Venta(models.Model):
    fecha = models.DateField(default=timezone.now)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    aprobacion = models.BooleanField(default=False)
    subtotal = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    iva = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    total = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    
    def __str__(self):
        return str(self.pk)
    
    class Meta:
        verbose_name = 'Venta'
        verbose_name_plural = 'Ventas'
        ordering = ['id']
    
class detalleProducto(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1, blank=False, null=False)
    subtotal = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    precio = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, default=9999)
    
    def __str__(self):
        return self.producto
    
    class Meta:
        verbose_name = 'Detalle de Producto'
        verbose_name_plural = 'Detalle de Productos'
        ordering = ['id']

class DetalleServicio(models.Model):
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1, blank=False, null=False)
    subtotal = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    precio = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, default=9999 )

    def __str__(self):
        return self.servicio

    class Meta:
        verbose_name = 'Detalle de servicio'
        verbose_name_plural = 'Detalle de servicios'
        ordering = ['id']
