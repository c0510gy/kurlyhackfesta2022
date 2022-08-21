# kurlyhackfesta2022

### API Server

```
python3 manage.py makemigrations
python3 manage.py migrate --run-syncdb
python3 manage.py createsuperuser
python3 manage.py process_tasks --queue picking-queue &
python3 manage.py process_tasks --queue packing-queue &
python3 manage.py process_tasks --queue delivery-queue &
python3 manage.py runserver
```
