export class MessageModel {

    public addIllegibleMessage = (addInput: string) => {
        const apiPath = process.env.API_HOST || "https://apipcs.c2smr.fr";
        fetch(apiPath + "/message/illegible", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
            body: JSON.stringify({
                word: addInput,
            }),
        }).then((r) => {
            document.location.reload();
        });
    };

    public getIllegibleMessage = async () => {
        const apiPath = process.env.API_HOST || "https://apipcs.c2smr.fr";
        const res = await fetch(apiPath + "/message/illegible", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        return await res.json();
    };
}
