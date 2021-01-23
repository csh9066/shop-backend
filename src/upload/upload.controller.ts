import { UploadService } from './upload.service';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}
  @Post()
  @UseInterceptors(FileInterceptor('img'))
  uploadFile(@UploadedFile() img) {
    return this.uploadService.uploadImageToS3(img);
  }
}
