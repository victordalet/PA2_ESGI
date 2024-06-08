import {ControllerProps, ControllerState, Inventory} from "../@types/inventory";
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
        inventory: [],
        inventoryState: []
    };

    private getInventory = async () => {
        let inventory = await this.inventoryModel.getInventory();
        inventory = inventory.filter((item) => item.status === 'accepted' && new Date(item.state_place) > new Date());
        this.setState({inventory});
    };

    public addInventory = async () => {
        const name = document.querySelector('input[placeholder="Material"]') as HTMLInputElement;
        const state = document.querySelector('input[placeholder="State"]') as HTMLInputElement;
        const description = document.querySelector('input[placeholder="Description"]') as HTMLInputElement;
        const inventory = {
            name: name.value,
            state: state.value,
            description: description.value
        };
        this.setState({inventoryState: [...this.state.inventoryState, inventory]});
        name.value = '';
        state.value = '';
        description.value = '';
    };

    public generatePDF = async () => {
        await this.inventoryViewModel.generatePDF(this.state.inventoryState);
    };

    render() {
        return (
            <InventoryView
                generatePDF={this.generatePDF}
                addInventory={this.addInventory}
                inventoryState={this.state.inventoryState}
                inventory={this.state.inventory}
            />
        );
    }
}