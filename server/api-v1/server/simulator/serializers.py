from rest_framework import serializers
from background_task.models import Task


class SimulationTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('task_hash', 'task_name', 'attempts', 'has_error', 'locked_by_pid_running',
                  'task_params', 'verbose_name')
