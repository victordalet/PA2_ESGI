import {LocationResponse} from "../@types/location";

export default class LocationViewModel {

    filterByDSC(locations: LocationResponse[]): LocationResponse[] {
        return locations.sort((a, b) => {
            return b.price - a.price;
        });
    }

    filterByASC(locations: LocationResponse[]): LocationResponse[] {
        return locations.sort((a, b) => {
            return a.price - b.price;
        });
    }

    filterLocationByNameOrDescription(locations: LocationResponse[], text: string): LocationResponse[] {
        return locations.filter((l) => {
            return l.name.includes(text);
        });
    }

    filterLocationByCity(locations: LocationResponse[], text: string): LocationResponse[] {
        return locations.filter((l) => {
            return l.address.includes(text);
        });
    }

    filterLocationByCapacity(locations: LocationResponse[], text: number): LocationResponse[] {
        return locations.filter((l) => {
            return l.capacity >= text;
        });
    }

    filterLocationByType(locations: LocationResponse[], selected: any[]): LocationResponse[] {
        if (selected.length === 0) return locations;
        return locations.filter((l) => {
            if (l.icons === undefined) return l;
            return l.icons.includes(selected[0].value);
        });

    }

}