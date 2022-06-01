Example project to test different variants to optimize query performance by batching/caching.\
The best results got using utility called [DataLoader](https://github.com/graphql/dataloader)

## Install / Run

```bash
# Clone repo
$ git clone https://github.com/kuzimovich8/data-loader-example.git

# Install deps
$ yarn install

# Run Docker containers
$ docker-compose -f docker-compose.yml up -d

# Run migrations and seed data
$ yarn run refresh

# Run app
$ yarn run start
```
