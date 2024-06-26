import React from "react";

export interface NavigationItem {
    name: string;
    url: string;
    icon: string;
}

export interface NavbarState {
    notification: number;
}

export class Navbar extends React.Component {
    navItems: NavigationItem[] = [
        {
            name: "Home",
            url: "/",
            icon: "ai-home",
        },
        {
            name: "Location",
            url: "/location",
            icon: "ai-location",
        },
        {
            name: "Mes reservation",
            url: "/resa",
            icon: "ai-cart",
        },
        {
            name: "Premium",
            url: "/premium",
            icon: "ai-sparkles",
        },
        {
            name: "Ticket",
            url: "/ticket",
            icon: "ai-ticket",
        },
        {
            name: "Settings",
            url: "/settings",
            icon: "ai-gear",
        },
        {
            name: "Theme",
            url: "#",
            icon: "ai-flashlight",
        },
        {
            name: "Log in / out",
            url: "/login",
            icon: "ai-lock-on",
        },
    ];

    constructor(pos: any) {
        super(pos);
        this.getLocationsOccupationNotifInfo();
        if (document.cookie.includes("Theme=black")) {
            this.setLightModeCookie("white");
        }
    }

    state: NavbarState = {
        notification: 0,
    };

    public getLocationsOccupationNotifInfo = async () => {
        const apiPath = process.env.API_PATH || 'https://apipcs.c2smr.fr';
        const response = await fetch(`${apiPath}/location/occupation-service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            }
        });
        let data: any[] = await response.json();
        data = data.filter((user) => user.status === 'good' && user.user_email === localStorage.getItem('email'));
        this.setState({notification: data.length});
    };


    setLightModeCookie = (currentColor = document.body.style.backgroundColor) => {
        let assignColor;

        if (currentColor === "black") {
            assignColor = "#e1e1ff";
            document.body.style.color = 'black';

        } else {
            assignColor = "black";
            document.body.style.color = '#e1e1ff';
        }
        document.body.style.backgroundColor = assignColor;

        const date = new Date();
        date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
        const expired = "expires= " + date.toUTCString();
        document.cookie = "Theme=" + assignColor + " : " + expired + ";path=/";
    };

    render() {
        return (
            <div className="navbar">
                <div
                    className="burger"
                    onClick={() => {
                        const burger = document.querySelector<HTMLElement>(".burger");
                        if (!burger) return;
                        const ul = document.querySelector<HTMLElement>("ul");
                        if (ul) {
                            if (ul.style.transform === "translateX(-70px)") {
                                burger.style.transform = "translateX(60px)";
                                ul.style.transform = "translateX(0)";
                            } else {
                                burger.style.transform = "translateX(0)";
                                ul.style.transform = "translateX(-70px)";
                            }
                        }
                    }}
                >
                    <i className="ai-three-line-horizontal"></i>
                </div>
                <ul>
                    {this.navItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.url}
                                onClick={() => {
                                    if (item.name === "Theme") {
                                        this.setLightModeCookie();
                                    }
                                    if (item.url === "/login") {
                                        localStorage.removeItem("token");
                                    }
                                }}
                            >
                                {
                                    this.state.notification > 0 && item.url === "resa" ? (
                                        <span className="notification">{this.state.notification}</span>
                                    ) : null
                                }
                                <i className={item.icon}></i>
                                <span>{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
