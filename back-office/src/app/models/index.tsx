import UsersModel from './domain/UsersModel';


export default class Store {

    static type = {
        USERS_MODEL: 'users'
    };


    private readonly usersModel: UsersModel;


    constructor() {
        this.usersModel = new UsersModel();
    }

    public getStores = () => ({
        [Store.type.USERS_MODEL]: this.usersModel
    });
}
