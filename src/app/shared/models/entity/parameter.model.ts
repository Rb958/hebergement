export class ParameterModel{
  public name: string;
  public key: string;
  public value: string;
  public description?: string;


  constructor(name: string, key: string, value: string, description?: string) {
    this.name = name;
    this.key = key;
    this.value = value;
    this.description = description;
  }
}
