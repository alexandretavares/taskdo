# TodoList

It is a mobile hybrid app Ionic-based that store tasks todo. You can create projects to organize your tasks.

### Version
0.1.0

### Tech

* [NodeJS] - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Ionic] - Advanced HTML5 Hybrid Mobile App Framework.
* [Cordova] - Mobile apps with HTML, CSS & JS.
* [AngularJS] - HTML enhanced for web apps!
* [ForerunnerDB] - NoSQL In-Browser JavaScript Database.


### Installation
Firts intall **NodeJS** and required platform dependencies (Android or IOS).

You need `ionic` and `cordova` installed globally:
```bash
$ npm install -g ionic cordova
```

Clone the repository and install project dependencies:
```bash
$ https://github.com/alexandretavares/ionic-todolist.git
$ cd todolist
$ npm install
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
