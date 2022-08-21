from re import T
from django.db import models
import uuid


class TestTable(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(
        'accounts.User', related_name='user', on_delete=models.CASCADE, db_column='cognito_id')
    test = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '[{}] {}'.format(self.id, self.test)
