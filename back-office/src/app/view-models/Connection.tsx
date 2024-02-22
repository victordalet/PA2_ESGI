import UsersModel from '../models/domain/UsersModel';

export default class ConnectionViewModel {
    private usersModel: UsersModel;

    constructor(users: UsersModel) {
        this.usersModel = users;
    }


}
