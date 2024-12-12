# AF Brazilian Beauty API


### JWT

- New private key

`openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048`

- Extract public key

`openssl rsa -pubout -in private_key.pem -out public_key.pem`

- base64 key

`base64 -i <input-file> -o <output-file>`

