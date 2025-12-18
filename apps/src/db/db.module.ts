import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnvService } from "src/env/env.service";

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: async (envService: EnvService) => ({
            type: 'postgres',
            host: envService.get('DB_HOST'),
            port: envService.get('DB_PORT'),
            username: envService.get('DB_USER'),
            password: envService.get('DB_PASSWORD'),
            database: envService.get('DB_NAME'),
            entities: [__dirname + '/entity/**'],
            migrations: [__dirname + '/migration/*.ts'],
            synchronize: false
        }),
        inject: [ConfigService]
    })]
})
export class DbModule { }