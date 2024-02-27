import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps } from '../@types/language';
import View from '../views/language';

@observer
export default class LanguageControllers extends Component<
    ControllerProps
> {


    postFile = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const apiPath: string = process.env.API_HOST || 'http://localhost:3000';
        const response = await fetch(apiPath + '/language/' + file.name, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log(data);
    }


    render() {


        return (
            <View postFile={this.postFile}/>
        );
    }
}
