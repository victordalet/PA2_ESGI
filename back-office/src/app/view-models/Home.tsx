import UsersModel from '../models/domain/UsersModel';


export default class HomeViewModel {
    private usersModel: UsersModel;

    constructor(users: UsersModel) {
        this.usersModel = users;
    }

    public addUser(value: string) {
        this.usersModel.addUser(value);
    }

    public async addUserAsync(value: string) {
        await this.usersModel.addUserAsync(value);
    }

    public removeUser(value: string) {
        this.usersModel.removeUser(value);
    }

    public removeAllUsers() {
        this.usersModel.clearAll();
    }

    public get userList(): string[] {
        return this.usersModel.users;
    }

    public get asyncLoading(): boolean {
        return this.usersModel.asyncLoading;
    }
}
