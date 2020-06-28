import React from "react";
import Searchbar from "./Searchbar.jsx";
import Category from "./Category.jsx";
import Menu from "./Menu.jsx";
import PostsList from "./PostsList.jsx";
import { listPosts } from "api/Posts_api.js";
export default class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            department: ["CS", "EE", "EECS", "GE", "GEC"],
            text: "",
            start: [],
            hasMore: true,
        };
        this.catchPosts = this.catchPosts.bind(this);
        this.inputdepartment = this.inputdepartment.bind(this);
        this.listMorePosts = this.listMorePosts.bind(this);
        this.inputtext = this.inputtext.bind(this);
    }

    render() {
        return (
            <div className="postsListing">
                <section className="main">
                    <section className="posts">
                        <main>
                            <Searchbar />
                            <section className="listing">
                                <PostsList
                                    posts={this.state.posts}
                                    listMorePost={this.listMorePosts}
                                    hasMore={this.state.hasMore}
                                />
                            </section>
                        </main>
                        <Category handleinput={this.inputdepartment} />
                    </section>
                    <Menu />
                </section>
            </div>
        );
    }

    componentDidMount() {
        this.catchPosts(
            this.state.department,
            this.state.text,
            this.state.start
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.text != prevState.text) {
            this.catchPosts(
                this.state.department,
                this.state.text,
                this.state.start
            );
        }
    }

    inputtext(e) {
        this.setState({
            text: e.target.value,
        });
    }

    inputdepartment(dep) {
        let index = this.state.department.indexOf(dep);
        if (index != -1) {
            let temp = [...this.state.department];
            temp.splice(index, 1);
            this.setState({
                department: temp,
            });
        } else {
            let temp = [...this.state.department];
            temp.push(dep);
            this.setState({
                department: temp,
            });
        }
        this.catchPosts(
            this.state.department,
            this.state.text,
            this.state.start
        );
    }

    catchPosts(department, text, start) {
        listPosts(department, text, start)
            .then((courseslist) => {
                this.setState({
                    posts: courseslist,
                });
            })
            .catch((err) => {
                console.error("Error listing posts", err);

                this.setState({
                    posts: [],
                });
            });
    }

    listMorePosts() {
        if (this.state.posts.length < 1) {
            return;
        }
        console.log(this.state);
        listPosts(this.state.department, this.state.text, this.state.start)
            .then((courseslist) => {
                let temp = [];
                temp.push(courseslist[9].department);
                temp.push(courseslist[9].course_subnumber);
                console.log(temp);
                this.setState({
                    start: temp,
                    posts: [...this.state.posts, ...courseslist],
                    hasMore: courseslist.length > 0,
                });
            })
            .catch((err) => {
                console.error("Error listing more posts", err);
            });
    }
}
