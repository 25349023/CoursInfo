import React from "react";

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
                        <a href="#">發表心得</a>
                    </li>
                    <li>
                        <a href="#">討論區</a>
                    </li>
                    <li>
                        <a href="#">筆記＆考古</a>
                    </li>
                    <li>
                        <a href="#">設定</a>
                    </li>
                    <li>
                        <a href="#">OtherA</a>
                    </li>
                    <li>
                        <a href="#">OtherB</a>
                    </li>
                </ul>
            </aside>
        );
    }
}
