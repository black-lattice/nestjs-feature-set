import { Injectable } from '@nestjs/common';
import { CreateAlgorithmDto } from './dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from './dto/update-algorithm.dto';
import * as fs from 'fs';
import { readdirSync } from 'fs';
import { join } from 'path';
// const res = fs.readdirSync(join(__dirname, 'question_bank'));
// console.log(res);

@Injectable()
export class AlgorithmService {
  create(createAlgorithmDto: CreateAlgorithmDto) {
    return 'This action adds a new algorithm';
  }

  findAll(): any {
    const fileNames: any = [];
    const res = readdirSync(join(__dirname, 'question_bank'));
    res.forEach((fileName: any) => {
      fileNames.push(fileName);
    });
    return { data: fileNames };
  }

  findOne(id: number) {
    return `This action returns a #${id} algorithm`;
  }

  update(id: number, updateAlgorithmDto: UpdateAlgorithmDto) {
    return `This action updates a #${id} algorithm`;
  }

  remove(id: number) {
    return `This action removes a #${id} algorithm`;
  }
}
