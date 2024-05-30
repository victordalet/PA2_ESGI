export class ResaModel {


    public getLocationsOccupationNotifInfo = async () => {
        const apiPath = process.env.API_PATH || 'https://apipcs.c2smr.fr';
        const response = await fetch(`${apiPath}/location/occupation-service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            }
        });
        let data: any[] = await response.json();
        data = data.filter((user) => user.status === 'good' && user.user_email === localStorage.getItem('email'));
        return data;
    };

    public getLocation = async () => {
        const apiPath = process.env.API_HOST || "https://apipcs.c2smr.fr";
        const response = await fetch(apiPath + "/location/get-location-occupation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        const data = await response.json();
        return data;
    };
}
