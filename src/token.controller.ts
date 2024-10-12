import { Controller, Get, Param } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('info/:key/:tokenSymbol')
  async getTokenInfo(
    @Param('key') key: string,
    @Param('tokenSymbol') tokenSymbol: string,
  ) {
    const tokenInfo = await this.tokenService.getTokenInfo(key, tokenSymbol);
    if (!tokenInfo.success) {
      return { error: tokenInfo.message };
    }
    return { data: tokenInfo.data };
  }
}
