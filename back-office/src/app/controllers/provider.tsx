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

export default class ProviderController extends Component<
    ControllerProps,
    ControllerState> {

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
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
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/job', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data: ServiceResponse[] = await response.json();
        this.setState({service: data});
    };

    public getLocationsOccupationAdminInfo = async () => {
        const apiPath = process.env.API_PATH || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/location/occupation-service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            }
        });
        let data: UserRequest[] = await response.json();
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

    public reservedService = async () => {
        const locationOccupationId = (document.getElementById('location-occupation') as HTMLSelectElement).value;
        const serviceId = (document.getElementById('service') as HTMLSelectElement).value;
        const fromDatetime = (document.getElementById('from-datetime') as HTMLSelectElement).value;
        const toDatetime = (document.getElementById('to-datetime') as HTMLSelectElement).value;
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        await fetch(apiPath + '/service/service-by-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_occupation_id: locationOccupationId,
                service_id: serviceId,
                from_datetime: fromDatetime,
                to_datetime: toDatetime
            })
        });
        document.location.reload();
    };

    private getProvider = () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        fetch(apiPath + "/service", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        }).then((r) => {
            r.json().then((data: ProviderInfoTable[]) => {
                this.setState({
                    provider: data,
                    providerNoFilter: data
                });
            });
        });
    };


    render() {
        return <ProviderView
            eventCalendar={this.state.eventCalendar}
            reservedService={this.reservedService}
            filterUserByService={this.filterUserByService}
            user={this.state.user}
            provider={this.state.provider}
            service={this.state.service}
            updateCalendar={this.updateCalendar}/>;
    }
}