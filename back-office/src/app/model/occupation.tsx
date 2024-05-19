export class OccupationModel {

    public getLocationsOccupationAdminInfo = async () => {
        const apiPath = process.env.API_PATH || 'http://localhost:3001';
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
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
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

}