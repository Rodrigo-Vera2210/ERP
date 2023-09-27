from django.db import models

class Proveedor(models.Model):
    nombre = models.CharField(max_length=255, blank=False, null=False)
    ruc = models.CharField(max_length=255, blank=False, null=False)
    direccion = models.CharField(max_length=255, blank=False, null=False)
    telefono = models.CharField(max_length=255, blank=False, null=False)
    email = models.CharField(max_length=255, blank=False, null=False)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Proveedor'
        verbose_name_plural = 'Proveedores'
