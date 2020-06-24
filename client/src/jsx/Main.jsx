import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Home.jsx";
import CoursesAndPosts from "./Courses_posts.jsx";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <header>
                    <nav>
                        <ul id="navbar">
                            <li className="brand">
                                <Link to="/">CoursInfo</Link>
                            </li>
                            <li className="primary link">
                                <Link to="/courses">課程列表</Link>
                            </li>
                            <li className="primary link">
                                <Link to="/posts">心得</Link>
                            </li>
                            <li className="link">
                                <a href="#">關於</a>
                            </li>
                            <li className="link">
                                <a href="#">支援</a>
                            </li>
                            <li className="rightItem link">
                                <a href="#">
                                    Account
                                    <img src="images/profile.png" />
                                </a>
                            </li>
                            <li>
                                <button id="navBtn" className="btnToggle">
                                    <i className="fas fa-bars"></i>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Route exact path="/" render={() => <Home />} />
                <Route
                    path="/(courses|posts)"
                    render={() => <CoursesAndPosts />}
                />

                <footer>
                    Copyright &copy; 2020 Skyline and 憶純晃晃. All Rights
                    Reserved.
                </footer>
            </Router>
        );
    }
}
