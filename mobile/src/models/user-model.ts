export class UserModel {

  constructor(public id: number, public firstName: string, public lastName: string){

  }

  name(){
    return this.firstName + ' ' + this.lastName;
  }
}
