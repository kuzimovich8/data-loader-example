Example project to test different variants to optimize query performance by batching/caching.
The best results got using utility called [[data-loader](https://github.com/graphql/dataloader)]

## Install / Run

```bash
# Clone repo
$ git clone https://github.com/kuzimovich8/data-loader-example.git

# Install deps
$ yarn install

# Run Docker container
$ docker run -d --name trg-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=q1w2e3r4 -e POSTGRES_DB=trg -p 5431:5432

# Run migrations and seed data
$ yarn run refresh

# Run app
$ yarn run start
```
