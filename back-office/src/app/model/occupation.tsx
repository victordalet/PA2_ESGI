
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

}