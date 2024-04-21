export class PremiumModel {


    public subscribe = async (price: number) => {
        const apiPath: string = process.env.API_HOST || 'http://localhost:3001';
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
        const apiPath: string = process.env.API_HOST || 'http://localhost:3001';
        await fetch(`${apiPath}/subscription/unsubscribe`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "authorization": localStorage.getItem('token') || ''
            }
        });
    };
}