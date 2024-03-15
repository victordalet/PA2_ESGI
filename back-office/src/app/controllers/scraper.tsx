import {observer} from "mobx-react";
import {Component} from "react";
import {ControllerProps, ControllerState} from "../@types/scraper";
import {haveToken} from "../../security/token";
import ScraperView from "../views/scraper";
import {Navbar} from "../../components/navbar";
import ScraperViewModel from "../view-models/scraper";

@observer
export default class Controllers extends Component<
    ControllerProps,
    ControllerState
> {


    private scraperViewModel: ScraperViewModel;


    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.getType();
        this.scraperViewModel = new ScraperViewModel();
    }


    state: ControllerState = {
        types: []
    };


    private getType = async () => {
        const apiPath = process.env.SCRAPER_HOST || 'http://localhost:3005';
        const response = await fetch(apiPath + '/type');
        const data = await response.json();
        this.setState({
            types: data
        });
    };

    public scrape = async () => {
        const selectInput = document.querySelector('select') as HTMLSelectElement;
        const selectInputNbMax = document.querySelector('input') as HTMLInputElement;
        const type = selectInput.value;
        const nbMax = selectInputNbMax.value;
        const apiPath = process.env.SCRAPER_HOST || 'http://localhost:3005';
        this.scraperViewModel.openPopup();
        await fetch(apiPath + '/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({type: type, nb_max: nbMax})
        });
    };


    render() {
        if (this.state.types.length === 0) {
            return <Navbar/>;
        }

        return <ScraperView
            scrape={this.scrape}
            types={this.state.types}/>;
    }

}