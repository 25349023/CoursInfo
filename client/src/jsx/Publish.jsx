import React from "react";
import Menu from "./Menu.jsx";
import { createPost } from "api/Posts_api.js";
import { getdropdown } from "api/Courses_api.js";
import { createDraft } from "api/Draft_api.js";
import { current, selectUser } from "api/Users_api.js";
import { Redirect } from "react-router-dom";
export default class Publish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            semester: "",
            department: "",
            courseSubnumber: "",
            title: "",
            courseType: "",
            sweet: 0,
            cool: 0,
            recommend: 0,
            info: "",
            prerequisite: "",
            teachMethod: "",
            assignment: "",
            exam: "",
            evaluation: "",
            textbook: "",
            teacherCharacter: "",
            taPerformance: "",
            mainReview: "",
            personalGrade: "X",
            classGradeDist: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            others: "",
            dropdownlist: [],
            redirect: false,
        };
        this.gradelist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.dropdownRef = null;

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
                        this.setState({ courseSubnumber: p.course_subnumber });
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
        if (this.state.redirect) {
            return <Redirect to="/posts" />;
        }
        return (
            <div className="publishPage">
                <section className="main">
                    <section className="publishContent">
                        <form
                            className="wrapper articleForm"
                            spellCheck="false"
                        >
                            <h1>發表心得</h1>

                            <main>
                                <section className="chooseCourse">
                                    <div className="dropdown semesterDrop">
                                        <button
                                            type="button"
                                            id="semesterDropdown"
                                            className="dropdownBtn"
                                        >
                                            <span className="chosen">
                                                請選擇學期
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
                                                請選擇科系
                                            </span>
                                            <i className="fas fa-caret-down"></i>
                                        </button>
                                        <div className="drpOptions">
                                            <button
                                                type="button"
                                                data-department="CS"
                                                className="option"
                                                onClick={() => {
                                                    this.setState({
                                                        department: "CS",
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
                                                        department: "EE",
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
                                                        department: "EECS",
                                                    });
                                                }}
                                            >
                                                <span className="primary">
                                                    EECS 電資院學士班
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                data-department="GE"
                                                className="option"
                                                onClick={() => {
                                                    this.setState({
                                                        department: "GE",
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
                                                        department: "GEC",
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
                                                請選擇課程
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
                                            <span className="wordCount">0</span>{" "}
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
                                            <span className="wordCount">0</span>{" "}
                                            / 20
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        id="courseType"
                                        maxLength="20"
                                        placeholder="某系必修 ／ 選修 ／ 通識領域 ／ 核通向度"
                                        value={this.state.courseType}
                                        onChange={(e) => {
                                            const text = e.target.value;
                                            this.setState({ courseType: text });
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
                                                This is Title{" "}
                                                <i className="close fas fa-times"></i>
                                            </h3>
                                            <div>
                                                content content content content
                                                content content content content
                                                content content content content
                                                content content content content
                                                content content content content
                                                content content
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
                                                inputMode="numeric"
                                                required
                                                maxLength="3"
                                                pattern="\d(\.\d)?"
                                                placeholder="例：3.5"
                                                value={this.state.sweet}
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
                                                inputMode="numeric"
                                                required
                                                maxLength="3"
                                                pattern="\d(\.\d)?"
                                                placeholder="例：3.5"
                                                value={this.state.cool}
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
                                                inputMode="numeric"
                                                required
                                                maxLength="3"
                                                pattern="\d(\.\d)?"
                                                placeholder="例：3.5"
                                                value={this.state.recommend}
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
                                                        0
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
                                                        0
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
                                                        0
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
                                                value={this.state.teachMethod}
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        teachMethod: text,
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
                                                        0
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
                                                        0
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
                                                        0
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
                                                        0
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
                                                        0
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
                                                    this.state.teacherCharacter
                                                }
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        teacherCharacter: text,
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
                                                        0
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
                                                value={this.state.taPerformance}
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        taPerformance: text,
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
                                            <span className="wordCount">0</span>{" "}
                                            / 10000
                                        </div>
                                    </div>

                                    <textarea
                                        name=""
                                        id=""
                                        cols="10"
                                        rows="10"
                                        maxLength="10000"
                                        value={this.state.mainReview}
                                        onChange={(e) => {
                                            const text = e.target.value;
                                            this.setState({ mainReview: text });
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
                                                        請選擇成績
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
                                                                personalGrade:
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
                                                                personalGrade:
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
                                                                personalGrade:
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
                                                                personalGrade:
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
                                                                personalGrade:
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
                                                                personalGrade:
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
                                                                personalGrade:
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
                                                                personalGrade:
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
                                                                personalGrade:
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
                                                                personalGrade:
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
                                                                personalGrade:
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
                                                            this.gradelist[0]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            this.gradelist[0] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                classGradeDist: this
                                                                    .gradelist,
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
                                                            this.gradelist[1]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            this.gradelist[1] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                classGradeDist: this
                                                                    .gradelist,
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
                                                            this.gradelist[2]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            this.gradelist[2] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                classGradeDist: this
                                                                    .gradelist,
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
                                                            this.gradelist[3]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            this.gradelist[3] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                classGradeDist: this
                                                                    .gradelist,
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
                                                            this.gradelist[4]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            this.gradelist[4] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                classGradeDist: this
                                                                    .gradelist,
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
                                                            this.gradelist[5]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            this.gradelist[5] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                classGradeDist: this
                                                                    .gradelist,
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
                                                            this.gradelist[6]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            this.gradelist[6] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                classGradeDist: this
                                                                    .gradelist,
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
                                                            this.gradelist[7]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            this.gradelist[7] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                classGradeDist: this
                                                                    .gradelist,
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
                                                            this.gradelist[8]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            this.gradelist[8] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                classGradeDist: this
                                                                    .gradelist,
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
                                                            this.gradelist[9]
                                                        }
                                                        onChange={(e) => {
                                                            const text =
                                                                e.target.value;
                                                            this.gradelist[9] = Number(
                                                                text
                                                            );
                                                            this.setState({
                                                                classGradeDist: this
                                                                    .gradelist,
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
                                            <span className="wordCount">0</span>{" "}
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
                                        onClick={this.handleCreateDraft.bind(
                                            this
                                        )}
                                    >
                                        <i className="fas fa-save"></i> 存成草稿
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
        current().then((data) => {
            this.setState({ userId: data[0].id });
        });
    }

    handleCreatePost() {
        if (this.state.userId) {
            createPost({ ...this.state }).then(() => {
                this.setState({ redirect: true });
            });
        } else {
            alert("請先登入");
        }
    }

    handleCreateDraft() {
        if (this.state.userId) {
            createDraft({ ...this.state }).then(() => {
                this.setState({ redirect: true });
            });
        } else {
            alert("請先登入");
        }
    }

    handleDrowndown() {
        getdropdown(this.state.semester, this.state.department).then(
            (courselist) => {
                this.setState({ dropdownlist: courselist });
            }
        );
    }
}
