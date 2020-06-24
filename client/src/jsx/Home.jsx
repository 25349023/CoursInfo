import React from "react";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <div className="home">
                <section className="banner">
                    <div className="foreground">
                        <h1>NTHU CoursInfo</h1>
                        <h3>解決你選課時的煩惱</h3>
                        <a className="button" href="./courses.html">
                            現在開始
                        </a>
                    </div>
                </section>
                <main>
                    <h2>我們的目標</h2>
                    <section className="goal">
                        <div></div>
                        <p>
                            some thing some thing some thing some thing some
                            thing some thing some thing some thing some
                            thingsome thing some thing some thing
                        </p>
                    </section>
                    <section className="goal">
                        <div></div>
                        <p>
                            some thing some thing some thing some thing some
                            thing some thing some thing some thing some
                            thingsome thing some thing some thing
                        </p>
                    </section>
                    <section className="goal">
                        <div></div>
                        <p>
                            some thing some thing some thing some thing some
                            thing some thing some thing some thing some
                            thingsome thing some thing some thing
                        </p>
                    </section>
                </main>
            </div>
        );
    }
}
