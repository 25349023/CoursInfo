import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { selectPost } from "api/Posts_api.js";
import Menu from "./Menu.jsx";

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        let temp = props.location.pathname;
        console.log(props.location.pathname);
        let temp1 = temp.split("/");
        this.state = {
            id: temp1[temp1.length - 1],
            information: {},
            chinese_name: [],
        };
    }
    render() {
        let { information, chinese_name } = this.state;
        return (
            <div className="postPage">
                <section className="main">
                    <section className="postArticle">
                        <div className="wrapper">
                            <div className="title">
                                <div>
                                    <h1>{information.title}</h1>
                                    <h2>{information.course_chinese_title}</h2>
                                    <h3>{chinese_name.join(" ")}</h3>
                                </div>
                                <div className="articleInfo">
                                    <figure className="user">
                                        <img
                                            className="profileImg"
                                            src="./images/profile.png"
                                            alt="user image"
                                        />
                                        <figcaption>
                                            sky1234 &bull;{" "}
                                            <time>2020-06-10</time>
                                        </figcaption>
                                    </figure>

                                    <div className="remark">
                                        <span className="like">
                                            <a href="#">
                                                <i className="fas fa-heart"></i>
                                            </a>
                                            <span>{information.likes}</span>
                                        </span>
                                        <span className="dislike">
                                            <a href="#">
                                                <i className="fas fa-heart-broken"></i>
                                            </a>
                                            <span>{information.dislikes}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <main>
                                <section className="infoSection">
                                    <h2>基本資訊</h2>
                                    <div className="item">課名</div>
                                    <div className="content">
                                        {information.course_chinese_title}
                                    </div>
                                    <div className="item">教授</div>
                                    <div className="content">
                                        {chinese_name.join(" ")}
                                    </div>
                                    <div className="item">科號</div>
                                    <div className="content">
                                        {information.course_subnumber}
                                    </div>
                                    <div className="item">學分</div>
                                    <div className="content">
                                        {information.credit}
                                    </div>
                                    <div className="item">課別</div>
                                    <div className="content">
                                        {information.course_type}
                                    </div>
                                    <div className="item">學期</div>
                                    <div className="content">
                                        {information.semester}
                                    </div>
                                    <div className="item">甜度</div>
                                    <div className="content">
                                        {information.sweet}{" "}
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <div className="item">涼度</div>
                                    <div className="content">
                                        {information.cool}{" "}
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <div className="item">推薦</div>
                                    <div className="content">
                                        {information.recommend}{" "}
                                        <i className="fas fa-star"></i>
                                    </div>
                                </section>

                                <section className="detailedSection">
                                    <h2>課程內容簡述</h2>
                                    <div className="detailedWrapper">
                                        <h3>
                                            <i className="fas fa-info-circle"></i>{" "}
                                            內容綱要
                                        </h3>
                                        <div>{information.info}</div>
                                        <h3>
                                            <i className="fas fa-backward"></i>{" "}
                                            先修課程
                                        </h3>
                                        <div>
                                            {information.prerequisite
                                                ? information.prerequisite
                                                : "-"}
                                        </div>
                                        <h3>
                                            <i className="fas fa-chalkboard-teacher"></i>{" "}
                                            上課方式
                                        </h3>
                                        <div>
                                            {information.teach_method
                                                ? information.teach_method
                                                : "-"}
                                        </div>
                                        <h3>
                                            <i className="fas fa-pencil-ruler"></i>{" "}
                                            作業 ＆ 報告
                                        </h3>
                                        <div>
                                            {information.assignment
                                                ? information.assignment
                                                : "-"}
                                        </div>
                                        <h3>
                                            <i className="fas fa-eraser"></i>{" "}
                                            考試
                                        </h3>
                                        <div>
                                            {information.exam
                                                ? information.exam
                                                : "-"}
                                        </div>
                                        <h3>
                                            <i className="fas fa-calculator"></i>{" "}
                                            評分方式
                                        </h3>
                                        <div>
                                            {information.evaluation
                                                ? information.evaluation
                                                : "-"}
                                        </div>
                                        <h3>
                                            <i className="fas fa-book"></i>{" "}
                                            使用課本
                                        </h3>
                                        <div>
                                            {information.textbook
                                                ? information.textbook
                                                : "-"}
                                        </div>
                                        <h3>
                                            <i className="fas fa-smile"></i>{" "}
                                            老師個性、風格
                                        </h3>
                                        <div>
                                            {information.teacher_character
                                                ? information.teacher_character
                                                : "-"}
                                        </div>
                                        <h3>
                                            <i className="fas fa-hands-helping"></i>{" "}
                                            助教表現
                                        </h3>
                                        <div>
                                            {information.ta_performance
                                                ? information.ta_performance
                                                : "-"}
                                        </div>
                                    </div>
                                </section>

                                <section className="reviewSection">
                                    <h2>個人心得</h2>
                                    <div>{information.main_review}</div>
                                </section>
                                <section className="gradeSection">
                                    <h2>修課成績</h2>
                                    <div className="gradeWrapper">
                                        <h3>
                                            <i className="fas fa-user"></i> 個人
                                        </h3>
                                        <div>{information.personal_grade}</div>
                                        <h3>
                                            <i className="fas fa-users"></i>{" "}
                                            全班
                                        </h3>
                                        <div className="classNameGrading">
                                            <div className="item">
                                                <div>A+</div>
                                                <div>
                                                    {information.class_grade_dist
                                                        ? information
                                                              .class_grade_dist[0]
                                                        : "-"}
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div>A</div>
                                                <div>
                                                    {information.class_grade_dist
                                                        ? information
                                                              .class_grade_dist[1]
                                                        : "-"}
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div>A-</div>
                                                <div>
                                                    {information.class_grade_dist
                                                        ? information
                                                              .class_grade_dist[2]
                                                        : "-"}
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div>B+</div>
                                                <div>
                                                    {information.class_grade_dist
                                                        ? information
                                                              .class_grade_dist[3]
                                                        : "-"}
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div>B</div>
                                                <div>
                                                    {information.class_grade_dist
                                                        ? information
                                                              .class_grade_dist[4]
                                                        : "-"}
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div>B-</div>
                                                <div>
                                                    {information.class_grade_dist
                                                        ? information
                                                              .class_grade_dist[5]
                                                        : "-"}
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div>C+</div>
                                                <div>
                                                    {information.class_grade_dist
                                                        ? information
                                                              .class_grade_dist[6]
                                                        : "-"}
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div>C</div>
                                                <div>
                                                    {information.class_grade_dist
                                                        ? information
                                                              .class_grade_dist[7]
                                                        : "-"}
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div>C-</div>
                                                <div>
                                                    {information.class_grade_dist
                                                        ? information
                                                              .class_grade_dist[8]
                                                        : "-"}
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div>D&DownArrow;</div>
                                                <div>
                                                    {information.class_grade_dist
                                                        ? information
                                                              .class_grade_dist[9]
                                                        : "-"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="otherSection">
                                    <h2>其他</h2>
                                    <div>{information.others}</div>
                                </section>
                            </main>
                        </div>
                    </section>

                    <Menu />
                </section>
            </div>
        );
    }
    componentDidMount() {
        this.askinfo();
    }

    askinfo() {
        console.log(this.state.id);
        selectPost(this.state.id).then((data) => {
            let temp2 = data[0].teacher.split("\n");
            let chinese = [];
            for (let i = 0; i < temp2.length; i++) {
                let temp1 = temp2[i].split("\t");
                chinese.push(temp1[0]);
            }
            this.setState({ information: data[0], chinese_name: chinese });
        });
    }
}
Post = withRouter(Post);