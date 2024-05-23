export default class InventoryViewModel {

    public mapSizeBug = () => {
        setTimeout(() => {
            const ele = document.querySelector<HTMLElement>('.leaflet-container');
            if (ele) {
                ele.style.height = '100vh';
                ele.style.width = '100%';
            }
        }, 1000);
    };
}