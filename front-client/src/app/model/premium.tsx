import {SubModel} from "../@types/premium";

export class PremiumModel {


    public subscribe = async (price: number) => {
        const apiPath: string = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        const res = await fetch(`${apiPath}/subscription/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authorization": localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                price: price
            })
        });
        const data = await res.json();
        window.open(data.url, '_blank');
    };

    public deleteSubscription = async () => {
        const apiPath: string = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        await fetch(`${apiPath}/subscription/unsubscribe`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "authorization": localStorage.getItem('token') || ''
            }
        });
    };

    public getPrice = async () => {
        const apiPath: string = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        const res = await fetch(`${apiPath}/subscription/price`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authorization": localStorage.getItem('token') || ''
            }
        });
        const data: SubModel[] = await res.json();
        setTimeout(() => {
            const spanReduceBag = document.querySelector<HTMLElement>('#reduce-bag');
            const eleFreeBag = document.querySelector<HTMLElement>('#free-bag');
            const spanReduceExplo = document.querySelector<HTMLElement>('#reduce-explo');
            const eleFreeExplo = document.querySelector<HTMLElement>('#free-explo');
            if (spanReduceBag && eleFreeBag && spanReduceExplo && eleFreeExplo) {
                spanReduceBag.innerText = data[0].reduce.toString();
                if (data[0].free == 1) {
                    eleFreeBag.classList.add("ai-circle-plus-fill");
                } else {
                    eleFreeBag.classList.add("ai-circle-minus-fill");
                }
                spanReduceExplo.innerText = data[1].reduce.toString();
                if (data[1].free == 1) {
                    eleFreeExplo.classList.add("ai-circle-plus-fill");
                } else {
                    eleFreeExplo.classList.add("ai-circle-minus-fill");
                }
            }
        }, 500);
        return data;
    };
}