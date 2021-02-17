# MakeCode STM32 ![pxt-buildtarget](https://github.com/letssteam/pxt-lets-steam/workflows/pxt-buildtarget/badge.svg)

This is an experimental code editor for STM32 boards - try it at https://makecode.st.com.

* [Read the docs](https://makecode.st.com/about)

## Who is this for?

This editor is meant for STM32 micro-controllers that are friendly to breadboarding. The editor is based on [Microsoft MakeCode](https://makecode.com).

## Local Dev Server

The local server lets you to run the editor and serve the documentation from your own computer.

### Setup

1. Install [Node.js](https://nodejs.org/) 8.9.4 or higher.
2. Install [Docker](https://www.docker.com/) if you are going to edit any `.cpp` files.
3. Clone the pxt repository, install the dependency and build it.
```
git clone https://github.com/microsoft/pxt
cd pxt

npm install
npm run build
cd ..
```
5. Clone the ``Microsoft/pxt-common-packages`` repository and install the dependency
```
git clone https://github.com/microsoft/pxt-common-packages
cd pxt-common-packages
npm install
cd ..
```
5. Clone the ``jacdac/jacdac-ts`` repository, install the dependency and build it
```
git clone https://github.com/jacdac/jacdac-ts.git
cd jacdac-ts
npm install
npm run build
cd ..
```
6. Clone the ``Microsoft/pxt-stm32-iot-node`` repository
```
git clone https://github.com/microsoft/pxt-stm32-iot-node
cd pxt-stm32-iot-node
```
7. Install the PXT command line (add `sudo` if asked).
```
npm install -g pxt
```
8. Install the dependencies.
```
npm install
```
8. Link pxt-stm32-iot-node back to base pxt repo
```
rm -R node_modules/@jacdac/jacdac-ts
rm -R node_modules/pxt-core
rm -R node_modules/pxt-common-packages
pxt link ../jacdac-ts
pxt link ../pxt
pxt link ../pxt-common-packages
```

If you want to know if your folders are link, run ``ls -l``
and it will indicate them.

```
ls -l node_modules/
```

Note the above command assumes the folder structure of   
```
       makecode.st.com
          |
  ----------------------------------------------------------
  |       |                        |                       |
  pxt     pxt-common-packages      pxt-stm32-iot-node      jacdac-ts
 ```

### Refresh dal.d.ts files

Whenever you make changes to the ``#defines`` in the .cpp files, you will have to refresh
the ``dal.d.ts`` files. For that, run

```
pxt builddaldts
```

### CODAL changes

If you need to do changes to CODAL itself, follow these steps.

* create a new project in the web editor, then close the web server. Select the hardware you want to work with.
* using a command prompt, open the ``projects`` folder and find the subfolder with your new project
* open the folder in Visual Studio Code
```
code .
```
* open ``pxt.json`` and edit the dependencies to use 
the ``file:...`` path instead of ``*``

```
   dependencies: {
        "adafruit-metro-m0-express": "file:../../libs/adafruit-metro-m0-express"
   }
```
* from the command line, set the ``PXT_NODOCKER`` environment variable to ``1``

```
export PXT_NODOCKER=1
```

* run a local build that will create a CODAL checkout automatically. 
If you are missing tools, you will be notified by the build script.

```
pxt build --local --force
```

* go to the ``built/dockercodal`` folder and open all CODAL in a new Visual Studio Code instance

```
cd built/dockercodal
code libraries/*
```

* go to the Git tab in VS Code, and change the branch of the CODAL repository to work on to ``master``. You can create a new branch to start doing your work and pull requests.

* to build CODAL directly, run ``built/codal``
```
python build.py
```

* to rebuild your project from pxt, run ``pxt build --local --force`` from the project folder

### Running

Run this command from inside pxt-stm32 to open a local web server
```
pxt serve
```
If the local server opens in the wrong browser, make sure to copy the URL containing the local token. 
Otherwise, the editor will not be able to load the projects.

If you need to modify the `.cpp` files (and have installed yotta), enable yotta compilation using the `--localbuild` flag:
```
pxt serve --localbuild
```

### Updates

Make sure to pull changes from all repos regularly. More instructions are at https://github.com/microsoft/pxt#running-a-target-from-localhost

## Repos 

The pxt-stm32 target depends on several other repos. The main ones are:
- https://github.com/microsoft/pxt, the PXT framework
- https://github.com/microsoft/pxt-commmon-packages, common APIs accross various MakeCode editors
- https://github.com/lancaster-university/codal-core, CODAL core project
- https://github.com/letssteam/codal-stm32, stm32 layer
