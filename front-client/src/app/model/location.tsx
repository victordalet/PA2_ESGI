export class LocationModel {

    public fetchLocation = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        const res = await fetch(apiPath + "/location", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        return await res.json();
    };

}
