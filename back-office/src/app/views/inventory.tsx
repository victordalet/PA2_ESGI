import React from "react";
import {ViewProps} from "../@types/inventory";
import {Navbar} from "../../components/navbar";
import {MapComponents} from "../../components/map";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from 'moment';

export class InventoryView extends React.Component<ViewProps> {


    render() {

        const {
            inventory,
            inventoryState,
            addInventory,
            generatePDF
        } = this.props;
        const now = momentLocalizer(moment);

        return (
            <div>
                <Navbar/>
                <div className={"container-services-global"}>
                    <h1>Inventory</h1>
                    <div className={"calendar"}>
                        <Calendar
                            localizer={now}
                            events={inventory.map((i, index) => {
                                return {
                                    start: new Date(i.state_place),
                                    end: new Date(i.state_place).setHours(new Date(i.state_place).getHours() + 1),
                                    title: `${i.user_email} \n ${i.city}`
                                };
                            })}
                            startAccessor="start"
                            endAccessor="end"
                            style={{height: 500}}/>
                    </div>
                    <div className={"map"}>
                        <MapComponents dataCoordinate={inventory.map(i => {
                            return {
                                lat: i.latitude,
                                long: i.longitude,
                                city: `${i.user_email}-${new Date(i.state_place).toLocaleDateString()}`
                            };
                        })}/>
                    </div>
                    <div className={"form-inventory"}>
                        <h2>Add Inventory</h2>
                        <select>
                            {
                                inventory.map(i => {
                                    return <option value={i.user_email}>{i.user_email}</option>;
                                })
                            }
                        </select>
                        <div className={"form-inventory__input"}>
                            <input type="text" placeholder={"Material"}/>
                            <input type="text" placeholder={"State"}/>
                            <input type="text" placeholder={"Description"}/>
                            <button onClick={addInventory}>Add</button>
                        </div>
                        <button onClick={generatePDF}>Generate PDF</button>
                    </div>
                </div>
            </div>
        );
    }
}