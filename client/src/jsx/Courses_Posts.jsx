import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import Courses from "./Courses.jsx";
import Posts from "./Posts.jsx";

export default class CoursesAndPosts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section className="main">
                    <section className="courses">
                        <main>
                            <form className="searchBox">
                                <input
                                    type="text"
                                    placeholder="search for courses..."
                                />
                                <svg
                                    className="svg-icon searchIcon"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                                </svg>
                            </form>
                            <Route path="/courses" render={() => <Courses />} />
                            <Route path="/posts" render={() => <Posts />} />
                        </main>
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
                                    <tr>
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
                                    <tr>
                                        <td>
                                            <svg
                                                className="svg-icon"
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
                                    <tr>
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
                                    <tr>
                                        <td>
                                            <svg
                                                className="svg-icon"
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
                                    <tr>
                                        <td>
                                            <svg
                                                className="svg-icon"
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
                    </section>

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
                </section>
            </div>
        );
    }
}
