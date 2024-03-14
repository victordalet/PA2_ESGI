import { resultData, ViewProps } from "../@types/user";
import React from "react";
import { Navbar } from "../../components/navbar";
import { Table } from "../../components/table";

export default class UserView extends React.Component<ViewProps> {
  render() {
    const { data } = this.props;

    return (
      <div>
        <Navbar />
        <div className="container-user">
          <h2>User</h2>
          <div className="container-filter">
            <input
              type="text"
              id={"search"}
              placeholder="Entrée votre mail..."
            />
            <input type={"text"} id={"role"} placeholder={"role..."} />
            <div className="premium-checkbox">
              <label htmlFor="premium">Premium</label>
              <input
                type="checkbox"
                name="premium"
                id="premium"
                value="premium"
              />
            </div>
          </div>
        </div>
        <Table
          body={data.map((el: resultData) => [
            el.email,
            el.rules,
            el.address,
            el.premium.toString(),
          ])}
          head={["mail", "role", "address", "premium"]}
        />
      </div>
    );
  }
}
