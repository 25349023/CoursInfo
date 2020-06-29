import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Redirect } from "react-router-dom";
export default class PostsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            id: "",
        };
    }

    render() {
        const { posts, pages } = this.props;

        let children = [];
        if (posts.length) {
            children = posts.map((p) => (
                <tr
                    data-href="#"
                    key={p.course_number}
                    onClick={() => {
                        this.setState({
                            redirect: true,
                            id: p.id,
                        });
                    }}
                >
                    <td className="courseName">{p.course_chinese_title}</td>
                    <td className="teacher">
                        {p.teacher ? p.teacher.split("\t")[0] : "-"}
                    </td>
                    <td className="postTitle">{p.title}</td>
                    <td className="rating">
                        {p.recommend ? p.recommend : "-"}
                    </td>
                    <td className="rating">
                        <span>
                            {" "}
                            {p.likes} <i className="fas fa-heart"></i>{" "}
                        </span>
                    </td>
                </tr>
            ));
        }
        if (this.state.redirect) {
            return <Redirect to={`/userpost/${this.state.id}`} />;
        }
        return (
            <table>
                <colgroup>
                    <col className="primary" />
                    <col />
                    <col className="primary" />
                    <col />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">課程名稱</th>
                        <th scope="col">授課教師</th>
                        <th scope="col">心得標題</th>
                        <th scope="col">整體評分</th>
                        <th scope="col">此心得評價</th>
                    </tr>
                </thead>
                <InfiniteScroll
                    initialLoad={false}
                    loadMore={this.props.listMorePost}
                    hasMore={this.props.hasMore}
                    element={"tbody"}
                >
                    {children}
                </InfiniteScroll>
            </table>
        );
    }
}
