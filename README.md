# DMX Mobile

A simple webclient for the [DMX platform](https://git.dmx.systems/dmx-platform/dmx-platform) that is optimized for small screens.

A running DMX installation is required.

### Clone

DMX Mobile assumes being cloned inside DMX's `bundle-dev` directory (resp. `modules-external` if you've built DMX from source):
```sh
cd bundle-dev
git clone https://git.dmx.systems/dmx-plugins/dmx-mobile.git
```

### Build

```sh
cd dmx-mobile
mvn clean package
```

This 1) installs the Node modules (in dmx-mobile's `node_modules`) required for building, 2) builds the `dmx-mobile.jar`, and 3) moves `dmx-mobile.jar` to the DMX platform's `bundle-deploy` directory (so it gets automatically hot-deployed, no DMX server restart required).

### Run

Open this page:
```
http://localhost:8080/systems.dmx.mobile/
```


### Run in Dev Mode

```sh
cd dmx-mobile
npm run dev
```

This launches the Webpack Dev Server (at port 8084), builds DMX Mobile on-the-fly, and opens it in a browser window. From this moment when you change DMX Mobile source code, the changes appear immediately in the browser window. No build-step required. No page reload required.


## Version History

**0.2** -- Feb 19, 2020

* Features:
    * Client-sync

**0.1** -- Nov 29, 2019

* Features:
    * Search, Create, Navigate, Edit
    * Login, Logout
