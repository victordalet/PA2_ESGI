import React from "react";

export class PopupError extends React.Component <{ text: string }> {

    render() {

        const {text} = this.props;

        return (
            <div className={"pop-up"}>
                <div className={"close"} onClick={() => {
                    const root = document.querySelectorAll<HTMLElement>('.pop-up');
                    if (root) {
                        root.forEach((element) => {
                            element.style.transform = 'translateX(-350px)';
                        });
                    }
                }}>
                    <i className="ai-circle-x-fill"></i>
                </div>
                <h3>{text}</h3>
            </div>
        );
    }
}