export class TicketModel {

    public getData = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        const res = await fetch(apiPath + "/ticket", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        return await res.json();
    };

}
