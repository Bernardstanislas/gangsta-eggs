import crypto from 'crypto';
import {Request} from 'express';

const isValidSignature = (request: Request) => {
  const token = process.env.ALCHEMY_AUTH_TOKEN!;
  const headers = request.headers;
  const signature = headers['x-alchemy-signature']; // Lowercase for NodeJS
  const body = request.body;
  const hmac = crypto.createHmac('sha256', token); // Create a HMAC SHA256 hash using the auth token
  hmac.update(JSON.stringify(body), 'utf8'); // Update the token hash with the request body using utf8
  const digest = hmac.digest('hex');
  return signature === digest; // If signature equals your computed hash, return true
};
