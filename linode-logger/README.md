# linode-logger
Linear B logger for all node.js services.

```bash
npm i --save @linearb/linode-logger
```
## Features
---
- Fetch context variables directly from the `Express.js` context. request-id will be auto-generated if not exists.
    
    ```javascript
    const app = require("express")();
    const createLogger = require("@linearb/linode-logger");
    const logger = createLogger({ app: 'demo', environment: process.env.NODE_ENV });

    logger.embed(app);

    app.get('/foo', async (req, res) => {
        logger.info('in /foo');
    });
    ```
    `curl /foo -H 'organization_id: 123' -H 'id: 456'` will print to the console:
    ```json
    {
        "timestamp": "2019-07-23T14:52:42.190Z",
        "level": "info",
        "message": "in /foo",
        "ctx": {
            "environment": "dev",
            "app": "demo",
            "org_id": "123",
            "account_id": "456",
            "request_id": "ab36c0c0-ad72-11e9-8775-13fd7e6c861d"
        }
    }
    ```

- JSON logging in remote, ordinary row-based logging in localhost environment.
    ```javascript
    const logger = createLogger({ app: 'demo', environment: 'localhost' });
    ```
    `curl /foo -H 'organization_id: 123' -H 'id: 456'` will print to the console:
    ```
    2019-07-23T14:51:17.729Z [info]: Starting at /foo | {"environment":"localhost","app":"demo","request_id":"78df06f0-ad72-11e9-8494-813d0c29440a","org_id": "123","account_id": "456"}
    ```
- extra context across all logs, given on initialization of the logger
    ```javascript
    const logger = createLogger({ app: 'demo', environment: process.env.NODE_ENV, somethingExtra: 'I was set on creation' });

    // ...

    logger.info('test');
    ```
    will print to the console:
    ```json
    {
        "timestamp": "2019-07-23T14:52:42.190Z",
        "level": "info",
        "message": "test",
        "ctx": {
            "environment": "dev",
            "app": "demo",
            "org_id": "123",
            "account_id": "456",
            "request_id": "ab36c0c0-ad72-11e9-8775-13fd7e6c861d",
            "somethingExtra": "I was set on creation"
        }
    }
    ```    
- extra context per log message
    ```javascript
    logger.info('test', {fromLogMessage: 'Hi there'});
    ```
    will print to the console:
    ```json
    {
        "timestamp": "2019-07-23T14:52:42.190Z",
        "level": "info",
        "message": "test",
        "ctx": {
            "environment": "dev",
            "app": "demo",
            "org_id": "123",
            "account_id": "456",
            "request_id": "ab36c0c0-ad72-11e9-8775-13fd7e6c861d",
            "somethingExtra": "I was set on creation",
            "fromLogMessage": "Hi there"
        }
    }
    ```    