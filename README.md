# kurlyhackfesta2022

### API Server

- Python==3.8.10

```
python3 manage.py makemigrations
python3 manage.py migrate --run-syncdb
DJANGO_SUPERUSER_USERNAME=serveradmin \
DJANGO_SUPERUSER_PASSWORD=serveradmin \
python3 manage.py createsuperuser --email "admin@admin.com" --noinput
python3 manage.py process_tasks --queue picking-queue &
python3 manage.py process_tasks --queue packing-queue &
python3 manage.py process_tasks --queue delivery-queue &
python3 manage.py runserver
```
