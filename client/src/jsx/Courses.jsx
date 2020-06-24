import React from "react";

export default class Courses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <div className="coursesListing">
                <main>
                    <section className="listing">
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
                                <tr data-href="#">
                                    <td className="courseNumber">CS100000</td>
                                    <td className="courseName">Programming</td>
                                    <td className="rating">3.3</td>
                                    <td className="rating">4.4</td>
                                    <td className="rating">2.2</td>
                                    <td className="teacher">王小明</td>
                                </tr>
                                <tr data-href="./info.html">
                                    <td className="courseNumber">CS100000</td>
                                    <td className="courseName">
                                        計算機程式設計一
                                    </td>
                                    <td className="rating">3.3</td>
                                    <td className="rating">4.4</td>
                                    <td className="rating">2.2</td>
                                    <td className="teacher">王小明</td>
                                </tr>
                                <tr data-href="#">
                                    <td className="courseNumber">CS100000</td>
                                    <td className="courseName">Programming</td>
                                    <td className="rating">3.3</td>
                                    <td className="rating">4.4</td>
                                    <td className="rating">2.2</td>
                                    <td className="teacher">王小明</td>
                                </tr>
                                <tr data-href="#">
                                    <td className="courseNumber">CS100000</td>
                                    <td className="courseName">Programming</td>
                                    <td className="rating">3.3</td>
                                    <td className="rating">4.4</td>
                                    <td className="rating">2.2</td>
                                    <td className="teacher">王小明</td>
                                </tr>
                                <tr data-href="#">
                                    <td className="courseNumber">CS100000</td>
                                    <td className="courseName">Programming</td>
                                    <td className="rating">3.3</td>
                                    <td className="rating">4.4</td>
                                    <td className="rating">2.2</td>
                                    <td className="teacher">王小明</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        );
    }
}
