export class ServiceModel {

    public getData = async () => {
        const apiPath = process.env.API_HOST || "https://apipcs.c2smr.fr";
        const response = await fetch(apiPath + "/service", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        return await response.json();
    };


    public deleteService = async (id: number) => {
        const apiPath = process.env.API_HOST || "https://apipcs.c2smr.fr";
        await fetch(apiPath + "/service/admin/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        document.location.reload();
    };

    public acceptService = async (id: number) => {
        const apiPath = process.env.API_HOST || "https://apipcs.c2smr.fr";
        await fetch(apiPath + "/service/admin-accept", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
            body: JSON.stringify({
                service_id: id,
            }),
        });
        document.location.reload();
    };

}
