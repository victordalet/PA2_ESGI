export class LocationModel {


    public fetchData = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        const response = await fetch(apiPath + "/location", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        return await response.json();
    };


    public deleteLocation = async (id: number) => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        await fetch(apiPath + "/location/admin/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        document.location.reload();
    };

    public acceptLocation = async (id: number) => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        await fetch(apiPath + "/location/admin-accept", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
            body: JSON.stringify({location_id: id}),
        });
        document.location.reload();
    };

}
