export class ElementModel {

    public postJob = async () => {
        const apiPath = process.env.API_PATH || 'http://localhost:3001';
        const name = document.querySelector<HTMLInputElement>('#job-name')?.value;
        const file = document.querySelector<HTMLInputElement>('#picture-input-job');
        const formData = new FormData();
        if (file?.files) {
            formData.append('picture', file.files[0]);
        }

        await fetch(`${apiPath}/job`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name
            })
        });

        await fetch(`${apiPath}/picture`, {
            method: "POST",
            headers: {
                'authorization': localStorage.getItem('token') || ''
            },
            body: formData
        });
        document.location.reload();
    };

    public postElement = async () => {
        const apiPath = process.env.API_PATH || 'http://localhost:3001';
        const name = document.querySelector<HTMLInputElement>('#é')?.value;
        const file = document.querySelector<HTMLInputElement>('#picture-input-element');
        const formData = new FormData();
        if (file?.files) {
            formData.append('picture', file.files[0]);
        }

        await fetch(`${apiPath}/type_location`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                type_location: name
            })
        });

        await fetch(`${apiPath}/picture`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: formData
        });
        document.location.reload();
    };
}