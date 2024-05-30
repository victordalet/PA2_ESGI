export class OccupationModel {

    public getLocationsOccupationAdminInfo = async () => {
        const apiPath = process.env.API_PATH || 'https://apipcs.c2smr.fr';
        const response = await fetch(`${apiPath}/location/occupation-info-admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return await response.json();
    };

    public downloadFolderClientOccupation = async (location_occupation_id: number) => {
        const apiPath = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        const response = await fetch(`${apiPath}/file/get-name-files`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                file: `location-occupation-${location_occupation_id}`
            })
        });
        const data = await response.json();
        for (const file of data.data) {
            const response = await fetch(`${apiPath}/file&name=${file}`, {
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
            a.download = file;
            a.click();
        }
    };

    public acceptLocationOccupation = async () => {
        const location_occupation_id = parseInt(window.localStorage.getItem('location_occupation_id') || '');
        const from = (document.querySelector<HTMLInputElement>('#input-start-time') as HTMLInputElement).value;
        const to = (document.querySelector<HTMLInputElement>('#input-end-time') as HTMLInputElement).value;
        const state = (document.querySelector<HTMLInputElement>('#input-state-time') as HTMLInputElement).value;
        const apiPath = process.env.API_PATH || 'https://apipcs.c2smr.fr';
        await fetch(`${apiPath}/location/accept-location-occupation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_occupation_id: location_occupation_id,
                from_datetime: from,
                to_datetime: to,
                state_place: state,
                email: window.localStorage.getItem('email'),
                name: window.localStorage.getItem('name')
            })
        });
        document.location.reload();
    };

    public refuseLocationOccupation = async (location_occupation_id: number) => {
        const apiPath = process.env.API_PATH || 'https://apipcs.c2smr.fr';
        await fetch(`${apiPath}/location/remove-location-occupation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_occupation_id: location_occupation_id
            })
        });
    };

}