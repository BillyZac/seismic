# seismic

![seismic logo](./src/images/seismic-logo.png)

Pulls earthquake data from the U.S. Geological Survey and creates a map of recent significant earthquakes.

[See a video demo here.](https://www.youtube.com/watch?v=PQ-KpjxzDTc)

## Installing
After cloning, run:	

```
npm install
```

Then:

Create a file in the root of the project called "api-key.js", in that file, put your Flickr api key like this:
```
module.exports = "ebb9e5fe1a05ae6489632b7abafbe2bb";
```

```
gulp watch
```

And, in a new terminal tab:

```
gulp browser-sync
```


