import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Redirect } from "react-router-dom";
export default class CoursesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            smt: "",
            dep: "",
            subnum: "",
        };
    }

    render() {
        const { courses, pages } = this.props;

        let children = [];
        if (courses.length) {
            children = courses.map((p) => (
                <div
                    className="rowItem"
                    data-href="#"
                    key={p.course_number}
                    onClick={() => {
                        this.setState({
                            redirect: true,
                            smt: p.course_number.slice(0, 5),
                            dep: p.department,
                            subnum: p.course_subnumber,
                        });
                    }}
                >
                    <span className="cell courseNumber">
                        {p.department + " " + p.course_subnumber}
                    </span>
                    <span className="cell courseName">
                        {p.course_chinese_title}
                    </span>
                    <span className="cell rating">
                        {p.sweet ? p.sweet : "-"}
                    </span>
                    <span className="cell rating">{p.cool ? p.cool : "-"}</span>
                    <span className="cell rating">
                        {p.recommend ? p.recommend : "-"}
                    </span>
                    <span className="cell teacher">
                        {p.teacher ? p.teacher.split("\t")[0] : "-"}
                    </span>
                </div>
            ));
        }
        if (this.state.redirect) {
            return (
                <Redirect
                    to={`/info/${this.state.smt}-${this.state.dep}-${this.state.subnum}`}
                />
            );
        }
        return (
            <section className="listing">
                <div className="listHead">
                    <span className="cell">科號</span>
                    <span className="cell">課程名稱</span>
                    <span className="cell">甜度</span>
                    <span className="cell">涼度</span>
                    <span className="cell">推薦</span>
                    <span className="cell">授課教師</span>
                </div>
                <InfiniteScroll
                    initialLoad={false}
                    loadMore={this.props.listMoreCourse}
                    hasMore={this.props.hasMore}
                    className="listBody"
                >
                    {children}
                </InfiniteScroll>
            </section>
        );
    }
}
