import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadService {
  private s3: AWS.S3;
  private readonly BUCKET_NAME = 'live-image-storage';
  constructor(private configService: ConfigService) {
    const optons: AWS.ConfigurationOptions = {
      region: configService.get('AWS_REGION'),
    };
    this.s3 = new AWS.S3(optons);
  }

  uploadImageToS3(file) {
    const key = `images/${Date.now()}_${file.originalname}`;
    this.s3
      .putObject({
        Bucket: this.BUCKET_NAME,
        Body: file.buffer,
        Key: key,
      })
      .promise();
    const src = `https://${this.BUCKET_NAME}.s3.amazonaws.com/${key}`;
    return { src };
  }
}
