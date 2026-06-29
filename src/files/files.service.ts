import { BadRequestException, Injectable } from '@nestjs/common';
import {join} from 'node:path'
import { existsSync } from 'node:fs';


@Injectable()
export class FilesService {

  getStaticProductImage(imageName: string) {
    const path = join(process.cwd(), 'static', 'products', imageName);

    if(!existsSync(path)){
      throw new BadRequestException(`No such product image with ${ imageName }`);
    }
    return path
  }
}
