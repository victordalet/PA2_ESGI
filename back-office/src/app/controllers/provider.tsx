import {haveToken} from "../../security/token";
import {Component} from "react";
import {
    ControllerProps,
    ControllerState,
    EventCalendar,
    ProviderInfoTable, Schedule,
    ServiceResponse,
    UserRequest
} from "../@types/provider";
import {ProviderView} from "../views/provider";
import ProviderModel from "../model/provider";

export default class ProviderController extends Component<
    ControllerProps,
    ControllerState> {

    providerModel: ProviderModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.providerModel = new ProviderModel();
        this.fetchService();
        this.getLocationsOccupationAdminInfo();
        this.getProvider();
    }

    state: ControllerState = {
        service: [],
        provider: [],
        providerNoFilter: [],
        user: [],
        userNoFilter: [],
        eventCalendar: []
    };

    private fetchService = async () => {
        const data = await this.providerModel.fetchService();
        this.setState({service: data});
    };

    public getLocationsOccupationAdminInfo = async () => {
        let data: UserRequest[] = await this.providerModel.getLocationsOccupationAdminInfo();
        data = data.filter((user) => user.status === 'pending');
        this.setState({userNoFilter: data});
        this.setState({user: data});
        this.filterUserByService();
    };

    public filterUserByService = () => {
        const service = (document.getElementById('service') as HTMLSelectElement).value;
        let user = this.state.userNoFilter;
        let provider = this.state.providerNoFilter;
        user = user.filter((user) => user.service_name === service);
        provider = provider.filter((d) => d.description.includes(service));
        provider = provider.filter((d) => d.is_valid === 1);
        this.setState({user: user, provider: provider});
    };

    public updateCalendar = (providerId: number) => {
        const provider = this.state.provider.find((provider) => provider.id === providerId);
        const eventCalendar: EventCalendar[] = [];
        if (provider) {
            const schedule: Schedule = JSON.parse(provider.schedule);
            const days = Object.keys(schedule);
            days.forEach((day) => {
                const days = schedule[day];
                const dayNumber = this.convertDayToNumber(day);
                if (days.start !== '' && days.end !== '') {
                    const start = new Date(new Date().setDate(dayNumber)).toISOString().split('T')[0] + 'T' + days.start;
                    const end = new Date(new Date().setDate(dayNumber)).toISOString().split('T')[0] + 'T' + days.end;
                    eventCalendar.push({
                        title: 'Available',
                        start: start,
                        end: end
                    });
                }
            });
        }
        this.setState({eventCalendar: eventCalendar});
    };

    private convertDayToNumber = (dayName: string) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayNumber = new Date().getDay();
        const day = days[dayNumber];
        const dayNumberName = days.indexOf(dayName);
        const dayNumberCurrent = days.indexOf(day);
        const diff = dayNumberName - dayNumberCurrent;
        return new Date().getDate() + diff;
    };


    private getProvider = async () => {
        const data = await this.providerModel.getProvider();
        this.setState({providerNoFilter: data, provider: data});
    };


    render() {
        return <ProviderView
            eventCalendar={this.state.eventCalendar}
            reservedService={this.providerModel.reservedService}
            filterUserByService={this.filterUserByService}
            user={this.state.user}
            provider={this.state.provider}
            service={this.state.service}
            updateCalendar={this.updateCalendar}/>;
    }
}