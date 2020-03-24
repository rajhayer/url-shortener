# url-shortener

## Server
Run this by:
```bash
cd server
yarn install
yarn start
```

### REST Api (`api/shorts`)
Apis can be accessible via REST client (e.g. Postman). These are all 

#### Create
```yaml
request:{ 
    url: api/shorts
    method: POST
    body: {
        url: {long url},
        desired: {desired shortname} /* optional */
    }
}
```

#### Get (by short name)
```yaml
request:{ 
    url: api/shorts/{shortname}
    method: GET
 }
```


#### Get (all)
```yaml
request:{ 
    url: api/shorts
    method: GET
 }
```

## Client

Run this by:
```bash
cd client
yarn install
yarn start
```
Client is accessible at: <http://localhost:3000>
