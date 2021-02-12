import React from 'react'

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
                                        <a className={active} href="#" onClick={(event => this.selectItem(index, file, event))} >
                                            {file}
                                        </a>
                                    </li>)
                                })
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }

    selectItem(id, file, event) {
        event.preventDefault()

        this.setState({
            selectedIndex: id,
        })

        this.props.onFileChange(file)
    }

}

export default Menu;