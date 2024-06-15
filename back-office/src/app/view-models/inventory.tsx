import {PDFDocument, StandardFonts, rgb} from 'pdf-lib';
import {Inventory} from "../@types/inventory";
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

    public generatePDF = async (inventoryState : Inventory[]) => {
        const pdfDoc = await PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const page = pdfDoc.addPage();
        const {width, height} = page.getSize();
        let fontSize = 30;
        page.drawLine({
            start: {x: 50, y: height - 2 * fontSize},
            end: {x: width - 50, y: height - 2 * fontSize},
            thickness: 2,
            color: rgb(0, 0, 0),
        });
        page.drawText('Inventory', {
            x: width / 2 - 50,
            y: height - 50,
            size: 30,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        page.drawLine({
            start: {x: 50, y: height - 70},
            end: {x: width - 50, y: height - 70},
            thickness: 2,
            color: rgb(0, 0, 0),
        });
        fontSize = 15;
        let positionY = 5;
        inventoryState.forEach((event, index) => {
            positionY += 5;
            page.drawText(`${event.name} : ${event.state} : ${event.description}`, {
                x: 50,
                y: height - (positionY) * fontSize,
                size: fontSize,
                font: timesRomanFont,
                color: rgb(0, 0, 0),
            });
        });
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], {type: 'application/pdf'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'inventory.pdf';
        link.click();
    };
}