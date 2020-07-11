import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        document.title = "NTHU CoursInfo";
    }

    render() {
        return (
            <div className="home">
                <section className="banner">
                    <div className="foreground">
                        <h1>NTHU CoursInfo</h1>
                        <h3>解決你選課時的煩惱</h3>
                        <Link to="/courses" className="button">
                            現在開始
                        </Link>
                    </div>
                </section>
                <main>
                    <h2>我們的目標</h2>
                    <section className="goal">
                        <div>
                            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDY4LjI5MyA0NjguMjkzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NjguMjkzIDQ2OC4yOTM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGQ0Q0NjI7IiBkPSJNNDQ0LjA2LDM2My42NjhIMjQuMjMyVjQwLjI0OGMwLTYuODk3LDUuNTkxLTEyLjQ4OCwxMi40ODgtMTIuNDg4aDk2LjAxMw0KCWMzLjY5NywwLDcuMjA0LDEuNjM4LDkuNTc3LDQuNDc0bDMzLjYwNCw0MC4xNTdjMi4zNzMsMi44MzUsNS44OCw0LjQ3NCw5LjU3Nyw0LjQ3NGgyNDYuMDgxYzYuODk3LDAsMTIuNDg4LDUuNTkxLDEyLjQ4OCwxMi40ODgNCglWMzYzLjY2OHoiLz4NCjxyZWN0IHg9IjU5LjYyOSIgeT0iMTAzLjAyNCIgc3R5bGU9ImZpbGw6I0UxRTZFOTsiIHdpZHRoPSIzNDkuMDAzIiBoZWlnaHQ9IjkyLjY2NiIvPg0KPHJlY3QgeD0iNzguMzYxIiB5PSIxMjEuNzU2IiBzdHlsZT0iZmlsbDojRDVENkRCOyIgd2lkdGg9IjMxMS41MzkiIGhlaWdodD0iOTIuNjY2Ii8+DQo8cmVjdCB4PSI5Ny4wOTMiIHk9IjE0MC40ODgiIHN0eWxlPSJmaWxsOiNFMUU2RTk7IiB3aWR0aD0iMjc0LjA3NiIgaGVpZ2h0PSI5Mi42NjYiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGNkMzNTg7IiBkPSJNNDM3LjA3Myw0NDAuNTMySDMxLjIyYy0xNy4yNDIsMC0zMS4yMi0xMy45NzctMzEuMjItMzEuMjJWMTc3LjQ1Ng0KCWMwLTYuODk3LDUuNTkxLTEyLjQ4OCwxMi40ODgtMTIuNDg4aDQ0My4zMTdjNi44OTcsMCwxMi40ODgsNS41OTEsMTIuNDg4LDEyLjQ4OHYyMzEuODU3DQoJQzQ2OC4yOTMsNDI2LjU1NSw0NTQuMzE1LDQ0MC41MzIsNDM3LjA3Myw0NDAuNTMyeiIvPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" />{" "}
                        </div>
                        <p>擁有豐富課程資料，沒有找不到的課程！</p>
                    </section>
                    <section className="goal">
                        <div>
                            <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PGc+PHBhdGggZD0ibTEzLjIxNyA0OTguNzk0Yy04LjUyNC04LjUyMy0xMy4yMTctMTkuODU1LTEzLjIxNy0zMS45MDhzNC42OTMtMjMuMzg1IDEzLjIxNy0zMS45MDhsMzI5Ljg2MS0zMjkuODYxYzUuODU3LTUuODU4IDE1LjM1NS01Ljg1NyAyMS4yMTMgMGw0Mi42MDQgNDIuNjAzYzIuODEzIDIuODEzIDQuMzk0IDYuNjI4IDQuMzk0IDEwLjYwNnMtMS41OCA3Ljc5My00LjM5NCAxMC42MDZsLTMyOS44NjIgMzI5Ljg2MmMtOC43OTcgOC43OTctMjAuMzUzIDEzLjE5NS0zMS45MDggMTMuMTk1cy0yMy4xMTEtNC4zOTgtMzEuOTA4LTEzLjE5NXoiIGZpbGw9IiM0NjRiNTIiLz48L2c+PHBhdGggZD0ibTQwNi44OTUgMTQ3LjcyYzIuODEzIDIuODEzIDQuMzk0IDYuNjI4IDQuMzk0IDEwLjYwNnMtMS41OCA3Ljc5My00LjM5NCAxMC42MDZsLTMyOS44NjIgMzI5Ljg2MmMtOC43OTcgOC43OTctMjAuMzUzIDEzLjE5NS0zMS45MDggMTMuMTk1cy0yMy4xMTEtNC4zOTgtMzEuOTA4LTEzLjE5NWwzNzIuMzc2LTM3Mi4zNzZ6IiBmaWxsPSIjMjkyYjJmIi8+PGNpcmNsZSBjeD0iMzE2LjI1IiBjeT0iMTk1Ljc2MSIgZmlsbD0iIzc2Y2VmYiIgcj0iMTk1Ljc1Ii8+PHBhdGggZD0ibTQ1NC42MDEgNTcuNDA5YzM1LjQ0NiAzNS40NDYgNTcuMzk5IDg0LjM4MyA1Ny4zOTkgMTM4LjM1MiAwIDEwNy45MzctODcuODEzIDE5NS43NS0xOTUuNzUgMTk1Ljc1LTUzLjk2OCAwLTEwMi45MDYtMjEuOTUzLTEzOC4zNTEtNTcuMzk5eiIgZmlsbD0iIzY4OTdmNCIvPjxjaXJjbGUgY3g9IjMxNi4yNSIgY3k9IjE5NS43NjEiIGZpbGw9IiNlMWZhZmYiIHI9IjEzNS41Ii8+PHBhdGggZD0ibTMxNi4yNSAzMzEuMjYxYy0zNy4zNTcgMC03MS4yMzItMTUuMTk2LTk1Ljc2OC0zOS43MzJsMTkxLjUzNi0xOTEuNTM2YzI0LjUzNiAyNC41MzYgMzkuNzMyIDU4LjQxMSAzOS43MzIgOTUuNzY4IDAgNzQuNzE1LTYwLjc4NSAxMzUuNS0xMzUuNSAxMzUuNXoiIGZpbGw9IiNjN2Y1ZmYiLz48L2c+PC9zdmc+" />
                        </div>
                        <p>幫助你尋找喜歡的課程！</p>
                    </section>
                    <section className="goal">
                        <div>
                            <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTM4My4wMDggNDV2NDIyYzAgMjQuODEtMjAuMTkgNDUtNDUgNDVoLTI5M2MtMjQuODEgMC00NS0yMC4xOS00NS00NXYtNDIyYzAtMjQuODEgMjAuMTktNDUgNDUtNDVoMjkzYzI0LjgxIDAgNDUgMjAuMTkgNDUgNDV6IiBmaWxsPSIjZWVmNGZmIi8+PHBhdGggZD0ibTM4My4wMDggNDV2NDIyYzAgMjQuODEtMjAuMTkgNDUtNDUgNDVoLTE0NnYtNTEyaDE0NmMyNC44MSAwIDQ1IDIwLjE5IDQ1IDQ1eiIgZmlsbD0iI2Q5ZTZmYyIvPjxwYXRoIGQ9Im0zMTkuMDA4IDExMmMwIDguMjgtNi43MiAxNS0xNSAxNWgtMjI0Yy04LjI4IDAtMTUtNi43Mi0xNS0xNXM2LjcyLTE1IDE1LTE1aDIyNGM4LjI4IDAgMTUgNi43MiAxNSAxNXoiIGZpbGw9IiM0MjU3OTYiLz48cGF0aCBkPSJtMzE5LjAwOCAxMTJjMCA4LjI4LTYuNzIgMTUtMTUgMTVoLTExM3YtMzBoMTEzYzguMjggMCAxNSA2LjcyIDE1IDE1eiIgZmlsbD0iIzI4Mzc1OCIvPjxwYXRoIGQ9Im0yNzEuMDA4IDE5MmMwIDguMjgtNi43MiAxNS0xNSAxNWgtMTc2Yy04LjI4IDAtMTUtNi43Mi0xNS0xNXM2LjcyLTE1IDE1LTE1aDE3NmM4LjI4IDAgMTUgNi43MiAxNSAxNXoiIGZpbGw9IiM0MjU3OTYiLz48cGF0aCBkPSJtMjcxLjAwOCAxOTJjMCA4LjI4LTYuNzIgMTUtMTUgMTVoLTY1di0zMGg2NWM4LjI4IDAgMTUgNi43MiAxNSAxNXoiIGZpbGw9IiMyODM3NTgiLz48cGF0aCBkPSJtMjIzLjAwOCAyNzJjMCA4LjI4LTYuNzIgMTUtMTUgMTVoLTEyOGMtOC4yOCAwLTE1LTYuNzItMTUtMTVzNi43Mi0xNSAxNS0xNWgxMjhjOC4yOCAwIDE1IDYuNzIgMTUgMTV6IiBmaWxsPSIjNDI1Nzk2Ii8+PHBhdGggZD0ibTIyMy4wMDggMjcyYzAgOC4yOC02LjcyIDE1LTE1IDE1aC0xN3YtMzBoMTdjOC4yOCAwIDE1IDYuNzIgMTUgMTV6IiBmaWxsPSIjMjgzNzU4Ii8+PHBhdGggZD0ibTUwNy44NDggMjIzLjI5Yy0xLjg3IDMuMTYtOC4xMiA5LjU4LTUwIDUwLjkxLTI0LjI3IDIzLjk1LTYwLjUxIDU5LjY0LTExNC43OSAxMTMuMjItMi42MSAyLjU5IDMuMjktLjU3LTg5LjA1IDQyLjUyLTEyLjc1IDUuOTctMjUuODEtNy4zNi0xOS45NC0xOS45NCA0My4xNi05Mi40NyAzOS45Mi04Ni40NyA0Mi41OS04OS4xMSA1NC4xLTU0LjEgOTAuMDQtOTAuMDYgMTEzLjkzLTExMy45NSA0Ni40My00Ni40NSA0Ny4zNC00Ny4zMyA0Ny40NS00Ny4yMSAxMi4wMy05LjcyIDI5LjMyLTguNzYgNDAuMTQgMi4wNiAyNy4xIDI3LjEgMjUuNzkgMjUuNjkgMjcuMSAyNy4zMiA3LjY4IDkuMzYgOS4wOSAyMy4wNSAyLjU3IDM0LjE4eiIgZmlsbD0iI2ZmZTI3OCIvPjxwYXRoIGQ9Im01MDcuODQ4IDIyMy4yOWMtMi45NSA0Ljk5LTE2Ljg1IDE4LjExLTE2NC43OSAxNjQuMTMtMi42MSAyLjU5IDMuMjktLjU3LTg5LjA1IDQyLjUyLTIuMDMuOTUtNC4yIDEuNDEtNi4zNCAxLjQxLTQuMTUgMC03Ljc3LTEuNjMtMTAuNDEtNC4ybDI1My4xNS0yNTMuMTRjMTQuNDYgMTQuNDUgMTMuNzkgMTMuNzYgMTQuODcgMTUuMSA3LjY4IDkuMzYgOS4wOSAyMy4wNSAyLjU3IDM0LjE4eiIgZmlsbD0iI2ZmYjQ1NCIvPjxwYXRoIGQ9Im01MDcuODQ4IDIyMy4yOWMtMS44NyAzLjE2LTguMTIgOS41OC01MCA1MC45MWwtLjA4LS4wNy0zMy43NC0zMy43NC0zMy40NC0zMy40M3YtLjAyYzQ2LjQzLTQ2LjQ1IDQ3LjM0LTQ3LjMzIDQ3LjQ1LTQ3LjIxIDEyLjAzLTkuNzIgMjkuMzItOC43NiA0MC4xNCAyLjA2IDQuOTcgNC45NyA4Ljk4IDguOTggMTIuMjMgMTIuMjIgMTQuNDggMTQuNDcgMTMuOCAxMy43NyAxNC44NyAxNS4xIDcuNjggOS4zNiA5LjA5IDIzLjA1IDIuNTcgMzQuMTh6IiBmaWxsPSIjZGQ1OTU4Ii8+PHBhdGggZD0ibTUwNy44NDggMjIzLjI5Yy0xLjg3IDMuMTYtOC4xMiA5LjU4LTUwIDUwLjkxbC0uMDgtLjA3LTMzLjc0LTMzLjc0IDY2LjM4LTY2LjM4YzE0LjQ4IDE0LjQ3IDEzLjggMTMuNzcgMTQuODcgMTUuMSA3LjY4IDkuMzYgOS4wOSAyMy4wNSAyLjU3IDM0LjE4eiIgZmlsbD0iI2Q4MjI1YiIvPjwvZz48L3N2Zz4=" />
                        </div>
                        <p>發表心得與他人分享！</p>
                    </section>
                </main>
            </div>
        );
    }
}
