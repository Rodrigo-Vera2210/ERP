from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=50, null=False, blank=False)
    parent = models.ForeignKey('self', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    
    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
        ordering = ['id']

class Servicio(models.Model):
    nombre = models.CharField(max_length=50, null=False, blank=False)
    precio = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = 'Servicio'
        verbose_name_plural = 'Servicios'
        ordering = ['id']
