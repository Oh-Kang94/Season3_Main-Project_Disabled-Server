# 포용누리앱을 위한 Node.js의 Express로 구현한 서버 앱

<img src = https://github.com/Oh-Kang94/season3_team1_disabled_app/blob/main/App%20mockup.png> </img>

## 소개
Mysql와의 연결 및 메일 전송, RServe와의 연결을 통한 AI Model 분석 등          
Flutter App을 위한 Express 기반의 서버입니다.

### 관련 PDF 설명
<a href="https://docs.google.com/presentation/d/19dW8CeIwx2XBhR6jzVImYRIjAhB1qyhuw5vmQS5hPLY/edit?usp=share_link" title="PDF로 이동">
  <img src= "https://github.com/Oh-Kang94/season3_team1_disabled_app/blob/main/DisabledApp_PDF.png"  alt="image" ,height="50%", width="50%">
</a> 

## API 문서

이 프로젝트의 API 문서는 Swagger UI를 통해 확인할 수 있습니다.
<a href="http://www.oh-kang.kro.kr:7288/api">
    <img src = https://github.com/Oh-Kang94/season3_team1_disabled_app/blob/main/Swagger-UI.png>
    <br/>             
  Swagger UI보러 가기!!
</a>    

### 간략 설명 
1. JWT를 이용한 인증 방식의 보안 구성
2. SwaggerUI를 통한, Fromtend과의 협업
3. SMTP 포트 활용으로, 6자리의 난수를 대조 하고, 맞으면 비밀번호 인증
4. Rserve와의 연동으로, 6개의 렌덤포레스트로 만든 AI모델을 활용 결과 출력
### 설치방법
    npm install
    ** 일반 실행
    nodemon ./src/bin/www.js
    ** 백그라운드에서 실행
    pm2 start ./src/bin/www.js

## 기술 스택
  <img src="https://skillicons.dev/icons?i=aws,mysql,js,express,firebase,swagger"/>

## 저자

- [Oh-Kang](https://github.com/Oh-Kang94)

## 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다. [LICENSE](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt)에서 자세한 정보를 확인하세요.
