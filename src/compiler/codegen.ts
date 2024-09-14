import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { FramePaper } from './framepaper';

export class CodeGenerator {
  static generateFile(templatePath: string, outputPath: string, data: any) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = Handlebars.compile(template);
    const output = compiledTemplate(data);

    fs.writeFileSync(outputPath, output);
    console.log(`File generated at ${outputPath}`);
  }

  static generateAll(framePaperPath: string) {
    const framePaper = FramePaper.loadFramePaper(framePaperPath);

    // Generate Model, Controller, and Service files
    framePaper.models.forEach((model: any) => {
      const outputDir = path.join(__dirname, '..', model.name.toLowerCase());
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }

      this.generateFile(
        path.join(__dirname, '../templates', 'model.hbs'),
        path.join(outputDir, `${model.name.toLowerCase()}.model.ts`),
        model,
      );
      this.generateFile(
        path.join(__dirname, '../templates', 'controller.hbs'),
        path.join(outputDir, `${model.name.toLowerCase()}.controller.ts`),
        model,
      );
      this.generateFile(
        path.join(__dirname, '../templates', 'service.hbs'),
        path.join(outputDir, `${model.name.toLowerCase()}.service.ts`),
        model,
      );
    });
  }
}
