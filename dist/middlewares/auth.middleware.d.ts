import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from 'src/routes/users/interfaces/user.interface';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly userModel;
    private configService;
    constructor(userModel: Model<User>, configService: ConfigService);
    use(req: any, res: any, next: () => void): Promise<void>;
}
