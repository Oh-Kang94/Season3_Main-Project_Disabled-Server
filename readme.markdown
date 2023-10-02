# 포용누리앱을 위한 Node.js의 Express로 구현한 서버 앱

<img src = https://github.com/Oh-Kang94/season3_team1_disabled_app/blob/main/App%20mockup.png> </img>

## 소개
Mysql와의 연결 및 메일 전송, RServe와의 연결을 통한 AI Model 분석 등          
Flutter App을 위한 Express 기반의 서버입니다.

## API 문서

이 프로젝트의 API 문서는 Swagger UI를 통해 확인할 수 있습니다.
<a href="http://www.oh-kang.kro.kr:7288">
    <img src = https://github.com/Oh-Kang94/season3_team1_disabled_app/blob/main/Swagger-UI.png>
    <br/>             
  Swagger UI보러 가기!!
</a>    

### 간략 설명 
1-1.	Login / Login  (GET)                           
ID와 패스워드 확인 후,             
1차 : 아이디에 대응되는 비밀번호 확인.             
2차 : 탈퇴한 회원 확인.             
3차 : 로그인 성공 시, JWT 토큰 발행             
-> 10시간 기한으로 발행, 보안성 강화

Req : ID , PW

1-2.	Login / checkKaKaoEnrolled (GET)              
DB의 저장된 KAKAO회원가입 내용을 찾아,             
일치하면, 로그인 성공             

Req : KAKAOID

1-3.	Login / checkGoogleEnrolled (GET)         
DB의 저장된 Google회원가입 내용을 찾아,               
일치하면, 로그인 성공           

Req : GoogleID

1-4.	Login / getpic (GET)        
DB의 저장된 프로필 사진의         
FireStorage의 Ref를 가져온다.  

Req : ID

2-1-1.	Mail / sendemail (GET)         
DB의 저장된 프로필 사진의            
FireStorage의 Ref를 가져온다.

Req : ID

2-1-2.	Mail / sendemail (get)           
6자리의 난수 생성 후, id,Email,난수와           
Mapping을 시키고, 이메일을 보낸다.           
이 Mapping은 setInterval을 통해,           
5분기한으로 제한 시킨다.           


Req : Callback

2-2.	Mail / verifycode (get)           
6자리의 난수를 대조 하고, 맞으면 비밀번호를 알려준다.           

Req : ID, email, code

2-3.	Mail / findId (get)          
email을 대조하고, ID를 알려준다.          

Req : email

3-1. maps / (get)
ERD상의 seq,사업장명,주소 데이터를 가져온다

Req : 없음.

4-1. register / registration (post)
user table에 유저의 정보를 Insert한다.

Req : userData(body)

4-2. register / updateuser (post)

user table에 유저의 정보를 Update한다.

Req : userData(body)

4-3.	Register / getuser (get)

id를 통해 User의 정보를 가져온다.

Req : id




5-1. test / (get)

6개의 렌덤포레스트로 만든 AI모델을 활용해           
사용자의 개인 정보를 One hot Encoding          
시킨 내용을  Rserve로 보내서, 결과를 가져와 get형식으로 주고 받는다.          

Req : ai, age, id, disabled, address, date
로 이루어진 46개의 req
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
