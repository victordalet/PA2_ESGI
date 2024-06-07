import {SubElement} from "../@types/element";

export class ElementModel {

    public postJob = async () => {
        const apiPath = process.env.API_PATH || 'https://apipcs.c2smr.fr';
        const name = document.querySelector<HTMLInputElement>('#job-name')?.value;
        const file = document.querySelector<HTMLInputElement>('#picture-input-job');
        const formData = new FormData();
        if (file?.files) {
            formData.append('picture', file.files[0]);
        }

        await fetch(`${apiPath}/job`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name
            })
        });

        await fetch(`${apiPath}/picture`, {
            method: "POST",
            headers: {
                'authorization': localStorage.getItem('token') || ''
            },
            body: formData
        });
        document.location.reload();
    };

    public postElement = async () => {
        const apiPath = process.env.API_PATH || 'https://apipcs.c2smr.fr';
        const name = document.querySelector<HTMLInputElement>('#é')?.value;
        const file = document.querySelector<HTMLInputElement>('#picture-input-element');
        const formData = new FormData();
        if (file?.files) {
            formData.append('picture', file.files[0]);
        }

        await fetch(`${apiPath}/type_location`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                type_location: name
            })
        });

        await fetch(`${apiPath}/picture`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: formData
        });
        document.location.reload();
    };

    public updatePrice = async (name: string) => {
        const price = document.querySelector<HTMLInputElement>(`#price-${name}`)?.value;
        const apiPath = process.env.API_PATH || 'https://apipcs.c2smr.fr';
        await fetch(`${apiPath}/subscription/price`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                price: price,
                name: name
            })
        });
        document.location.reload();
    };

    public updateRules = async (name: string) => {
        const apiPath = process.env.API_PATH || 'https://apipcs.c2smr.fr';
        const free = document.querySelector<HTMLInputElement>(`#free-${name}`)?.value;
        const reduce = document.querySelector<HTMLInputElement>(`#reduce-${name}`)?.value;
        await fetch(`${apiPath}/subscription/rules`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                free: free,
                reduce: reduce,
                name: name
            })
        });
        document.location.reload();
    };

    public getLastPrice = async () => {
        const apiPath = process.env.API_PATH || 'https://apipcs.c2smr.fr';
        const response = await fetch(`${apiPath}/subscription/price`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            }
        });
        const data: SubElement[] = await response.json();
        const inputPrice1 = document.querySelector<HTMLInputElement>('#price-bag');
        const inputPrice2 = document.querySelector<HTMLInputElement>('#price-explo');
        const inputReduce1 = document.querySelector<HTMLInputElement>('#reduce-bag');
        const inputReduce2 = document.querySelector<HTMLInputElement>('#reduce-explo');
        const inputFree1 = document.querySelector<HTMLInputElement>('#free-bag');
        const inputFree2 = document.querySelector<HTMLInputElement>('#free-explo');
        const inputPrice3 = document.querySelector<HTMLInputElement>('#price-job');
        if (inputPrice1 && inputPrice2 && inputReduce1 && inputReduce2 && inputFree1 && inputFree2 && inputPrice3) {
            inputPrice1.value = data[0].price.toString();
            inputPrice2.value = data[1].price.toString();
            inputFree1.value = data[0].free.toString();
            inputFree2.value = data[1].free.toString();
            inputReduce1.value = data[0].reduce.toString();
            inputReduce2.value = data[1].reduce.toString();
            inputPrice3.value = data[2].price.toString();
        }
    };
}