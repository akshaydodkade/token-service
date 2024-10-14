# Token Information Retrieval Service

Relates to [Access Management](https://github.com/akshaydodkade/access-management)

This project implements a **Token Information Retrieval Service** that allows users to fetch token information (such as cryptocurrency data - used mock data for this project) based on their access keys. The service ensures that only valid, non-expired API keys are used, and enforces rate limits as defined in the associated **Access Key Management System**. This service is integrated with the **Access Key Management** system to validate access keys and manage rate limits.

## Features

- **Token Information Retrieval**: Users can fetch cryptocurrency token information based on their valid API keys. (note: used mock data in this project)
- **Rate Limit Enforcement**: The service checks the rate limits defined by the associated access key (calculated per minute) and prevents users from exceeding these limits.
- **Key Validation**: Validates the user's API key, ensuring it is not expired and is enabled.
- **Logs User Requests**: Logs each request for token information, including key usage, timestamps, and rate limit checks.
  
## Architecture

This service functions as a **Microservice** that relies on the **Access Key Management** service for key validation and rate-limiting. The communication between the two services is **asynchronous** and relies on **Redis**. The service uses **NestJS** to implement the core logic and integrate with **Redis**.

## Technologies Used

- **NestJS**: A framework for building scalable and efficient microservices.
- **Redis**: Used for storing API keys, logs, and enforcing rate limits.
- **TypeScript**: For statically typed development.
- **Jest**: Testing framework for unit and integration tests.

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/en/) >= 14
- [Yarn](https://yarnpkg.com/)
- [Redis](https://redis.io/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akshaydodkade/token-service.git
