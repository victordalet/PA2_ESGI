import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState} from '../@types/Home';
import View from '../views/Home';

@observer
export default class HomeController extends Component<
    ControllerProps,
    ControllerState
> {
    state = {
        addInput: ''
    };

    private onInputChange = (name: string) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        this.setState<any>({
            [name]: e.target.value
        });
    };

    private addUser = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        if (this.props.viewModel.asyncLoading) {
            return;
        }

        if (!this.state.addInput || this.state.addInput.trim() === '') {
            return;
        }

        if (this.props.viewModel.userList.includes(this.state.addInput)) {
            return;
        }

        this.props.viewModel.addUser(this.state.addInput);

        this.setState({
            addInput: ''
        });
    };

    private addUserAsync = async () => {
        if (this.props.viewModel.asyncLoading) {
            return;
        }

        if (!this.state.addInput || this.state.addInput.trim() === '') {
            return;
        }

        if (this.props.viewModel.userList.includes(this.state.addInput)) {
            return;
        }

        await this.props.viewModel.addUserAsync(this.state.addInput);

        this.setState({
            addInput: ''
        });
    };

    private removeUser = (name: string) => (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        if (!this.props.viewModel.userList.includes(name)) {
            return;
        }

        this.props.viewModel.removeUser(name);
    };

    render() {
        const {viewModel} = this.props;
        const {addInput} = this.state;

        return (
            <View
                addInputValue={addInput}
                onAddUser={this.addUser}
                users={viewModel.userList}
                asyncLoading={viewModel.asyncLoading}
                onRemoveUser={this.removeUser}
                onInputChange={this.onInputChange}
                onAddUserAsync={this.addUserAsync}
            />
        );
    }
}
