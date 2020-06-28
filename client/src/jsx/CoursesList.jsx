import React from "react";
import InfiniteScroll from "react-infinite-scroller";

export default class CoursesList extends React.Component {
    constructor() {
        super(props);
        this.state = {};
    }

    render() {
        const { courses, pages } = this.props;

        let children = [];
        if (courses.length) {
            children = courses.map((p) => (
                <tr data-href="#">
                    <td className="courseNumber">{p.course_number}</td>
                    <td className="courseName">{p.course_chinese_title}</td>
                    <td className="rating">{p.sweet}</td>
                    <td className="rating">{p.cool}</td>
                    <td className="rating">{p.recommend}</td>
                    <td className="teacher">{p.teacher}</td>
                </tr>
            ));
        }
        return (
            <table>
                <colgroup>
                    <col className="secondary" />
                    <col className="primary" />
                    <col span="2" />
                    <col />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">科號</th>
                        <th scope="col">課程名稱</th>
                        <th scope="col">甜度</th>
                        <th scope="col">涼度</th>
                        <th scope="col">推薦</th>
                        <th scope="col">授課教師</th>
                    </tr>
                </thead>
                <tbody>
                    <InfiniteScroll
                        initialLoad={false}
                        loadMore={this.props.listMoreCourse}
                        hasMore={this.props.hasMore}
                    >
                        {children}
                    </InfiniteScroll>
                </tbody>
            </table>
        );
    }
}
