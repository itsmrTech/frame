import * as fs from 'fs';

export class FramePaper {
  static loadFramePaper(path: string): any {
    const fileContent = fs.readFileSync(path, 'utf-8');
    return JSON.parse(fileContent);
  }
}
