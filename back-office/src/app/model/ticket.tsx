export class TicketModel {

    public getData = async () => {
        const apiPath = process.env.API_HOST || "https://apipcs.c2smr.fr";
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
