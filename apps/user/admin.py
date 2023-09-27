from django.contrib import admin
from . import models

@admin.register(models.UserAccount)
class UserAdmin(admin.ModelAdmin):
    list_display = ('nombres','apellidos','cedula','email','is_staff','rol',)
    search_fields = ('nombres','apellidos','cedula','email','is_staff','rol',)