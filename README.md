metapp
====

the metapp is an interface to the interfaces in the metalab.

this is the repository used to build the metapp.

```bash
#fastest way to get the environment running:
git clone https://github.com/screeninvader/metapp
cd metapp
./bin/install
./bin/build
./bin/server
xdg-open http://localhost:1337/
```

```bash
#clone git repository
git clone https://github.com/screninvader/metapp 
cd metapp
```

```bash
#INSTALL: used once before building for the very first time
#google font and npm install
./bin/install
```

```bash
#BUILD: adds local changes to dist directory
#creates dist/
./bin/build
```

```bash
#SERVER
#run the compiled version of the app from dist/index.html
#and serve all static files in that directory
bin/server
```
