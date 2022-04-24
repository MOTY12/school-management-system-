"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Prise API')
        .setDescription('This is Prise API Documentation.')
        .setVersion('1.0')
        .addTag('prise')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT');
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true
    }));
    app.enableCors({
        origin: '*'
    });
    await app.listen(port || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map