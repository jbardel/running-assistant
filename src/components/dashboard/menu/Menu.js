import React from 'react'
import {
    Link
} from "react-router-dom";

class Menu extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedIndex: null,
        }

    }

    render() {

        return (
            <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="position-sticky pt-3">
                        <ul className="nav flex-column">
                            {
                                this.props.list?.map((file, index) => {

                                    let active = this.state.selectedIndex === index ? "nav-link active" : "nav-link"
                                    return (<li className="nav-item" key={index}>
                                        <Link className={active} to={"/detail/" + file} onClick={(_ => this.selectItem(index))}>{file}</Link>
                                    </li>)
                                })
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }

    selectItem(id) {
        this.setState({
            selectedIndex: id,
        })
    }

}

export default Menu;