import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps} from '../@types/language';
import View from '../views/language';

@observer
export default class LanguageControllers extends Component<
    ControllerProps
> {


    postFile = async () => {
        const element = document.querySelector<HTMLInputElement>("#file");
        const file = element?.files?.[0];

        const formData = new FormData();
        formData.append('file', file as string | Blob);
        const apiPath: string = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/language/' + file?.name, {
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
