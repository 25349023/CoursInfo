import React from "react";
import Menu from "./Menu.jsx";
import { current, selectUser, changeName } from "api/Users_api.js";
import { listDraft, deleteDraft } from "api/Draft_api.js";
import { deletePost, listPosts } from "../api/Posts_api.js";

export default class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            information: {},
            draft: [],
            delete_id: "",
            delete_title: "",
            post: [],
            delete_post_id: "",
            delete_post_title: "",
            newname: "",
        };
    }
    render() {
        let children1 = [],
            children2 = [];
        let { draft, post, information } = this.state;
        if (draft.length) {
            children1 = draft.map((p) => [
                <div className="draftRow" data-target="#" key={p.title}>
                    <span>{p.title}</span>
                    <span>{p.course_chinese_title}</span>
                    <time>{p.updated_at}</time>
                </div>,
                <span
                    key={p.id}
                    className="delete popup"
                    data-target="#draftPopup"
                    onClick={() => {
                        document
                            .querySelector("#draftPopup")
                            .classList.add("active");
                        this.setState({
                            delete_title: p.title,
                            delete_id: p.id,
                        });
                    }}
                >
                    <i className="fas fa-trash-alt"></i>
                </span>,
            ]);
        }
        if (post.length) {
            children1 = post.map((p) => [
                <div className="postRow" data-target="#" key={p.title}>
                    <span>{p.title}</span>
                    <span>{p.course_chinese_title}</span>
                    <time>{p.updated_at}</time>
                    <span>{p.likes}</span>
                </div>,
                <span
                    key={p.id}
                    className="delete popup"
                    data-target="#postPopup"
                    onClick={() => {
                        document
                            .querySelector("#postPopup")
                            .classList.add("active");
                        this.setState({
                            delete_post_title: p.title,
                            delete_post_id: p.id,
                        });
                    }}
                >
                    <i className="fas fa-trash-alt"></i>
                </span>,
            ]);
        }
        return (
            <div className="userPage">
                <section className="main">
                    <section className="accountInfo">
                        <div className="wrapper">
                            <h1
                                onClick={() => {
                                    console.log("asdfasdf");
                                }}
                            >
                                Hi，<span>{information.nickname}</span>
                            </h1>

                            <main>
                                <h2>基本資料</h2>
                                <div className="imgWrapper">
                                    <figure>
                                        <img
                                            src="https://www.gravatar.com/avatar/4f1a2eb9a71a5ad830d450e3a5c8e40e?d=identicon&r=g&s=256"
                                            style={{
                                                backgroundImage: `url(
                                                    https://www.gravatar.com/avatar/4f1a2eb9a71a5ad830d450e3a5c8e40e?d=identicon&r=g&s=275`,
                                            }}
                                            alt="userImage"
                                        />
                                        <figcaption>
                                            <a href="https://en.gravatar.com/">
                                                <i className="fas fa-image"></i>{" "}
                                                到 Gravatar 上更改頭貼
                                            </a>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div
                                    id="namePopup"
                                    className="popupContent"
                                    onClick={(e) => {
                                        e.target.classList.remove("active");
                                    }}
                                >
                                    <div
                                        className="popupWindow"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <h3>
                                            更改暱稱{" "}
                                            <i className="close fas fa-times"></i>
                                        </h3>
                                        <div className="editContent">
                                            <span>輸入新暱稱：</span>
                                            <input
                                                type="text"
                                                value={this.state.newname}
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    this.setState({
                                                        newname: text,
                                                    });
                                                }}
                                            />
                                            <div className="btnGroup">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        console.log("asdasd");
                                                        document
                                                            .querySelector(
                                                                "#namePopup"
                                                            )
                                                            .classList.remove(
                                                                "active"
                                                            );
                                                        this.setState({
                                                            newname: "",
                                                        });
                                                    }}
                                                >
                                                    <i className="fas fa-times"></i>{" "}
                                                    取消
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        console.log("asdasd");

                                                        changeName({
                                                            userId:
                                                                information.id,
                                                            nickname: this.state
                                                                .newname,
                                                        })
                                                            .then((user) => {
                                                                this.setState({
                                                                    information:
                                                                        user[0],
                                                                });
                                                            })
                                                            .then(() => {
                                                                document
                                                                    .querySelector(
                                                                        "#namePopup"
                                                                    )
                                                                    .classList.remove(
                                                                        "active"
                                                                    );
                                                            });
                                                    }}
                                                >
                                                    <i className="fas fa-check"></i>{" "}
                                                    確認
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="info">
                                    <h3>Email</h3>
                                    <span>example@mail.com</span>
                                    <h3>暱稱</h3>

                                    <span>
                                        <span className="nickname">
                                            {information.nickname}
                                            <button
                                                className="editName popup tooltip"
                                                data-target="#namePopup"
                                            >
                                                <i className="fas fa-pen-alt"></i>
                                                <span className="tooltipBalloon">
                                                    更改暱稱
                                                </span>
                                            </button>
                                        </span>
                                    </span>
                                    <h3>積分</h3>
                                    <span>{information.points}</span>
                                    <h3>角色</h3>
                                    <span>一般會員</span>
                                    <h3>每日發文上限</h3>
                                    <span>
                                        <span className="publishLimit">
                                            {information.daily_publish_count}
                                        </span>{" "}
                                        / 5
                                    </span>
                                    <h3>草稿數量</h3>
                                    <span>
                                        <span className="draftLimit">
                                            {information.draft_count}
                                        </span>{" "}
                                        / 5
                                    </span>
                                </div>
                                <div id="draftPopup" className="popupContent">
                                    <div className="popupWindow">
                                        <h3>
                                            刪除草稿{" "}
                                            <i className="close fas fa-times"></i>
                                        </h3>
                                        <div className="deleteContent">
                                            <span>
                                                請問確認要刪除草稿 「
                                                <span>
                                                    {this.state.delete_title}
                                                </span>
                                                」 嗎？
                                            </span>
                                            <div className="btnGroup">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        document
                                                            .querySelector(
                                                                "#draftPopup"
                                                            )
                                                            .classList.remove(
                                                                "active"
                                                            );
                                                    }}
                                                >
                                                    <i className="fas fa-times"></i>{" "}
                                                    取消
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        deleteDraft(
                                                            this.state
                                                                .delete_id,
                                                            {
                                                                userId: this
                                                                    .state.id,
                                                            }
                                                        ).then(() => {
                                                            this.askid();
                                                            document
                                                                .querySelector(
                                                                    "#draftPopup"
                                                                )
                                                                .classList.remove(
                                                                    "active"
                                                                );
                                                        });
                                                    }}
                                                >
                                                    <i className="fas fa-check"></i>{" "}
                                                    確認
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="savedDrafts">
                                    <h2>我的草稿</h2>
                                    <div className="draftList">
                                        <div data-target="#">
                                            <span>標題</span>
                                            <span>課程</span>
                                            <time>上次修改時間</time>
                                            <span>刪除</span>
                                        </div>
                                        {children1}
                                    </div>
                                </div>
                                <div id="postPopup" className="popupContent">
                                    <div className="popupWindow">
                                        <h3>
                                            刪除心得{" "}
                                            <i className="close fas fa-times"></i>
                                        </h3>
                                        <div className="deleteContent">
                                            <span>
                                                請問確認要刪除心得 「
                                                <span>這門課很好</span>」 嗎？
                                            </span>
                                            <div className="btnGroup">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        document
                                                            .querySelector(
                                                                "#postPopup"
                                                            )
                                                            .classList.remove(
                                                                "active"
                                                            );
                                                    }}
                                                >
                                                    <i className="fas fa-times"></i>{" "}
                                                    取消
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        deletePost(
                                                            this.state
                                                                .delete_id,
                                                            {
                                                                userId: this
                                                                    .state.id,
                                                            }
                                                        ).then(() => {
                                                            this.askid();
                                                            document
                                                                .querySelector(
                                                                    "#draftPopup"
                                                                )
                                                                .classList.remove(
                                                                    "active"
                                                                );
                                                        });
                                                    }}
                                                >
                                                    <i className="fas fa-check"></i>{" "}
                                                    確認
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="myPosts">
                                    <h2>我的文章</h2>
                                    <div className="postsList">
                                        <div>
                                            <span>標題</span>
                                            <span>課程</span>
                                            <time>上次修改時間</time>
                                            <span>評價</span>
                                            <span>刪除</span>
                                        </div>
                                        <div
                                            className="postRow"
                                            data-target="#"
                                        >
                                            <span>這門課很好</span>
                                            <span>計算機程式設計一</span>
                                            <time>2020-06-25</time>
                                            <span>
                                                2{" "}
                                                <i className="fas fa-heart"></i>
                                            </span>
                                        </div>
                                        <span
                                            className="delete popup"
                                            data-target="#postPopup"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </span>
                                        <div
                                            className="postRow"
                                            data-target="#"
                                        >
                                            <span>這門課很好</span>
                                            <span>計算機程式設計一</span>
                                            <time>2020-06-25</time>
                                            <span>
                                                2{" "}
                                                <i className="fas fa-heart"></i>
                                            </span>
                                        </div>
                                        <span
                                            className="delete popup"
                                            data-target="#postPopup"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </span>
                                        <div
                                            className="postRow"
                                            data-target="#"
                                        >
                                            <span>這門課很好</span>
                                            <span>計算機程式設計一</span>
                                            <time>2020-06-25</time>
                                            <span>
                                                2{" "}
                                                <i className="fas fa-heart"></i>
                                            </span>
                                        </div>
                                        <span
                                            className="delete popup"
                                            data-target="#postPopup"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </span>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </section>

                    <Menu />
                </section>
            </div>
        );
    }

    componentDidMount() {
        this.askid();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.newname != prevState.newname) {
            // this.askid();
        }
    }

    askid() {
        current().then((user) => {
            this.setState({ id: user[0].id }, () => {
                selectUser(this.state.id).then((data) => {
                    this.setState({ information: data[0] });
                });
                listDraft(this.state.id).then((data) => {
                    this.setState({ draft: data });
                });
                listPosts;
            });
        });
    }
}
