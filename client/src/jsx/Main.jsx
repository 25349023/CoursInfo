import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Home.jsx";
import Courses from "./Courses.jsx";
import Posts from "./Posts.jsx";
import Publish from "./Publish.jsx";
import Info from "./Info.jsx";
import Post from "./Post.jsx";
import User from "./User.jsx";
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
                                <Link to="/userhome">
                                    Account
                                    <img src="images/profile.png" />
                                </Link>
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
                <Route path="/courses" render={() => <Courses />} />
                <Route path="/posts" render={() => <Posts />} />
                <Route path="/publish" render={() => <Publish />} />
                <Route path="/info" render={() => <Info />} />
                <Route path="/userpost" render={() => <Post />} />
                <Route path="/userhome" render={() => <User />} />

                <footer>
                    Copyright &copy; 2020 Skyline and 憶純晃晃. All Rights
                    Reserved.
                </footer>
            </Router>
        );
    }
}
