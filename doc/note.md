#About Angular 指令
* [官網](https://angular.io/guide/quickstart)
* npm install -g @angular/cli
* ng new angular-tour-of-heroes
* cd angular-tour-of-heroes
* ng serve --open
* ng build  => 產生 dist
* ng build --prod  => 產生 dist with prod
* ng help
* ng test
* ng e2e
* ng generate component heroes
* ng generate component hero-detail
* ng generate --help
* ng generate component --help
* ng build --help
* ng build default(app)
* ng build {projectName}
* ng generate service hero
* ng generate component messages
* ng generate service message
* ng generate module app-routing --flat --module=app
* ng generate module --help
* ng generate service hero
* ng generate component dashboard
* npm install angular-in-memory-web-api --save
* ng generate service MyInMemoryData
* npm install @angular/http  ==> 若不安裝會出現  Cannot find module '@angular/http'
* npm install rimraf -g
* 當未滿足package.json文件中指定的一個或多個模塊的依賴關係時，會引發UNMET PEER DEPENDENCY錯誤。 仔細檢查警告並使用正確版本的依賴關係更新package.json文件。
  (mac) => rm -rf node_modules/
  (windows) => rimraf node_modules
  npm cache clean
  npm install


#過往指令
* npm list --depth=0
* npm view angular
* npm view angular version
* npm run build 等同 => ng build
* npm install or npm i=> windows下從github抓下來, 下此指令,產生node_modules
* npm info {套件名稱} version
* npm uninstall {套件名稱} ==> 移除套件
* npm install -g npm ==> 更新npm


#Other
(function)
(input) 
(click) => bind-click
(change)
routerLink = 'abc'
[routerLink] = "'abc'"
[(ngModel)]
[] = 運算式
*ngFor => * (exist or not exist)
ngIf
Property binding ( [property] ) [https://angular.io/guide/template-syntax#property-binding--property-]


#框架
* workspace 
*   project(application) , ex, web app or mobile app 
*     module 
*       component


# 
base
https://angular.io/guide/deployment#the-base-tag

environment
