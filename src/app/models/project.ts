export class Project {
  public id   = '';
  public name = '';

  public static create() {
    return new Project();
  }

  public static fromObject(obj: any) {
    const instance = new Project();

    Object.keys(instance).forEach(key => {
      const objValue = obj[key];
      if (objValue === undefined) { return; }
      instance[key] = objValue;
    });

    return instance;
  }

  constructor() {}

}
