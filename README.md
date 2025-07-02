iot-wearables
=============

### About


# Settings

1. change the setting.js file in ~/<your username>/.node-red/ path to this:

```bash
module.exports = {
  httpStatic: '/home/<your username>/.node-red/public/',
  editorTheme: {
    projects: {
      enabled: true,
    },
  },
};
```

2. Add the `public` directory provided in this project to `~/<your username>/.node-red/` path.
