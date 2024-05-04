import {FormLocation, locationType, YoloResponse} from "../@types/location";

export class LocationModel {

    public validationCaptcha = (value: any) => {
        console.log(value);
    };


    public createLocation = async (data: FormLocation, locationTypes: string) => {
        if (data.description === '') {
            return;
        }
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const res = await fetch(`${apiPath}/location`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                created_by: data.email,
                name: document.querySelector<HTMLInputElement>('#title-location')?.value || '',
                description_json: JSON.stringify(data),
                description: data.description,
                address: data.address,
                latitude: 0,
                longitude: 0,
                capacity: data.numberRoom,
                price: 100,
                type: data.typeLocation,
                icons: locationTypes
            })
        });
        return await res.json();
    };

    public associateLocationToUser = async (id: number, locationTypeId: number) => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        await fetch(`${apiPath}/type_location/associate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                id: id,
                type_location: locationTypeId
            })
        });
    };

    public uploadImage = async (id: number) => {
        const file = (document.getElementById("image") as HTMLInputElement).files;
        if (file) {
            const formData = new FormData();
            formData.append('file', file[0]);
            formData.append('picture', `location-${id.toString()}`);
            const apiPath = process.env.API_HOST || 'http://localhost:3001';
            await fetch(`${apiPath}/picture`, {
                method: "POST",
                headers: {
                    'authorization': localStorage.getItem('token') || ''
                },
                body: formData
            });
            document.location.href = "/resources";
        }
    };

    public getPredictYolo = async () => {
        const apiPath = process.env.YOLO_ESTIMATOR_PORT || 'http://localhost:3006';
        const imageElement = (document.getElementById("image-file-to-yolo") as HTMLInputElement).files;
        const formData = new FormData();
        if (imageElement) {
            formData.append('image', imageElement[0]);
            const response = await fetch(`${apiPath}/predict`, {
                method: 'POST',
                body: formData
            });
            const data: YoloResponse = await response.json();
            document.getElementById('price-estimate-by-yolo')!.innerText = `Estimate Price: ${data.price.toString()} €`;
            const body = document.querySelector<HTMLElement>('.container-yolo-image-result');
            if (body) {
                body.style.backgroundImage = `url(data:image/png;base64,${data.image})`;
            }
        }
    };


}
