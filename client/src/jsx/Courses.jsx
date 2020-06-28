import React from "react";
import Searchbar from "./Searchbar.jsx";
import Category from "./Category.jsx";
import Menu from "./Menu.jsx";
import CoursesList from "./CoursesList.jsx";
import { listCourses, selectCourse } from "api/Courses_api.js";
export default class Courses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            department: ["CS", "EE", "EECS", "GE", "GEC"],
            text: "",
            start: [],
            hasMore: true,
        };
        this.catchCourses = this.catchCourses.bind(this);
        this.listMoreCourse = this.listMoreCourse.bind(this);
        this.inputtext = this.inputtext.bind(this);
        this.inputdepartment = this.inputdepartment.bind(this);
    }
    render() {
        const { courses, department, text, start } = this.state;
        return (
            <div className="coursesListing">
                <section className="main">
                    <section className="courses">
                        <main>
                            <Searchbar
                                text={this.state.text}
                                handleinput={this.inputtext}
                            />
                            <section className="listing">
                                <CoursesList
                                    courses={courses}
                                    listMoreCourse={this.listMoreCourse}
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
        this.catchCourses(
            this.state.department,
            this.state.text,
            this.state.start
        );
    }

    inputtext(e) {
        this.setState({
            text: e.target.value,
        });
    }

    inputdepartment(dep) {
        let index = this.state.department.IndexOf(dep);
        if (index != -1) {
            let temp = [...this.state.department];
            temp.splice(index, 1);
        } else {
            let temp = [...this.state.department];
            temp.push(dep);
            this.setState({
                department: temp,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.text != prevState.text) {
            this.catchCourses(
                this.state.department,
                this.state.text,
                this.state.start
            );
        }
    }

    catchCourses(department, text, start) {
        listCourses(department, text, start)
            .then((courseslist) => {
                this.setState({
                    courses: courseslist,
                });
            })
            .catch((err) => {
                console.error("Error listing posts", err);

                this.setState({
                    courses: [],
                });
            });
    }

    listMoreCourse() {
        if (this.state.courses.length < 1) {
            return;
        }
        listCourses(this.state.department, this.state.text, this.state.start)
            .then((courseslist) => {
                let temp = [];
                temp.push(courseslist[9].department);
                temp.push(courseslist[9].course_subnumber);
                this.setState({
                    start: temp,
                    courses: courseslist,
                    hasMore: courses.length > 0,
                });
            })
            .catch((err) => {
                console.error("Error listing more posts", err);
            });
    }
}
