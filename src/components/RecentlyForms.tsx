import React from "react";

export function RecentlyForms() {
    return (
        <div className="flex items-center">
            <div className="flex-none">
                <svg className="fill-main" xmlns="http://www.w3.org/2000/svg" width="75px" height="75px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
                    <path d="M20.59 22L15 16.41V7h2v8.58l5 5.01L20.59 22z"/>
                    <path d="M16 2A13.94 13.94 0 0 0 6 6.23V2H4v8h8V8H7.08A12 12 0 1 1 4 16H2A14 14 0 1 0 16 2Z"/>
                </svg>
            </div>
            <div className="flex-1 text-section font-section">
                Недавние опросы
            </div>
        </div>
    )
}