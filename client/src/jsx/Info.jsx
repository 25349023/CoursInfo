import React from "react";
import Menu from "./Menu.jsx";
import {
    selectCourse,
    gethistory,
    getrating,
    createrating,
} from "api/Courses_api.js";
import { current } from "api/Users_api.js";
//import { selectCourse } from "api/Courses_api.js";
import { useLocation, withRouter, Redirect } from "react-router-dom";
import { getsimplePost } from "api/Posts_api.js";
import { Link } from "react-router-dom";
import Stars from "./Stars.jsx";
export default class Info extends React.Component {
    constructor(props) {
        super(props);
        let temp = props.location.pathname;
        console.log(props.location.pathname);
        let temp1 = temp.split("/");
        temp1 = temp1[temp1.length - 1].split("-");
        this.state = {
            userId: "",
            redirect: false,
            information: [],
            pathname: temp,
            smt: temp1[0],
            dep: temp1[1],
            subnum: temp1[2],
            simplepost: [],
            course_number: "",
            course_chinese_title: "",
            credit: "",
            classroom: [],
            time: [],
            chinese_name: [],
            sweet: "",
            cool: "",
            recommend: "",
            id: "",
            historyobj: [],
            user_s: "",
            user_c: "",
            user_r: "",
        };
    }
    render() {
        let { information, simplepost } = this.state;
        let s = parseFloat(information.sweet);
        let c = parseFloat(information.cool);
        let r = parseFloat(information.recommend);
        let children = [];
        if (simplepost.length) {
            children = simplepost.map((p) => (
                <article
                    className="singlePost"
                    key={p.id}
                    onClick={() => {
                        this.setState({ redirect: true, id: p.id });
                    }}
                >
                    <h4>{p.title}</h4>
                    {/* <span className="user">{p.nickname}</span> */}
                    <p>{p.main_review.slice(0, 40)}</p>
                </article>
            ));
        }
        let historydropdown = [];
        if (this.state.historyobj.length) {
            historydropdown = this.state.historyobj.map((p) => (
                <Link
                    to={`/info/${p.semester}-${p.department}-${p.course_subnumber}`}
                    className="historyLink"
                    onClick={() => {
                        this.setState(
                            {
                                smt: p.semester,
                                dep: p.department,
                                subnum: p.course_subnumber,
                            },
                            () => {
                                this.askinfo();
                                document
                                    .querySelector("#historyPopup")
                                    .classList.remove("active");
                            }
                        );
                    }}
                >
                    <span>{p.semester}</span>
                    <span>{p.teacher.split("\t")[0]}</span>
                </Link>
            ));
        }
        if (this.state.redirect) {
            return <Redirect to={`/userpost/${this.state.id}`} />;
        }
        return (
            <div className="infoPage">
                <section className="main">
                    <section className="courseInfo">
                        <div className="wrapper">
                            <div className="title">
                                <h1>{information.course_chinese_title}</h1>
                                <h2>{this.state.chinese_name.join(" ")}</h2>
                            </div>

                            <main>
                                <div id="historyPopup" className="popupContent">
                                    <div className="popupWindow">
                                        <h3>
                                            歷年資料{" "}
                                            <i className="close fas fa-times"></i>
                                        </h3>
                                        <div className="historyContent">
                                            <div className="historyGroup">
                                                {historydropdown}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <section className="basicInfo">
                                    <h3>基本資訊</h3>
                                    <button
                                        className="popup"
                                        data-target="#historyPopup"
                                    >
                                        <i className="fas fa-history"></i>{" "}
                                        歷年資料
                                    </button>
                                    <div className="infoWrapper">
                                        <div className="item">科號</div>
                                        <div className="content">
                                            {information.course_number}
                                        </div>
                                        <div className="item">開課單位</div>
                                        <div className="content">
                                            {information.department}
                                        </div>
                                        <div className="item">學分</div>
                                        <div className="content">
                                            {information.credit}
                                        </div>
                                        <div className="item">上課時間</div>
                                        <div className="content">
                                            {this.state.time.join(" ")}
                                        </div>
                                        <div className="item">教室</div>
                                        <div className="content">
                                            {this.state.classroom.join("、")}
                                        </div>
                                    </div>
                                </section>
                                <div id="ratingPopup" className="popupContent">
                                    <div className="popupWindow">
                                        <h3>
                                            我要評分{" "}
                                            <i className="close fas fa-times"></i>
                                        </h3>
                                        <div className="ratingContent">
                                            <div className="inputGroup">
                                                <span>甜度：</span>
                                                <input
                                                    type="text"
                                                    value={
                                                        this.state.user_s
                                                            ? this.state.user_s
                                                            : ""
                                                    }
                                                    onChange={(e) => {
                                                        const text =
                                                            e.target.value;

                                                        this.setState({
                                                            user_s: text,
                                                        });
                                                    }}
                                                    pattern="[0-5](\.\d)?"
                                                    placeholder="0 ~ 5 分，例：2.6"
                                                />
                                                <span>涼度：</span>
                                                <input
                                                    type="text"
                                                    value={
                                                        this.state.user_c
                                                            ? this.state.user_c
                                                            : ""
                                                    }
                                                    onChange={(e) => {
                                                        const text =
                                                            e.target.value;

                                                        this.setState({
                                                            user_c: text,
                                                        });
                                                    }}
                                                    pattern="[0-5](\.\d)?"
                                                    placeholder="0 ~ 5 分，例：2.6"
                                                />
                                                <span>推薦：</span>
                                                <input
                                                    type="text"
                                                    value={
                                                        this.state.user_r
                                                            ? this.state.user_r
                                                            : ""
                                                    }
                                                    onChange={(e) => {
                                                        const text =
                                                            e.target.value;

                                                        this.setState({
                                                            user_r: text,
                                                        });
                                                    }}
                                                    pattern="[0-5](\.\d)?"
                                                    placeholder="0 ~ 5 分，例：2.6"
                                                />
                                            </div>
                                            <div className="btnGroup">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        document
                                                            .querySelector(
                                                                "#ratingPopup"
                                                            )
                                                            .classList.remove(
                                                                "active"
                                                            );
                                                    }}
                                                >
                                                    <i className="fas fa-times"></i>{" "}
                                                    取消
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        let inputBoxes = Array.from(
                                                            document.querySelectorAll(
                                                                ".ratingContent input"
                                                            )
                                                        );
                                                        if (
                                                            inputBoxes.every(
                                                                (el) =>
                                                                    el.reportValidity()
                                                            )
                                                        ) {
                                                            createrating({
                                                                semester: this
                                                                    .state.smt,
                                                                department: this
                                                                    .state.dep,
                                                                subnumber: this
                                                                    .state
                                                                    .subnum,
                                                                userId: this
                                                                    .state
                                                                    .userId,
                                                                sweet: this
                                                                    .state
                                                                    .user_s,
                                                                cool: this.state
                                                                    .user_c,
                                                                recommend: this
                                                                    .state
                                                                    .user_r,
                                                            }).then(() => {
                                                                document
                                                                    .querySelector(
                                                                        "#ratingPopup"
                                                                    )
                                                                    .classList.remove(
                                                                        "active"
                                                                    );
                                                                this.askinfo();
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <i className="fas fa-check"></i>{" "}
                                                    確認
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <section className="ratingBlock">
                                    <h3>評分</h3>
                                    <button
                                        className="popup"
                                        data-target="#ratingPopup"
                                    >
                                        <svg
                                            className="svg-icon"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925z"></path>
                                        </svg>
                                        &nbsp;我要評分
                                    </button>
                                    <div className="item">甜度</div>
                                    <div className="content sweet">
                                        <Stars num={s} />
                                    </div>
                                    <div className="rateScore sweet">
                                        {information.sweet
                                            ? information.sweet
                                            : "-"}
                                    </div>
                                    <div className="item">涼度</div>
                                    <div className="content cool">
                                        <Stars num={c} />
                                    </div>
                                    <div className="rateScore cool">
                                        {information.cool
                                            ? information.cool
                                            : "-"}
                                    </div>
                                    <div className="item">推薦</div>
                                    <div className="content recommend">
                                        <Stars num={r} />
                                    </div>
                                    <div className="rateScore recommend">
                                        {information.recommend
                                            ? information.recommend
                                            : "-"}
                                    </div>
                                </section>

                                <section className="postsBlock">
                                    <h3>心得</h3>
                                    <button>
                                        <svg
                                            className="svg-icon"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
                                        </svg>
                                        &nbsp;
                                        <Link to="/publish">我要分享</Link>
                                    </button>
                                    <div className="postsWrapper">
                                        <div className="hint">目前尚無心得</div>
                                        {children}
                                    </div>
                                </section>
                            </main>
                        </div>
                    </section>

                    <Menu />
                </section>

                <footer>
                    Copyright &copy; 2020 Skyline. All Rights Reserved.
                </footer>
            </div>
        );
    }

    componentDidMount() {
        this.askinfo().then(() => {
            document.title = this.state.information.course_chinese_title;
        });
        this.asksimplePost();
        gethistory(this.state.dep, this.state.subnum).then((data) => {
            this.setState({
                historyobj: data,
            });
        });
        current().then((data) => {
            this.setState({ userId: data[0].id }, () => {
                getrating(
                    this.state.userId,
                    this.state.smt,
                    this.state.dep,
                    this.state.subnum
                ).then((data) => {
                    this.setState({
                        user_s: data[0].sweet,
                        user_c: data[0].cool,
                        user_r: data[0].recommend,
                    });
                });
            });
        });

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

    setAsyncState = (newState) =>
        new Promise((resolve) => this.setState(newState, resolve));

    askinfo() {
        return selectCourse(
            this.state.smt,
            this.state.dep,
            this.state.subnum
        ).then((data) => {
            let temp = data[0].classroom_and_time.split("\n");
            let temp2 = data[0].teacher.split("\n");
            let myroom = [];
            let mytime = [];
            let chinese = [];
            for (let i = 0; i < temp.length; i++) {
                let temp1 = temp[i].split("\t");
                myroom.push(temp1[0]);
                mytime.push(temp1[1]);
            }
            for (let i = 0; i < temp2.length; i++) {
                let temp1 = temp2[i].split("\t");
                chinese.push(temp1[0]);
            }
            return this.setAsyncState({
                information: data[0],
                classroom: myroom,
                time: mytime,
                chinese_name: chinese,
            });
        });
    }
    asksimplePost() {
        getsimplePost(this.state.dep, this.state.subnum).then((data) => {
            this.setState({ simplepost: data });
        });
    }
}

Info = withRouter(Info);
