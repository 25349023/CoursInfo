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
            department: ["CL", "CS", "EE", "EECS", "FL", "GE", "GEC"],
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
                            <Searchbar
                                text={this.state.text}
                                handleinput={this.inputtext}
                            />
                            <PostsList
                                posts={this.state.posts}
                                listMorePost={this.listMorePosts}
                                hasMore={this.state.hasMore}
                            />
                        </main>
                        <Category handleinput={this.inputdepartment} />
                    </section>
                    <Menu />
                </section>
            </div>
        );
    }

    componentDidMount() {
        document.title = "心得列表";
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

        if (this.state.department != prevState.department) {
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
            start: [],
        });
    }

    inputdepartment(dep) {
        let index = this.state.department.indexOf(dep);
        if (index != -1) {
            let temp = [...this.state.department];
            temp.splice(index, 1);
            this.setState({
                text: "",
                department: temp,
                start: [],
            });
        } else {
            let temp = [...this.state.department];
            temp.push(dep);
            this.setState({
                text: "",
                department: temp,
                start: [],
            });
        }
    }

    catchPosts(department, text, start) {
        listPosts(department, text, start)
            .then((courseslist) => {
                this.setState({
                    posts: courseslist,
                    start: courseslist[courseslist.length - 1].id,
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
                this.setState({
                    start: courseslist[courseslist.length - 1].id,
                    posts: [...this.state.posts, ...courseslist],
                    hasMore: courseslist.length > 0,
                });
            })
            .catch((err) => {
                console.error("Error listing more posts", err);
            });
    }
}
