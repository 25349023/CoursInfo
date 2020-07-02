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
                <div
                    className="rowItem"
                    data-href="#"
                    key={p.id}
                    onClick={() => {
                        this.setState({
                            redirect: true,
                            id: p.id,
                        });
                    }}
                >
                    <span class="cell courseName">
                        {p.course_chinese_title}
                    </span>
                    <span class="cell teacher">
                        {p.teacher ? p.teacher.split("\t")[0] : "-"}
                    </span>
                    <span class="cell postTitle">{p.title}</span>
                    <span class="cell rating">
                        {p.recommend ? p.recommend : "-"}
                    </span>
                    <span class="cell rating">
                        <span>
                            {p.likes} <i className="fas fa-heart"></i>
                        </span>
                    </span>
                </div>
            ));
        }
        if (this.state.redirect) {
            return <Redirect to={`/userpost/${this.state.id}`} />;
        }
        return (
            <section className="listing">
                <div className="listHead">
                    <span className="cell">課程名稱</span>
                    <span className="cell">授課教師</span>
                    <span className="cell">心得標題</span>
                    <span className="cell">整體評分</span>
                    <span className="cell">此心得評價</span>
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
