# Vulns

## Error leak

### Request
POST : /*
Without body 

### Response
```
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>Error</title>
</head>

<body>
	<pre>TypeError: Cannot destructure property &#39;email&#39; of &#39;req.body&#39; as it is undefined.<br> &nbsp; &nbsp;at exports.register (/home/raxo/Desktop/Development/ProgChallenges/email-client/backend/controllers/authController.js:6:11)<br> &nbsp; &nbsp;at Layer.handleRequest (/home/raxo/Desktop/Development/ProgChallenges/email-client/backend/node_modules/router/lib/layer.js:152:17)<br> &nbsp; &nbsp;at next (/home/raxo/Desktop/Development/ProgChallenges/email-client/backend/node_modules/router/lib/route.js:157:13)<br> &nbsp; &nbsp;at Route.dispatch (/home/raxo/Desktop/Development/ProgChallenges/email-client/backend/node_modules/router/lib/route.js:117:3)<br> &nbsp; &nbsp;at handle (/home/raxo/Desktop/Development/ProgChallenges/email-client/backend/node_modules/router/index.js:435:11)<br> &nbsp; &nbsp;at Layer.handleRequest (/home/raxo/Desktop/Development/ProgChallenges/email-client/backend/node_modules/router/lib/layer.js:152:17)<br> &nbsp; &nbsp;at /home/raxo/Desktop/Development/ProgChallenges/email-client/backend/node_modules/router/index.js:295:15<br> &nbsp; &nbsp;at processParams (/home/raxo/Desktop/Development/ProgChallenges/email-client/backend/node_modules/router/index.js:582:12)<br> &nbsp; &nbsp;at next (/home/raxo/Desktop/Development/ProgChallenges/email-client/backend/node_modules/router/index.js:291:5)<br> &nbsp; &nbsp;at Function.handle (/home/raxo/Desktop/Development/ProgChallenges/email-client/backend/node_modules/router/index.js:186:3)</pre>
</body>

</html>
```

## JWT Forgery

Get JWT from your own account and use it to access other accounts.

Change algorithm from HS256 to none and change the email.