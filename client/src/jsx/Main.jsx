import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Home.jsx";
import Courses from "./Courses.jsx";
import Posts from "./Posts.jsx";
import Publish from "./Publish.jsx";
import Info from "./Info.jsx";
import Post from "./Post.jsx";
import User from "./User.jsx";
import Draft from "./Draft.jsx";
import Edit from "./Edit.jsx";

import { current } from "api/Users_api.js";

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gravatar_hash: "",
            is_login: false,
            userId: "",
        };
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
                                <a href="mailto:nthu.coursinfo@gmail.com">
                                    支援
                                </a>
                            </li>
                            {this.state.is_login ? (
                                <li className="rightItem link">
                                    <Link to="/userhome">
                                        Account
                                        <img
                                            src={`https://www.gravatar.com/avatar/${this.state.gravatar_hash}?d=identicon&r=g&s=48`}
                                        />
                                    </Link>
                                </li>
                            ) : (
                                ""
                            )}

                            {!this.state.is_login ? (
                                <li className="rightItem link">
                                    <a
                                        className="popup"
                                        data-target="#loginPopup"
                                        href="#"
                                    >
                                        登入
                                    </a>
                                </li>
                            ) : (
                                ""
                            )}

                            <li>
                                <button id="navBtn" className="btnToggle">
                                    <i className="fas fa-bars"></i>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div id="loginPopup" className="popupContent">
                    <div className="popupWindow">
                        <h3>
                            登入 <i className="close fas fa-times"></i>
                        </h3>
                        <div className="loginContent">
                            <span>請使用 NTHU gapp 帳號登入</span>
                            <div
                                className="btnGroup"
                                onClick={() => {
                                    document
                                        .querySelector("#loginPopup")
                                        .classList.remove("active");
                                }}
                            >
                                <a href="https://coursinfo.herokuapp.com/auth/google">
                                    <i className="fab fa-google"></i>
                                    使用 Google 繼續
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <Route exact path="/" render={() => <Home />} />
                <Route path="/courses" render={() => <Courses />} />
                <Route path="/posts" render={() => <Posts />} />
                <Route path="/publish" render={() => <Publish />} />
                <Route path="/info" render={() => <Info />} />
                <Route path="/userpost" render={() => <Post />} />
                <Route path="/userhome" render={() => <User />} />
                <Route path="/userdraft" render={() => <Draft />} />
                {/* <Route path="/editdraft" render={() => <Edit />} /> */}
                <footer>
                    Copyright &copy; 2020 Skyline and 憶純晃晃. All Rights
                    Reserved.
                </footer>
            </Router>
        );
    }

    componentDidMount() {
        this.askid();
        let popupBtns = document.querySelectorAll(".popup");
        popupBtns.forEach((pop) => {
            let popContent = document.querySelector(pop.dataset.target);

            pop.addEventListener("click", () => {
                popContent.classList.add("active");
            });
        });

        let popupContents = document.querySelectorAll(".popupContent");
        popupContents.forEach((pc) => {
            pc.querySelector(".close").addEventListener("click", () => {
                pc.classList.remove("active");
            });
        });
    }

    askid() {
        current().then((user) => {
            this.setState(
                {
                    gravatar_hash: user[0].gravatar_hash,
                    userId: user[0].id,
                },
                () => {
                    this.setState({
                        is_login: this.state.userId ? true : false,
                    });
                }
            );
        });
    }
}
