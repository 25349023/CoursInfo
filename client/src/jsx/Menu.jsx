import React from "react";
import { Link } from "react-router-dom";

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <aside className="menu">
                <ul>
                    <li>
                        MENU <i className="fas fa-stream"></i>
                    </li>
                    <li>
                        <Link to="/publish">發表心得</Link>
                    </li>
                    {/* <li>
                        <a href="#">討論區</a>
                    </li>
                    <li>
                        <a href="#">筆記＆考古</a>
                    </li> */}
                    <li>
                        <Link to="/userhome">設定</Link>
                    </li>
                </ul>
            </aside>
        );
    }
}
