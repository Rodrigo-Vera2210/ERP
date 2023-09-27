from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.rol = "administrador"
        user.save()

class UserAccount(AbstractBaseUser, PermissionsMixin):
    options = (
        ('administrador','Administrador'),
        ('tecnico','Tecnico'),
    )
    email = models.EmailField(max_length=255, unique=True)
    cedula = models.CharField(max_length=10, unique=True)
    nombres = models.CharField(max_length=255)
    apellidos = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    rol = models.CharField(max_length=25, choices=options, default='tecnico')
    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombres','apellidos','cedula']

    def __str__(self):
        return self.email