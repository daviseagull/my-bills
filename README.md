# My Bills API

## Project Description

Backend project of My Bills App

## Table of contents

<!--ts-->

- [Installation](#installation)

  - [Node](#node)

    - [Windows](#windows)
    - [MacOS](#macos)
    - [Linux](#linux)

  - [Yarn](#yarn)

- [Running the project](#running-the-project)
<!--te-->

---

## Installation

### Node

#### Windows

Download the Windows Installer directly from the nodejs.org web site.

##### Alternatives

Using Winget:

```
winget install OpenJS.NodeJS
```

or the LTS

```
winget install OpenJS.NodeJS.LTS
```

#### MacOS

Download the macOS Installer directly from the nodejs.org web site.

If you want to download the package with bash:

```
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

##### Alternatives

Using Homebrew:

```
brew install node
```

#### Linux

You can install nodejs and npm easily with apt install, just run the following commands.

    $ sudo apt install nodejs
    $ sudo apt install npm

### Yarn

After installing node, this project will need yarn too, so just run the following command.

```
npm install -g yarn
```

## Running the project

### Using Express

```
yarn start:dev
```

### Using serverless

```
yarn build
```

```
yarn serverless offline start
```
