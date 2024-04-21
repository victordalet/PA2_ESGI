export class SettingsModel {


    public fetchUser = async () => {
        const apiPath: string = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": localStorage.getItem('token') || ''
            }
        });
        return await response.json();

    };

    public deleteUser = async () => {
        const apiPath: string = process.env.API_HOST || 'http://localhost:3001';
        try {
            const response = await fetch(`${apiPath}/user`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": localStorage.getItem('token') || ''
                }
            });
            if (response.ok) {
                console.log("L'utilisateur a été supprimé avec succès !");

            } else {
                console.error("La suppression de l'utilisateur a échoué.");

            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la suppression de l'utilisateur :", error);
        }
    };


}