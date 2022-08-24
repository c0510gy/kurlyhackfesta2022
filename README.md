# kurlyhackfesta2022

## Kurly 해커톤 관계자를 제외한 분들은 레포지토리 내용에 대한 어떠한 작업도 하지 않도록 요청드립니다. (서버 접속 등)

### API Server

- Python==3.8.10

```
python3 manage.py makemigrations
python3 manage.py migrate --run-syncdb
DJANGO_SUPERUSER_USERNAME=serveradmin \
DJANGO_SUPERUSER_PASSWORD=serveradmin \
python3 manage.py createsuperuser --email "admin@admin.com" --noinput
// 시뮬레이션 가동이 필요 없다면 마지막 명령어만 실행
python3 manage.py process_tasks --queue picking-queue &
python3 manage.py process_tasks --queue packing-queue &
python3 manage.py process_tasks --queue delivery-queue &
python3 manage.py runserver
```

### Docker build and push

** master branch로 merge & push로 배포 **

AWS CLI profile 이름이 `gravimetric` 인 경우

#### API Server

```
aws ecr get-login-password --region ap-northeast-2 --profile gravimetric | docker login --username AWS --password-stdin 025646348585.dkr.ecr.ap-northeast-2.amazonaws.com
docker build --platform linux/amd64 -t gravimetric-server .
docker tag gravimetric-server:latest 025646348585.dkr.ecr.ap-northeast-2.amazonaws.com/gravimetric-server:latest
docker push 025646348585.dkr.ecr.ap-northeast-2.amazonaws.com/gravimetric-server:latest
```

#### Web Client

```
aws ecr get-login-password --region ap-northeast-2 --profile gravimetric | docker login --username AWS --password-stdin 025646348585.dkr.ecr.ap-northeast-2.amazonaws.com
docker build --platform linux/amd64 -t gravimetric-client .
docker tag gravimetric-client:latest 025646348585.dkr.ecr.ap-northeast-2.amazonaws.com/gravimetric-client:latest
docker push 025646348585.dkr.ecr.ap-northeast-2.amazonaws.com/gravimetric-client:latest
```
