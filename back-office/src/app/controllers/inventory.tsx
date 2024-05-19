import {ControllerProps, ControllerState} from "../@types/inventory";
import React from "react";
import {InventoryView} from "../views/inventory";
import {InventoryModel} from "../model/inventory";
import InventoryViewModel from "../view-models/inventory";

export default class InventoryController extends React.Component<ControllerProps, ControllerState> {

    inventoryModel: InventoryModel;
    inventoryViewModel: InventoryViewModel;

    constructor(props: ControllerProps) {
        super(props);
        this.inventoryModel = new InventoryModel();
        this.getInventory();
        this.inventoryViewModel = new InventoryViewModel();
        this.inventoryViewModel.mapSizeBug();
    }

    state: ControllerState = {
        inventory: []
    };

    private getInventory = async () => {
        let inventory = await this.inventoryModel.getInventory();
        inventory = inventory.filter((item) => item.status === 'accepted' && new Date(item.state_place) > new Date());
        this.setState({inventory});
    };

    render() {
        return (
            <InventoryView
                inventory={this.state.inventory}
            />
        );
    }
}