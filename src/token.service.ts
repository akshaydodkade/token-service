import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class TokenService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  // get token information with rate limit(per minute) and key validation
  async getTokenInfo(key: string, tokenSymbol: string) {
    const accessKey = await this.redisClient.hgetall(`access_key:${key}`);
    if (!accessKey || Object.keys(accessKey).length === 0) {
      return { success: false, message: 'Invalid or expired key' };
    }

    const currentTime = new Date();
    const expirationTime = new Date(accessKey.expirationTime);
    if (expirationTime < currentTime) {
      return { success: false, message: 'Key has expired' };
    }

    if (accessKey.isEnabled !== 'true') {
      return { success: false, message: 'Key is disabled' };
    }

    const rateLimit = Number(accessKey.rateLimit);
    const currentMinute = Math.floor(currentTime.getTime() / 60000);

    const redisKey = `rate_limit:${key}:${currentMinute}`;
    let requestCount = await this.redisClient.get(redisKey);

    if (!requestCount) {
      requestCount = '0';
    }

    if (Number(requestCount) >= rateLimit) {
      return { success: false, message: 'Rate limit exceeded for this minute' };
    }
    await this.redisClient.incr(redisKey);

    await this.redisClient.expire(redisKey, 60);

    // mocking token information
    const tokenData = this.fetchMockTokenData(tokenSymbol); // static data

    await this.logRequest(key, tokenSymbol, true);

    return { success: true, data: tokenData };
  }

  // mock function for token data
  private fetchMockTokenData(tokenSymbol: string) {
    const tokenMockData = {
      BTC: { symbol: 'BTC', price: 50000, marketCap: '1T' },
      ETH: { symbol: 'ETH', price: 3000, marketCap: '500B' },
      DOGE: { symbol: 'DOGE', price: 0.25, marketCap: '30B' },
    };
    return (
      tokenMockData[tokenSymbol.toUpperCase()] || {
        symbol: tokenSymbol,
        price: 'N/A',
        marketCap: 'N/A',
      }
    );
  }

  // logging each request
  private async logRequest(
    key: string,
    tokenSymbol: string,
    successful: boolean,
  ) {
    const log = {
      key,
      tokenSymbol,
      timestamp: new Date().toISOString(),
      success: successful.toString(),
    };
    await this.redisClient.lpush('token_request_logs', JSON.stringify(log));
  }
}
