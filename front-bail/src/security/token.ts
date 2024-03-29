import {dataConnection} from "../app/@types/Connection";

export const haveToken = () => {
    if (localStorage.getItem("token") === null || undefined) {
        document.location.href = "/login";
    } else {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        fetch(apiPath + "/user/isBail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        }).then((res) => {
            res.json().then((data: dataConnection) => {
                if (!data.connection) {
                    fetch(apiPath + '/user/isPrestataire', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': localStorage.getItem('token') || ''
                        }
                    }).then((res) => {
                        res.json().then((data: dataConnection) => {
                            if (!data.connection) {
                                document.location.href = '/login';
                            }
                        });
                    });
                }
            });
        });
    }
};


export const haveAdminToken = async () => {
    if (localStorage.getItem('token') === null || undefined) {
        document.location.href = '/login';
    } else {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/user/isAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        return response.status !== 401;
    }
};

export const havePrestataireToken = async () => {
    if (localStorage.getItem('token') === null || undefined) {
        document.location.href = '/login';
    } else {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/user/isPrestataire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        return response.status !== 401;

    }
};

export const haveBailToken = async () => {
    if (localStorage.getItem('token') === null || undefined) {
        document.location.href = '/login';
    } else {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/user/isBail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        return response.status !== 401;


    }
};
