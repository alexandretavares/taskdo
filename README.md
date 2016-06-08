# Taskdo

It is a mobile hybrid app Ionic-based (v1) that store tasks todo. You can create projects to organize your tasks.

### Version
0.9.5

### Tech

* [NodeJS] - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Ionic] - Advanced HTML5 Hybrid Mobile App Framework.
* [Cordova] - Mobile apps with HTML, CSS & JS.
* [AngularJS] - HTML enhanced for web apps!
* [ForerunnerDB] - NoSQL In-Browser JavaScript Database.
* [IonicMaterial] - Ionic + Material = ❤


### Installation
First install **NodeJS** and required platform dependencies (Android or IOS).

You need `ionic` and `cordova` installed globally:
```bash
$ npm install -g ionic cordova
```

Clone the repository and install project dependencies:
```bash
$ https://github.com/alexandretavares/taskdo.git
$ cd taskdo
$ npm install
$ bower install
```

Install all cordova plugins in **package.json**:
```bash
$ ionic state restore
```

Setup device platform:
```bash
$ ionic platform add android
or
$ ionic platform add ios
```

### Run

To start the project on browser run:
```bash
$ ionic serve
```

Run on emulator:
```bash
$ ionic build android
$ ionic emulate android
```

Run on device:
```bash
$ ionic run android
```

You change `android` for `ios` if you prefer.

More info on this can be found on the Ionic [Getting Started] [IonicGettingStarted] page and the [Ionic CLI] [IonicCLI] repo.

License
----

MIT

[AngularJS]: <http://angularjs.org>
[NodeJS]: <https://nodejs.org>
[Cordova]: <https://cordova.apache.org>
[Ionic]: <http://ionicframework.com>
[IonicGettingStarted]: <http://ionicframework.com/getting-started>
[IonicCLI]: <https://github.com/driftyco/ionic-cli>
[ForerunnerDB]: <http://www.forerunnerdb.com>
[IonicMaterial]: <http://ionicmaterial.com/>
