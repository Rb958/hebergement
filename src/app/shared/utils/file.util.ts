import {StorageInfoModel} from "../models/storage-info.model";


export class FileUtil{

  static addFile(file: any, uploadInfo: StorageInfoModel){
    file.parse({
      complete: () => {
        this.getBase64(file).then( (data: string) => {
          console.dir(data);
        }).catch( (error) => {
            console.log(error);
          });
      }
    });
  }

  static getBase64(file: any): Promise<string> {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const encode = (reader.result) ? reader.result.toString() : '';
        encode.replace(/^data:(.*,)?/, '');
        resolve(encode);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
}
