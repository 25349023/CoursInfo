import React from "react";
import Menu from "./Menu.jsx";
import { selectCourse } from "api/Courses_api.js";
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
                                <section className="basicInfo">
                                    <h3>基本資訊</h3>
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

                                <section className="ratingBlock">
                                    <h3>評分</h3>
                                    <button>
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
                                        {children}
                                    </div>
                                </section>

                                <section className="discussBlock">
                                    <h3>相關討論</h3>
                                    <button>
                                        <svg
                                            className="svg-icon"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M17.657,2.982H2.342c-0.234,0-0.425,0.191-0.425,0.426v10.21c0,0.234,0.191,0.426,0.425,0.426h3.404v2.553c0,0.397,0.48,0.547,0.725,0.302l2.889-2.854h8.298c0.234,0,0.426-0.191,0.426-0.426V3.408C18.083,3.174,17.892,2.982,17.657,2.982M17.232,13.192H9.185c-0.113,0-0.219,0.045-0.3,0.124l-2.289,2.262v-1.96c0-0.233-0.191-0.426-0.425-0.426H2.767V3.833h14.465V13.192z M10,7.237c-0.821,0-1.489,0.668-1.489,1.489c0,0.821,0.668,1.489,1.489,1.489c0.821,0,1.488-0.668,1.488-1.489C11.488,7.905,10.821,7.237,10,7.237 M10,9.364c-0.352,0-0.638-0.288-0.638-0.638c0-0.351,0.287-0.638,0.638-0.638c0.351,0,0.638,0.287,0.638,0.638C10.638,9.077,10.351,9.364,10,9.364 M14.254,7.237c-0.821,0-1.489,0.668-1.489,1.489c0,0.821,0.668,1.489,1.489,1.489s1.489-0.668,1.489-1.489C15.743,7.905,15.075,7.237,14.254,7.237 M14.254,9.364c-0.351,0-0.638-0.288-0.638-0.638c0-0.351,0.287-0.638,0.638-0.638c0.352,0,0.639,0.287,0.639,0.638C14.893,9.077,14.605,9.364,14.254,9.364 M5.746,7.237c-0.821,0-1.489,0.668-1.489,1.489c0,0.821,0.668,1.489,1.489,1.489c0.821,0,1.489-0.668,1.489-1.489C7.234,7.905,6.566,7.237,5.746,7.237 M5.746,9.364c-0.351,0-0.638-0.288-0.638-0.638c0-0.351,0.287-0.638,0.638-0.638c0.351,0,0.638,0.287,0.638,0.638C6.384,9.077,6.096,9.364,5.746,9.364"></path>
                                        </svg>
                                        &nbsp;發起討論
                                    </button>
                                    <div className="discussWrapper">
                                        <article>
                                            <h4>關於上次上課...</h4>
                                            <span className="user">小明</span>
                                            <time>2020-05-29 21:27</time>
                                        </article>
                                        <article></article>
                                        <article></article>
                                        <article></article>
                                        <article></article>
                                    </div>
                                </section>

                                <section className="scoringBlock">
                                    <h3>歷年成績分布</h3>
                                    <div className="scoringWrapper">
                                        <div></div>
                                        <div></div>
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
        this.askinfo();
        this.asksimplePost();
    }
    askinfo() {
        selectCourse(this.state.smt, this.state.dep, this.state.subnum).then(
            (data) => {
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
                this.setState({
                    information: data[0],
                    classroom: myroom,
                    time: mytime,
                    chinese_name: chinese,
                });
            }
        );
    }
    asksimplePost() {
        getsimplePost(this.state.dep, this.state.subnum).then((data) => {
            this.setState({ simplepost: data });
        });
    }
}

Info = withRouter(Info);
