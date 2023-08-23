# backend

User onboarding, DID VC etc.

## Endpoints

Request Social Security Credential

```sh
curl --request POST \
  --url http://localhost:3000/issue/social \
  --header 'Content-Type: application/json' \
  --data '{
	"did": "did:ethr:bageth:0x88AfbAc330579E81A7C686e8AbB3Ad712dF74751",
	"tckk": "11111111111"
}'
```

Onboard Social Secuiry Card User

```sh
curl --request POST \
  --url http://localhost:3000/onboard \
  --header 'Content-Type: application/json' \
  --data '{
	"credential": {}
}'
```
