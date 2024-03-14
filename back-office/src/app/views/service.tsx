import { resultData, ViewProps } from "../@types/service";
import React from "react";
import { Navbar } from "../../components/navbar";
import { Table } from "../../components/table";

export default class ServiceView extends React.Component<ViewProps> {
  render() {
    const { data } = this.props;

    return (
      <div>
        <Navbar />
        <div className="container-user">
          <h2>Service</h2>
          <div className="container-filter">
            <input type="text" id={"search"} placeholder="A definir..." />
            <input type={"text"} id={"role"} placeholder={"a Definir..."} />
            <div className="premium-checkbox"></div>
          </div>
        </div>
        <Table
          head={["by", "name", "price", "duration", "nb utilisation"]}
          body={data.map((d: resultData) => [
            d.created_by,
            d.name,
            d.price.toString(),
            d.duration.toString(),
            d.nb_use.toString(),
          ])}
        />
      </div>
    );
  }
}
