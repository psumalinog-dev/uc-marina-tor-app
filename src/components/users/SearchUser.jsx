import { Component } from "react";

class SearchUser extends Component {
    render() {

        const {
            value,
            onChange
        } = this.props;

        return (

            <div className="input-group">

                <span className="input-group-text">

                    <i className="bi bi-search"></i>

                </span>

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search user by first name, last name or username..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />

            </div>

        );

    }
}

export default SearchUser;