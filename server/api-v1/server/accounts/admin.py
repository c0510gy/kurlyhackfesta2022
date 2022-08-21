from django.contrib import admin
from .models import User


class AdminUser(admin.ModelAdmin):
    model = User
    list_display = ('cognito_id', 'username', 'email',
                    'first_name', 'last_name', 'date_joined', 'is_active', 'is_staff')


admin.site.register(User, AdminUser)
