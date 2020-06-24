import React from "react";

export default class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="postsListing">
                <section className="listing">
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
                        <tbody>
                            <tr data-href="#">
                                <td className="courseName">Programming</td>
                                <td className="teacher">王小明</td>
                                <td className="postTitle">一門好課</td>
                                <td className="rating">3.5</td>
                                <td className="rating">－</td>
                            </tr>
                            <tr data-href="#">
                                <td className="courseName">Programming</td>
                                <td className="teacher">王小明</td>
                                <td className="postTitle">一門好課</td>
                                <td className="rating">3.5</td>
                                <td className="rating">
                                    <span>
                                        {" "}
                                        -4 <i className="fas fa-heart"></i>{" "}
                                    </span>
                                </td>
                            </tr>
                            <tr data-href="#">
                                <td className="courseName">Programming</td>
                                <td className="teacher">王小明</td>
                                <td className="postTitle">一門好課</td>
                                <td className="rating">3.5</td>
                                <td className="rating">－</td>
                            </tr>
                            <tr data-href="#">
                                <td className="courseName">Programming</td>
                                <td className="teacher">王小明</td>
                                <td className="postTitle">一門好課</td>
                                <td className="rating">3.5</td>
                                <td className="rating">
                                    <span>
                                        {" "}
                                        2 <i className="fas fa-heart"></i>{" "}
                                    </span>
                                </td>
                            </tr>
                            <tr data-href="#">
                                <td className="courseName">Programming</td>
                                <td className="teacher">王小明</td>
                                <td className="postTitle">一門好課</td>
                                <td className="rating">3.5</td>
                                <td className="rating">
                                    <span>
                                        {" "}
                                        1 <i className="fas fa-heart"></i>{" "}
                                    </span>
                                </td>
                            </tr>
                            <tr data-href="#">
                                <td className="courseName">Programming</td>
                                <td className="teacher">王小明</td>
                                <td className="postTitle">一門好課</td>
                                <td className="rating">3.5</td>
                                <td className="rating">－</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        );
    }
}
