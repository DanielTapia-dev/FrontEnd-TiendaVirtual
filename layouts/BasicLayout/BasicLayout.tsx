import React from 'react';
import Header from "../../components/Header";

export default function BasicLayout(props: any) {
    const {children} = props;
    return (
        <div className="basic-layout">
            <Header/>
            {children}
        </div>
    )
}
