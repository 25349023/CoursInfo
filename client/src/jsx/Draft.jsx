import React from "react";
import Menu from "./Menu.jsx";
import { createPost } from "api/Posts_api.js";
import { getdropdown } from "api/Courses_api.js";
import {
    createDraft,
    selectDraft,
    editDraft,
    deleteDraft,
} from "api/Draft_api.js";
import { current, selectUser } from "api/Users_api.js";

import { withRouter, Redirect } from "react-router-dom";

//draftpost is a big obj in props
export default class Draft extends React.Component {
    constructor(props) {
        super(props);
        let temp = props.location.pathname;
        console.log(props.location.pathname);
        let temp1 = temp.split("/");
        this.state = {
            draftId: temp1[temp1.length - 1],
            userId: "",
            semester: "",
            department: "",
            drpDep: "",
            course_subnumber: "",
            title: "",
            course_type: "",
            sweet: "",
            cool: "",
            recommend: "",
            info: "",
            prerequisite: "",
            teach_method: "",
            assignment: "",
            exam: "",
            evaluation: "",
            textbook: "",
            teacher_character: "",
            ta_performance: "",
            main_review: "",
            personal_grade: "",
            class_grade_dist: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            others: "",
            dropdownlist: [],
            redirect_to_user: false,
            redirect_to_post: false,
            postId: "",
        };
        this.gradelist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.dropdownRef = null;
        this.formRef = null;

        // this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDrowndown = this.handleDrowndown.bind(this);
    }

    render() {
        let children = [];
        let { dropdownlist } = this.state;
        if (dropdownlist.length) {
            children = dropdownlist.map((p) => (
                <button
                    type="button"
                    className="option"
                    key={p.department + p.course_subnumber}
                    onClick={() => {
                        this.dropdownRef.textContent =
                            p.department +
                            " " +
                            p.course_subnumber +
                            " " +
                            p.course_chinese_title;
                        this.setState({
                            course_subnumber: p.course_subnumber,
                            department: p.department,
                            course_chinese_title: p.course_chinese_title,
                        });
                    }}
                >
                    <span className="primary">
                        {p.department} {p.course_subnumber}{" "}
                        {p.course_chinese_title}
                    </span>
                    <span className="secondary">
                        {p.teacher ? p.teacher.split("\t")[0] : "-"}
                    </span>
                </button>
            ));
        }
        if (this.state.redirect_to_user) {
            return <Redirect to={`/userhome`} />;
        }
        if (this.state.redirect_to_post) {
            return <Redirect to={`/userpost/${this.state.postId}`} />;
        }
        return (
            <div className="draftPage">
                <section className="main">
                    <section className="publishContent">
                        <form
                            className="wrapper articleForm"
                            spellCheck="false"
                            ref={(el) => {
                                this.formRef = el;
                            }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                return false;
                            }}
                        >
                            <h1>編輯草稿</h1>

                            <main>
                                <section className="chooseCourse">
                                    <div className="dropdown semesterDrop">
                                        <button
                                            type="button"
                                            id="semesterDropdown"
                                            className="dropdownBtn"
                                        >
                                            <span className="chosen">
                                                {this.state.semester
                                                    ? this.state.semester
                                                    : "請選擇學期"}
                                            </span>
                                            <i className="fas fa-caret-down"></i>
                                        </button>
                                        <div className="drpOptions">
                                            <button
                                                type="button"
                                                data-semester="10910"
                                                className="option"
                                                onClick={() => {
                                                    this.setState({
                                                        semester: "10910",
                                                        course_chinese_title:
                                                            "",
                                                    });
                                                }}
                                            >
                                                <span className="primary">
                                                    109 上
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                data-semester="10820"
                                                className="option"
                                                onClick={() => {
                                                    this.setState({
                                                        semester: "10820",
                                                        course_chinese_title:
                                                            "",
                                                    });
                                                }}
                                            >
                                                <span className="primary">
                                                    108 下
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                data-semester="10810"
                                                className="option"
                                                onClick={() => {
                                                    this.setState({
                                                        semester: "10810",
                                                        course_chinese_title:
                                                            "",
                                                    });
                                                }}
                                            >
                                                <span className="primary">
                                                    108 上
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="dropdown departmentDrop">
                                        <button
                                            type="button"
                                            id="departmentDropdown"
                                            className="dropdownBtn"
                                        >
                                            <span className="chosen">
                                                {this.state.drpDep
                                                    ? this.state.drpDep
                                                    : "請選擇科系"}
                                            </span>
                                            <i className="fas fa-caret-down"></i>
                                        </button>
                                        <div className="drpOptions">
                                            <button
                                                type="button"
                                                data-department="CL"
                                                className="option"
                                                onClick={() => {
                                                    this.setState({
                                                        drpDep: "CL",
                                                        course_chinese_title:
                                                            "",
                                                    });
                                                }}
                                            >
                                                <span className="primary">
                                                    CL 中文系
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                data-department="CS"
                                                className="option"
                                                onClick={() => {
                                                    this.setState({
                                                        drpDep: "CS",
                                                        course_chinese_title:
                                                            "",
                                                    });
                                                }}
                                            >
                                                <span className="primary">
                                                    CS 資工系
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                data-department="EE"
                                                className="option"
                                                onClick={() => {
                                                    this.setState({
                                                        drpDep: "EE",
                                                        course_chinese_title:
                                                            "",
                                                    });
                                                }}
                                            >
                                                <span className="primary">
                                                    EE 電機系
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                data-department="EECS"
                                                className="option"
                                                onClick={() => {
                                                    this.setState({
                                                        drpDep: "EECS",
                                                        course_chinese_title:
                                                            "",
                                                    });
                                                }}
                                            >
                                                <span className="primary">
                                                    EECS 電資院學士班
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                data-department="FL"
                                                className="option"
                                                onClick={() => {
                                                    this.setState({
                                                        drpDep: "FL",
                                                    });
                                                }}
                                            >
                                                <span className="primary">
                                                    FL 外文系
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                data-department="GE"
                                                className="option"
                                                onClick={() => {
                                                    this.setState({
                                                        drpDep: "GE",
                                                    });
                                                }}
                                            >
                                                <span className="primary">
                                                    GE 通識
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                data-department="GEC"
                                                className="option"
                                                onClick={() => {
                                                    this.setState({
                                                        drpDep: "GEC",
                                                    });
                                                }}
                                            >
                                                <span className="primary">
                                                    GEC 通識核心
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div
                                        className="dropdown courseDrop"
                                        onClick={this.handleDrowndown}
                                    >
                                        <button
                                            type="button"
                                            id="departmentDropdown"
                                            className="dropdownBtn"
                                        >
                                            <span
                                                className="chosen"
                                                ref={(el) => {
                                                    this.dropdownRef = el;
                                                }}
                                            >
                                                {this.state.course_chinese_title
                                                    ? this.state.department +
                                                      " " +
                                                      this.state
                                                          .course_subnumber +
                                                      " " +
                                                      this.state
                                                          .course_chinese_title
                                                    : "請選擇課程"}
                                            </span>
                                            <i className="fas fa-caret-down"></i>
                                        </button>
                                        <div className="drpOptions">
                                            {children}
                                        </div>
                                    </div>
                                </section>

                                <section className="titleSection">
                                    <div className="titleFlexbox">
                                        <h2>心得標題</h2>
                                        <div>
                                            <span className="wordCount">
                                                {this.state.title
                                                    ? this.state.title.length
                                                    : "0"}
                                            </span>{" "}
                                            / 25
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        id="titleInput"
                                        required
                                        maxLength="25"
                                        placeholder="至多 25 字"
                                        value={this.state.title}
                                        onChange={(e) => {
                                            const text = e.target.value;
                                            this.setState({ title: text });
                                        }}
                                    />
                                </section>

                                <section className="infoSection">
                                    <div className="titleFlexbox">
                                        <h2>課程類別</h2>
                                        <div>
                                            <span className="wordCount">
                                                {this.state.course_type
                                                    ? this.state.course_type
                                                          .length
                                                    : "0"}
                                            </span>{" "}
                                            / 20
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        id="courseType"
                                        maxLength="20"
                                        placeholder="某系必修 ／ 選修 ／ 通識領域 ／ 核通向度"
                                        value={this.state.course_type}
                                        onChange={(e) => {
                                            const text = e.target.value;
                                            this.setState({
                                                course_type: text,
                                            });
                                        }}
                                    />
                                </section>

                                <section className="ratingSection">
                                    <div
                                        id="ratingPopup"
                                        className="popupContent"
                                    >
                                        <div className="popupWindow">
                                            <h3>
                                                參考用評分標準{" "}
                                                <i className="close fas fa-times"></i>
                                            </h3>
                                            <div>
                                                甜度: <br />
                                                在有付出一定努力的條件(願意交所有作業、正常出席、有考試)下，可以拿到的等第{" "}
                                                <br />
                                                5星:A+~A(87以上) 4星:A~A-(86~80){" "}
                                                <br />
                                                3星:B+~B(79~73) 2星:B-~C-(72~60){" "}
                                                <br />
                                                1星:不及格 <br /> <br />
                                                涼度: <br />
                                                以「作業多寡」、「考試需要準備多久」做為考量{" "}
                                                <br />
                                                作業多寡:以整學期作業字數加總為準{" "}
                                                <br />
                                                5星:1000字以內 4星:1000-3000{" "}
                                                <br />
                                                3星:3000-8000 2星:8000-15000{" "}
                                                <br />
                                                1星:大於15000 <br />
                                                考試需要準備多久:(以考到80分上下為例){" "}
                                                <br />
                                                5星:幾乎不須準備，僅需前一晚做考古or看筆記{" "}
                                                <br />
                                                4星:須考前一個禮拜做準備，但有固定範圍，或考前教授有複習{" "}
                                                <br />
                                                3星:須考前1~2個禮拜做準備，但考試會考平時上課內容，僅看ppt成績不夠好看{" "}
                                                <br />
                                                2星:許每個禮拜都做準備，否則來不及{" "}
                                                <br />
                                                1星:申論題，且教授心境難以揣摩，字數多也不一定高{" "}
                                                <br /> <br />
                                                推薦: 5星:完全不後悔修這門課{" "}
                                                <br />
                                                4星:若是重來過，還是會修這門課，但有些地方可以表現更好(自我因素){" "}
                                                <br />
                                                3星: <br />
                                                若是重來過，不一定會修這門課，可能是教授給的作業太多，或成績不夠理想{" "}
                                                <br />
                                                2星: <br />
                                                若是重來過，不會修這門課，但既然修了就修完吧{" "}
                                                <br />
                                                1星: <br />
                                                絕對不修這門課，就算修了也要在二退期間退掉!{" "}
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                    <h2>
                                        課程評價
                                        <div
                                            className="tooltip popup"
                                            data-target="#ratingPopup"
                                        >
                                            <i className="fas fa-question-circle"></i>
                                            <div className="tooltipBalloon">
                                                參考的評分標準
                                            </div>
                                        </div>
                                    </h2>
                                    <div className="ratingWrapper">
                                        <div className="item">
                                            <h3>
                                                <i className="fas fa-candy-cane"></i>{" "}
                                                甜度
                                            </h3>
                                            <input
                                                type="text"
                                                required
                                                maxLength="3"
                                                pattern="([0-4](\.\d)?)|5|5\.0"
                                                placeholder="例：3.5"
                                                value={
                                                    this.state.sweet
                                                        ? this.state.sweet
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        sweet: text,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="item">
                                            <h3>
                                                <i className="fas fa-wind"></i>{" "}
                                                涼度
                                            </h3>
                                            <input
                                                type="text"
                                                required
                                                maxLength="3"
                                                pattern="([0-4](\.\d)?)|5|5\.0"
                                                placeholder="例：3.5"
                                                value={
                                                    this.state.cool
                                                        ? this.state.cool
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        cool: text,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="item">
                                            <h3>
                                                <i className="fas fa-thumbs-up"></i>{" "}
                                                推薦
                                            </h3>
                                            <input
                                                type="text"
                                                required
                                                maxLength="3"
                                                pattern="([0-4](\.\d)?)|5|5\.0"
                                                placeholder="例：3.5"
                                                value={
                                                    this.state.recommend
                                                        ? this.state.recommend
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        recommend: text,
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </section>

                                <section className="detailedSection">
                                    <h2>課程內容簡述</h2>
                                    <div className="detailedWrapper">
                                        <div className="item">
                                            <div className="titleFlexbox">
                                                <h3>
                                                    <i className="fas fa-info-circle"></i>{" "}
                                                    內容綱要
                                                </h3>
                                                <div>
                                                    <span className="wordCount">
                                                        {this.state.info
                                                            ? this.state.info
                                                                  .length
                                                            : "0"}
                                                    </span>{" "}
                                                    / 200
                                                </div>
                                            </div>
                                            <textarea
                                                name=""
                                                id=""
                                                cols="10"
                                                rows="2"
                                                required
                                                maxLength="200"
                                                placeholder="簡單描述課程內容"
                                                value={this.state.info}
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        info: text,
                                                    });
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className="item">
                                            <div className="titleFlexbox">
                                                <h3>
                                                    <i className="fas fa-backward"></i>{" "}
                                                    先修課程
                                                </h3>
                                                <div>
                                                    <span className="wordCount">
                                                        {this.state.prerequisite
                                                            ? this.state
                                                                  .prerequisite
                                                                  .length
                                                            : "0"}
                                                    </span>{" "}
                                                    / 200
                                                </div>
                                            </div>
                                            <textarea
                                                name=""
                                                id=""
                                                cols="10"
                                                rows="2"
                                                maxLength="200"
                                                placeholder="擋修或建議先修的課程"
                                                value={this.state.prerequisite}
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        prerequisite: text,
                                                    });
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className="item">
                                            <div className="titleFlexbox">
                                                <h3>
                                                    <i className="fas fa-chalkboard-teacher"></i>{" "}
                                                    上課方式
                                                </h3>
                                                <div>
                                                    <span className="wordCount">
                                                        {this.state.teach_method
                                                            ? this.state
                                                                  .teach_method
                                                                  .length
                                                            : "0"}
                                                    </span>{" "}
                                                    / 200
                                                </div>
                                            </div>
                                            <textarea
                                                name=""
                                                id=""
                                                cols="10"
                                                rows="2"
                                                required
                                                maxLength="200"
                                                placeholder="例：PPT ／ 版書 ..."
                                                value={this.state.teach_method}
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        teach_method: text,
                                                    });
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className="item">
                                            <div className="titleFlexbox">
                                                <h3>
                                                    <i className="fas fa-pencil-ruler"></i>{" "}
                                                    作業 ＆ 報告
                                                </h3>
                                                <div>
                                                    <span className="wordCount">
                                                        {this.state.assignment
                                                            ? this.state
                                                                  .assignment
                                                                  .length
                                                            : "0"}
                                                    </span>{" "}
                                                    / 200
                                                </div>
                                            </div>
                                            <textarea
                                                name=""
                                                id=""
                                                cols="10"
                                                rows="2"
                                                required
                                                maxLength="200"
                                                placeholder="作業類型、內容 ／ 個人、小組報告 ..."
                                                value={this.state.assignment}
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        assignment: text,
                                                    });
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className="item">
                                            <div className="titleFlexbox">
                                                <h3>
                                                    <i className="fas fa-eraser"></i>{" "}
                                                    考試
                                                </h3>
                                                <div>
                                                    <span className="wordCount">
                                                        {this.state.exam
                                                            ? this.state.exam
                                                                  .length
                                                            : "0"}
                                                    </span>{" "}
                                                    / 200
                                                </div>
                                            </div>
                                            <textarea
                                                name=""
                                                id=""
                                                cols="10"
                                                rows="2"
                                                required
                                                maxLength="200"
                                                placeholder="平時小考 ／ 期中末"
                                                value={this.state.exam}
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        exam: text,
                                                    });
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className="item">
                                            <div className="titleFlexbox">
                                                <h3>
                                                    <i className="fas fa-calculator"></i>{" "}
                                                    評分方式
                                                </h3>
                                                <div>
                                                    <span className="wordCount">
                                                        {this.state.evaluation
                                                            ? this.state
                                                                  .evaluation
                                                                  .length
                                                            : "0"}
                                                    </span>{" "}
                                                    / 200
                                                </div>
                                            </div>
                                            <textarea
                                                name=""
                                                id=""
                                                cols="10"
                                                rows="2"
                                                required
                                                maxLength="200"
                                                placeholder="學期成績計算方式：作業、考試所佔比例"
                                                value={this.state.evaluation}
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        evaluation: text,
                                                    });
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className="item">
                                            <div className="titleFlexbox">
                                                <h3>
                                                    <i className="fas fa-book"></i>{" "}
                                                    使用課本
                                                </h3>
                                                <div>
                                                    <span className="wordCount">
                                                        {this.state.textbook
                                                            ? this.state
                                                                  .textbook
                                                                  .length
                                                            : "0"}
                                                    </span>{" "}
                                                    / 200
                                                </div>
                                            </div>
                                            <textarea
                                                name=""
                                                id=""
                                                cols="10"
                                                rows="2"
                                                maxLength="200"
                                                placeholder="使用哪本課本、是否一定要買"
                                                value={this.state.textbook}
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        textbook: text,
                                                    });
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className="item">
                                            <div className="titleFlexbox">
                                                <h3>
                                                    <i className="fas fa-smile"></i>{" "}
                                                    老師個性、風格
                                                </h3>
                                                <div>
                                                    <span className="wordCount">
                                                        {this.state
                                                            .teacher_character
                                                            ? this.state
                                                                  .teacher_character
                                                                  .length
                                                            : "0"}
                                                    </span>{" "}
                                                    / 200
                                                </div>
                                            </div>
                                            <textarea
                                                name=""
                                                id=""
                                                cols="10"
                                                rows="2"
                                                required
                                                maxLength="200"
                                                value={
                                                    this.state.teacher_character
                                                }
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        teacher_character: text,
                                                    });
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className="item">
                                            <div className="titleFlexbox">
                                                <h3>
                                                    <i className="fas fa-hands-helping"></i>{" "}
                                                    助教表現
                                                </h3>
                                                <div>
                                                    <span className="wordCount">
                                                        {this.state
                                                            .ta_performance
                                                            ? this.state
                                                                  .ta_performance
                                                                  .length
                                                            : "0"}
                                                    </span>{" "}
                                                    / 200
                                                </div>
                                            </div>
                                            <textarea
                                                name=""
                                                id=""
                                                cols="10"
                                                rows="2"
                                                required
                                                maxLength="200"
                                                value={
                                                    this.state.ta_performance
                                                }
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        ta_performance: text,
                                                    });
                                                }}
                                            ></textarea>
                                        </div>
                                    </div>
                                </section>

                                <section className="reviewSection">
                                    <div className="titleFlexbox">
                                        <h2>個人心得</h2>
                                        <div>
                                            <span className="wordCount">
                                                {this.state.main_review
                                                    ? this.state.main_review
                                                          .length
                                                    : "0"}
                                            </span>{" "}
                                            / 10000
                                        </div>
                                    </div>

                                    <textarea
                                        name=""
                                        id=""
                                        cols="10"
                                        rows="10"
                                        maxLength="10000"
                                        value={this.state.main_review}
                                        onChange={(e) => {
                                            const text = e.target.value;
                                            this.setState({
                                                main_review: text,
                                            });
                                        }}
                                        required
                                    ></textarea>
                                </section>

                                <section className="gradeSection">
                                    <h2>修課成績</h2>
                                    <div className="gradeWrapper">
                                        <div className="personal">
                                            <h3>
                                                <i className="fas fa-user"></i>{" "}
                                                個人
                                            </h3>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    id="gradeDropdown"
                                                    className="dropdownBtn"
                                                >
                                                    <span className="chosen">
                                                        {this.state
                                                            .personal_grade
                                                            ? this.state
                                                                  .personal_grade
                                                            : "請選擇成績"}
                                                    </span>
                                                    <i className="fas fa-caret-down"></i>
                                                </button>
                                                <div className="drpOptions">
                                                    <button
                                                        type="button"
                                                        data-grade="X"
                                                        className="option"
                                                        onClick={() => {
                                                            this.setState({
                                                                personal_grade:
                                                                    "X",
                                                            });
                                                        }}
                                                    >
                                                        <span className="primary">
                                                            成績未到
                                                        </span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        data-grade="A+"
                                                        className="option"
                                                        onClick={() => {
                                                            this.setState({
                                                                personal_grade:
                                                                    "A+",
                                                            });
                                                        }}
                                                    >
                                                        <span className="primary">
                                                            A+
                                                        </span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        data-grade="A"
                                                        className="option"
                                                        onClick={() => {
                                                            this.setState({
                                                                personal_grade:
                                                                    "A",
                                                            });
                                                        }}
                                                    >
                                                        <span className="primary">
                                                            A
                                                        </span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        data-grade="A-"
                                                        className="option"
                                                        onClick={() => {
                                                            this.setState({
                                                                personal_grade:
                                                                    "A-",
                                                            });
                                                        }}
                                                    >
                                                        <span className="primary">
                                                            A-
                                                        </span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        data-grade="B+"
                                                        className="option"
                                                        onClick={() => {
                                                            this.setState({
                                                                personal_grade:
                                                                    "B+",
                                                            });
                                                        }}
                                                    >
                                                        <span className="primary">
                                                            B+
                                                        </span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        data-grade="B"
                                                        className="option"
                                                        onClick={() => {
                                                            this.setState({
                                                                personal_grade:
                                                                    "B",
                                                            });
                                                        }}
                                                    >
                                                        <span className="primary">
                                                            B
                                                        </span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        data-grade="B-"
                                                        className="option"
                                                        onClick={() => {
                                                            this.setState({
                                                                personal_grade:
                                                                    "B-",
                                                            });
                                                        }}
                                                    >
                                                        <span className="primary">
                                                            B-
                                                        </span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        data-grade="C+"
                                                        className="option"
                                                        onClick={() => {
                                                            this.setState({
                                                                personal_grade:
                                                                    "C+",
                                                            });
                                                        }}
                                                    >
                                                        <span className="primary">
                                                            C+
                                                        </span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        data-grade="C"
                                                        className="option"
                                                        onClick={() => {
                                                            this.setState({
                                                                personal_grade:
                                                                    "C",
                                                            });
                                                        }}
                                                    >
                                                        <span className="primary">
                                                            C
                                                        </span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        data-grade="C-"
                                                        className="option"
                                                        onClick={() => {
                                                            this.setState({
                                                                personal_grade:
                                                                    "C-",
                                                            });
                                                        }}
                                                    >
                                                        <span className="primary">
                                                            C-
                                                        </span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        data-grade="D"
                                                        className="option"
                                                        onClick={() => {
                                                            this.setState({
                                                                personal_grade:
                                                                    "D",
                                                            });
                                                        }}
                                                    >
                                                        <span className="primary">
                                                            D
                                                            {String.fromCharCode(
                                                                8595
                                                            )}
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="total">
                                            <h3>
                                                <i className="fas fa-users"></i>{" "}
                                                全班
                                            </h3>
                                            <div className="classGrading">
                                                <div className="item">
                                                    <div>A+</div>
                                                    <input
                                                        type="text"
                                                        pattern="\d*"
                                                        value={
                                                            this.state
                                                                .class_grade_dist[0]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            let temp = [
                                                                ...this.state
                                                                    .class_grade_dist,
                                                            ];
                                                            temp[0] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                class_grade_dist: temp,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="item">
                                                    <div>A</div>
                                                    <input
                                                        type="text"
                                                        pattern="\d*"
                                                        value={
                                                            this.state
                                                                .class_grade_dist[1]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            let temp = [
                                                                ...this.state
                                                                    .class_grade_dist,
                                                            ];
                                                            temp[1] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                class_grade_dist: temp,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="item">
                                                    <div>A-</div>
                                                    <input
                                                        type="text"
                                                        pattern="\d*"
                                                        value={
                                                            this.state
                                                                .class_grade_dist[2]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            let temp = [
                                                                ...this.state
                                                                    .class_grade_dist,
                                                            ];
                                                            temp[2] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                class_grade_dist: temp,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="item">
                                                    <div>B+</div>
                                                    <input
                                                        type="text"
                                                        pattern="\d*"
                                                        value={
                                                            this.state
                                                                .class_grade_dist[3]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            let temp = [
                                                                ...this.state
                                                                    .class_grade_dist,
                                                            ];
                                                            temp[3] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                class_grade_dist: temp,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="item">
                                                    <div>B</div>
                                                    <input
                                                        type="text"
                                                        pattern="\d*"
                                                        value={
                                                            this.state
                                                                .class_grade_dist[4]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            let temp = [
                                                                ...this.state
                                                                    .class_grade_dist,
                                                            ];
                                                            temp[4] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                class_grade_dist: temp,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="item">
                                                    <div>B-</div>
                                                    <input
                                                        type="text"
                                                        pattern="\d*"
                                                        value={
                                                            this.state
                                                                .class_grade_dist[5]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            let temp = [
                                                                ...this.state
                                                                    .class_grade_dist,
                                                            ];
                                                            temp[5] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                class_grade_dist: temp,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="item">
                                                    <div>C+</div>
                                                    <input
                                                        type="text"
                                                        pattern="\d*"
                                                        value={
                                                            this.state
                                                                .class_grade_dist[6]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            let temp = [
                                                                ...this.state
                                                                    .class_grade_dist,
                                                            ];
                                                            temp[6] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                class_grade_dist: temp,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="item">
                                                    <div>C</div>
                                                    <input
                                                        type="text"
                                                        pattern="\d*"
                                                        value={
                                                            this.state
                                                                .class_grade_dist[7]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            let temp = [
                                                                ...this.state
                                                                    .class_grade_dist,
                                                            ];
                                                            temp[7] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                class_grade_dist: temp,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="item">
                                                    <div>C-</div>
                                                    <input
                                                        type="text"
                                                        pattern="\d*"
                                                        value={
                                                            this.state
                                                                .class_grade_dist[8]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            let temp = [
                                                                ...this.state
                                                                    .class_grade_dist,
                                                            ];
                                                            temp[8] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                class_grade_dist: temp,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="item">
                                                    <div>
                                                        D
                                                        {String.fromCharCode(
                                                            8595
                                                        )}
                                                    </div>
                                                    <input
                                                        type="text"
                                                        pattern="\d*"
                                                        value={
                                                            this.state
                                                                .class_grade_dist[9]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            let temp = [
                                                                ...this.state
                                                                    .class_grade_dist,
                                                            ];
                                                            temp[9] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                class_grade_dist: temp,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="otherSection">
                                    <div className="titleFlexbox">
                                        <h2>其他</h2>
                                        <div>
                                            <span className="wordCount">
                                                {this.state.others
                                                    ? this.state.others.length
                                                    : "0"}
                                            </span>{" "}
                                            / 2000
                                        </div>
                                    </div>
                                    <textarea
                                        name=""
                                        id=""
                                        cols="10"
                                        rows="6"
                                        maxLength="2000"
                                        value={this.state.others}
                                        onChange={(e) => {
                                            const text = e.target.value;
                                            this.setState({
                                                others: text,
                                            });
                                        }}
                                    ></textarea>
                                </section>

                                <section className="submitSection">
                                    <button
                                        type="button"
                                        type="button"
                                        onClick={() => {
                                            this.setState({
                                                redirect_to_user: true,
                                            });
                                        }}
                                    >
                                        <i className="fas fa-undo-alt"></i>{" "}
                                        放棄變更
                                    </button>

                                    <button
                                        type="button"
                                        type="button"
                                        onClick={this.handleEditDraft.bind(
                                            this
                                        )}
                                    >
                                        <i className="fas fa-save"></i> 儲存變更
                                    </button>

                                    <button
                                        type="submit"
                                        onClick={this.handleCreatePost.bind(
                                            this
                                        )}
                                    >
                                        <i className="fas fa-paper-plane"></i>{" "}
                                        發表
                                    </button>
                                </section>
                            </main>
                        </form>
                    </section>

                    <Menu />
                </section>
            </div>
        );
    }

    componentDidMount() {
        document.title = "編輯草稿";

        current().then((data) => {
            this.setState({ userId: data[0].id }, () => {
                selectDraft(this.state.draftId, this.state.userId).then(
                    (data) => {
                        this.setState({ ...data[0] });
                    }
                );
            });
        });

        let dropdowns = document.querySelectorAll(".dropdown");

        dropdowns.forEach((dr) => {
            dr.addEventListener("click", function () {
                this.querySelector(".drpOptions").classList.toggle("active");
            });
        });

        for (let drp of dropdowns) {
            let dropBtn = drp.querySelector(".dropdownBtn .chosen");
            let options = drp.querySelectorAll(".option");
            options.forEach((op) => {
                let content = op.querySelector(".primary").textContent;
                op.addEventListener("click", () => {
                    dropBtn.textContent = content;
                });
            });
        }

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

    handleCreatePost() {
        if (!this.formRef.checkValidity()) {
            return;
        }
        if (this.state.userId) {
            createPost({
                ...this.state,
                courseSubnumber: this.state.course_subnumber,
                courseType: this.state.course_type,
                teachMethod: this.state.teach_method,
                teacherCharacter: this.state.teacher_character,
                taPerformance: this.state.ta_performance,
                mainReview: this.state.main_review,
                personalGrade: this.state.personal_grade,
                classGradeDist: this.state.class_grade_dist,
            }).then((data) => {
                this.setState(
                    { postId: data.id, redirect_to_post: true },
                    () => {
                        deleteDraft(this.state.draftId, {
                            userId: this.state.userId,
                        });
                    }
                );
            });
        } else {
            alert("請先登入");
        }
    }

    handleEditDraft() {
        if (this.state.userId) {
            editDraft(this.state.draftId, {
                ...this.state,
                courseSubnumber: this.state.course_subnumber,
                courseType: this.state.course_type,
                teachMethod: this.state.teach_method,
                teacherCharacter: this.state.teacher_character,
                taPerformance: this.state.ta_performance,
                mainReview: this.state.main_review,
                personalGrade: this.state.personal_grade
                    ? this.state.personal_grade
                    : "X",
                classGradeDist: this.state.class_grade_dist,
            }).then(() => {
                this.setState({ redirect_to_user: true });
            });
        } else {
            alert("請先登入");
        }
    }

    handleDrowndown() {
        getdropdown(this.state.semester, this.state.drpDep).then(
            (courselist) => {
                this.setState({ dropdownlist: courselist });
            }
        );
    }
}
Draft = withRouter(Draft);
