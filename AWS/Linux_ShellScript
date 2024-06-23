1. 자바 설치
# apt에 java zulu repository의 인증키 추가
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 0xB1998361219BD9C9

# zulu repository package 다운로드 및 설치
curl -sO https://cdn.azul.com/zulu/bin/zulu-repo_1.0.0-3_all.deb
sudo apt-get install -y ./zulu-repo_1.0.0-3_all.deb

# 설치한 패키지 반영
sudo apt-get update

# zulu 패키지가 잘 추가되었는지 확인 후 설치
sudo apt-cache search zulu17

# zulu17-jdk 설치
sudo apt-get install zulu17-jdk -y

# 제대로 설치 됐는지 확인
java -version
-----------------------------------------------------------------------------------------------------------
2. 아파치 톰캣 설치
# 현재 서버에 'JAVA_HOME' path설정
sudo vim /etc/profile

*i 아니면 insert 누르고 제일 아래줄에 사진에 나온 거처럼 문장 3개 추가하기(주석은 쓸 필요 없음)*

# 다음 페이지에 vim 으로 열어둔 파일에 아래 라인 추가
export JAVA_HOME=/usr/lib/jvm/zulu17
export PATH="$PATH:$JAVA_HOME/bin

# /etc/profile 에 적혀있는 내용을 서버에 즉시 반영함
source /etc/profile
sudo mkdir -pv /app/tomcat

# 그룹 생성 및 유저 추가.
sudo groupadd tomcat
sudo useradd -s /bin/false -g tomcat -d /app/tomcat tomcat

wget -q https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.24/bin/apache-tomcat-10.1.24.tar.gz
sudo tar xfz apache-tomcat-10.1.24.tar.gz -C /app/tomcat --strip-components=1
# 유저 설정 -> chmod는 sudo 만으로는 *.sh 명령어가 작동하지 않음
# sudo su 사용해서 root 유저로 스위칭 후 명령어 실행
sudo chown -R tomcat: /app/tomcat
sudo su
chmod +x /app/tomcat/bin/*.sh
exit

# 톰캣 작동 여부 확인
sudo /app/tomcat/bin/version.sh

# 서버 실행할 때 톰캣이 실행되도록 서비스 데몬 등록
sudo vim /etc/systemd/system/tomcat.service

VIM 편집기에 넣을 내용
//
[Unit]
Description=Tomcat servlet container
After=network.target
[Service]
Type=forking
User=tomcat
Group=tomcat
RestartSec=10
Restart=always
Environment="JAVA_HOME=/usr/lib/jvm/zulu17"
Environment="JAVA_OPTS=-Djava.awt.headless=true -
Djava.security.egd=file:/dev/./urandom"
Environment="CATALINA_BASE=/app/tomcat"
Environment="CATALINA_HOME=/app/tomcat"
Environment="CATALINA_PID=/app/tomcat/temp/tomcat.pid"
Environment="CATALINA_OPTS=-Xms256M -Xmx512M -server -
XX:+UseParallelGC"
ExecStart=/app/tomcat/bin/startup.sh
ExecStop=/app/tomcat/bin/shutdown.sh
[Install]
WantedBy=multi-user.target
//

# 서비스 데몬에 적용 시킨 톰캣 서비스 시스템에 반영 후 실행
sudo systemctl daemon-reload
sudo systemctl --now enable tomcat
sudo systemctl status tomcat --no-pager -l
-----------------------------------------------------------------------------------------------------------
3. nginx 설치
sudo apt update
sudo apt install nginx -y
sudo vim /etc/nginx/sites-available/default

VIM 편집기에 넣을 내용
//
upstream tomcat {
ip_hash;
server 127.0.0.1:8080 max_fails=5 fail_timeout=3s;
keepalive 300;
}
server {
listen 80 default_server;
listen [::]:80 default_server;
root /app/tomcat/webapps/ROOT;
index index.jsp
server_name _;
charset utf-8;
location / {
proxy_pass http://tomcat;
}
}
//

sudo nginx -t
sudo service nginx restart
-----------------------------------------------------------------------------------------------------------
4. 스프링부트 깡통 프로젝트 배포
# 스프링을 실행하기 위해 앞에서 만들었던 nginx 파일에 다시 들어가 포트 8080을 8090으로 바꿔준다
sudo vim /etc/nginx/sites-available/default

# nginx가 반영됐는지 다시 테스트하고 재시작
sudo nginx -t

sudo service nginx restart

# java -jar 파일이름.jar
