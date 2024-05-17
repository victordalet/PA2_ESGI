import {Subscription, SubscriptionUtilisation} from "../@types/reserve";

export class ReserveModel {

    private readonly idResa: number;
    private readonly apiSubPath: string;
    private readonly id: number;
    private price = 0;

    constructor(idResa: number, apiSubPath: string, id: number) {
        this.idResa = idResa;
        this.apiSubPath = apiSubPath;
        this.id = id;
    }

    public setPrice(price: number){
        this.price = price;
    }

    public getLocationsOccupationRequestInfor = async () => {
        const apiPath = process.env.API_PATH || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/location/occupation-service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            }
        });
        return await response.json();
    };

    public getServiceByLocationId = async () => {
        const apiPath = process.env.API_PATH || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/service/get-service-by-user-v2`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_occupation_id: this.idResa
            })
        });
        return await response.json();
    };


    public sendRequestService = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const name = document.querySelector<HTMLInputElement>('#service-name')?.value;
        let desc = document.querySelector<HTMLInputElement>('#service-description')?.value;
        if (name === 'taxi') {
            const start = document.querySelector<HTMLInputElement>('#service-taxi-start')?.value;
            const arrival = document.querySelector<HTMLInputElement>('#service-taxi-stop')?.value;
            const arrivalTime = document.querySelector<HTMLInputElement>('#service-taxi-arrival')?.value;
            desc += ' ' + start + ' ' + arrival + ' ' + arrivalTime;
        }
        await fetch(apiPath + '/location/add-occupation-service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_occupation_id: this.idResa,
                service_name: name,
                user_email: localStorage.getItem('email'),
                description: document.querySelector<HTMLSelectElement>('#service-time')?.value + ' ' + desc,
                city: document.querySelector<HTMLElement>('#location-city')?.innerHTML,
            }),
        });
        document.location.reload();
    };


    public deleteLocation = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        await fetch(apiPath + this.apiSubPath + "/" + this.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        document.location.href = "/location";
    };


    public isBail = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        const response = await fetch(apiPath + "/user/token-to-mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        const data: { email: string } = await response.json();
        return data;
    };

    public fetchLocation = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        const response = await fetch(apiPath + this.apiSubPath, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        return await response.json();
    };

    public addNotation = async (note: number) => {
        const API_PATH = process.env.API_HOST || "http://localhost:3001";
        await fetch(API_PATH + this.apiSubPath + "/add-notation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
            body: JSON.stringify({
                location_id: this.idResa,
                notation: note,
            }),
        });
    };

    public isAlsoReserved = async (idResa: number) => {
        const API_PATH = process.env.API_HOST || "http://localhost:3001";
        return await fetch(API_PATH + this.apiSubPath + "/is-occupied-by-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
            body: JSON.stringify({
                location_id: idResa,
            }),
        });

    };

    public isOccupied = async (dateStart: string, dateEnd: string) => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        const response = await fetch(apiPath + this.apiSubPath + "/is-occupied", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
            body: JSON.stringify({
                location_id: this.id,
                from_datetime: dateStart,
                to_datetime: dateEnd,
            }),
        });
        return await response.json();
    };

    public getOccupationEvent = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        const response = await fetch(
            apiPath + this.apiSubPath + "/get-occupation",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token") || "",
                },
                body: JSON.stringify({
                    location_id: this.id,
                }),
            }
        );
        return await response.json();
    };

    public postFileBail = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const file = document.querySelector<HTMLInputElement>('#file-input');
        if (file && file.files) {
            const formData = new FormData();
            formData.append('file', file.files[0]);
            const name = `location-${this.id}-${file.files[0].name}`;
            formData.append('name', name);
            await fetch(`${apiPath}/file`, {
                method: 'POST',
                headers: {
                    'authorization': localStorage.getItem('token') || ''
                },
                body: formData
            });
            document.location.reload();
        }
    };

    public getNameFileBail = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/file/get-name-files`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                file: `location-${this.id}`
            })
        });
        return await response.json();
    };

    public downloadFileBail = async (name: string) => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/file&name=${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data = await response.blob();
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
    };


    public getStartNotation = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        const r = await fetch(apiPath + this.apiSubPath + "/get-notation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
            body: JSON.stringify({
                location_id: this.id,
            }),
        });
        return await r.json();
    };


    public getMessages = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        const response = await fetch(apiPath + this.apiSubPath + "/get-messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
            body: JSON.stringify({
                location_id: this.idResa,
            }),
        });
        return await response.json();
    };

    public addMessage = async () => {
        const message = document.querySelector<HTMLInputElement>("#message-input");
        if (message !== null) {
            const apiPath = process.env.API_HOST || "http://localhost:3001";
            await fetch(apiPath + this.apiSubPath + "/add-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token") || "",
                },
                body: JSON.stringify({
                    location_occupation_id: this.idResa,
                    message: message.value,
                }),
            });
            await this.getMessages();
            message.value = "";
        }
    };

    public deleteOccupation = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        await fetch(apiPath + this.apiSubPath + "/occupation", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
            body: JSON.stringify({
                location_id: this.idResa
            })
        });
        document.location.href = "/location";
    };


    public deleteOccupationBail = async (type: number) => {
        let idLocation = '';
        if (type == 1) {
            idLocation = document.querySelector<HTMLInputElement>('#message-select')?.value || '';
        } else if (type == 2) {
            idLocation = document.querySelector<HTMLInputElement>('#delete-location')?.value || '';
        }
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        await fetch(apiPath + this.apiSubPath + '/occupation', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_id: idLocation
            })
        });
        document.location.reload();
    };

    public fetchIsSubscribed = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/subscription/is_subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            }
        });
        const data: Subscription[] = await response.json();
        if (data.length === 0) {
            return 0;
        }
        return data[0].price;
    };

    public fetchLastDateFreeService = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/subscription/last_date_free_service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data: SubscriptionUtilisation[] = await response.json();
        if (data.length === 0) {
            const dateToReturn = new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000;
            return new Date(dateToReturn).toISOString().split('T')[0];
        }
        return data.sort((a, b) => new Date(b.last_date_free_service).getTime() - new Date(a.last_date_free_service).getTime())[0].last_date_free_service;
    };

    public fetchMessagesForBail = async () => {
        const idLocation = document.querySelector<HTMLInputElement>('#message-select')?.value;
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + this.apiSubPath + '/get-messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_id: idLocation
            })
        });
        return await response.json();
    };

    public postMessageForBail = async () => {
        const idLocation = document.querySelector<HTMLInputElement>('#message-select')?.value;
        const message = document.querySelector<HTMLInputElement>('#message-input');
        if (message !== null) {
            const apiPath = process.env.API_HOST || 'http://localhost:3001';
            await fetch(apiPath + this.apiSubPath + '/add-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token') || ''
                },
                body: JSON.stringify({
                    location_occupation_id: idLocation,
                    message: 'Concierge : ' + message.value
                })
            });
            message.value = '';
            document.location.reload();
        }
    };

    public fetchServiceReserved = async () => {
        if (this.idResa === 0) {
            return;
        }
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        const response = await fetch(apiPath + "/service/get-service-by-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
            body: JSON.stringify({
                location_id: this.id,
                location_occupation_id: this.idResa,
            }),
        });
        return await response.json();
    };

    public fetchJob = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/job', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            }
        });
        return await response.json();
    };

    public verifIsAdmin = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        const response = await fetch(apiPath + "/user/isAdmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        return await response.json();

    };

    public locationsPaiement = async () => {
        const apiPath = process.env.API_PATH || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/location/location-paiement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                id: this.id
            })
        });
        const data = await response.json();
        window.open(data.url, '_blank');
    };

    public locationOccupationPaiement = async () => {
        const apiPath = process.env.API_PATH || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/location/location-occupation-paiement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                id: this.idResa,
                price: this.price
            })
        });
        const data = await response.json();
        window.open(data.url, '_blank');
    };

    
}
