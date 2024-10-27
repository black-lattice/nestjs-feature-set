import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as qrcode from 'qrcode';
type qrStatus =
  | 'noscan'
  | 'scan-wait-confirm'
  | 'scan-confirm'
  | 'scan-cancel'
  | 'expired';
export interface Info {
  status: qrStatus;
  userInfo?: {
    token: string;
  };
}

@Injectable()
export class QrcodeService {
  statusMap: Map<string, Info>;
  constructor() {
    this.statusMap = new Map();
  }
  // 生成二维码
  async generator(url: string) {
    const uuid = randomUUID();
    const dataurl = await qrcode.toDataURL(`${url}?id=${uuid}`);
    this.setStatus(uuid, { status: 'noscan' });
    return {
      qrcode_id: uuid,
      img: dataurl,
    };
  }

  // 设置二维码状态
  setStatus(id: string, status: Info) {
    this.statusMap.set(`qrcode_${id}`, status);
  }
  // 查询二维码状态
  getStatus(id: string): Info {
    return this.statusMap.get(`qrcode_${id}`) || { status: 'expired' };
  }
}
