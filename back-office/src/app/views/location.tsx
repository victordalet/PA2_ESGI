import { DataResponse, ViewProps } from "../@types/location";
import React from "react";
import { Navbar } from "../../components/navbar";
import { Table } from "../../components/table";

export default class LocationView extends React.Component<ViewProps> {
  render() {
    const { data } = this.props;

    return (
      <div>
        <Navbar />
        <div className="container-user">
          <h2>Location</h2>
          <div className="container-filter">
            <input
              type="text"
              id={"search"}
              placeholder="A definir..."
            />
            <input type={"text"} id={"definir"} placeholder={"A definir..."} />
            <div className="">
              
            </div>
          </div>
        </div>
        <Table
          head={[
            "created by",
            "name",
            "price",
            "is_occupy_by",
            "address",
            "capacity",
            "type",
          ]}
          body={data.map((el: DataResponse) => [
            el.created_by,
            el.name,
            el.price.toString(),
            el.is_occupy_by,
            el.address,
            el.capacity.toString(),
            el.type,
          ])}
        />
      </div>
    );
  }
}
