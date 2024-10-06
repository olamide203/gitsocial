import React from "react";
import Card from "../components/UI/Card";

function About() {
    return (
        <Card>
            <div className="p-6 text-slate-50">
                <h1 className="text-3xl mb-6 font-bold">About this Project</h1>
                <p className="mb-12 antialiased text-white">
                    Github Finder is an app which can be used to search for
                    github profiles and view profile details. It fetches data
                    from the Github REST API and displays it to users in a easy
                    to unserstand way. It was built with React and Tailwind CSS
                </p>
                <span className="">Version 1.0.0</span>
            </div>
        </Card>
    );
}

export default About;
