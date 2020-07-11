import React from "react";

export default class Category extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        let buttons = document.querySelectorAll("aside table tbody tr");

        buttons.forEach((tr) => {
            tr.addEventListener("click", function () {
                this.querySelector("svg").classList.toggle("checked");
            });
        });
    }

    render() {
        return (
            <aside>
                <table>
                    <colgroup>
                        <col className="check" />
                        <col className="secondary" />
                        <col className="primary" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
                            <th>代號</th>
                            <th>系所</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            onClick={() => {
                                this.props.handleinput("CL");
                            }}
                        >
                            <td>
                                <svg
                                    className="svg-icon checked"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill="none"
                                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                                    ></path>
                                </svg>
                            </td>
                            <td>CL</td>
                            <td>中文系</td>
                        </tr>
                        <tr
                            onClick={() => {
                                this.props.handleinput("CS");
                            }}
                        >
                            <td>
                                <svg
                                    className="svg-icon checked"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill="none"
                                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                                    ></path>
                                </svg>
                            </td>
                            <td>CS</td>
                            <td>資工系</td>
                        </tr>
                        <tr
                            onClick={() => {
                                this.props.handleinput("EE");
                            }}
                        >
                            <td>
                                <svg
                                    className="svg-icon checked"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill="none"
                                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                                    ></path>
                                </svg>
                            </td>
                            <td>EE</td>
                            <td>電機系</td>
                        </tr>
                        <tr
                            onClick={() => {
                                this.props.handleinput("EECS");
                            }}
                        >
                            <td>
                                <svg
                                    className="svg-icon checked"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill="none"
                                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                                    ></path>
                                </svg>
                            </td>
                            <td>EECS</td>
                            <td>電資院學士班</td>
                        </tr>
                        <tr
                            onClick={() => {
                                this.props.handleinput("FL");
                            }}
                        >
                            <td>
                                <svg
                                    className="svg-icon checked"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill="none"
                                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                                    ></path>
                                </svg>
                            </td>
                            <td>FL</td>
                            <td>外語系</td>
                        </tr>
                        <tr
                            onClick={() => {
                                this.props.handleinput("GE");
                            }}
                        >
                            <td>
                                <svg
                                    className="svg-icon checked"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill="none"
                                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                                    ></path>
                                </svg>
                            </td>
                            <td>GE</td>
                            <td>通識中心</td>
                        </tr>
                        <tr
                            onClick={() => {
                                this.props.handleinput("GEC");
                            }}
                        >
                            <td>
                                <svg
                                    className="svg-icon checked"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill="none"
                                        d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                                    ></path>
                                </svg>
                            </td>
                            <td>GEC</td>
                            <td>通識核心</td>
                        </tr>
                    </tbody>
                </table>
            </aside>
        );
    }
}
