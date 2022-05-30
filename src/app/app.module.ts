import { CommandModule } from 'nestjs-command';
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ConfigModule } from './config/config.module';
import { TypeOrmConfigModule } from './typeorm/typeorm-config.module';
import { TypeOrmConfigService } from './typeorm/typeorm-config.service';
import { SeedModule } from '@app/seed/seed.module';
import { UserModule } from '@app/user/user.module';
import { UserService } from '@app/user/user.service';
import { createUsersLoader } from '@app/user/user.loader';
import { PostModule } from '@app/post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      useExisting: TypeOrmConfigService,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [UserModule],
      inject: [UserService],
      useFactory: async (userService: UserService) => ({
        debug: true,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        autoSchemaFile: 'schema.gql',
        context: ({ req, res }) => ({
          req,
          res,
          usersLoader: createUsersLoader(userService),
        }),
        cors: {
          origin: ['https://studio.apollographql.com'],
          credentials: true,
        },
      }),
    }),
    ConfigModule,
    UserModule,
    PostModule,
    CommandModule,
    SeedModule,
  ],
})
export class AppModule {}
