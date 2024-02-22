import {makeAutoObservable} from 'mobx';

export default class UsersModel {

    private names: string[] = ['Chardonnay Kendall'];
    private asyncAddLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    private changeLoadingState(value: boolean) {
        this.asyncAddLoading = value;
    }

    public addUser(name: string) {
        this.names = [...this.names, name];
    }

    public async addUserAsync(name: string) {
        this.changeLoadingState(true);
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });

        this.addUser(name);
        this.changeLoadingState(false);
    }

    public removeUser(name: string) {
        this.names = this.names.filter((userName) => userName !== name);
    }

    public clearAll() {
        this.names = [];
    }

    public get users(): string[] {
        return this.names;
    }

    public get asyncLoading(): boolean {
        return this.asyncAddLoading;
    }
}
