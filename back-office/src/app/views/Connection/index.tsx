import {PureComponent} from 'react';
import {ViewProps} from "../../@types/Connection";
import './index.scss';

export default class Connection extends PureComponent<ViewProps> {
    render() {

        const {
            testLogin,
            onInputChange
        } = this.props;

        return (
            <div className={"login-page"}>
                <div className={"container-log"}>
                    <div className={"log"}>
                        <h3>Log in</h3>
                        <form action="">
                            <input onChange={
                                onInputChange('email')
                            } className={"filed"} type="text" placeholder="Username"/>
                            <input onChange={
                                onInputChange('password')
                            } className={"filed"} type="text" placeholder="Password"/>
                        </form>


                        <button type="submit" onClick={testLogin} className={"submit"}>Log in</button>
                    </div>
                </div>
            </div>
        );
    }
}
